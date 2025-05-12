import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        apple: "rounded-full bg-secondary text-white hover:bg-secondary/90 hover:shadow-md transition-all duration-300",
        "apple-outline":
          "rounded-full border border-secondary text-secondary hover:bg-secondary/10 hover:shadow-md transition-all duration-300",
        "apple-light":
          "rounded-full bg-white text-secondary hover:bg-gray-100 hover:shadow-md dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-all duration-300",
        premium:
          "relative overflow-hidden rounded-full bg-gradient-to-r from-secondary to-accent text-white shadow-md hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent before:to-secondary before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:z-0",
        "premium-outline":
          "relative overflow-hidden rounded-full border border-secondary bg-transparent text-secondary shadow-sm hover:shadow-md transition-all duration-300 hover:bg-secondary/5 hover:border-accent",
        "premium-dark":
          "relative overflow-hidden rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-800 before:to-gray-900 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 before:z-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        apple: "px-6 py-3 h-auto",
        premium: "px-8 py-4 h-auto text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isPremium = variant?.includes("premium")

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {isPremium ? <span className="relative z-10">{children}</span> : children}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
