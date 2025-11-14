import Head from "next/head";
import { Hero } from "@/components/organisms/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PerfectFor } from "@/components/sections/PerfectFor";
import { Comparison } from "@/components/sections/Comparison";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { CtaBanner } from "@/components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Head>
        <title>VeriSafari</title>
        <meta name="description" content="Decentralized document verification" />
      </Head>
      <Hero />
      <HowItWorks />
      <PerfectFor />
      <Comparison />
      <WhyChoose />
      <CtaBanner />
    </>
  );
}


