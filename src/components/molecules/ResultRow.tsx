import { Clipboard, Check } from "lucide-react";
import { useState } from "react";

export function ResultRow({ label, value, link }: { label: string; value: string; link?: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };
  const content = link ? (
    <a className="underline" href={link} target="_blank" rel="noreferrer">
      {value}
    </a>
  ) : (
    <span className="break-all">{value}</span>
  );
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-white/70">{label}</span>
      <div className="flex items-center gap-2">
        <div className="max-w-[60ch] truncate font-mono text-xs">{content}</div>
        <button
          onClick={onCopy}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20"
          aria-label="Copy"
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
    </div>
  );
}


