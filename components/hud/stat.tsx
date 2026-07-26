import { cn } from "@/lib/utils"

export function Stat({
  label,
  value,
  accent,
  className,
}: {
  label: string
  value: React.ReactNode
  accent?: boolean
  className?: string
}) {
  return (
    <div className={cn("flex min-w-0 items-baseline gap-1.5", className)}>
      <span className="shrink-0 text-[10px] tracking-[0.14em] text-muted-foreground/70 uppercase">
        {label}
      </span>
      <span
        className={cn(
          "truncate font-mono text-[11px] tabular-nums",
          accent ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {value}
      </span>
    </div>
  )
}

export function StatGroup({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-[9px] tracking-[0.22em] text-muted-foreground/50 uppercase">
        {title}
      </span>
      {children}
    </div>
  )
}
