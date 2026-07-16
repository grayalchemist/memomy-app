import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const statTileVariants = cva(
  "group/stat flex flex-col gap-1 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 shadow-sm transition-all duration-300 hover:shadow-md hover:ring-foreground/15",
  {
    variants: {
      accent: {
        none: "",
        primary: "ring-primary/20",
        accent: "ring-accent/20",
        gold: "ring-warning/25",
      },
    },
    defaultVariants: { accent: "none" },
  }
)

function StatTile({
  className,
  label,
  value,
  unit,
  hint,
  icon: Icon,
  accent = "none",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof statTileVariants> & {
    label: string
    value: React.ReactNode
    unit?: string
    hint?: string
    icon?: React.ComponentType<{ className?: string }>
  }) {
  return (
    <div
      data-slot="stat-tile"
      className={cn(statTileVariants({ accent }), className)}
      {...props}
    >
      {Icon && (
        <div className="mb-1 flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
      )}
      <span className="text-xs font-medium tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span
          data-numeric
          className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums"
        >
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
    </div>
  )
}

export { StatTile, statTileVariants }
