"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { savePregnancyProfile, deleteAccount } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  LogOut, Pencil, Trash2, Mail, Baby, CalendarDays, ShieldCheck, ChevronRight,
} from "lucide-react";
import type { JourneyStage } from "@/lib/timeline/types";

const STAGE_LABELS: Record<JourneyStage, string> = {
  ttc: "Trying to Conceive",
  pregnant: "Currently Pregnant",
  postpartum: "Postpartum",
};

const STAGE_COLORS: Record<JourneyStage, string> = {
  ttc: "bg-accent/10 text-accent",
  pregnant: "bg-primary/10 text-primary",
  postpartum: "bg-secondary text-secondary-foreground",
};

interface Props {
  email: string;
  stage: JourneyStage;
  dueDate: string | null;
}

export default function ProfileClient({ email, stage, dueDate }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Edit form state
  const [editStage, setEditStage] = useState<JourneyStage>(stage);
  const [editDueDate, setEditDueDate] = useState(
    dueDate ? new Date(dueDate).toISOString().split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const formData = new FormData();
    formData.set("stage", editStage);
    if (editDueDate) formData.set("due_date", editDueDate);

    const result = await savePregnancyProfile(formData);
    setSaving(false);

    if (result.success) {
      setEditOpen(false);
      router.refresh();
    } else {
      setSaveError(result.error ?? "Something went wrong.");
    }
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const handleDelete = async () => {
    setDeleting(true);
    await deleteAccount();
    // deleteAccount server action redirects — this line won't be reached
  };

  const formattedDate = dueDate
    ? new Date(dueDate).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const dateLabel = stage === "postpartum" ? "Baby's birth date" : "Estimated due date";

  return (
    <div className="flex flex-col min-h-screen bg-bg-base pb-28">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-8 shadow-sm rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Baby className="h-8 w-8 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-sans text-xs uppercase tracking-widest font-bold text-text-muted mb-1">
              Your Account
            </p>
            <p className="font-serif text-xl font-bold text-text-primary truncate">
              {email}
            </p>
            <Badge className={`mt-1 border-0 text-xs font-semibold ${STAGE_COLORS[stage]}`}>
              {STAGE_LABELS[stage]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Journey Details Card */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-base font-bold text-text-primary">
              Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-border/40">
            <ProfileRow
              icon={<Baby className="h-4 w-4 text-primary" />}
              label="Journey stage"
              value={STAGE_LABELS[stage]}
            />
            {formattedDate && (
              <ProfileRow
                icon={<CalendarDays className="h-4 w-4 text-accent" />}
                label={dateLabel}
                value={formattedDate}
              />
            )}
            {!formattedDate && stage !== "ttc" && (
              <ProfileRow
                icon={<CalendarDays className="h-4 w-4 text-text-muted" />}
                label={dateLabel}
                value="Not set"
                muted
              />
            )}
          </CardContent>
        </Card>

        {/* Edit Journey Button */}
        <button
          onClick={() => setEditOpen(true)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm px-5 py-4 hover:bg-primary/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Pencil className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-text-primary text-sm">Edit journey details</span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted" />
        </button>

        {/* Account Card */}
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-base font-bold text-text-primary">
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y divide-border/40">
            <ProfileRow
              icon={<Mail className="h-4 w-4 text-text-muted" />}
              label="Email"
              value={email}
            />
            <ProfileRow
              icon={<ShieldCheck className="h-4 w-4 text-accent" />}
              label="Data storage"
              value="Encrypted · EU servers"
            />
          </CardContent>
        </Card>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm px-5 py-4 hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
              <LogOut className="h-4 w-4 text-red-500" />
            </div>
            <span className="font-semibold text-red-600 text-sm">
              {signingOut ? "Signing out…" : "Sign out"}
            </span>
          </div>
        </button>

        {/* Delete account */}
        <button
          onClick={() => setDeleteOpen(true)}
          className="w-full flex items-center justify-between bg-white rounded-xl shadow-sm px-5 py-4 hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-full group-hover:bg-red-100 transition-colors">
              <Trash2 className="h-4 w-4 text-red-400" />
            </div>
            <div className="text-left">
              <span className="font-semibold text-red-400 text-sm block">Delete my account</span>
              <span className="text-xs text-text-muted">Permanently removes all your data</span>
            </div>
          </div>
        </button>
      </div>

      {/* ── Edit Journey Sheet ── */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl p-0 max-h-[90vh] overflow-y-auto">
          <div className="p-6 pt-8 space-y-6">
            <SheetHeader className="text-left">
              <SheetTitle className="font-serif text-2xl font-bold text-text-primary">
                Edit Journey
              </SheetTitle>
              <SheetDescription className="text-text-secondary">
                Update your stage or date at any time — your weekly guide will adjust immediately.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSave} className="space-y-6">
              {saveError && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive font-medium">
                  {saveError}
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Where are you in your journey?</Label>
                <Select
                  value={editStage}
                  onValueChange={(v) => {
                    setEditStage(v as JourneyStage);
                    setEditDueDate("");
                  }}
                >
                  <SelectTrigger className="h-12 bg-white focus:ring-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ttc">Trying to Conceive</SelectItem>
                    <SelectItem value="pregnant">Currently Pregnant</SelectItem>
                    <SelectItem value="postpartum">Postpartum</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {editStage === "pregnant" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Label htmlFor="edit_due_date" className="text-sm font-semibold">
                    Estimated due date
                  </Label>
                  <input
                    type="date"
                    id="edit_due_date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
              )}

              {editStage === "postpartum" && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <Label htmlFor="edit_birth_date" className="text-sm font-semibold">
                    Baby's birth date
                  </Label>
                  <input
                    type="date"
                    id="edit_birth_date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={saving}
                className="w-full h-12 bg-primary hover:bg-primary-dark text-white font-bold"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Delete Confirmation Sheet ── */}
      <Sheet open={deleteOpen} onOpenChange={setDeleteOpen}>
        <SheetContent side="bottom" className="rounded-t-3xl p-0">
          <div className="p-6 pt-8 space-y-6">
            <SheetHeader className="text-left">
              <SheetTitle className="font-serif text-2xl font-bold text-red-600">
                Delete your account?
              </SheetTitle>
              <SheetDescription className="text-text-secondary leading-relaxed">
                This permanently deletes your account and all associated health data — mood
                check-ins, pregnancy profile, and interaction logs. This cannot be undone.
              </SheetDescription>
            </SheetHeader>

            <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700 leading-relaxed">
              Your data will be erased immediately and cannot be recovered.
            </div>

            <div className="space-y-3 pb-4">
              <Button
                variant="destructive"
                className="w-full h-12 font-bold"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Yes, delete my account"}
              </Button>
              <Button
                variant="ghost"
                className="w-full h-12 font-semibold text-text-muted"
                onClick={() => setDeleteOpen(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// ── Shared row component ──
function ProfileRow({
  icon,
  label,
  value,
  muted = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-text-muted font-medium">{label}</p>
        <p className={`text-sm font-semibold truncate ${muted ? "text-text-muted" : "text-text-primary"}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
