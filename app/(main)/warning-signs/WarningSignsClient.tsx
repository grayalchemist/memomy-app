"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  PhoneCall,
  CalendarHeart,
  ArrowLeft,
  Search,
  X,
} from "lucide-react";
import type { JourneyStage } from "@/lib/timeline/types";
import type { WarnCategory, WarnSign, Severity } from "@/lib/warning-signs/data";

const STAGE_LABELS: Record<JourneyStage, string> = {
  ttc: "Trying to Conceive",
  pregnant: "Pregnancy",
  postpartum: "Postpartum",
};

const SEVERITY_VARIANT: Record<
  Severity,
  React.ComponentProps<typeof Badge>["variant"]
> = {
  emergency: "destructive",
  booking: "warning",
  monitor: "secondary",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  emergency: "Alert",
  booking: "See provider",
  monitor: "Monitor",
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
            item.description.toLowerCase().includes(q),
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
          escalation_chosen:
            action === "emergency_call" ? "emergency" : action,
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
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Header */}
      <div className="bg-glass rounded-b-4xl px-4 pb-5 pt-10 shadow-sm ring-1 ring-foreground/5">
        <div className="mb-4 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="-ml-1 flex-shrink-0 rounded-full"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5 text-foreground" />
          </Button>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {STAGE_LABELS[stage]}
            </p>
            <h1 className="font-heading text-2xl font-bold leading-tight text-primary">
              Is this normal?
            </h1>
          </div>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-foreground-secondary">
          {totalCount} symptoms across {categories.length} categories — tap any
          to learn what it means and what to do.
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symptoms…"
            className="h-11 w-full rounded-xl border border-input bg-muted/50 pl-9 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* Symptom List */}
      <div className="space-y-3 px-4 pt-5">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">
            <Search className="mx-auto mb-3 size-8 opacity-40" />
            <p className="font-semibold">No symptoms found for &quot;{query}&quot;</p>
            <p className="mt-1 text-sm">Try a different word</p>
          </div>
        )}

        <Accordion type="multiple" className="space-y-3">
          {filtered.map((group, idx) => (
            <AccordionItem
              key={idx}
              value={`cat-${idx}`}
              className="rounded-2xl border border-border/60 bg-card px-4 shadow-sm"
            >
              <AccordionTrigger className="py-4 font-heading text-base font-bold text-foreground hover:no-underline">
                <span className="flex items-center gap-2">
                  {group.category}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold normal-case tracking-normal text-primary">
                    {group.items.length}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pb-4">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => openSheet(item)}
                    className="flex w-full items-center justify-between rounded-xl bg-muted/60 px-4 py-3 transition-colors hover:bg-primary/5"
                  >
                    <span className="pr-3 text-sm font-semibold leading-snug text-foreground">
                      {item.title}
                    </span>
                    <Badge
                      variant={SEVERITY_VARIANT[item.severity]}
                      className="flex-shrink-0 gap-1"
                    >
                      {item.severity === "emergency" && (
                        <AlertCircle className="size-3" />
                      )}
                      {SEVERITY_LABEL[item.severity]}
                    </Badge>
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
          className="max-h-[88vh] overflow-y-auto rounded-t-4xl p-0"
        >
          {selectedSign && (
            <div className="space-y-5 p-6 pt-8">
              <Badge
                variant={SEVERITY_VARIANT[selectedSign.severity]}
                className="mb-1 gap-1"
              >
                {selectedSign.severity === "emergency" && (
                  <AlertCircle className="size-3" />
                )}
                {selectedSign.severity === "emergency"
                  ? "Emergency"
                  : SEVERITY_LABEL[selectedSign.severity]}
              </Badge>

              <SheetHeader className="p-0 text-left">
                <SheetTitle className="font-heading text-2xl font-bold leading-snug text-foreground">
                  {selectedSign.title}
                </SheetTitle>
              </SheetHeader>

              {/* Description + Advice */}
              <div className="space-y-3 rounded-2xl border border-border/60 bg-muted/40 p-4">
                <p className="text-sm italic leading-relaxed text-foreground-secondary">
                  &quot;{selectedSign.description}&quot;
                </p>
                <div className="border-t border-border/40 pt-3">
                  <p className="text-base leading-relaxed text-foreground">
                    {selectedSign.advice}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pb-2">
                {selectedSign.severity === "emergency" && (
                  <Button
                    variant="destructive"
                    size="lg"
                    asChild
                    className="h-14 w-full text-lg font-bold shadow-lg"
                  >
                    <a
                      href="tel:911"
                      onClick={() => handleAction("emergency_call")}
                    >
                      <PhoneCall className="size-5" /> Call 911
                    </a>
                  </Button>
                )}

                {(selectedSign.severity === "booking" ||
                  selectedSign.severity === "emergency") && (
                  <Button
                    variant="accent"
                    className="h-12 w-full font-bold"
                    onClick={() => handleAction("booking")}
                    disabled={loading}
                  >
                    <CalendarHeart className="mr-2 size-5" /> Consult a
                    Specialist
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="h-12 w-full font-semibold text-muted-foreground hover:text-foreground"
                  onClick={() => handleAction("monitor")}
                  disabled={loading}
                >
                  I&apos;m okay, just monitoring
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
