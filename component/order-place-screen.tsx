"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/store/user-store";

export function OrderPlaceScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const status = searchParams.get("status");
  const isFailure = status === "failure";

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/auth/splash");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f7f2] px-5 py-8 text-[#17211a]">
      <section className="w-full max-w-md rounded-[8px] border border-[#dfe7d9] bg-white p-6 text-center shadow-sm shadow-black/5">
        <div
          className={`mx-auto grid h-20 w-20 place-items-center rounded-full text-3xl font-black text-white ${
            isFailure ? "bg-[#e1593f]" : "bg-[#53b878]"
          }`}
        >
          {isFailure ? "!" : "✓"}
        </div>
        <p
          className={`mt-5 text-sm font-black ${
            isFailure ? "text-[#b53b25]" : "text-[#315a39]"
          }`}
        >
          {isFailure ? "Order failed" : "Order placed"}
        </p>
        <h1 className="mt-2 text-3xl font-black">
          {isFailure ? "Payment could not finish" : "Your order is confirmed"}
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#657160]">
          {isFailure
            ? "No order was placed. Go back to cart and try checkout again."
            : "Fresh groceries are being packed and will reach your door soon."}
        </p>
        <Link
          className="mt-6 inline-grid h-12 w-full place-items-center rounded-[8px] bg-[#53b878] text-sm font-black text-white"
          href="/main/home"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
