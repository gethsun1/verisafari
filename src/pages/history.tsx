import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

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
      {!isConnected && <p className="mt-4 text-sm">Connect your wallet to view history.</p>}
      {isConnected && (
        <>
          {loading && <p className="mt-4 text-sm">Loading...</p>}
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <div className="mt-6 divide-y rounded-md border">
            {items.length === 0 && !loading && <p className="p-4 text-sm">No items</p>}
            {items.map((it, idx) => (
              <div key={idx} className="p-4 text-sm">
                <p className="break-all">SHA-256: <span className="font-mono">{it.fileHash}</span></p>
                <p>
                  IPFS:{" "}
                  <a className="underline" href={`https://ipfs.io/ipfs/${it.ipfsHash}`} target="_blank" rel="noreferrer">
                    {it.ipfsHash}
                  </a>
                </p>
                <p>Timestamp: {new Date(it.timestamp * 1000).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}


