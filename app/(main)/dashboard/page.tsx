import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Protect the route
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Ensure they have a profile
  const { data: profile } = await supabase
    .from("pregnancy_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return redirect("/setup");
  }

  return <DashboardClient profile={profile} />;
}