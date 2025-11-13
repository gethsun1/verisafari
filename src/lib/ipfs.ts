import FormData from "form-data";

/**
 * Uploads a file buffer to IPFS via Pinata.
 * Priority auth is PINATA_JWT (recommended). Falls back to PINATA_API_KEY + PINATA_API_SECRET if JWT is not set.
 * Returns the CID string.
 */
export async function uploadToIPFS(buffer: Buffer, filename = "file"): Promise<string> {
  const jwt = process.env.PINATA_JWT;
  const apiKey = process.env.PINATA_API_KEY;
  const apiSecret = process.env.PINATA_API_SECRET;

  if (!jwt && !(apiKey && apiSecret)) {
    throw new Error("Missing PINATA_JWT or PINATA_API_KEY/PINATA_API_SECRET");
  }

  const form = new FormData();
  form.append("file", buffer, { filename });

  // Optional: basic metadata to help locate files in Pinata UI
  const metadata = JSON.stringify({ name: filename });
  form.append("pinataMetadata", metadata, { contentType: "application/json" });

  const headers: Record<string, string> = { ...(form as any).getHeaders?.() };
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  } else if (apiKey && apiSecret) {
    headers.pinata_api_key = apiKey;
    headers.pinata_secret_api_key = apiSecret;
  }

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers,
    body: form as any
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Pinata upload failed: ${res.status} ${text}`);
  }

  // Pinata response: { IpfsHash, PinSize, Timestamp, isDuplicate? }
  const json = (await res.json()) as any;
  const cid = json?.IpfsHash || json?.Hash || json?.cid;
  if (!cid || typeof cid !== "string") {
    throw new Error("Pinata response missing IpfsHash");
  }
  return cid;
}


