"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, BookHeart, Calendar, Stethoscope, Sunrise, PhoneCall, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

// Example static content for the Pitch Demo
const getWeekData = (week: number) => ({
  title: `Week ${week}: Your baby is the size of a bell pepper!`,
  desc: "They are starting to practice breathing motions and their senses are developing rapidly.",
  symptoms: ["Increased energy", "Mild heartburn", "Round ligament pain"],
  actionText: "Read your week 18 guide",
});

export default function DashboardClient({ profile }: { profile: any }) {
  const router = useRouter();
  const supabase = createClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Mock calculation for the Pitch Demo (pretending they are exactly 18 weeks pregnant)
  const currentWeek = 18;
  const progressPercent = (currentWeek / 40) * 100;
  const weekData = getWeekData(currentWeek);

  // Avoid hydration mismatch on the progress bar animation
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-bg-base pb-24">
      {/* Header Area */}
      <header className="bg-white px-6 pt-12 pb-6 shadow-sm rounded-b-3xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <Badge variant="secondary" className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-0 pointer-events-none">
              {profile.stage === "pregnant" ? "Second Trimester" : profile.stage}
            </Badge>
            <h1 className="font-serif text-3xl font-bold text-text-primary">Week {currentWeek}</h1>
            <p className="font-sans text-text-muted mt-1">154 days until your due date</p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-muted-foreground hover:bg-red-50 hover:text-red-600">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-primary">
            <span>Week 1</span>
            <span>Week 40</span>
          </div>
          <Progress value={progressPercent} className="h-3 bg-primary/10" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 pt-6 space-y-6">

        {/* Core Week Card */}
        <Card className="border-0 shadow-md bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-0"></div>
          <CardHeader className="relative z-10 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Sunrise className="h-5 w-5 text-accent" />
              <CardTitle className="font-serif text-xl">{weekData.title}</CardTitle>
            </div>
            <CardDescription className="text-base text-text-secondary">
              {weekData.desc}
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="bg-bg-muted p-4 rounded-xl">
              <h4 className="text-sm font-bold text-text-primary mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Normal this week:
              </h4>
              <ul className="list-disc list-inside text-sm text-text-secondary space-y-1">
                {weekData.symptoms.map((s, i) => (
                   <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold">
              <BookHeart className="mr-2 h-4 w-4" /> {weekData.actionText}
            </Button>
          </CardContent>
        </Card>

        {/* Action Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-0 shadow-sm bg-white hover:bg-accent/5 transition-colors cursor-pointer" onClick={() => router.push("/book")}>
            <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-accent/10 rounded-full">
                <Stethoscope className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">Consult an Expert</h3>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white hover:bg-primary/5 transition-colors cursor-pointer" onClick={() => router.push("/warning-signs")}>
             <CardContent className="p-4 flex flex-col items-center justify-center text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <PhoneCall className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-text-primary text-sm">Is this normal?</h3>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Check-in Prompt */}
        <Card className="border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
           <CardContent className="p-5 flex justify-between items-center">
             <div>
               <h3 className="font-bold text-text-primary mb-1">Time for your check-in</h3>
               <p className="text-sm text-text-secondary">How are you feeling this week?</p>
             </div>
             <Button size="sm" onClick={() => router.push("/check-in")} className="bg-primary hover:bg-primary-dark">
               Start
             </Button>
           </CardContent>
        </Card>

      </main>
    </div>
  );
}