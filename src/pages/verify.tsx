import { useState, useCallback } from "react";
import { motion } from "framer-motion";

type VerifyResult = {
  valid: boolean;
  ipfsHash: string;
  timestamp: number;
};

export default function VerifyPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string>("");
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (f: File) => {
    setFile(f);
    setResult(null);
    setError(null);
    setFileHash(await sha256Hex(f));
  }, []);

  const onInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) await onDrop(f);
  }, [onDrop]);

  const onDropArea = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (f) await onDrop(f);
  }, [onDrop]);

  const handleVerify = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      if (!file && !fileHash) {
        setError("Provide a file or a hash.");
        return;
      }
      let res: Response;
      if (file) {
        const form = new FormData();
        form.append("file", file, file.name);
        res = await fetch("/api/verify", { method: "POST", body: form });
      } else {
        res = await fetch("/api/verify", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ fileHash })
        });
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Verify failed");
      setResult(json as VerifyResult);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [file, fileHash]);

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Verify Document</h1>
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

      <div className="mt-6">
        <label className="block text-sm">Or paste SHA-256 hash</label>
        <input
          value={fileHash}
          onChange={(e) => setFileHash(e.target.value.trim().toLowerCase())}
          placeholder="e.g. a3f1..."
          className="mt-1 w-full rounded-md border px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleVerify}
          className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      {file && (
        <div className="mt-4 text-sm">
          Local SHA-256: <span className="font-mono break-all">{fileHash}</span>
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-2 rounded-md border p-4">
          <p className="text-sm">Valid: <span className={result.valid ? "text-green-600" : "text-red-600"}>{String(result.valid)}</span></p>
          {result.valid && (
            <>
              <p className="text-sm">
                IPFS CID: <a className="underline" href={`https://ipfs.io/ipfs/${result.ipfsHash}`} target="_blank" rel="noreferrer">{result.ipfsHash}</a>
              </p>
              <p className="text-sm">
                Timestamp: {new Date(result.timestamp * 1000).toLocaleString()}
              </p>
            </>
          )}
        </div>
      )}

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </main>
  );
}

async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}


