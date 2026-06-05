"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Activity, BookHeart, Stethoscope, Sunrise, PhoneCall, LogOut, Sprout, Baby,
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
    <div className="flex flex-col min-h-screen bg-bg-base pb-24">
      <Header timeline={timeline} signingOut={signingOut} onSignOut={handleSignOut} />
      <main className="flex-1 px-4 pt-6 space-y-6">
        <WeekCard timeline={timeline} />
        <ActionGrid onBook={() => router.push("/book")} onWarningSigns={() => router.push("/warning-signs")} />
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
  const { stage, currentWeek, daysRemaining, progressPercent, trimesterLabel } = timeline;

  const headlineWeek = stage === "pregnant"
    ? `Week ${currentWeek}`
    : stage === "postpartum"
    ? `Week ${currentWeek} Postpartum`
    : "Your Journey";

  const subline = stage === "pregnant" && daysRemaining !== null
    ? daysRemaining > 0
      ? `${daysRemaining} days until your due date`
      : daysRemaining === 0
      ? "Your due date is today!"
      : `${Math.abs(daysRemaining)} days past your due date`
    : stage === "postpartum"
    ? "You're in your fourth trimester"
    : "Tracking your cycle and preparing";

  const progressMax = stage === "postpartum" ? 52 : 40;
  const progressStart = stage === "postpartum" ? "Week 1" : "Week 1";
  const progressEnd = stage === "postpartum" ? "Week 52" : "Week 40";

  return (
    <header className="bg-white px-6 pt-12 pb-6 shadow-sm rounded-b-3xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <Badge
            variant="secondary"
            className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-0 pointer-events-none"
          >
            {trimesterLabel}
          </Badge>
          <h1 className="font-serif text-3xl font-bold text-text-primary">{headlineWeek}</h1>
          <p className="font-sans text-text-muted mt-1">{subline}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSignOut}
          disabled={signingOut}
          className="text-muted-foreground hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>

      {stage !== "ttc" && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-primary">
            <span>{progressStart}</span>
            <span>{progressEnd}</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-primary/10" />
        </div>
      )}
    </header>
  );
}

// ----------------------------------------------------------------
// Week Card
// ----------------------------------------------------------------
function WeekCard({ timeline }: { timeline: TimelineState }) {
  const { stage, currentWeek, content } = timeline;

  if (!content) return null;

  const icon =
    stage === "ttc" ? <Sprout className="h-5 w-5 text-accent" /> :
    stage === "postpartum" ? <Baby className="h-5 w-5 text-accent" /> :
    <Sunrise className="h-5 w-5 text-accent" />;

  const readMoreLabel =
    stage === "ttc" ? "Read your TTC guide" :
    stage === "postpartum" ? `Read your week ${currentWeek} postpartum guide` :
    `Read your week ${currentWeek} guide`;

  return (
    <Card className="border-0 shadow-md bg-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0" />
      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="font-serif text-xl">{content.headline}</CardTitle>
        </div>
        <CardDescription className="text-base text-text-secondary">
          {content.body}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 space-y-4">
        <div className="bg-bg-muted p-4 rounded-xl">
          <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            {stage === "postpartum" ? "Common this week:" : "Normal this week:"}
          </h4>
          <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
            {content.normalSymptoms.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        {"tip" in content && content.tip && (
          <div className="bg-accent/5 border border-accent/20 p-4 rounded-xl">
            <p className="text-sm text-text-secondary">
              <span className="font-bold text-accent">This week: </span>
              {content.tip}
            </p>
          </div>
        )}

        <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold" asChild>
          <Link href="/guide">
            <BookHeart className="mr-2 h-4 w-4" /> {readMoreLabel}
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
      <Card
        className="border-0 shadow-sm bg-white hover:bg-accent/5 transition-colors cursor-pointer"
        onClick={onBook}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 bg-accent/10 rounded-full">
            <Stethoscope className="h-6 w-6 text-accent" />
          </div>
          <h3 className="font-semibold text-text-primary text-sm">Consult an Expert</h3>
        </CardContent>
      </Card>

      <Card
        className="border-0 shadow-sm bg-white hover:bg-primary/5 transition-colors cursor-pointer"
        onClick={onWarningSigns}
      >
        <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <PhoneCall className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary text-sm">Is this normal?</h3>
        </CardContent>
      </Card>
    </div>
  );
}

// ----------------------------------------------------------------
// Check-in Prompt
// ----------------------------------------------------------------
function CheckInPrompt({ onStart }: { onStart: () => void }) {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
      <CardContent className="p-5 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-text-primary mb-1">Time for your check-in</h3>
          <p className="text-sm text-text-secondary">How are you feeling this week?</p>
        </div>
        <Button size="sm" onClick={onStart} className="bg-primary hover:bg-primary-dark">
          Start
        </Button>
      </CardContent>
    </Card>
  );
}
