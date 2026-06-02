"use client";

import { useRouter } from "next/navigation";
import { recordEscalationAction } from "@/app/actions/checkin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneCall, CalendarHeart, X } from "lucide-react";
import { useState } from "react";

export default function EscalationPage() {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (action: 'booked' | 'crisis_viewed' | 'dismissed') => {
    setLoadingAction(action);
    await recordEscalationAction(action);

    if (action === "booked") {
      router.push("/book?type=psychologist");
    } else if (action === "dismissed") {
      router.push("/dashboard");
    } else {
      // For crisis lines, we could show a sheet or modal.
      // For the Pitch MVP, we'll alert the mock functionality.
      alert(`Pitch Demo: Opening local crisis resources (e.g., TelefonSeelsorge DE / Mind SE / Canada Crisis)`);
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-4 justify-center pb-24">
      <Card className="border-0 shadow-2xl bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-2 bg-warning"></div>
        <CardHeader className="text-left pb-4 pt-8 border-b border-border/40">
          <CardTitle className="font-serif text-2xl font-bold text-text-primary mb-3 leading-snug">
            It sounds like things feel heavy right now.
          </CardTitle>
          <CardDescription className="text-base text-text-secondary leading-relaxed">
            Pregnancy is beautiful and incredibly hard. Many women feel this way, but you don't have to carry it alone. Here are some options to get support right now.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">

          <Button
            variant="outline"
            className="w-full h-auto py-4 flex justify-start items-center gap-4 bg-primary/5 hover:bg-primary/10 border-primary/20 text-left"
            onClick={() => handleAction("booked")}
            disabled={loadingAction !== null}
          >
            <div className="bg-white p-3 rounded-full shadow-sm border border-primary/10">
              <CalendarHeart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="font-bold text-primary text-base">Talk to a Psychologist</div>
              <div className="text-xs text-text-secondary font-normal line-clamp-1 mt-1">
                Book a video session with a Farsi-speaking specialist.
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="w-full h-auto py-4 flex justify-start items-center gap-4 bg-white hover:bg-red-50 border-border text-left"
            onClick={() => handleAction("crisis_viewed")}
            disabled={loadingAction !== null}
          >
            <div className="bg-red-50 p-3 rounded-full border border-red-100">
              <PhoneCall className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <div className="font-bold text-text-primary text-base">View Crisis Resources</div>
              <div className="text-xs text-text-secondary font-normal line-clamp-1 mt-1">
                Free, confidential 24/7 support in your country.
              </div>
            </div>
          </Button>

          <div className="pt-6 text-center">
            <button
              onClick={() => handleAction("dismissed")}
              disabled={loadingAction !== null}
              className="text-sm font-semibold text-text-muted hover:text-text-primary flex items-center justify-center gap-2 mx-auto"
            >
              <X className="h-4 w-4" /> Not right now, thank you
            </button>
            <p className="text-xs text-text-muted/60 mt-2">
              We'll just check back with you in a few days.
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}