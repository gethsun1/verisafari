import { Button } from "@/components/atoms/Button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24">
      <AnimatedBg />
      <div className="container relative z-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-6xl">
          Verify Trust. Preserve Truth.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/80">
          Upload documents, store immutable proofs on IPFS, and anchor authenticity on-chain — all in one click.
        </p>
        <div className="mt-8">
          <a href="/upload">
            <Button size="lg">Get Started</Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function AnimatedBg() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ y: [0, 20, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ y: [0, -15, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
    </div>
  );
}


