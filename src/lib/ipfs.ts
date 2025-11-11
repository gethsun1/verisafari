import FormData from "form-data";
export async function uploadToIPFS(buffer: Buffer, filename = "file"): Promise<string> {
  const projectId = process.env.INFURA_IPFS_PROJECT_ID;
  const projectSecret = process.env.INFURA_IPFS_PROJECT_SECRET;
  if (!projectId || !projectSecret) {
    throw new Error("Missing INFURA_IPFS_PROJECT_ID/INFURA_IPFS_PROJECT_SECRET");
  }
  const auth = Buffer.from(`${projectId}:${projectSecret}`).toString("base64");

  const form = new FormData();
  form.append("file", buffer, { filename });

  const res = await fetch("https://ipfs.infura.io:5001/api/v0/add?pin=true", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      ...form.getHeaders()
    },
    body: form as any
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`IPFS upload failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  const cid = json.Hash || json.IpfsHash || json.cid || json.Cid;
  if (!cid) {
    throw new Error("IPFS response missing CID");
  }
  return cid;
}


