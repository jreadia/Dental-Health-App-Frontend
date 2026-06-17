import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./Button"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        healthy: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        mild: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        unhealthy: "bg-rose-100 text-rose-700 border border-rose-200",
        active: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        inactive: "bg-yellow-100 text-yellow-700 border border-yellow-200",
        banned: "bg-rose-100 text-rose-700 border border-rose-200",
        admin: "bg-[#0a2378]/10 text-[#0a2378] border border-[#0a2378]/20",
        superadmin: "bg-[#0a2378] text-white border border-[#0a2378]",
        default: "bg-slate-100 text-slate-800 border border-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  status?: string;
}

export function StatusBadge({ className, variant, status, children, ...props }: StatusBadgeProps) {
  // Auto-detect variant based on status string if variant is not explicitly provided
  let activeVariant = variant;
  if (!activeVariant && status) {
    const s = status.toLowerCase();
    if (s === "healthy") activeVariant = "healthy";
    else if (s === "mild") activeVariant = "mild";
    else if (s === "unhealthy") activeVariant = "unhealthy";
    else if (s === "active") activeVariant = "active";
    else if (s === "inactive") activeVariant = "inactive";
    else if (s === "banned") activeVariant = "banned";
    else if (s === "admin") activeVariant = "admin";
    else if (s === "super admin") activeVariant = "superadmin";
  }

  return (
    <div className={cn(badgeVariants({ variant: activeVariant, className }))} {...props}>
      {children || status}
    </div>
  )
}
