"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="grid min-h-screen place-items-center bg-[#f6f7f2] px-5 text-[#17211a]">
          <section className="w-full max-w-md rounded-[8px] border border-[#f1c0b3] bg-white p-6 text-center shadow-sm shadow-black/5">
            <p className="text-sm font-bold text-[#b53b25]">Ahoum error</p>
            <h1 className="mt-3 text-3xl font-black">Something went wrong</h1>
            <p className="mt-3 text-sm leading-6 text-[#657160]">
              The app hit an unexpected issue. Try again to reload the current
              view.
            </p>
            <button
              className="mt-6 h-12 rounded-[8px] bg-[#315a39] px-6 text-sm font-black text-white"
              type="button"
              onClick={() => unstable_retry()}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
