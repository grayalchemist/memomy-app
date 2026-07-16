"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { savePregnancyProfile } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SetupPage() {
  const router = useRouter();
  const [stage, setStage] = useState<string>("pregnant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await savePregnancyProfile(formData);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center pb-8 border-b border-border/40">
          <CardTitle className="font-heading text-3xl font-bold text-primary">Let&apos;s Personalize</CardTitle>
          <CardDescription className="text-base mt-2">
            MeMomy guides you through exactly what you need, right when you need it. Let us know where you are in your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-8">
          <form id="setup-form" onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <Label htmlFor="stage-select" className="text-base font-semibold">Where are you in your journey?</Label>
              <Select name="stage" value={stage} onValueChange={setStage}>
                <SelectTrigger id="stage-select" className="h-12 bg-card/50 focus:ring-primary">
                  <SelectValue placeholder="Select your stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ttc">Trying to conceive</SelectItem>
                  <SelectItem value="pregnant">Currently pregnant</SelectItem>
                  <SelectItem value="postpartum">Postpartum (already had my baby)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {stage === "pregnant" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="due_date" className="text-base font-semibold">What is your estimated due date?</Label>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  required
                  className="flex h-12 w-full rounded-md border border-input bg-card/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground mt-1">If you aren&apos;t sure, an estimate is perfectly fine.</p>
              </div>
            )}

            {stage === "postpartum" && (
              <div className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="due_date" className="text-base font-semibold">When was your baby born?</Label>
                <input
                  type="date"
                  name="due_date"
                  id="due_date"
                  required
                  className="flex h-12 w-full rounded-md border border-input bg-card/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="pt-2 pb-8 px-6">
          <Button
            type="submit"
            form="setup-form"
            className="w-full text-base font-semibold h-12 bg-accent hover:bg-accent/90"
            disabled={loading}
          >
            {loading ? "Personalizing..." : "Continue to Dashboard"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
