"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GradientCard } from "@/components/ui/gradient-card";
import { StatTile } from "@/components/ui/stat-tile";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Activity,
  BookHeart,
  Stethoscope,
  Sunrise,
  PhoneCall,
  LogOut,
  Sprout,
  Baby,
  CalendarClock,
  HeartPulse,
} from "lucide-react";
import { getTimelineState } from "@/lib/timeline/utils";
import type { JourneyStage, TimelineState } from "@/lib/timeline/types";

interface Profile {
  stage: JourneyStage;
  due_date: string | null;
}

export default function DashboardClient({ profile }: { profile: Profile }) {
  const router = useRouter();
  const supabase = createClient();
  const [signingOut, setSigningOut] = useState(false);

  const timeline: TimelineState = getTimelineState(profile.stage, profile.due_date);

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <Header timeline={timeline} signingOut={signingOut} onSignOut={handleSignOut} />
      <main className="flex-1 space-y-6 px-4 pt-6">
        <StatRow timeline={timeline} />
        <WeekCard timeline={timeline} />
        <ActionGrid
          onBook={() => router.push("/book")}
          onWarningSigns={() => router.push("/warning-signs")}
        />
        <CheckInPrompt onStart={() => router.push("/check-in")} />
      </main>
    </div>
  );
}

