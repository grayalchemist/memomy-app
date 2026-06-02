"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { AlertCircle, PhoneCall, CalendarHeart, Info, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

// Mock data structured for the Pitch MVP
type Severity = "emergency" | "booking" | "monitor";

const warningSigns = [
  {
    category: "Bleeding & Fluid",
    items: [
      {
        id: "ws_heavy_bleeding",
        title: "Heavy vaginal bleeding",
        description: "Bleeding that soaks through a pad in an hour or is accompanied by severe pain.",
        severity: "emergency" as Severity,
        advice: "This requires immediate medical evaluation. Do not wait for a scheduled appointment. Go to your nearest emergency room or call emergency services."
      },
      {
        id: "ws_spotting",
        title: "Light spotting",
        description: "A few drops of blood or pink/brown discharge.",
        severity: "monitor" as Severity,
        advice: "Light spotting can be normal, especially after sex or an exam, but it's always best to have it noted on your record. Monitor it to see if it gets heavier."
      }
    ]
  },
  {
    category: "Pain & Cramping",
    items: [
      {
        id: "ws_severe_cramps",
        title: "Severe abdominal pain",
        description: "Sharp, constant pain that doesn't go away with rest or changing positions.",
        severity: "emergency" as Severity,
        advice: "Severe, unrelenting pain is a medical emergency. Seek immediate care."
      },
      {
        id: "ws_mild_cramps",
        title: "Mild, period-like cramping",
        description: "Dull aches in the lower abdomen that usually resolve with rest.",
        severity: "monitor" as Severity,
        advice: "This is often your uterus growing (round ligament pain). Stay hydrated and rest. If it becomes rhythmic and you are before 37 weeks, consult an expert."
      }
    ]
  },
  {
    category: "Baby's Movement",
    items: [
      {
        id: "ws_decreased_movement",
        title: "Decreased fetal movement",
        description: "Noticeably less movement or kicks than what is normal for your baby.",
        severity: "booking" as Severity,
        advice: "Trust your instincts. If your baby is moving less than usual, it's safer to get a quick check. Drink something cold, lie on your left side, and if there's no change within 2 hours, reach out to an expert."
      }
    ]
  }
];

export default function WarningSignsPage() {
  const router = useRouter();
  const [selectedSign, setSelectedSign] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  const handleOpenSheet = (sign: any) => {
    setSelectedSign(sign);
    setIsSheetOpen(true);
  };

  const handleAction = async (action: Severity) => {
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && selectedSign) {
        await supabase.from("warning_sign_interactions").insert({
          user_id: user.id,
          sign_key: selectedSign.id,
          escalation_chosen: action,
        });
      }
    } catch (e) {
      console.error(e);
    } // continue anyway for pitch demo

    if (action === "emergency") {
      alert("Pitch Demo: Dialing European/Canadian Emergency Services (112 or local equivalent)");
      setIsSheetOpen(false);
    } else if (action === "booking") {
      router.push("/book?type=obgyn&reason=" + selectedSign.id);
    } else {
      setIsSheetOpen(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-base p-4 pt-8 pb-24">
      <Button
        variant="ghost"
        className="w-12 h-12 p-0 rounded-full mb-2 bg-white shadow-sm"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-5 w-5 text-text-primary" />
      </Button>

      <Card className="border-0 shadow-sm bg-white overflow-hidden mb-6">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-primary" />
            <CardTitle className="font-serif text-2xl font-bold text-primary">Is this normal?</CardTitle>
          </div>
          <CardDescription className="text-base text-text-secondary">
            Select a symptom below to see if it's an expected part of pregnancy or if you need to reach out for a check-up.
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {warningSigns.map((group, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="bg-white border rounded-lg px-4 shadow-sm border-border/50">
            <AccordionTrigger className="font-serif text-lg font-bold text-text-primary hover:no-underline">
              {group.category}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenSheet(item)}
                  className="bg-bg-muted p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-primary/5 transition-colors border border-transparent shadow-sm"
                >
                  <div className="font-semibold text-text-primary text-sm pr-4">
                    {item.title}
                  </div>
                  <div className="flex-shrink-0">
                    {item.severity === "emergency" && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-red-100 text-red-700 rounded-full flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" /> Alert
                      </span>
                    )}
                    {item.severity !== "emergency" && (
                      <span className="text-xl text-primary opacity-50">→</span>
                    )}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl border-t-0 p-0 sm:max-w-md sm:mx-auto max-h-[85vh] overflow-y-auto w-full">
          {selectedSign && (
            <div className={`p-6 pt-10 ${selectedSign.severity === 'emergency' ? 'bg-red-50' : 'bg-white'}`}>
              <SheetHeader className="text-left mb-6">
                <SheetTitle className={`font-serif text-2xl font-bold ${selectedSign.severity === 'emergency' ? 'text-red-700' : 'text-text-primary'}`}>
                  {selectedSign.title}
                </SheetTitle>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl mt-4 border border-black/5 shadow-sm">
                  <p className="text-sm font-medium text-text-secondary italic mb-2">"{selectedSign.description}"</p>
                  <p className="text-base text-text-primary leading-relaxed">
                    {selectedSign.advice}
                  </p>
                </div>
              </SheetHeader>

              <div className="space-y-3 mt-8">
                {selectedSign.severity === "emergency" && (
                  <Button
                    className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-red-200"
                    onClick={() => handleAction("emergency")}
                    disabled={isLoading}
                  >
                    <PhoneCall className="mr-2 h-5 w-5" /> Call Emergency Services
                  </Button>
                )}

                {(selectedSign.severity === "booking" || selectedSign.severity === "monitor") && (
                  <Button
                    className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-base flex items-center justify-center shadow-md shadow-accent/20"
                    onClick={() => handleAction("booking")}
                    disabled={isLoading}
                  >
                    <CalendarHeart className="mr-2 h-5 w-5" /> Consult a Specialist
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full font-semibold text-text-muted hover:text-text-primary"
                  onClick={() => handleAction("monitor")}
                  disabled={isLoading}
                >
                  I'm okay, just monitoring
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}