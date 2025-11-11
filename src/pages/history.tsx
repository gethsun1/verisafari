import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { HistoryGrid, type HistoryItem } from "@/components/organisms/HistoryGrid";
import { GlassPanel } from "@/components/atoms/GlassPanel";

type Item = {
  ipfsHash: string;
  fileHash: string;
  timestamp: number;
};

export default function HistoryPage() {
  const { address, isConnected } = useAccount();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!address) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/history?address=${address}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed");
        setItems(json.items || []);
      } catch (e: any) {
        setError(e?.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [address]);

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">My Upload History</h1>
      {!isConnected && <p className="mt-4 text-sm text-white/80">Connect your wallet to view history.</p>}
      {isConnected && (
        <div className="mt-6 space-y-4">
          {loading && (
            <GlassPanel className="p-4 text-sm text-white/80">Loading...</GlassPanel>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
          {items.length === 0 && !loading && <GlassPanel className="p-4 text-sm text-white/80">No items</GlassPanel>}
          {items.length > 0 && <HistoryGrid items={items as HistoryItem[]} />}
        </div>
      )}
    </main>
  );
}


