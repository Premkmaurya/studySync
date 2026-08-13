import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0075de] text-white hover:bg-[#097fe8]",
        secondary:
          "border-transparent bg-[#e6f3fe] text-[#0075de] hover:bg-[#d4ebfe]",
        destructive:
          "border-transparent bg-[#f64932] text-white hover:bg-[#e32d14]",
        outline: "text-foreground border-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
