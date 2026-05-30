export function ProductSkeleton() {
  return (
    <div className="min-h-[260px] animate-pulse rounded-[8px] border border-[#e1e7dc] bg-white p-3">
      <div className="aspect-square rounded-[8px] bg-[#e8eee2]" />
      <div className="mt-4 h-4 w-4/5 rounded bg-[#e8eee2]" />
      <div className="mt-2 h-3 w-2/3 rounded bg-[#edf2e8]" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-5 w-16 rounded bg-[#e8eee2]" />
        <div className="h-9 w-20 rounded-[8px] bg-[#e8eee2]" />
      </div>
    </div>
  );
}
