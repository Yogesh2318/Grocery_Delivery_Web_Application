"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import bw_corrot from "@/public/bw_carrot.svg";

export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace("/auth/onboarding");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#53b878] px-6 text-white overflow-hidden relative">

      {/* Desktop-only decorative background circles */}
      <div className="hidden md:block absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full bg-white/10 pointer-events-none" />
      <div className="hidden md:block absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-white/10 pointer-events-none" />
      <div className="hidden md:block absolute top-1/2 left-[5%] -translate-y-1/2 w-[180px] h-[180px] rounded-full bg-white/5 pointer-events-none" />

      {/* Desktop-only top label */}
      <p className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase font-medium">
        Fresh & Healthy
      </p>

      <section className="text-center relative z-10">
        {/* Desktop: larger logo + fade-in animation + tagline */}
        <div className="mx-auto md:w-48 md:h-48 md:animate-[fadeIn_0.6s_ease-out]">
          <img
            src={bw_corrot.src}
            alt="Carrot Logo"
            className="h-full w-full md:drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          />
        </div>

        {/* Desktop-only app name + tagline below logo */}
        <div className="hidden md:block mt-6">
          <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
            Carrot
          </h1>
          <p className="mt-2 text-white/70 text-sm tracking-wide">
            Eat well, live better
          </p>
        </div>
      </section>

      {/* Desktop-only bottom credit */}
      <p className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[11px] tracking-widest uppercase">
        Loading...
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}