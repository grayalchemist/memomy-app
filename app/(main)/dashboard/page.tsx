import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  let user = null;

  try {
    const {
      data: { user: authenticatedUser },
    } = await supabase.auth.getUser();
    user = authenticatedUser;
  } catch {
    // A local preview should remain reachable when Supabase is temporarily unavailable.
    redirect("/login");
  }

  if (!user) {
    redirect("/login");
  }

  let profile = null;

  try {
    const { data } = await supabase
      .from("pregnancy_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();
    profile = data;
  } catch {
    redirect("/login");
  }

  if (!profile) {
    redirect("/setup");
  }

  return <DashboardClient profile={profile} />;
}
