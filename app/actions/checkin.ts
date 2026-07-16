"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitMoodCheckin(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in");
  }

  const score = parseInt(formData.get("score") as string, 10);
  const q1 = formData.get("q1") as string;
  const q2 = formData.get("q2") as string;

  // Pitch Rule: Score < 5 triggers the escalation
  const isEscalation = score < 5;

  const { error } = await supabase.from("mood_checkins").insert({
    user_id: user.id,
    score,
    response_q1: q1,
    response_q2: q2,
    escalation_triggered: isEscalation,
  });

  if (error) {
    console.error("Failed to save checkin:", error);
    return { success: false, error: error.message };
  }

  // We don't return redirect here because we want the client to handle the smooth transition
  return { success: true, escalated: isEscalation };
}

export async function recordEscalationAction(action: 'booked' | 'crisis_viewed' | 'dismissed') {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // For the pitch MVP, we just take the most recent checkin that triggered an escalation
  // and update its action.
  const { data: checkins } = await supabase
    .from("mood_checkins")
    .select("id")
    .eq("user_id", user.id)
    .eq("escalation_triggered", true)
    .is("escalation_action", null)
    .order("checked_at", { ascending: false })
    .limit(1);

  if (checkins && checkins.length > 0) {
    await supabase
      .from("mood_checkins")
      .update({ escalation_action: action })
      .eq("id", checkins[0].id);
  }
}
