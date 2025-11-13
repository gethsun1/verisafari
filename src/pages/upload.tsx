import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import cfg from "@/lib/contract-config.json";
import { GlassPanel } from "@/components/atoms/GlassPanel";
import { UploadDropzone } from "@/components/molecules/UploadDropzone";
import { Button } from "@/components/atoms/Button";
import { ResultRow } from "@/components/molecules/ResultRow";
import toast from "react-hot-toast";

type UploadResult = {
  ipfsHash: string;
  fileHash: string;
  aquaCid: string;
};

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [busy, setBusy] = useState(false);

  const { writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash ?? undefined
  });

  const onDrop = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    setTxHash(null);
  }, []);

  const handleUpload = useCallback(async () => {
    try {
      setBusy(true);
      setError(null);
      setResult(null);
      setTxHash(null);
      if (!file) {
        toast.error("Please select a file first.");
        return;
      }
      const form = new FormData();
      form.append("file", file, file.name);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      const { ipfsHash, fileHash, aquaCid } = json as UploadResult;
      setResult({ ipfsHash, fileHash, aquaCid });
      toast.success("Uploaded to IPFS");

      if (!cfg.address || !Array.isArray(cfg.abi) || cfg.address === "0x0000000000000000000000000000000000000000") {
        setError("Contract not deployed yet. Please deploy and update config.");
        return;
      }
      const fn = Array.isArray((cfg as any).abi) ? (cfg as any).abi.find((f: any) => f?.name === "storeDocument") : null;
      const numInputs = fn?.inputs?.length ?? 3;
      const args = numInputs >= 3 ? [ipfsHash, fileHash, aquaCid] : [ipfsHash, fileHash];
      const hash = await writeContractAsync({
        address: cfg.address as `0x${string}`,
        abi: cfg.abi as any,
        functionName: "storeDocument",
        args
      });
      setTxHash(hash);
      toast.success("Transaction submitted");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
      toast.error(e?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }, [file, writeContractAsync]);

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Upload Document</h1>
      <GlassPanel className="mt-6 p-6">
        <div className="space-y-4">
          <UploadDropzone onFileSelected={onDrop} busy={busy || isConfirming} />
          {file && (
            <div className="text-sm text-white/80">
              Selected: <span className="font-mono">{file.name}</span>
            </div>
          )}
          {busy && (
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                animate={{ x: ["0%", "200%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </div>
          )}
          <div>
            <Button onClick={handleUpload} disabled={!file || isConfirming || busy}>
              {isConfirming ? "Confirming..." : "Upload & Store"}
            </Button>
          </div>
          {result && (
            <div className="mt-2 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <ResultRow label="IPFS CID" value={result.ipfsHash} link={`https://ipfs.io/ipfs/${result.ipfsHash}`} />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <ResultRow label="Aqua CID" value={result.aquaCid} link={`https://ipfs.io/ipfs/${result.aquaCid}`} />
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 md:col-span-2">
                <ResultRow label="SHA-256" value={result.fileHash} />
              </div>
            </div>
          )}
          {txHash && (
            <div className="mt-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <ResultRow label="Transaction" value={txHash} link={`https://sepolia.etherscan.io/tx/${txHash}`} />
                {isConfirmed && <div className="mt-1 text-emerald-400">Confirmed</div>}
              </div>
            </div>
          )}
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </GlassPanel>
    </main>
  );
}


