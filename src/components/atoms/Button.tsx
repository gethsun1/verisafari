import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center rounded-2xl transition-colors transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[var(--brand-from)] via-cyan-400 to-[var(--brand-to)] text-white shadow-lg shadow-cyan-500/25 hover:from-[var(--brand-from)] hover:via-cyan-500 hover:to-[var(--brand-to)] hover:shadow-cyan-400/40 ring-1 ring-white/10 hover:brightness-105 hover:scale-105",
        ghost:
          "bg-transparent border border-white/20 text-white hover:bg-white/10 dark:text-gray-100",
        subtle:
          "bg-white/10 text-white border border-white/20 hover:bg-white/20"
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(buttonStyles({ variant, size }), className)} {...props} />
    );
  }
);
Button.displayName = "Button";


