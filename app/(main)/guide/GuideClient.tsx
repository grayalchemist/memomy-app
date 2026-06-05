"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sprout, Baby, Sunrise, CheckCircle2, Lightbulb, ChevronRight } from "lucide-react";
import type { TimelineState, WeekContent, PostpartumWeekContent } from "@/lib/timeline/types";
import { pregnancyWeeks, postpartumWeeks, ttcContent } from "@/lib/timeline/data";

export default function GuideClient({ timeline }: { timeline: TimelineState }) {
  const router = useRouter();
  const { stage, currentWeek, trimesterLabel, content } = timeline;

  if (!content) return null;

  const nextWeekContent = getNextWeekContent(stage, currentWeek);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base pb-28">
      {/* Sticky header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm sticky top-0 z-10 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="-ml-2 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Button>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-widest font-bold text-text-muted truncate">
            {trimesterLabel}
          </p>
          <h1 className="font-serif text-xl font-bold text-text-primary leading-tight truncate">
            {getPageTitle(stage, currentWeek)}
          </h1>
        </div>
        <StageIcon stage={stage} />
      </div>

      <div className="px-4 pt-6 space-y-5">
        {/* Hero card */}
        <HeroCard content={content} stage={stage} currentWeek={currentWeek} />

        {/* Symptoms section */}
        <SymptomsCard content={content} stage={stage} />

        {/* Tip section */}
        {"tip" in content && content.tip && (
          <TipCard tip={content.tip} />
        )}

        {/* Next week teaser */}
        {nextWeekContent && (
          <NextWeekCard
            stage={stage}
            nextWeek={currentWeek + 1}
            nextContent={nextWeekContent}
          />
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Hero Card — headline, body, baby size (pregnancy only)
// ----------------------------------------------------------------
function HeroCard({
  content,
  stage,
  currentWeek,
}: {
  content: WeekContent | PostpartumWeekContent;
  stage: string;
  currentWeek: number;
}) {
  const hasBabySize = stage === "pregnant" && "babySize" in content && content.babySize;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Colour band at top */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary-light to-accent" />

      <div className="p-5 space-y-4">
        <h2 className="font-serif text-2xl font-bold text-text-primary leading-snug">
          {content.headline}
        </h2>

        {hasBabySize && (
          <div className="flex items-center gap-3 bg-primary/5 rounded-xl px-4 py-3">
            <span className="text-3xl">🌱</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-primary mb-0.5">
                Baby's size this week
              </p>
              <p className="font-semibold text-text-primary text-sm">
                About the size of {(content as WeekContent).babySize}
              </p>
            </div>
          </div>
        )}

        <p className="text-base text-text-secondary leading-relaxed">
          {content.body}
        </p>

        {stage === "pregnant" && currentWeek >= 1 && (
          <div className="flex items-center gap-2 pt-1">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 text-xs font-semibold"
            >
              Week {currentWeek} of 40
            </Badge>
            <Badge
              variant="secondary"
              className="bg-accent/10 text-accent border-0 text-xs font-semibold"
            >
              {Math.round((currentWeek / 40) * 100)}% complete
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Symptoms Card
// ----------------------------------------------------------------
function SymptomsCard({
  content,
  stage,
}: {
  content: WeekContent | PostpartumWeekContent;
  stage: string;
}) {
  const label =
    stage === "postpartum" ? "Common this week" :
    stage === "ttc" ? "Focus areas" :
    "Normal this week";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
      <h3 className="font-serif text-lg font-bold text-text-primary">{label}</h3>
      <div className="space-y-3">
        {content.normalSymptoms.map((symptom, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-text-secondary leading-snug">{symptom}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Tip Card
// ----------------------------------------------------------------
function TipCard({ tip }: { tip: string }) {
  return (
    <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-2xl p-5 border border-accent/20 space-y-3">
      <div className="flex items-center gap-2">
        <div className="bg-accent/20 p-2 rounded-full">
          <Lightbulb className="h-4 w-4 text-accent" />
        </div>
        <h3 className="font-bold text-text-primary text-sm uppercase tracking-wider">
          This week's tip
        </h3>
      </div>
      <p className="text-base text-text-secondary leading-relaxed">{tip}</p>
    </div>
  );
}

// ----------------------------------------------------------------
// Next Week Teaser
// ----------------------------------------------------------------
function NextWeekCard({
  stage,
  nextWeek,
  nextContent,
}: {
  stage: string;
  nextWeek: number;
  nextContent: WeekContent | PostpartumWeekContent;
}) {
  const label =
    stage === "postpartum" ? `Week ${nextWeek} Postpartum` : `Week ${nextWeek}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border/40">
        <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted">Coming up</p>
        <h3 className="font-serif text-base font-bold text-text-primary mt-0.5">{label}</h3>
      </div>
      <div className="px-5 py-4 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary leading-snug flex-1">{nextContent.headline}</p>
        <ChevronRight className="h-5 w-5 text-text-muted flex-shrink-0" />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
function StageIcon({ stage }: { stage: string }) {
  if (stage === "ttc") return <Sprout className="h-6 w-6 text-accent flex-shrink-0" />;
  if (stage === "postpartum") return <Baby className="h-6 w-6 text-primary flex-shrink-0" />;
  return <Sunrise className="h-6 w-6 text-accent flex-shrink-0" />;
}

function getPageTitle(stage: string, week: number): string {
  if (stage === "ttc") return "Your TTC Guide";
  if (stage === "postpartum") return `Week ${week} Postpartum`;
  return `Week ${week} Guide`;
}

function getNextWeekContent(
  stage: string,
  currentWeek: number
): WeekContent | PostpartumWeekContent | null {
  if (stage === "pregnant") {
    const next = currentWeek + 1;
    return next <= 40 ? pregnancyWeeks[next] ?? null : null;
  }
  if (stage === "postpartum") {
    const next = currentWeek + 1;
    return next <= 52 ? postpartumWeeks[next] ?? null : null;
  }
  return null;
}
