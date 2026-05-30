"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
          <svg
            className="h-20 w-20"
            viewBox="0 0 64 64"
            role="img"
            aria-label="Ahoum carrot mark"
          >
            <path
              d="M27 20c8 2 15 8 18 16L20 52c-4-12-2-24 7-32Z"
              fill="white"
            />
            <path d="M34 17c1-8 8-10 12-12 1 8-4 13-12 12Z" fill="white" />
            <path d="M39 20c4-6 10-5 15-4-4 6-9 8-15 4Z" fill="white" />
          </svg>
        </div>
        <h1 className="mt-4 text-5xl font-black">nectar</h1>
        <p className="mt-1 text-xs font-semibold uppercase text-white/80">
          online groceries
        </p>
      </section>
    </main>
  );
}
