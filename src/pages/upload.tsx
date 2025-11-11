import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import cfg from "@/lib/contract-config.json";

type UploadResult = {
  ipfsHash: string;
  fileHash: string;
};

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);

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

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onDrop(f);
  }, [onDrop]);

  const onDropArea = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onDrop(f);
  }, [onDrop]);

  const handleUpload = useCallback(async () => {
    try {
      setError(null);
      setResult(null);
      setTxHash(null);
      if (!file) {
        setError("Please select a file first.");
        return;
      }
      const form = new FormData();
      form.append("file", file, file.name);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Upload failed");
      const { ipfsHash, fileHash } = json as UploadResult;
      setResult({ ipfsHash, fileHash });

      if (!cfg.address || !Array.isArray(cfg.abi) || cfg.address === "0x0000000000000000000000000000000000000000") {
        setError("Contract not deployed yet. Please deploy and update config.");
        return;
      }
      const hash = await writeContractAsync({
        address: cfg.address as `0x${string}`,
        abi: cfg.abi as any,
        functionName: "storeDocument",
        args: [ipfsHash, fileHash]
      });
      setTxHash(hash);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    }
  }, [file, writeContractAsync]);

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Upload Document</h1>
      <div
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDrop={onDropArea}
        className="mt-6"
      >
        <motion.div
          className="flex h-44 items-center justify-center rounded-lg border-2 border-dashed"
          animate={{ borderColor: dragActive ? "#06b6d4" : "#9ca3af", scale: dragActive ? 1.02 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">Drag & drop a file here</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">or</p>
            <label className="mt-2 inline-block cursor-pointer rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black">
              <input type="file" className="hidden" onChange={onInputChange} />
              Choose file
            </label>
          </div>
        </motion.div>
      </div>

      {file && (
        <div className="mt-6 rounded-md border p-4">
          <p className="text-sm">Selected: <span className="font-mono">{file.name}</span></p>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={handleUpload}
          className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black disabled:opacity-50"
          disabled={!file || isConfirming}
        >
          {isConfirming ? "Confirming..." : "Upload & Store"}
        </button>
      </div>

      {result && (
        <div className="mt-6 space-y-2 rounded-md border p-4">
          <p className="text-sm">
            IPFS CID: <a className="underline" href={`https://ipfs.io/ipfs/${result.ipfsHash}`} target="_blank" rel="noreferrer">{result.ipfsHash}</a>
          </p>
          <p className="text-sm break-all">SHA-256: <span className="font-mono">{result.fileHash}</span></p>
        </div>
      )}

      {txHash && (
        <div className="mt-4 text-sm">
          Tx: <a className="underline" href={`https://sepolia.etherscan.io/tx/${txHash}`} target="_blank" rel="noreferrer">{txHash}</a>
          {isConfirmed && <span className="ml-2 text-green-600">Confirmed</span>}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </main>
  );
}


