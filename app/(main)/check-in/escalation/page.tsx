"use client";

import { useRouter } from "next/navigation";
import { recordEscalationAction } from "@/app/actions/checkin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
      <div className="flex min-h-screen flex-col justify-center bg-background p-4 pb-28">
        <Card className="animate-fade-up relative overflow-hidden border-0 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-warning to-destructive" />
          <CardHeader className="border-b border-border/60 pb-4 pt-8 text-left">
            <CardTitle className="font-heading text-2xl font-bold leading-snug text-foreground">
              It sounds like things feel heavy right now.
            </CardTitle>
            <CardDescription className="text-base leading-relaxed text-foreground-secondary">
              Pregnancy is beautiful and incredibly hard. Many women feel this
              way, but you don&apos;t have to carry it alone. Here are some
              options to get support right now.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6">
            <Button
              variant="outline"
              className="h-auto w-full justify-start gap-4 border-primary/20 bg-primary/5 py-4 text-left hover:bg-primary/10"
              onClick={() => handleAction("booked")}
              disabled={loadingAction !== null}
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/10 bg-card shadow-sm">
                <CalendarHeart className="size-6 text-primary" />
              </div>
              <div>
                <div className="text-base font-bold text-primary">
                  Talk to a Psychologist
                </div>
                <div className="mt-1 text-xs font-normal text-foreground-secondary">
                  Book a video session with a Farsi-speaking specialist.
                </div>
              </div>
            </Button>

            <Button
              variant="outline"
              className="h-auto w-full justify-start gap-4 border-destructive/20 bg-destructive/5 py-4 text-left hover:bg-destructive/10"
              onClick={() => handleAction("crisis_viewed")}
              disabled={loadingAction !== null}
            >
              <div className="flex size-12 items-center justify-center rounded-full border border-destructive/10 bg-destructive/10">
                <PhoneCall className="size-6 text-destructive" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">
                  View Crisis Resources
                </div>
                <div className="mt-1 text-xs font-normal text-foreground-secondary">
                  Free, confidential 24/7 support.
                </div>
              </div>
            </Button>

            <div className="pt-6 text-center">
              <button
                onClick={() => handleAction("dismissed")}
                disabled={loadingAction !== null}
                className="mx-auto flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" /> Not right now, thank you
              </button>
              <p className="mt-2 text-xs text-muted-foreground/70">
                We&apos;ll just check back with you in a few days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet open={crisisOpen} onOpenChange={setCrisisOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[85vh] overflow-y-auto rounded-t-4xl p-0"
        >
          <div className="space-y-6 p-6 pt-10">
            <SheetHeader className="text-left">
              <SheetTitle className="font-heading text-2xl font-bold text-foreground">
                Crisis Support
              </SheetTitle>
              <p className="mt-1 text-sm text-foreground-secondary">
                All lines below are free, confidential, and available to you
                right now.
              </p>
            </SheetHeader>

            <div className="space-y-4">
              {crisisLines.map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target={line.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    line.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="no-underline flex items-start gap-4 rounded-2xl bg-muted p-4 transition-colors hover:bg-destructive/5"
                >
                  <div className="mt-0.5 flex size-9 flex-shrink-0 items-center justify-center rounded-full border border-destructive/10 bg-destructive/10">
                    {line.href.startsWith("http") ? (
                      <ExternalLink className="size-5 text-destructive" />
                    ) : (
                      <PhoneCall className="size-5 text-destructive" />
                    )}
                  </div>
                  <div>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      {line.country}
                    </p>
                    <p className="text-base font-bold text-foreground">
                      {line.name}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-accent">
                      {line.number}
                    </p>
                    <p className="mt-1 text-xs text-foreground-secondary">
                      {line.note}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <p className="pb-4 text-center text-xs font-semibold text-destructive">
              If you are in immediate danger, call 911.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
