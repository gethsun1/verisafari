import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import crypto from "crypto";
import { uploadToIPFS } from "@/lib/ipfs";

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
    const { buffer, filename } = await parseFile(req);
    const fileHash = crypto.createHash("sha256").update(buffer).digest("hex");
    const ipfsHash = await uploadToIPFS(buffer, filename ?? "file");
    return res.status(200).json({ ipfsHash, fileHash });
  } catch (err: any) {
    return res.status(400).json({ error: err?.message ?? "Upload failed" });
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


