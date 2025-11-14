import { ShieldCheck, Link2, Zap, Globe2, Eye, Rocket } from "lucide-react";

const FEATURES = [
  { icon: ShieldCheck, title: "Cryptographically Secure", body: "Your credentials are signed with advanced cryptography." },
  { icon: Link2, title: "Blockchain‑Anchored", body: "Anchored on-chain for permanent, immutable verification." },
  { icon: Zap, title: "Instant Verification", body: "Verify in seconds with transparent status indicators." },
  { icon: Globe2, title: "Universal Verification", body: "Anyone can verify without special accounts or apps." },
  { icon: Eye, title: "Complete Transparency", body: "Audit history, timestamps, and proof of authenticity." },
  { icon:  Rocket, title: "Web3 Ready", body: "Built for decentralized identity and on‑chain apps." }
];

export function WhyChoose() {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Why Choose VeriSafari?</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex items-start gap-3">
                <Icon className="h-6 w-6 text-sky-400 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-white/70">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


