import { Skeleton } from "./Skeleton";

export function SkeletonCard({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-[28px] border border-slate-100 bg-white p-6 shadow-card ${className}`}
    >
      <Skeleton className="h-4 w-24 rounded-full" />
      <Skeleton className="mt-5 h-10 w-32 rounded-2xl" />
      <Skeleton className="mt-5 h-3 w-40 rounded-full" />
    </div>
  );
}
