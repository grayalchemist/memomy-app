"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function processMockPayment(formData: FormData) {
  const supabase = await createClient();

  // Simulate network processing delay for Stripe
  await new Promise(resolve => setTimeout(resolve, 1500));

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not logged in" };

  const specialistId = formData.get("specialist_id") as string;
  const specialistType = formData.get("specialist_type") as string;
  const slotDateStr = formData.get("slot_date") as string;
  const amountEur = parseFloat(formData.get("amount_eur") as string);

  // In a real app, this would be a Stripe Webhook.
  // For the MVP, we insert it directly as if it succeeded.
  const { error } = await supabase.from("specialist_bookings").insert({
    user_id: user.id,
    specialist_id: specialistId,
    specialist_type: specialistType || 'doctor',
    consultation_type: 'obgyn', // simplified for pitch
    scheduled_at: slotDateStr || new Date().toISOString(),
    status: 'confirmed',
    payment_status: 'paid',
    path: 'mock',
    amount_eur: amountEur,
    currency: 'EUR'
  });

  if (error) {
    console.error("Booking error:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/dashboard");
  return { success: true };
}