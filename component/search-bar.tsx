"use client";

import { useEffect, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onChange(draft.trim());
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [draft, onChange]);

  return (
    <label className="flex h-12 w-full items-center gap-3 rounded-[8px] border border-[#dce4d6] bg-white px-4 text-sm shadow-sm shadow-black/5 transition focus-within:border-[#315a39]">
      <span className="text-base text-[#315a39]" aria-hidden="true">
        Search
      </span>
      <input
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-[#17211a] outline-none placeholder:text-[#899486]"
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Search groceries"
        aria-label="Search groceries"
      />
    </label>
  );
}
