"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { savePregnancyProfile, deleteAccount } from "@/app/actions/profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  LogOut,
  Pencil,
  Trash2,
  Mail,
  Baby,
  CalendarDays,
  ShieldCheck,
  ChevronRight,
  Monitor,
  Moon,
  Sun,
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

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

interface Props {
  email: string;
  stage: JourneyStage;
  dueDate: string | null;
}

export default function ProfileClient({ email, stage, dueDate }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const { preference, setTheme } = useTheme();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Edit form state
  const [editStage, setEditStage] = useState<JourneyStage>(stage);
  const [editDueDate, setEditDueDate] = useState(
    dueDate ? new Date(dueDate).toISOString().split("T")[0] : "",
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

  const dateLabel =
    stage === "postpartum" ? "Baby's birth date" : "Estimated due date";

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Header */}
      <div className="bg-gradient-hero rounded-b-4xl px-6 pb-8 pt-12 shadow-sm ring-1 ring-foreground/5">
        <div className="flex items-center gap-4">
          <div className="flex size-16 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
            <Baby className="size-8 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Your Account
            </p>
            <p className="truncate font-heading text-xl font-bold text-foreground">
              {email}
            </p>
            <Badge
              className={`mt-1 border-0 text-xs font-semibold ${STAGE_COLORS[stage]}`}
            >
              {STAGE_LABELS[stage]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4 px-4 pt-6">
        {/* Journey Details Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-bold text-foreground">
              Your Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60 space-y-0">
            <ProfileRow
              icon={<Baby className="size-4 text-primary" />}
              label="Journey stage"
              value={STAGE_LABELS[stage]}
            />
            {formattedDate && (
              <ProfileRow
                icon={<CalendarDays className="size-4 text-accent" />}
                label={dateLabel}
                value={formattedDate}
              />
            )}
            {!formattedDate && stage !== "ttc" && (
              <ProfileRow
                icon={<CalendarDays className="size-4 text-muted-foreground" />}
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
          className="flex w-full items-center justify-between rounded-2xl bg-card px-5 py-4 shadow-sm ring-1 ring-foreground/10 transition-colors hover:bg-primary/5"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Pencil className="size-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Edit journey details
            </span>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </button>

        {/* Account Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-bold text-foreground">
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/60 space-y-0">
            <ProfileRow
              icon={<Mail className="size-4 text-muted-foreground" />}
              label="Email"
              value={email}
            />
            <ProfileRow
              icon={<ShieldCheck className="size-4 text-accent" />}
              label="Data storage"
              value="Encrypted · EU servers"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-heading text-base font-bold text-foreground">
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <fieldset>
              <legend className="sr-only">Theme preference</legend>
              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    type="button"
                    variant={preference === value ? "secondary" : "outline"}
                    className="flex-col gap-1 px-2 text-xs"
                    aria-pressed={preference === value}
                    onClick={() => setTheme(value)}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Button>
                ))}
              </div>
            </fieldset>
          </CardContent>
        </Card>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="group flex w-full items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-sm ring-1 ring-foreground/10 transition-colors hover:bg-destructive/5"
        >
          <div className="rounded-full bg-destructive/10 p-2 transition-colors group-hover:bg-destructive/20">
            <LogOut className="size-4 text-destructive" />
          </div>
          <span className="text-sm font-semibold text-destructive">
            {signingOut ? "Signing out…" : "Sign out"}
          </span>
        </button>

        {/* Delete account */}
        <button
          onClick={() => setDeleteOpen(true)}
          className="group flex w-full items-center gap-3 rounded-2xl bg-card px-5 py-4 shadow-sm ring-1 ring-foreground/10 transition-colors hover:bg-destructive/5"
        >
          <div className="rounded-full bg-destructive/10 p-2 transition-colors group-hover:bg-destructive/20">
            <Trash2 className="size-4 text-destructive" />
          </div>
          <div className="text-left">
            <span className="block text-sm font-semibold text-destructive">
              Delete my account
            </span>
            <span className="text-xs text-muted-foreground">
              Permanently removes all your data
            </span>
          </div>
        </button>
      </div>

      {/* ── Edit Journey Sheet ── */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto rounded-t-4xl p-0"
        >
          <div className="space-y-6 p-6 pt-8">
            <SheetHeader className="text-left">
              <SheetTitle className="font-heading text-2xl font-bold text-foreground">
                Edit Journey
              </SheetTitle>
              <SheetDescription className="text-foreground-secondary">
                Update your stage or date at any time — your weekly guide will
                adjust immediately.
              </SheetDescription>
            </SheetHeader>

            <form onSubmit={handleSave} className="space-y-6">
              {saveError && (
                <div className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">
                  {saveError}
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-semibold">
                  Where are you in your journey?
                </Label>
                <Select
                  value={editStage}
                  onValueChange={(v) => {
                    setEditStage(v as JourneyStage);
                    setEditDueDate("");
                  }}
                >
                  <SelectTrigger className="h-12 bg-card focus:ring-ring">
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
                <div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-200">
                  <Label htmlFor="edit_due_date" className="text-sm font-semibold">
                    Estimated due date
                  </Label>
                  <input
                    type="date"
                    id="edit_due_date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              {editStage === "postpartum" && (
                <div className="animate-in fade-in slide-in-from-top-2 space-y-2 duration-200">
                  <Label htmlFor="edit_birth_date" className="text-sm font-semibold">
                    Baby&apos;s birth date
                  </Label>
                  <input
                    type="date"
                    id="edit_birth_date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="flex h-12 w-full rounded-xl border border-input bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              )}

              <Button
                type="submit"
                variant="gradient"
                disabled={saving}
                className="h-12 w-full font-bold"
              >
                {saving ? "Saving…" : "Save Changes"}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Delete Confirmation Sheet ── */}
      <Sheet open={deleteOpen} onOpenChange={setDeleteOpen}>
        <SheetContent side="bottom" className="rounded-t-4xl p-0">
          <div className="space-y-6 p-6 pt-8">
            <SheetHeader className="text-left">
              <SheetTitle className="font-heading text-2xl font-bold text-destructive">
                Delete your account?
              </SheetTitle>
              <SheetDescription className="leading-relaxed text-foreground-secondary">
                This permanently deletes your account and all associated health
                data — mood check-ins, pregnancy profile, and interaction logs.
                This cannot be undone.
              </SheetDescription>
            </SheetHeader>

            <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive">
              Your data will be erased immediately and cannot be recovered.
            </div>

            <div className="space-y-3 pb-4">
              <Button
                variant="destructive"
                className="h-12 w-full font-bold"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting…" : "Yes, delete my account"}
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-full font-semibold text-muted-foreground"
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
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p
          className={`truncate text-sm font-semibold ${muted ? "text-muted-foreground" : "text-foreground"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
