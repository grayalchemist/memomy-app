import * as React from "react"
import { cn } from "@/lib/utils"

function ProgressRing({
  value,
  size = 120,
  strokeWidth = 10,
  label,
  sublabel,
  className,
}: {
  value: number
  size?: number
  strokeWidth?: number
  label?: React.ReactNode
  sublabel?: React.ReactNode
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, value))
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference

  // Brand gradient — plum → emerald, defined as an SVG gradient (token colors).
  const gradId = React.useId()

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-plum-500)" />
            <stop offset="100%" stopColor="var(--color-emerald-500)" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      {label && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span
            data-numeric
            className="font-heading text-2xl font-bold tracking-tight text-foreground tabular-nums"
          >
            {label}
          </span>
          {sublabel && (
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

export { ProgressRing }
