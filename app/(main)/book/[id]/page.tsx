"use client";

import { useEffect, useState } from "react";
import { getSpecialist, getAvailability, Specialist, TimeSlot } from "@/lib/asadoc";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ShieldAlert, BadgeCheck, Clock, CalendarDays } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";

export default function SpecialistProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = params?.id as string;
    if (id) {
      getSpecialist(id).then((data) => {
        setSpecialist(data);
        setLoading(false);
      });
    } else {
       setLoading(false); // No ID found
    }
  }, [params?.id]);

  useEffect(() => {
    if (date && specialist) {
      // simulate fetching real availability for this specific day
      getAvailability(specialist.id, date.toISOString()).then(setSlots);
      setSelectedSlot(null);
    }
  }, [date, specialist]);

  if (loading) return <div className="p-8 text-center mt-20 animate-pulse text-primary">Loading profile...</div>;
  if (!specialist) {
    return (
      <div className="p-8 text-center mt-20">
        <h2 className="text-xl font-bold mb-4">Specialist not found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base overflow-x-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-6 shadow-sm z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2">
            <ArrowLeft className="h-5 w-5 text-text-primary" />
          </Button>
          <h1 className="font-serif text-xl font-bold text-text-primary truncate">{specialist.name}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-32">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center space-y-3 mt-4">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl">
            <AvatarImage src={specialist.avatarUrl} alt={specialist.name} />
            <AvatarFallback>{specialist.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-serif text-2xl font-bold text-text-primary">{specialist.name}</h2>
            <div className="text-text-muted mt-1 uppercase text-xs font-bold tracking-wider">
              {specialist.specialty.join(" • ")}
            </div>
          </div>
        </div>

        {/* Disclaimer / Trust Badge */}
        {specialist.type === "health_coach" ? (
          <div className="bg-[#6A8A5C]/10 border border-[#6A8A5C]/20 p-4 rounded-xl flex gap-3 items-start">
            <ShieldAlert className="h-5 w-5 text-[#6A8A5C] shrink-0 mt-0.5" />
            <p className="text-sm text-[#4d6642] leading-snug">
              <strong>Health Coach:</strong> Provides lifestyle, wellness, and emotional guidance only. They do not diagnose, prescribe, or provide clinical medical advice.
            </p>
          </div>
        ) : (
          <div className="bg-info/10 border border-info/20 p-4 rounded-xl flex gap-3 items-center">
            <BadgeCheck className="h-5 w-5 text-info shrink-0" />
            <p className="text-sm text-info leading-snug font-medium">
              Licensed Medical Professional: {specialist.licenseJurisdiction}
            </p>
          </div>
        )}

        <div className="bg-white p-5 rounded-xl shadow-sm space-y-3">
          <h3 className="font-bold text-text-primary">About</h3>
          <p className="text-sm text-text-secondary leading-relaxed">{specialist.bio}</p>
        </div>

        {/* Calendar Picker */}
        <div>
          <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" /> Select a Date
          </h3>
          <div className="bg-white p-3 rounded-xl shadow-sm inline-block w-full flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            />
          </div>
        </div>

        {/* Time Slots */}
        {date && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h3 className="font-bold text-text-primary mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" /> Available Times
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {slots.map((slot) => {
                const timeStr = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const isSelected = selectedSlot === slot.id;
                return (
                  <Button
                    key={slot.id}
                    variant={isSelected ? "default" : "outline"}
                    className={`h-12 w-full text-sm font-semibold transition-all ${isSelected ? 'bg-primary hover:bg-primary-dark shadow-md' : 'bg-white hover:border-primary/50 text-text-primary'}`}
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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border/50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-12 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3 px-1">
            <span className="text-text-secondary font-medium">Session Fee</span>
            <span className="font-bold text-lg text-text-primary">€{specialist.feeEur.toFixed(2)}</span>
          </div>
          <Button
            className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-lg shadow-accent/20"
            onClick={() => router.push(`/book/${specialist.id}/checkout?slot=${selectedSlot}&date=${date?.toISOString()}`)}
          >
            Confirm & Pay
          </Button>
        </div>
      )}
    </div>
  );
}