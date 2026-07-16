"use client";

import { useEffect, useState } from "react";
import { getSpecialist, getAvailability, Specialist, TimeSlot } from "@/lib/asadoc";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  ShieldAlert,
  BadgeCheck,
  Clock,
  CalendarDays,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

export default function SpecialistProfilePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSpecialist(id).then((data) => {
      setSpecialist(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (date && specialist) {
      // simulate fetching real availability for this specific day
      getAvailability(specialist.id, date.toISOString()).then(setSlots);
    }
  }, [date, specialist]);

  function handleDateSelect(nextDate: Date | undefined) {
    setDate(nextDate);
    setSelectedSlot(null);
  }

  if (loading)
    return (
      <div className="mt-20 animate-pulse p-8 text-center text-primary">
        Loading profile...
      </div>
    );
  if (!specialist) {
    return (
      <div className="mt-20 p-8 text-center">
        <h2 className="mb-4 text-xl font-bold">Specialist not found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      {/* Header */}
      <div className="bg-glass sticky top-0 z-10 px-4 pb-6 pt-10 shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="-ml-2"
            aria-label="Go back"
          >
            <ArrowLeft className="size-5 text-foreground" />
          </Button>
          <h1 className="truncate font-heading text-xl font-bold text-foreground">
            {specialist.name}
          </h1>
        </div>
      </div>

      <div className="space-y-6 p-4 pb-32">
        {/* Profile Card */}
        <div className="mt-4 flex flex-col items-center space-y-3 text-center">
          <Avatar className="size-24 ring-4 ring-card shadow-xl">
            <AvatarImage src={specialist.avatarUrl} alt={specialist.name} />
            <AvatarFallback className="bg-primary/10 font-heading font-bold text-primary">
              {specialist.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground">
              {specialist.name}
            </h2>
            <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {specialist.specialty.join(" • ")}
            </div>
          </div>
        </div>

        {/* Disclaimer / Trust Badge */}
        {specialist.type === "health_coach" ? (
          <div className="flex items-start gap-3 rounded-2xl border border-coach/20 bg-coach/5 p-4">
            <ShieldAlert className="mt-0.5 size-5 shrink-0 text-coach" />
            <p className="text-sm leading-snug text-foreground-secondary">
              <strong className="text-coach">Health Coach:</strong> Provides
              lifestyle, wellness, and emotional guidance only. They do not
              diagnose, prescribe, or provide clinical medical advice.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-2xl border border-info/20 bg-info/5 p-4">
            <BadgeCheck className="size-5 shrink-0 text-info" />
            <p className="text-sm font-medium leading-snug text-info">
              Licensed Medical Professional: {specialist.licenseJurisdiction}
            </p>
          </div>
        )}

        <div className="space-y-3 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-foreground/10">
          <h3 className="font-bold text-foreground">About</h3>
          <p className="text-sm leading-relaxed text-foreground-secondary">
            {specialist.bio}
          </p>
        </div>

        {/* Calendar Picker */}
        <div>
          <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground">
            <CalendarDays className="size-5 text-primary" /> Select a Date
          </h3>
          <div className="flex w-full justify-center rounded-2xl bg-card p-3 shadow-sm ring-1 ring-foreground/10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              className="rounded-md"
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
            />
          </div>
        </div>

        {/* Time Slots */}
        {date && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="mb-3 flex items-center gap-2 font-bold text-foreground">
              <Clock className="size-5 text-accent" /> Available Times
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {slots.map((slot) => {
                const timeStr = new Date(slot.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const isSelected = selectedSlot === slot.id;
                return (
                  <Button
                    key={slot.id}
                    variant={isSelected ? "gradient" : "outline"}
                    className={cn(
                      "h-12 w-full text-sm font-semibold transition-all",
                      !isSelected && "bg-card hover:border-primary/50"
                    )}
                    onClick={() => setSelectedSlot(slot.id)}
                  >
                    {timeStr}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Floating Booking Action */}
      {selectedSlot && (
        <div className="bg-glass animate-in slide-in-from-bottom-12 fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-hairline p-4 shadow-2xl">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-medium text-foreground-secondary">
              Session Fee
            </span>
            <span
              data-numeric
              className="font-heading text-lg font-bold text-foreground tabular-nums"
            >
              €{specialist.feeEur.toFixed(2)}
            </span>
          </div>
          <Button
            variant="accent"
            className="h-14 w-full text-lg font-bold shadow-lg"
            onClick={() =>
              router.push(
                `/book/${specialist.id}/checkout?slot=${selectedSlot}&date=${date?.toISOString()}`,
              )
            }
          >
            Confirm & Pay
          </Button>
        </div>
      )}
    </div>
  );
}
