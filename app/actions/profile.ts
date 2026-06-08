"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteAccount() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Delete all user data in dependency order (RLS cascades on auth.users delete,
  // but we also sign out to clear the session before the row is gone)
  await supabase.from("warning_sign_interactions").delete().eq("user_id", user.id);
  await supabase.from("mood_checkins").delete().eq("user_id", user.id);
  await supabase.from("pregnancy_profiles").delete().eq("user_id", user.id);

  // Sign out first so the client session is cleared
  await supabase.auth.signOut();

  // Delete the auth user via admin API — requires service role key.
  // In Supabase, call the Edge Function or use the admin client.
  // For now we use the user's own client which can delete itself via RPC.
  const { error } = await supabase.rpc("delete_user");

  if (error) {
    console.error("Failed to delete auth user:", error);
    // Data is already wiped — log the error but still redirect
  }

  redirect("/login");
}

export async function savePregnancyProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to save your profile");
  }

  const stage = formData.get("stage") as string;
  const dueDateStr = formData.get("due_date") as string;

  let dueDate = null;
  if (dueDateStr && dueDateStr.trim() !== "") {
    // Basic date parsing handling from string YYYY-MM-DD
    dueDate = new Date(dueDateStr).toISOString();
  }

  const { error } = await supabase
    .from("pregnancy_profiles")
    .upsert(
      {
        user_id: user.id,
        stage: stage,
        due_date: dueDate,
      },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("Failed to save profile:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}
