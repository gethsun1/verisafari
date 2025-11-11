import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-white/10 px-2 py-1 text-xs text-white border border-white/20", className)}>
      {children}
    </span>
  );
}


