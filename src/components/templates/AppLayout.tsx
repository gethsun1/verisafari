import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}


