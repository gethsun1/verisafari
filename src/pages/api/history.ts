import type { NextApiRequest, NextApiResponse } from "next";
import { ethers } from "ethers";
import cfg from "@/lib/contract-config.json";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const address = (req.query.address as string) || "";
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return res.status(400).json({ error: "Invalid address" });
    }
    if (!cfg?.address || !Array.isArray(cfg?.abi)) {
      return res.status(500).json({ error: "Contract config missing. Deploy first." });
    }
    const rpcUrl = process.env.SEPOLIA_RPC_URL;
    if (!rpcUrl) {
      return res.status(500).json({ error: "SEPOLIA_RPC_URL missing on server" });
    }
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(cfg.address as string, cfg.abi as any, provider);
    const docs: any[] = await contract.getDocumentHistory(address);
    const items = docs.map((d) => ({
      ipfsHash: d.ipfsHash as string,
      fileHash: d.fileHash as string,
      timestamp: Number(d.timestamp)
    }));
    return res.status(200).json({ items });
  } catch (err: any) {
    return res.status(400).json({ error: err?.message ?? "History failed" });
  }
}


