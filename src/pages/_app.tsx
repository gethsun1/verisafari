import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "@/components/templates/AppLayout";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

const config = getDefaultConfig({
  appName: "VeriSafari",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID as string,
  chains: [sepolia],
  ssr: true
});

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="verisafari-theme">
          <div className={inter.className}>
            <RainbowKitProvider>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
              <Toaster position="top-right" />
            </RainbowKitProvider>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


