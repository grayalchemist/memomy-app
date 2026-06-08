import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { JourneyStage } from "@/lib/timeline/types";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
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

  return (
    <ProfileClient
      email={user.email ?? ""}
      stage={profile.stage as JourneyStage}
      dueDate={profile.due_date ?? null}
    />
  );
}
