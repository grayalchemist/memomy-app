"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlertCircle, PhoneCall, CalendarHeart, ArrowLeft, Search, X } from "lucide-react";
import type { JourneyStage } from "@/lib/timeline/types";
import type { WarnCategory, WarnSign, Severity } from "@/lib/warning-signs/data";

const STAGE_LABELS: Record<JourneyStage, string> = {
  ttc: "Trying to Conceive",
  pregnant: "Pregnancy",
  postpartum: "Postpartum",
};

interface Props {
  stage: JourneyStage;
  categories: WarnCategory[];
}

export default function WarningSignsClient({ stage, categories }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [query, setQuery] = useState("");
  const [selectedSign, setSelectedSign] = useState<WarnSign | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Keyword filter across all categories
  const filtered = useMemo(() => {
    if (!query.trim()) return categories;
    const q = query.toLowerCase();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [query, categories]);

  const openSheet = (sign: WarnSign) => {
    setSelectedSign(sign);
    setSheetOpen(true);
  };

  const handleAction = async (action: Severity | "emergency_call") => {
    if (!selectedSign) return;
    setLoading(true);

    // Log the interaction
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("warning_sign_interactions").insert({
          user_id: user.id,
          sign_key: selectedSign.id,
          escalation_chosen: action === "emergency_call" ? "emergency" : action,
        });
      }
    } catch {
      // non-blocking
    }

    if (action === "emergency_call") {
      // Real tel: link — handled by the anchor tag, not here
    } else if (action === "booking") {
      router.push("/book?type=obgyn&reason=" + selectedSign.id);
    } else {
      setSheetOpen(false);
    }

    setLoading(false);
  };

  const totalCount = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <div className="flex flex-col min-h-screen bg-bg-base pb-28">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-5 shadow-sm rounded-b-3xl">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full -ml-1 flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5 text-text-primary" />
          </Button>
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-text-muted">
              {STAGE_LABELS[stage]}
            </p>
            <h1 className="font-serif text-2xl font-bold text-primary leading-tight">
              Is this normal?
            </h1>
          </div>
        </div>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {totalCount} symptoms across {categories.length} categories — tap any to learn what it means and what to do.
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symptoms…"
            className="w-full h-11 pl-9 pr-9 rounded-xl border border-input bg-bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Symptom List */}
      <div className="px-4 pt-5 space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-muted">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No symptoms found for "{query}"</p>
            <p className="text-sm mt-1">Try a different word</p>
          </div>
        )}

        <Accordion type="multiple" className="space-y-3">
          {filtered.map((group, idx) => (
            <AccordionItem
              key={idx}
              value={`cat-${idx}`}
              className="bg-white border border-border/50 rounded-xl px-4 shadow-sm"
            >
              <AccordionTrigger className="font-serif text-base font-bold text-text-primary hover:no-underline py-4">
                <span className="flex items-center gap-2">
                  {group.category}
                  <span className="text-[10px] font-bold bg-primary/10 text-primary rounded-full px-2 py-0.5 normal-case tracking-normal">
                    {group.items.length}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-4 space-y-2">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openSheet(item)}
                    className="w-full text-left bg-bg-muted rounded-xl px-4 py-3 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-semibold text-text-primary text-sm pr-3 leading-snug">
                      {item.title}
                    </span>
                    <span className="flex-shrink-0">
                      {item.severity === "emergency" ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Alert
                        </span>
                      ) : item.severity === "booking" ? (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-accent/10 text-accent rounded-full">
                          See provider
                        </span>
                      ) : (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-primary/10 text-primary rounded-full">
                          Monitor
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-3xl p-0 max-h-[88vh] overflow-y-auto"
        >
          {selectedSign && (
            <div
              className={`p-6 pt-8 space-y-5 ${
                selectedSign.severity === "emergency" ? "bg-red-50" : "bg-white"
              }`}
            >
              {/* Severity badge */}
              <div>
                {selectedSign.severity === "emergency" && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-red-100 text-red-700 rounded-full mb-3">
                    <AlertCircle className="w-3 h-3" /> Emergency
                  </span>
                )}
                {selectedSign.severity === "booking" && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-accent/10 text-accent rounded-full mb-3">
                    See a provider
                  </span>
                )}
                {selectedSign.severity === "monitor" && (
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-3 py-1 bg-primary/10 text-primary rounded-full mb-3">
                    Monitor
                  </span>
                )}
              </div>

              <SheetHeader className="text-left p-0">
                <SheetTitle
                  className={`font-serif text-2xl font-bold leading-snug ${
                    selectedSign.severity === "emergency"
                      ? "text-red-700"
                      : "text-text-primary"
                  }`}
                >
                  {selectedSign.title}
                </SheetTitle>
              </SheetHeader>

              {/* Description + Advice */}
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-black/5 space-y-3">
                <p className="text-sm text-text-secondary italic leading-relaxed">
                  "{selectedSign.description}"
                </p>
                <div className="border-t border-border/30 pt-3">
                  <p className="text-base text-text-primary leading-relaxed">
                    {selectedSign.advice}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pb-2">
                {selectedSign.severity === "emergency" && (
                  <a
                    href="tel:911"
                    onClick={() => handleAction("emergency_call")}
                    className="flex items-center justify-center gap-2 w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-red-200 transition-colors"
                  >
                    <PhoneCall className="h-5 w-5" /> Call 911
                  </a>
                )}

                {(selectedSign.severity === "booking" ||
                  selectedSign.severity === "emergency") && (
                  <Button
                    className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold"
                    onClick={() => handleAction("booking")}
                    disabled={loading}
                  >
                    <CalendarHeart className="mr-2 h-5 w-5" /> Consult a Specialist
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full h-12 font-semibold text-text-muted hover:text-text-primary"
                  onClick={() => handleAction("monitor")}
                  disabled={loading}
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
