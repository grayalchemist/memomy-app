import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * GradientCard — a premium accent card with soft brand-gradient surface and
 * decorative orbs. Adapted from the 21st.dev "Glass Shine Card" pattern, but
 * token-native (no installed dependency). Use for the single hero/feature card
 * on a screen — one per surface, per the 60-30-10 rule.
 */
function GradientCard({
  className,
  children,
  accent = "brand",
  ...props
}: React.ComponentProps<"div"> & {
  accent?: "brand" | "accent" | "spectrum"
}) {
  return (
    <div
      data-slot="gradient-card"
      className={cn(
        "relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-lg ring-1 ring-primary-900/20",
        accent === "brand" && "bg-gradient-brand",
        accent === "accent" && "bg-gradient-accent",
        accent === "spectrum" && "bg-gradient-spectrum",
        className
      )}
      {...props}
    >
      {/* Decorative orbs — surface gradients, not text */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-white/15 blur-2xl animate-float"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-6 size-24 rounded-full bg-white/10 blur-2xl"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export { GradientCard }
