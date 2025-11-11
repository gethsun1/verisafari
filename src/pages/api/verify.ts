import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import crypto from "crypto";
import { ethers } from "ethers";
import cfg from "@/lib/contract-config.json";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let fileHash: string | undefined;
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      const { buffer } = await parseFile(req);
      fileHash = crypto.createHash("sha256").update(buffer).digest("hex");
    } else {
      // Expect JSON body with { fileHash }
      const bodyText = await readBody(req);
      const parsed = JSON.parse(bodyText || "{}");
      fileHash = parsed.fileHash;
    }
    if (!fileHash || typeof fileHash !== "string") {
      return res.status(400).json({ error: "fileHash required" });
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
    const result = await contract.verifyDocument(fileHash);
    // result: [bool, string, bigint]
    const valid: boolean = result[0];
    const ipfsHash: string = result[1];
    const timestamp: bigint = result[2];
    return res.status(200).json({
      valid,
      ipfsHash: valid ? ipfsHash : "",
      timestamp: valid ? Number(timestamp) : 0
    });
  } catch (err: any) {
    return res.status(400).json({ error: err?.message ?? "Verify failed" });
  }
}

async function parseFile(
  req: NextApiRequest
): Promise<{ buffer: Buffer; filename?: string }> {
  const form = formidable({ multiples: false, keepExtensions: false });
  const { files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
  const anyFile = (files as any).file;
  const file = Array.isArray(anyFile) ? anyFile[0] : anyFile;
  if (!file?.filepath) {
    throw new Error("No file provided under field name 'file'");
    }
  const buffer = await fs.readFile(file.filepath);
  return { buffer, filename: file.originalFilename };
}

async function readBody(req: NextApiRequest): Promise<string> {
  return await new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}


