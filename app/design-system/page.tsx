"use client";

import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GradientCard } from "@/components/ui/gradient-card";
import { StatTile } from "@/components/ui/stat-tile";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sun,
  Moon,
  Activity,
  CalendarClock,
  HeartPulse,
  Sprout,
  Stethoscope,
} from "lucide-react";

const RAILS: { name: string; prefix: string; steps: string[] }[] = [
  { name: "Plum / primary", prefix: "plum", steps: ["50","100","200","300","400","500","600","700","800","900","950"] },
  { name: "Emerald / accent", prefix: "emerald", steps: ["50","100","200","300","400","500","600","700"] },
  { name: "Gold / highlight", prefix: "gold", steps: ["300","400","500","600"] },
  { name: "Neutral (plum-tinted)", prefix: "neutral", steps: ["50","100","200","300","400","500","600","700","800","900","950"] },
];

const SEMANTIC = [
  { name: "background", cls: "bg-background border border-border" },
  { name: "card", cls: "bg-card border border-border" },
  { name: "foreground", cls: "bg-foreground text-background" },
  { name: "muted", cls: "bg-muted" },
  { name: "primary", cls: "bg-primary text-primary-foreground" },
  { name: "accent", cls: "bg-accent text-accent-foreground" },
  { name: "success", cls: "bg-success text-success-foreground" },
  { name: "warning", cls: "bg-warning text-warning-foreground" },
  { name: "info", cls: "bg-info text-info-foreground" },
  { name: "coach", cls: "bg-coach text-coach-foreground" },
  { name: "destructive", cls: "bg-destructive text-destructive-foreground" },
  { name: "border", cls: "bg-border" },
];

