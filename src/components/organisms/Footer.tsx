import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 border-t border-white/10 bg-transparent pt-6 pb-8 text-center"
    >
      <div className="container flex flex-col items-center justify-center gap-3 text-sm text-white/70">
        <p>
          © {new Date().getFullYear()} VeriSafari. Built with 💎 on Ethereum & IPFS.
        </p>
        <a
          className="text-cyan-400 underline decoration-dotted hover:text-cyan-300"
          href="https://github.com/gethsun1/verisafari"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </a>
      </div>
    </motion.footer>
  );
}


