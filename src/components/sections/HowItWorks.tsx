import { motion, useReducedMotion } from "framer-motion";
import { Upload, Eye, Share2 } from "lucide-react";

export function HowItWorks() {
  const shouldReduce = useReducedMotion();
  const container = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">How It Works: Your Verified Journey</h2>
          <p className="mt-3 text-white/70">Three simple steps to immutable credentials</p>
        </div>
        <motion.ol
          className="grid gap-4 md:grid-cols-3"
          variants={container}
          initial="hidden"
          animate={shouldReduce ? undefined : "show"}
          role="list"
        >
          <motion.li variants={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-white/20">01</span>
              <Upload className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Upload &amp; Sign Instantly</h3>
            <p className="mt-2 text-sm text-white/70">
              Securely upload your document. We generate a cryptographic hash and anchor it on-chain via Aqua Protocol.
            </p>
          </motion.li>
          <motion.li variants={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-white/20">02</span>
              <Eye className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Drag‑and‑Drop to Verify</h3>
            <p className="mt-2 text-sm text-white/70">
              Verify any document’s authenticity in seconds and see proof, timestamps, and IPFS CID.
            </p>
          </motion.li>
          <motion.li variants={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-white/20">03</span>
              <Share2 className="h-6 w-6 text-sky-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Share with Confidence</h3>
            <p className="mt-2 text-sm text-white/70">
              Share verifiable credentials with partners—transparent, tamper‑proof, and globally accessible.
            </p>
          </motion.li>
        </motion.ol>
      </div>
    </section>
  );
}