export default function DesignSystemPage() {
  const { resolved, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky header */}
      <header className="bg-glass sticky top-0 z-50 border-b border-hairline">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              MeMomy
            </p>
            <h1 className="font-heading text-xl font-bold tracking-tight text-foreground">
              Design System
            </h1>
          </div>
          <Button variant="outline" size="icon" onClick={toggle} aria-label="Toggle theme">
            {resolved === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-12 px-5 py-10">
        {/* Color ramps */}
        <Section title="Color ramps" subtitle="OKLCH perceptual scales · primitive tokens">
          <div className="space-y-4">
            {RAILS.map((rail) => (
              <div key={rail.name}>
                <p className="mb-2 text-xs font-semibold text-muted-foreground">
                  {rail.name}
                </p>
                <div className="flex overflow-hidden rounded-xl ring-1 ring-foreground/10">
                  {rail.steps.map((step) => (
                    <div
                      key={step}
                      className="h-14 flex-1"
                      style={{
                        backgroundColor: `var(--color-${rail.prefix}-${step})`,
                      }}
                      title={`${rail.prefix}-${step}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Semantic */}
        <Section title="Semantic tokens" subtitle="Light / dark resolved · the colors components use">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {SEMANTIC.map((s) => (
              <div key={s.name} className="space-y-1.5">
                <div className={`h-16 rounded-xl ${s.cls}`} />
                <p className="text-[11px] font-medium text-muted-foreground">
                  {s.name}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Gradients + glass */}
        <Section title="Gradients & glass" subtitle="Surfaces only — never on text">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex h-20 items-center justify-center rounded-2xl bg-gradient-brand text-sm font-semibold text-primary-foreground">
              brand
            </div>
            <div className="flex h-20 items-center justify-center rounded-2xl bg-gradient-accent text-sm font-semibold text-accent-foreground">
              accent
            </div>
            <div className="flex h-20 items-center justify-center rounded-2xl bg-gradient-spectrum text-sm font-semibold text-primary-foreground">
              spectrum
            </div>
            <div className="flex h-20 items-center justify-center rounded-2xl bg-glass text-sm font-semibold text-foreground ring-1 ring-foreground/10">
              glass
            </div>
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography" subtitle="Manrope · single warm-geometric family">
          <div className="space-y-2 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <p className="font-heading text-4xl font-extrabold tracking-tight">
              A calm companion
            </p>
            <p className="font-heading text-2xl font-bold">Week 24</p>
            <p className="font-heading text-lg font-semibold">
              Section heading
            </p>
            <p className="text-sm text-foreground-secondary">
              Body copy — clear, plain, never alarmist. Short sentences and
              considered spacing.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Eyebrow / label
            </p>
            <p data-numeric className="text-sm tabular-nums text-foreground">
              0123456789 · 24 / 40 · €89.00
            </p>
          </div>
        </Section>

        {/* Radius + shadow + motion */}
        <Section title="Radius · Shadow · Motion" subtitle="One radius scale · soft plum-tinted shadows">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex size-16 items-center justify-center rounded-sm bg-card text-xs ring-1 ring-foreground/10">sm</div>
            <div className="flex size-16 items-center justify-center rounded-lg bg-card text-xs ring-1 ring-foreground/10">lg</div>
            <div className="flex size-16 items-center justify-center rounded-xl bg-card text-xs ring-1 ring-foreground/10">xl</div>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-card text-xs ring-1 ring-foreground/10">2xl</div>
            <div className="flex size-16 items-center justify-center rounded-3xl bg-card text-xs ring-1 ring-foreground/10">3xl</div>
            <div className="flex size-16 items-center justify-center rounded-4xl bg-card text-xs ring-1 ring-foreground/10">4xl</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-card text-xs ring-1 ring-foreground/10 shadow-sm">sm</div>
            <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-card text-xs ring-1 ring-foreground/10 shadow-md">md</div>
            <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-card text-xs ring-1 ring-foreground/10 shadow-lg">lg</div>
            <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-card text-xs ring-1 ring-foreground/10 shadow-glow">glow</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary animate-fade-up">fade-up</span>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent animate-fade-in">fade-in</span>
            <span className="rounded-full bg-warning/15 px-3 py-1 text-xs text-warning-foreground animate-float">float</span>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons" subtitle="One primary CTA per screen">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button size="xs">XS</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="icon"><Sprout className="size-4" /></Button>
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges" subtitle="Severity variants for warning signs & AsaDoc labeling">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">See provider</Badge>
            <Badge variant="info">EU Licensed</Badge>
            <Badge variant="coach">Health Coach</Badge>
            <Badge variant="destructive">Emergency</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards" subtitle="default · glass · gradient">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Default card</CardTitle>
                <CardDescription>Hairline border + soft shadow.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground-secondary">
                The workhorse surface.
              </CardContent>
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle>Glass</CardTitle>
                <CardDescription>Floating overlays.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-foreground-secondary">
                Backdrop blur + translucent.
              </CardContent>
            </Card>
            <GradientCard accent="brand" className="col-span-2">
              <p className="font-heading text-lg font-bold">Gradient card</p>
              <p className="text-sm text-primary-foreground/80">
                The single hero/feature surface per screen — 60-30-10.
              </p>
            </GradientCard>
          </div>
        </Section>

        {/* Stats + progress */}
        <Section title="Stat tiles & progress" subtitle="tabular-nums · one accent per surface">
          <div className="grid grid-cols-3 gap-3">
            <StatTile label="Pregnancy week" value={24} unit="/40" icon={CalendarClock} accent="primary" />
            <StatTile label="Days to due" value={112} icon={HeartPulse} accent="accent" />
            <StatTile label="Trimester" value="2nd" icon={Sprout} accent="gold" />
          </div>
          <div className="mt-4 flex items-center gap-6 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <ProgressRing value={60} label="60" sublabel="complete" />
            <div className="flex-1 space-y-3">
              <Progress value={60} variant="gradient" />
              <Progress value={40} variant="accent" />
              <Progress value={25} />
            </div>
          </div>
        </Section>

        {/* Form + empty state */}
        <Section title="Inputs & empty state">
          <div className="space-y-3 rounded-2xl bg-card p-5 ring-1 ring-foreground/10">
            <Label htmlFor="demo">Email</Label>
            <Input id="demo" type="email" placeholder="you@example.com" />
          </div>
          <div className="mt-4">
            <EmptyState
              icon={Stethoscope}
              title="No specialists yet"
              description="When AsaDoc lists Farsi-speaking specialists, they'll appear here."
              action={<Button variant="outline" size="sm">Refresh</Button>}
            />
          </div>
        </Section>

        <p className="flex items-center justify-center gap-2 pt-4 text-center text-xs text-muted-foreground">
          <Activity className="size-3" /> Source of truth:{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">design/DESIGN-SYSTEM.md</code>
        </p>
      </main>
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}
