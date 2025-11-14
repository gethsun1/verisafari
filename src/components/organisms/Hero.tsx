import { Button } from "@/components/atoms/Button";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="relative overflow-hidden py-24">
      <AmbientGradient reduceMotion={Boolean(shouldReduceMotion)} />
      <div className="container relative z-10 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-from)] via-cyan-400 to-[var(--brand-to)] animate-text"
          >
            Verify Trust. Preserve Truth.
          </motion.h1>
          <motion.p variants={item} className="mx-auto mt-4 max-w-2xl text-white/80">
            Upload documents, store immutable proofs on IPFS, and anchor authenticity on-chain, all in one click.
          </motion.p>
          <motion.p
            variants={item}
            className="mx-auto mt-3 max-w-xl italic text-sm text-white/60"
          >
            Powered by Ethereum · Secured by IPFS · Designed with Trust.
          </motion.p>
          <motion.div variants={item} className="mt-8">
            <a href="/upload">
              <Button size="lg" className="transition-transform hover:scale-105">
                Get Started
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AmbientGradient({ reduceMotion }: { reduceMotion?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 18, 0], scale: [1, 1.05, 1] }
        }
        transition={reduceMotion ? undefined : { duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-6rem] left-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -14, 0], scale: [1, 1.06, 1] }
        }
        transition={reduceMotion ? undefined : { duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-10 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, 10, 0], x: [0, -8, 0] }
        }
        transition={reduceMotion ? undefined : { duration: 16, repeat: Infinity }}
      />
    </div>
  );
}


