import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { NavLinks } from "@/components/molecules/NavLinks";
import { ToggleTheme } from "@/components/atoms/ToggleTheme";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <Image src="/versafarilogo.jpeg" alt="VeriSafari logo" width={28} height={28} className="rounded-md" />
          <span>VeriSafari</span>
        </Link>
        <div className="flex items-center gap-3">
          <NavLinks />
          <ConnectButton.Custom>
            {({ account, openAccountModal, openConnectModal, mounted }) => {
              const connected = mounted && account;
              return (
                <button
                  type="button"
                  onClick={connected ? openAccountModal : openConnectModal}
                  aria-label={connected ? "Open account" : "Connect wallet"}
                  className="group relative inline-flex items-center rounded-full p-[1px] bg-gradient-to-r from-[var(--brand-from)] via-cyan-400 to-[var(--brand-to)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-sm text-white/90 backdrop-blur">
                    <span
                      className={`h-2 w-2 rounded-full ${connected ? "bg-emerald-400/80" : "bg-gray-400/80"}`}
                      aria-hidden="true"
                    />
                    {connected ? account?.displayName : "Connect Wallet"}
                  </span>
                </button>
              );
            }}
          </ConnectButton.Custom>
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}


