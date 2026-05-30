"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import bw_corrot from "@/public/bw_carrot.svg"
export function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      router.replace("/auth/onboarding");
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#53b878] px-6 text-white">
      <section className="text-center">
        <div className="mx-auto">
                <img src={bw_corrot.src} alt="Carrot Logo" className="h-full w-full" />
        </div>
      </section>
    </main>
  );
}
