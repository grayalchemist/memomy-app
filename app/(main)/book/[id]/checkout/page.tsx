"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getSpecialist, Specialist } from "@/lib/asadoc";
import { processMockPayment } from "@/app/actions/booking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function MockCheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slotDate = searchParams.get("date");

  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const id = params?.id as string;
    if (id) {
      getSpecialist(id).then((data) => {
        setSpecialist(data);
        setLoading(false);
      });
    }
  }, [params?.id]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData();
    formData.append("specialist_id", specialist!.id);
    formData.append("specialist_type", specialist!.type);
    formData.append("amount_eur", specialist!.feeEur.toString());
    if (slotDate) formData.append("slot_date", slotDate);

    const result = await processMockPayment(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);
    } else {
      alert("Payment failed: " + result.error);
      setProcessing(false);
    }
  };

  if (loading || !specialist) {
    return <div className="flex h-screen items-center justify-center text-primary"><Loader2 className="animate-spin" /></div>;
  }

  if (success) {
    return (
      <div className="flex h-screen flex-col items-center justify-center p-6 text-center space-y-4 bg-bg-base z-50 fixed inset-0">
        <div className="bg-accent/20 p-6 rounded-full inline-block mb-4 animate-in zoom-in duration-300">
          <CheckCircle2 className="h-16 w-16 text-accent" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-text-primary">Payment Complete</h2>
        <p className="text-text-secondary">Your session with {specialist.name} is booked.</p>
        <p className="text-xs text-text-muted mt-8">Redirecting you to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 pb-24">
      {/* Header */}
      <div className="bg-white px-4 pt-10 pb-4 shadow-sm z-10 sticky top-0 flex justify-between items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="-ml-2" disabled={processing}>
          <ArrowLeft className="h-5 w-5 text-text-primary" />
        </Button>
        <div className="flex items-center text-xs font-bold text-text-muted uppercase tracking-wider">
          <Lock className="w-3 h-3 mr-1" /> Secure Checkout
        </div>
        <div className="w-8"></div> {/* spacer */}
      </div>

      <div className="p-4 space-y-6">
        {/* Order Summary */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="text-base text-text-primary">Consultation Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-text-secondary font-medium">{specialist.name}</span>
              <span className="text-text-primary">€{specialist.feeEur.toFixed(2)}</span>
            </div>
            {slotDate && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-secondary font-medium">Date</span>
                <span className="text-text-primary">{new Date(slotDate).toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex justify-between items-center text-sm opacity-60">
              <span className="text-text-secondary font-medium">Platform Fee</span>
              <span className="text-text-primary">€0.00</span>
            </div>
            <div className="border-t border-border/40 pt-3 flex justify-between items-center mt-2">
              <span className="text-text-primary font-bold">Total Due</span>
              <span className="text-xl font-bold text-primary">€{specialist.feeEur.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Mock Credit Card Form */}
        <Card className="border-0 shadow-sm border-t-4 border-t-primary">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-text-primary flex items-center justify-between">
              Payment Details
              <div className="flex gap-1">
                <div className="w-8 h-5 bg-blue-100 rounded flex items-center justify-center text-[8px] font-bold text-blue-800">VISA</div>
                <div className="w-8 h-5 bg-red-100 rounded flex items-center justify-center text-[8px] italic font-bold text-red-800">MC</div>
              </div>
            </CardTitle>
            <CardDescription className="text-xs">Mocked Stripe Elements Demo</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="payment-form" onSubmit={handlePay} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-text-secondary">Card Information</Label>
                <div className="border border-input rounded-md overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition-all">
                  <Input type="text" placeholder="4242 4242 4242 4242" className="border-0 focus-visible:ring-0 rounded-none shadow-none h-11" required disabled={processing} />
                  <div className="flex border-t border-input">
                    <Input type="text" placeholder="MM/YY" className="border-0 border-r focus-visible:ring-0 rounded-none shadow-none h-11 w-1/2" required disabled={processing} />
                    <Input type="text" placeholder="CVC" className="border-0 focus-visible:ring-0 rounded-none shadow-none h-11 w-1/2" required disabled={processing} />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-text-secondary">Name on card</Label>
                <Input type="text" placeholder="Jane Doe" className="h-11 shadow-sm" required disabled={processing} />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Sticky Bottom Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border/50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-50 max-w-md mx-auto">
        <Button
          type="submit"
          form="payment-form"
          disabled={processing}
          className="w-full h-14 bg-text-primary hover:bg-black text-white font-bold text-lg"
        >
          {processing ? (
            <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Processing...</span>
          ) : (
            `Pay €${specialist.feeEur.toFixed(2)}`
          )}
        </Button>
        <p className="text-center text-[10px] text-text-muted mt-3 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3" /> Powered by Stripe (Mock Pitch Mode)
        </p>
      </div>
    </div>
  );
}