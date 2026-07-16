"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitMoodCheckin } from "@/app/actions/checkin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to call server action.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center space-y-4 p-6 text-center">
        <div className="animate-fade-up flex size-24 items-center justify-center rounded-full bg-gradient-brand shadow-glow">
          <HeartPulse className="size-12 text-primary-foreground" />
        </div>
        <h2 className="animate-fade-up font-heading text-3xl font-extrabold tracking-tight text-primary">
          Thank you.
        </h2>
        <p className="animate-fade-up text-foreground-secondary">
          We&apos;ve saved your check-in for this week.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background p-4 pb-28 pt-12">
      <Card className="animate-fade-up overflow-hidden border-0 shadow-lg">
        <div className="h-1.5 bg-gradient-spectrum" />
        <CardHeader className="border-b border-border/60 pb-8 text-center">
          <CardTitle className="font-heading text-2xl font-bold tracking-tight text-primary">
            Weekly Check-in
          </CardTitle>
          <CardDescription className="text-base text-foreground-secondary">
            Take a moment for yourself. How have you been feeling overall this
            past week?
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-8">
          <form id="checkin-form" onSubmit={handleSubmit} className="space-y-12">
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-center text-sm font-medium text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-6xl">{getEmoji(score[0])}</span>
                <span className="text-lg font-bold text-primary">
                  {getText(score[0])}
                </span>
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
              <div className="flex justify-between px-1 text-xs font-semibold text-muted-foreground">
                <span>Struggling</span>
                <span>Great</span>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="q1"
                className="block text-sm font-semibold text-foreground"
              >
                Is there anything specific on your mind?{" "}
                <span className="font-normal text-muted-foreground">
                  (Optional)
                </span>
              </label>
              <textarea
                id="q1"
                rows={3}
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                placeholder="Sleep, anxiety, physical changes..."
                className="flex w-full rounded-xl border border-input bg-muted/40 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ></textarea>
            </div>

            <Button
              type="submit"
              variant="accent"
              disabled={loading}
              className="h-12 w-full text-base font-semibold"
            >
              {loading ? "Saving..." : "Save Check-in"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
