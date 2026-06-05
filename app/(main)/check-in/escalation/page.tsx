"use client";

import { useRouter } from "next/navigation";
import { recordEscalationAction } from "@/app/actions/checkin";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PhoneCall, CalendarHeart, X, ExternalLink } from "lucide-react";
import { useState } from "react";

const crisisLines = [
  {
    country: "Canada (national)",
    name: "Talk Suicide Canada",
    number: "1-833-456-4566",
    note: "24/7, free, confidential. Text 45645 (4pm–midnight ET).",
    href: "tel:18334564566",
  },
  {
    country: "Canada — postpartum specific",
    name: "Postpartum Support International Helpline",
    number: "1-800-944-4773",
    note: "Specialists in perinatal mental health. Press 1 for English.",
    href: "tel:18009444773",
  },
  {
    country: "Canada — text / online",
    name: "Crisis Services Canada",
    number: "crisistextline.org",
    note: "Text HOME to 686868 (Crisis Text Line, English/French).",
    href: "https://www.crisistextline.ca",
  },
];

export default function EscalationPage() {
  const router = useRouter();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [crisisOpen, setCrisisOpen] = useState(false);

  const handleAction = async (action: "booked" | "crisis_viewed" | "dismissed") => {
    setLoadingAction(action);
    await recordEscalationAction(action);

    if (action === "booked") {
      router.push("/book?type=psychologist");
    } else if (action === "crisis_viewed") {
      setCrisisOpen(true);
      setLoadingAction(null);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-bg-base p-4 justify-center pb-24">
        <Card className="border-0 shadow-2xl bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-2 bg-amber-400" />
          <CardHeader className="text-left pb-4 pt-8 border-b border-border/40">
            <CardTitle className="font-serif text-2xl font-bold text-text-primary mb-3 leading-snug">
              It sounds like things feel heavy right now.
            </CardTitle>
            <CardDescription className="text-base text-text-secondary leading-relaxed">
              Pregnancy is beautiful and incredibly hard. Many women feel this way, but you don't have
              to carry it alone. Here are some options to get support right now.
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
                <div className="text-xs text-text-secondary font-normal mt-1">
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
                <div className="text-xs text-text-secondary font-normal mt-1">
                  Free, confidential 24/7 support in Canada.
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

      <Sheet open={crisisOpen} onOpenChange={setCrisisOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl p-0 max-h-[85vh] overflow-y-auto">
          <div className="p-6 pt-10 space-y-6">
            <SheetHeader className="text-left">
              <SheetTitle className="font-serif text-2xl font-bold text-text-primary">
                Crisis Support — Canada
              </SheetTitle>
              <p className="text-sm text-text-secondary mt-1">
                All lines below are free, confidential, and available to you right now.
              </p>
            </SheetHeader>

            <div className="space-y-4">
              {crisisLines.map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel={line.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-start gap-4 bg-bg-muted rounded-xl p-4 hover:bg-primary/5 transition-colors no-underline"
                >
                  <div className="bg-red-50 p-2 rounded-full border border-red-100 mt-0.5 flex-shrink-0">
                    {line.href.startsWith("http") ? (
                      <ExternalLink className="h-5 w-5 text-red-500" />
                    ) : (
                      <PhoneCall className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted mb-0.5">
                      {line.country}
                    </p>
                    <p className="font-bold text-text-primary text-base">{line.name}</p>
                    <p className="text-accent font-semibold text-sm mt-0.5">{line.number}</p>
                    <p className="text-xs text-text-secondary mt-1">{line.note}</p>
                  </div>
                </a>
              ))}
            </div>

            <p className="text-xs text-text-muted text-center pb-4">
              If you are in immediate danger, call 911.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
