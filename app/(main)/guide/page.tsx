import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTimelineState } from "@/lib/timeline/utils";
import type { JourneyStage } from "@/lib/timeline/types";
import GuideClient from "./GuideClient";

export default async function GuidePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data: profile } = await supabase
    .from("pregnancy_profiles")
    .select("stage, due_date")
    .eq("user_id", user.id)
    .single();

  if (!profile) return redirect("/setup");

  const timeline = getTimelineState(
    profile.stage as JourneyStage,
    profile.due_date
  );

  return <GuideClient timeline={timeline} />;
}
