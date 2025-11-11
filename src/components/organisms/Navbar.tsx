import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { NavLinks } from "@/components/molecules/NavLinks";
import { ToggleTheme } from "@/components/atoms/ToggleTheme";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          VeriSafari
        </Link>
        <div className="flex items-center gap-3">
          <NavLinks />
          <div className="hidden md:block">
            <ConnectButton />
          </div>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}


