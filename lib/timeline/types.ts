export type JourneyStage = "ttc" | "pregnant" | "postpartum";

export interface WeekContent {
  babySize: string;         // e.g. "a bell pepper"
  headline: string;         // short heading shown on dashboard card
  body: string;             // 1-2 sentence description for the card
  normalSymptoms: string[]; // 3 bullet points of common symptoms
  tip: string;              // one actionable tip for the week
}

export interface PostpartumWeekContent {
  headline: string;
  body: string;
  normalSymptoms: string[];
  tip: string;
}

export interface TimelineState {
  stage: JourneyStage;
  currentWeek: number;       // 1-40 (pregnant) | 1-52 (postpartum) | 0 (ttc)
  daysRemaining: number | null;  // null for TTC
  progressPercent: number;   // 0-100
  trimesterLabel: string;    // "First Trimester" | "Second Trimester" | etc.
  content: WeekContent | PostpartumWeekContent | null;
}
