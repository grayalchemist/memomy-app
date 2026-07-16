import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";

export default async function CalendarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  return (
    <div className="flex flex-col min-h-screen bg-background items-center justify-center p-8 pb-28 text-center">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <CalendarDays className="h-12 w-12 text-primary" />
      </div>
      <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
        Your Journey Calendar
      </h1>
      <p className="text-foreground-secondary text-base max-w-xs leading-relaxed">
        Your mood check-ins, kick counts, and contraction sessions will all appear here.
        Coming soon.
      </p>
    </div>
  );
}
