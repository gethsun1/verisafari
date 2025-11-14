import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mt-20 border-t border-white/10 bg-transparent pt-10 pb-10"
    >
      <div className="container grid gap-8 md:grid-cols-4 text-sm">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Image src="/versafarilogo.jpeg" alt="VeriSafari logo" width={28} height={28} className="rounded-md" />
            <span className="font-semibold">VeriSafari</span>
          </Link>
          <p className="text-white/70">
            Cryptographically verified credentials for Web3 events.
          </p>
        </div>
        <div>
          <h4 className="text-white/80 font-semibold mb-3">Product</h4>
          <ul className="space-y-2 text-white/70">
            <li><a className="hover:text-white" href="/upload">Upload</a></li>
            <li><a className="hover:text-white" href="/verify">Verify</a></li>
            <li><a className="hover:text-white" href="/history">History</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white/80 font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-white/70">
            <li><a className="hover:text-white" href="#how-it-works">About</a></li>
            <li><a className="hover:text-white" href="#features">Features</a></li>
            <li><a className="hover:text-white" href="#get-started">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white/80 font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-white/70">
            <li><a className="hover:text-white" href="#">Privacy</a></li>
            <li><a className="hover:text-white" href="#">Terms</a></li>
            <li><a className="hover:text-white" href="#">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
        <p>© {new Date().getFullYear()} VeriSafari. Powered by Aqua Protocol &amp; Ethereum.</p>
        <div className="flex items-center gap-4">
          <a className="text-cyan-400 hover:text-cyan-300" href="https://github.com/gethsun1/verisafari" target="_blank" rel="noreferrer">GitHub</a>
          <a className="text-cyan-400 hover:text-cyan-300" href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
          <a className="text-cyan-400 hover:text-cyan-300" href="https://discord.com/" target="_blank" rel="noreferrer">Discord</a>
        </div>
      </div>
    </motion.footer>
  );
}


