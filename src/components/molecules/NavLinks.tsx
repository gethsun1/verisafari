import Link from "next/link";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const links = [
  { href: "/upload", label: "Upload" },
  { href: "/verify", label: "Verify" },
  { href: "/history", label: "History" }
];

export function NavLinks() {
  const router = useRouter();
  return (
    <nav className="hidden items-center gap-3 md:flex" aria-label="Main navigation">
      {links.map((l) => {
        const active = router.pathname === l.href;
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-xl px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
              active && "bg-white/15 text-white"
            )}
            aria-current={active ? "page" : undefined}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}


