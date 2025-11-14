import { CheckCircle2, XCircle } from "lucide-react";

export function Comparison() {
  return (
    <section className="py-16 md:py-24">
      <div className="container grid gap-10 md:grid-cols-2 items-start">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Your Journey Deserves a Ledger</h2>
          <p className="mt-3 text-white/70">
            Your journey—from securing your ticket and lodging to speaking on stage—still relies on old world’s fragile paper
            trails and unverifiable forms.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Fragile Paper Trails",
              "Unverifiable Forms",
              "No Proof of Authenticity",
              "Manual Verification"
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-white/80">
                <XCircle className="mt-0.5 h-5 w-5 text-red-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">VeriSafari Credentials</h2>
          <p className="mt-3 text-white/70">
            Using Aqua Protocol, we transform your essential documents—tickets, speaker applications, and ID proofs—into
            cryptographically signed, on‑chain credentials.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Cryptographically Signed",
              "Blockchain‑Anchored",
              "Tamper‑Proof & Immutable",
              "Instantly Verifiable"
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-white/80">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


