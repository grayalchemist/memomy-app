"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitMoodCheckin } from "@/app/actions/checkin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { HeartPulse } from "lucide-react";

export default function CheckInPage() {
  const router = useRouter();
  const [score, setScore] = useState([5]);
  const [q1, setQ1] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const getEmoji = (val: number) => {
    if (val <= 2) return "🌧️";
    if (val <= 4) return "☁️";
    if (val <= 6) return "🌤️";
    if (val <= 8) return "☀️";
    return "✨";
  };

  const getText = (val: number) => {
    if (val <= 2) return "Struggling";
    if (val <= 4) return "A bit down";
    if (val <= 6) return "Okay";
    if (val <= 8) return "Good";
    return "Great";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("score", score[0].toString());
    formData.append("q1", q1);

    try {
      const result = await submitMoodCheckin(formData);

      if (result.success) {
        if (result.escalated) {
          router.push("/check-in/escalation");
        } else {
          setSuccess(true);
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      } else {
         setError(result.error || "An unknown database error occurred.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to call server action.");
    }
    setLoading(false);
  };


  if (success) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="bg-primary/10 p-6 rounded-full inline-block mb-4">
          <HeartPulse className="h-12 w-12 text-primary" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-primary">Thank you.</h2>
        <p className="text-text-secondary">We've saved your check-in for this week.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-4 pt-12 pb-24">
      <Card className="border-0 shadow-lg bg-white overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
        <CardHeader className="text-center pb-8 border-b border-border/40">
          <CardTitle className="font-serif text-2xl font-bold text-primary mb-2">Weekly Check-in</CardTitle>
          <CardDescription className="text-base text-text-secondary">
            Take a moment for yourself. How have you been feeling overall this past week?
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form id="checkin-form" onSubmit={handleSubmit} className="space-y-12">

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium border border-destructive/20 text-center">
                {error}
              </div>
            )}

            <div className="space-y-8">
              <div className="flex justify-center items-center flex-col space-y-2">
                <span className="text-6xl">{getEmoji(score[0])}</span>
                <span className="font-bold text-lg text-primary">{getText(score[0])}</span>
              </div>

              <Slider
                defaultValue={[5]}
                max={10}
                min={1}
                step={1}
                value={score}
                onValueChange={setScore}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-text-muted font-semibold px-1">
                <span>Struggling</span>
                <span>Great</span>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="q1" className="block text-sm font-semibold text-text-primary">
                Is there anything specific on your mind? <span className="text-text-muted font-normal">(Optional)</span>
              </label>
              <textarea
                id="q1"
                rows={3}
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="Sleep, anxiety, physical changes..."
                className="flex w-full rounded-md border border-input bg-white/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              ></textarea>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 h-12 text-base font-semibold text-white">
              {loading ? "Saving..." : "Save Check-in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}