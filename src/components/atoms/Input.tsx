import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-400",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";


