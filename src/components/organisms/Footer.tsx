export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 py-8">
      <div className="container flex flex-col items-center justify-between gap-3 text-xs text-white/70 md:flex-row">
        <p>© {new Date().getFullYear()} VeriSafari. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a className="underline" href="https://github.com/gethsun1/verisafari" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}


