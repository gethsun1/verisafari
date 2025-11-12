import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/atoms/GlassPanel";
import { VerifyInput } from "@/components/molecules/VerifyInput";
import { Button } from "@/components/atoms/Button";
import toast from "react-hot-toast";

type VerifyResult = {
  valid: boolean;
  ipfsHash: string;
  timestamp: number;
  aquaCid?: string;
  aqua?: { isOk: boolean; hasGraph: boolean };
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
        toast.error("Provide a file or a hash.");
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
      if ((json as VerifyResult).valid) toast.success("Document verified");
      else toast("No matching record found");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [file, fileHash]);

  return (
    <main className="container py-10">
      <h1 className="text-2xl font-bold">Verify Document</h1>
      <GlassPanel className="mt-6 p-6">
        <div
          onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
          onDrop={onDropArea}
          className="space-y-4"
        >
          <motion.div
            className="flex h-40 items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 text-white backdrop-blur-md"
            animate={{ borderColor: dragActive ? "#06b6d4" : "rgba(255,255,255,0.3)", scale: dragActive ? 1.01 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="text-center">
              <p className="text-sm text-white/80">Drag & drop a file here</p>
              <p className="mt-1 text-xs text-white/60">or choose below</p>
              <label className="mt-3 inline-block cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white hover:bg-white/20">
                <input type="file" className="hidden" onChange={onInputChange} />
                Choose file
              </label>
            </div>
          </motion.div>

          <VerifyInput value={fileHash} onChange={(v) => setFileHash(v.trim().toLowerCase())} />

          <Button onClick={handleVerify} disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </Button>

          {file && (
            <div className="text-sm text-white/80">
              Local SHA-256: <span className="font-mono break-all">{fileHash}</span>
            </div>
          )}

          {result && (
            <GlassPanel className="p-4">
              <p className="text-sm">
                Status:{" "}
                <span className={result.valid ? "text-green-400" : "text-red-400"}>
                  {result.valid ? "Verified" : "Not Found"}
                </span>
              </p>
              {result.valid && (
                <div className="mt-2 space-y-1 text-sm">
                  <p>
                    IPFS CID:{" "}
                    <a className="underline" href={`https://ipfs.io/ipfs/${result.ipfsHash}`} target="_blank" rel="noreferrer">
                      {result.ipfsHash}
                    </a>
                  </p>
                  {!!result.aquaCid && (
                    <p>
                      Aqua CID:{" "}
                      <a className="underline" href={`https://ipfs.io/ipfs/${result.aquaCid}`} target="_blank" rel="noreferrer">
                        {result.aquaCid}
                      </a>{" "}
                      {result.aqua ? (
                        <span className={result.aqua.isOk ? "text-green-400" : "text-yellow-400"}>
                          {result.aqua.isOk ? "(Aqua verified)" : "(Aqua not verified)"}
                        </span>
                      ) : null}
                    </p>
                  )}
                  <p>Timestamp: {new Date(result.timestamp * 1000).toLocaleString()}</p>
                </div>
              )}
            </GlassPanel>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </GlassPanel>
    </main>
  );
}

async function sha256Hex(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}


