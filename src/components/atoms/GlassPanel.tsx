import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}


