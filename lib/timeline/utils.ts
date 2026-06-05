import type { JourneyStage, TimelineState } from "./types";
import { pregnancyWeeks, postpartumWeeks, ttcContent } from "./data";

/**
 * Derives the full dashboard timeline state from the stored profile.
 * All date arithmetic is done in whole days to avoid DST edge cases.
 */
export function getTimelineState(
  stage: JourneyStage,
  dueDate: string | null
): TimelineState {
  const today = startOfDay(new Date());

  if (stage === "ttc") {
    return {
      stage: "ttc",
      currentWeek: 0,
      daysRemaining: null,
      progressPercent: 0,
      trimesterLabel: "Trying to Conceive",
      content: ttcContent,
    };
  }

  if (stage === "pregnant") {
    if (!dueDate) {
      // No due date stored — show a neutral mid-pregnancy state
      return buildPregnantState(20, null);
    }
    const due = startOfDay(new Date(dueDate));
    const daysRemaining = diffDays(due, today);
    // Pregnancy is 280 days (40 weeks). Week = 40 - weeks_remaining
    const totalDays = 280;
    const daysElapsed = totalDays - daysRemaining;
    const currentWeek = Math.min(40, Math.max(1, Math.ceil(daysElapsed / 7)));
    return buildPregnantState(currentWeek, daysRemaining);
  }

  // postpartum — dueDate column stores birth date
  if (!dueDate) {
    return buildPostpartumState(1);
  }
  const birthDate = startOfDay(new Date(dueDate));
  const daysPostpartum = diffDays(today, birthDate);
  const currentWeek = Math.min(52, Math.max(1, Math.ceil(daysPostpartum / 7)));
  return buildPostpartumState(currentWeek);
}

function buildPregnantState(week: number, daysRemaining: number | null): TimelineState {
  return {
    stage: "pregnant",
    currentWeek: week,
    daysRemaining,
    progressPercent: Math.round((week / 40) * 100),
    trimesterLabel: getTrimesterLabel(week),
    content: pregnancyWeeks[week] ?? pregnancyWeeks[20],
  };
}

function buildPostpartumState(week: number): TimelineState {
  return {
    stage: "postpartum",
    currentWeek: week,
    daysRemaining: null,
    progressPercent: Math.round((week / 52) * 100),
    trimesterLabel: getPostpartumLabel(week),
    content: postpartumWeeks[week] ?? postpartumWeeks[1],
  };
}

function getTrimesterLabel(week: number): string {
  if (week <= 13) return "First Trimester";
  if (week <= 26) return "Second Trimester";
  return "Third Trimester";
}

function getPostpartumLabel(week: number): string {
  if (week <= 6) return "Early Postpartum";
  if (week <= 12) return "Fourth Trimester";
  if (week <= 26) return "3–6 Months Postpartum";
  return "6–12 Months Postpartum";
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24));
}
