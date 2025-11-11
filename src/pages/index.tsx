import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>VeriSafari</title>
        <meta name="description" content="Decentralized document verification" />
      </Head>
      <main className="container py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">VeriSafari</h1>
          <ConnectButton />
        </div>
        <section className="mt-16 space-y-6">
          <p className="text-lg">
            Upload documents, store proofs on IPFS, and anchor hashes on-chain.
          </p>
          <nav className="flex gap-4">
            <a
              href="/upload"
              className="rounded-md bg-black px-4 py-2 text-white dark:bg-white dark:text-black"
            >
              Upload
            </a>
            <a
              href="/verify"
              className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-700"
            >
              Verify
            </a>
            <a
              href="/history"
              className="rounded-md border border-gray-300 px-4 py-2 dark:border-gray-700"
            >
              History
            </a>
          </nav>
        </section>
      </main>
    </>
  );
}


