import Head from "next/head";
import { Hero } from "@/components/organisms/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>VeriSafari</title>
        <meta name="description" content="Decentralized document verification" />
      </Head>
      <Hero />
    </>
  );
}


