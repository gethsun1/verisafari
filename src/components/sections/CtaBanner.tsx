import { Button } from "@/components/atoms/Button";

export function CtaBanner() {
  return (
    <section id="get-started" className="py-16 md:py-24">
      <div className="container text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          Stop Leaving Tracks, Start Minting Them
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-white/70">
          Join the VeriSafari community. Claim your verifiable credential today and experience
          the future of event authentication.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="/upload">
            <Button size="lg" className="px-6">
              Claim Your Credential Now
            </Button>
          </a>
          <a href="/verify">
            <Button variant="subtle" size="lg" className="px-6">
              See It In Action
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}


