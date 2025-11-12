import Aquafier, {
  type AquaTree,
  type FileObject,
  type LogData,
  isErr,
  type CredentialsData,
  type VerificationGraphData
} from "aqua-js-sdk";
import { uploadToIPFS } from "@/lib/ipfs";

type CreateAquaResult = {
  aquaTree: AquaTree;
  aquaCid: string;
  logs: LogData[];
};

type VerifyAquaResult = {
  isOk: boolean;
  logs: LogData[];
  graph?: VerificationGraphData;
};

export async function createAquaGenesisAndUpload(buffer: Buffer, filename: string): Promise<CreateAquaResult> {
  const aquafier = new Aquafier();
  const fileObject: FileObject = {
    fileName: filename,
    // SDK accepts Uint8Array for binary; Buffer is a Uint8Array view
    fileContent: new Uint8Array(buffer),
    path: `/${filename}`
  };
  const result = await aquafier.createGenesisRevision(fileObject, false, false, true);
  if (isErr(result)) {
    const errLogs = result.data ?? [];
    const message = errLogs?.map((l) => l.log).join(" | ") || "Aqua genesis creation failed";
    throw new Error(message);
  }
  const { aquaTree, logData } = result.data;
  if (!aquaTree) {
    throw new Error("Aqua tree missing from result");
  }
  const json = Buffer.from(JSON.stringify(aquaTree), "utf-8");
  const aquaCid = await uploadToIPFS(json, `${filename}.aqua.json`);
  return { aquaTree, aquaCid, logs: logData ?? [] };
}

export async function verifyAquaFromIpfsCid(aquaCid: string): Promise<VerifyAquaResult> {
  const gatewayUrl = `https://ipfs.io/ipfs/${aquaCid}`;
  const res = await fetch(gatewayUrl);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch aqua.json failed: ${res.status} ${text}`);
  }
  const aquaTree = (await res.json()) as AquaTree;
  const aquafier = new Aquafier();
  const credentials: CredentialsData = {
    mnemonic: process.env.AQUA_MNEMONIC || "",
    nostr_sk: process.env.AQUA_NOSTR_SK || "",
    did_key: process.env.AQUA_DID_KEY || "",
    alchemy_key: process.env.ALCHEMY_API_KEY || "",
    witness_eth_network: process.env.AQUA_WITNESS_NETWORK || "sepolia",
    witness_method: process.env.AQUA_WITNESS_METHOD || "cli"
  };
  // We pass empty linked files; AquaTree should embed necessary file_index
  const verifyResult = await aquafier.verifyAndGetGraphData(aquaTree, [], credentials);
  if (isErr(verifyResult)) {
    return { isOk: false, logs: verifyResult.data || [] };
  }
  const graph = verifyResult.data;
  return { isOk: true, logs: [], graph };
}

export function buildAquaCredentials(): CredentialsData {
  return {
    mnemonic: process.env.AQUA_MNEMONIC || "",
    nostr_sk: process.env.AQUA_NOSTR_SK || "",
    did_key: process.env.AQUA_DID_KEY || "",
    alchemy_key: process.env.ALCHEMY_API_KEY || "",
    witness_eth_network: process.env.AQUA_WITNESS_NETWORK || "sepolia",
    witness_method: process.env.AQUA_WITNESS_METHOD || "cli"
  };
}


