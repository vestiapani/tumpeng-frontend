export default function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E5E0D5] bg-white p-4">
      <div className="skeleton-shimmer h-48 w-full rounded-xl" />
      <div className="mt-4 space-y-2.5">
        <div className="skeleton-shimmer h-5 w-3/4 rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-1/2 rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-2/3 rounded-md" />
        <div className="skeleton-shimmer h-3.5 w-3/5 rounded-md" />
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[#F0ECE3] pt-4">
        <div className="skeleton-shimmer h-6 w-24 rounded-md" />
        <div className="skeleton-shimmer h-9 w-36 rounded-full" />
      </div>
    </div>
  );
}
