"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
