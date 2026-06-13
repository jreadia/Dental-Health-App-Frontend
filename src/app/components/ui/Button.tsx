import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-950 disabled:pointer-events-none disabled:opacity-50 font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-[#00004d] text-white shadow hover:opacity-90",
        secondary:
          "bg-white/70 text-[#00004d] border border-[#00004d]/30 hover:bg-white",
        outline:
          "border-2 border-[#00004d] bg-white/75 text-[#00004d] hover:bg-white",
        gradient:
          "bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
      },
      size: {
        default: "h-9 px-6 py-2 text-[13px]",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-[15px] rounded-xl",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
