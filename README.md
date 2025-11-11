## VeriSafari

Decentralized document verification using IPFS + Ethereum (Sepolia).

### Prerequisites
- Node.js 18+ and npm
- Sepolia RPC endpoint (Alchemy/Infura)
- Wallet private key (funded on Sepolia) for deployment
- Infura IPFS Project ID/Secret
- WalletConnect Cloud Project ID (for RainbowKit)

### Setup
1) Install:
```bash
npm install
```

2) Environment variables
- Create `.env` (server-only) and `.env.local` if you prefer:
```env
SEPOLIA_RPC_URL=...
PRIVATE_KEY=0x...
INFURA_IPFS_PROJECT_ID=...
INFURA_IPFS_PROJECT_SECRET=...

NEXT_PUBLIC_WC_PROJECT_ID=...
NEXT_PUBLIC_ALCHEMY_API_KEY=... # optional
```

3) Compile and deploy the contract to Sepolia:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```
This writes `src/lib/contract-config.json` with `{ address, chainId, abi }`.

4) Run locally:
```bash
npm run dev
```
Visit http://localhost:3000

### Usage
- Upload: `/upload`
  - Drag & drop file → server computes SHA-256, uploads file to IPFS → UI asks wallet to call `storeDocument(ipfsHash, fileHash)` on Sepolia.
- Verify: `/verify`
  - Drag & drop file (or paste hash) → server checks `verifyDocument(hash)` → returns validity, IPFS CID, timestamp.
- History: `/history`
  - Connect wallet → lists your on-chain history via `getDocumentHistory(address)`.

### API Endpoints
- POST `/api/upload` multipart field `file` → `{ ipfsHash, fileHash }`
- POST `/api/verify` multipart `file` or JSON `{ fileHash }` → `{ valid, ipfsHash, timestamp }`
- GET `/api/history?address=0x...` → `{ items: { ipfsHash, fileHash, timestamp }[] }`

### Deploy Frontend (Vercel)
1) Ensure a production build works:
```bash
npm run build
```
2) Set Vercel env vars:
   - `NEXT_PUBLIC_WC_PROJECT_ID`
   - `NEXT_PUBLIC_ALCHEMY_API_KEY` (optional)
   - `SEPOLIA_RPC_URL`
   - `INFURA_IPFS_PROJECT_ID`
   - `INFURA_IPFS_PROJECT_SECRET`
3) Deploy:
```bash
# using Vercel CLI
vercel --prod --confirm
```

### Notes
- Hash format: SHA-256, lowercase hex, compared as exact string.
- IPFS upload is server-side; secrets never exposed to the client.
- Contract network: Sepolia (chainId 11155111).