// ----------------------------------------------------------------
// Header
// ----------------------------------------------------------------
function Header({
  timeline,
  signingOut,
  onSignOut,
}: {
  timeline: TimelineState;
  signingOut: boolean;
  onSignOut: () => void;
}) {
  const { stage, currentWeek, daysRemaining, progressPercent, trimesterLabel } =
    timeline;

  const headlineWeek =
    stage === "pregnant"
      ? `Week ${currentWeek}`
      : stage === "postpartum"
        ? `Week ${currentWeek} Postpartum`
        : "Your Journey";

  const subline =
    stage === "pregnant" && daysRemaining !== null
      ? daysRemaining > 0
        ? `${daysRemaining} days until your due date`
        : daysRemaining === 0
          ? "Your due date is today"
          : `${Math.abs(daysRemaining)} days past your due date`
      : stage === "postpartum"
        ? "You're in your fourth trimester"
        : "Tracking your cycle and preparing";

  return (
    <header className="bg-gradient-hero relative overflow-hidden rounded-b-4xl px-6 pb-7 pt-12 shadow-sm ring-1 ring-foreground/5">
      <div
        aria-hidden
        className="bg-glass absolute inset-x-0 bottom-0 h-px"
      />
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <Badge
            variant="secondary"
            className="border-0 bg-primary/10 text-primary hover:bg-primary/20"
          >
            {trimesterLabel}
          </Badge>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground">
            {headlineWeek}
          </h1>
          <p className="text-sm font-medium text-muted-foreground">{subline}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          disabled={signingOut}
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          aria-label="Sign out"
        >
          <LogOut className="size-5" />
        </Button>
      </div>

      {stage !== "ttc" && (
        <div className="relative mt-6 space-y-2">
          <Progress value={progressPercent} variant="gradient" className="h-2.5" />
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
            <span>Week 1</span>
            <span data-numeric>{progressPercent}%</span>
            <span>{stage === "postpartum" ? "Week 52" : "Week 40"}</span>
          </div>
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------------------
// Stat row
// ----------------------------------------------------------------
function StatRow({ timeline }: { timeline: TimelineState }) {
  const { stage, currentWeek, daysRemaining, trimesterLabel } = timeline;

  const tiles = [
    {
      label: stage === "postpartum" ? "Postpartum week" : "Pregnancy week",
      value: currentWeek,
      unit: stage === "postpartum" ? "/52" : "/40",
      icon: CalendarClock,
      accent: "primary" as const,
    },
    {
      label:
        stage === "pregnant"
          ? daysRemaining && daysRemaining >= 0
            ? "Days to due date"
            : "Days past due"
          : stage === "postpartum"
            ? "Fourth trimester"
            : "Cycle tracking",
      value:
        stage === "pregnant" && daysRemaining !== null
          ? Math.abs(daysRemaining)
          : stage === "postpartum"
            ? "Recovery"
            : "Active",
      icon: HeartPulse,
      accent: "accent" as const,
    },
    {
      label: "Trimester",
      value: trimesterLabel,
      icon: Sprout,
      accent: "gold" as const,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {tiles.map((t) => (
        <StatTile
          key={t.label}
          label={t.label}
          value={t.value}
          unit={t.unit}
          icon={t.icon}
          accent={t.accent}
          className="p-3"
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------
// Week Card
// ----------------------------------------------------------------
function WeekCard({ timeline }: { timeline: TimelineState }) {
  const { stage, currentWeek, content, progressPercent } = timeline;

  if (!content) return null;

  const icon =
    stage === "ttc" ? (
      <Sprout className="size-5 text-accent" />
    ) : stage === "postpartum" ? (
      <Baby className="size-5 text-accent" />
    ) : (
      <Sunrise className="size-5 text-accent" />
    );

  const readMoreLabel =
    stage === "ttc"
      ? "Read your TTC guide"
      : stage === "postpartum"
        ? `Read your week ${currentWeek} postpartum guide`
        : `Read your week ${currentWeek} guide`;

  return (
    <Card className="animate-fade-up overflow-hidden">
      <CardHeader className="flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-accent/10">
            {icon}
          </span>
          <CardTitle className="font-heading text-lg leading-tight">
            {content.headline}
          </CardTitle>
        </div>
        {stage !== "ttc" && (
          <ProgressRing
            value={progressPercent}
            size={56}
            strokeWidth={6}
            label={
              <span className="text-xs font-bold">{progressPercent}</span>
            }
          />
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed text-foreground-secondary">
          {content.body}
        </CardDescription>

        <div className="rounded-2xl bg-muted/70 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Activity className="size-3.5 text-primary" />
            {stage === "postpartum" ? "Common this week" : "Normal this week"}
          </h4>
          <ul className="list-disc space-y-1 pl-4 text-sm text-foreground-secondary marker:text-primary/50">
            {content.normalSymptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {"tip" in content && content.tip && (
          <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4">
            <p className="text-sm text-foreground-secondary">
              <span className="font-semibold text-accent">This week — </span>
              {content.tip}
            </p>
          </div>
        )}

        <Button variant="gradient" className="w-full font-semibold" asChild>
          <Link href="/guide">
            <BookHeart className="mr-2 size-4" /> {readMoreLabel}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------
// Action Grid
// ----------------------------------------------------------------
function ActionGrid({
  onBook,
  onWarningSigns,
}: {
  onBook: () => void;
  onWarningSigns: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onBook}
        className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl bg-card p-4 text-center ring-1 ring-foreground/10 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
          <Stethoscope className="size-6" aria-hidden />
        </span>
        <span className="text-sm font-semibold text-foreground">
          Consult an Expert
        </span>
      </button>

      <button
        type="button"
        onClick={onWarningSigns}
        className="flex min-h-28 flex-col items-center justify-center gap-2 rounded-xl bg-card p-4 text-center ring-1 ring-foreground/10 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/30 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <PhoneCall className="size-6" aria-hidden />
        </span>
        <span className="text-sm font-semibold text-foreground">
          Is this normal?
        </span>
      </button>
    </div>
  );
}

// ----------------------------------------------------------------
// Check-in Prompt
// ----------------------------------------------------------------
function CheckInPrompt({ onStart }: { onStart: () => void }) {
  return (
    <GradientCard accent="brand" className="animate-fade-up">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-bold">Time for your check-in</h3>
          <p className="text-sm text-primary-foreground/80">
            How are you feeling this week?
          </p>
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={onStart}
          className="border-0 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25"
        >
          Start
        </Button>
      </div>
    </GradientCard>
  );
}
