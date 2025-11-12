import { GlassPanel } from "@/components/atoms/GlassPanel";
import { ResultRow } from "@/components/molecules/ResultRow";

export type HistoryItem = {
  ipfsHash: string;
  fileHash: string;
  aquaCid?: string;
  timestamp: number;
};

export function HistoryGrid({ items }: { items: HistoryItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {items.map((it, idx) => (
        <GlassPanel key={idx} className="p-4">
          <div className="space-y-2">
            <ResultRow label="CID" value={it.ipfsHash} link={`https://ipfs.io/ipfs/${it.ipfsHash}`} />
            {it.aquaCid ? <ResultRow label="Aqua CID" value={it.aquaCid} link={`https://ipfs.io/ipfs/${it.aquaCid}`} /> : null}
            <ResultRow label="SHA-256" value={it.fileHash} />
            <div className="flex justify-between text-sm text-white/80">
              <span>Timestamp</span>
              <span>{new Date(it.timestamp * 1000).toLocaleString()}</span>
            </div>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
}


