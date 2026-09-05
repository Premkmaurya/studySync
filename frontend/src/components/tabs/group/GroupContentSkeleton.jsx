import React from "react";
import { Skeleton } from "../../design-system/States";

/**
 * GroupContentSkeleton
 * Generic pulsing placeholder rendered by the <Suspense> boundary inside
 * SingleGroup while a lazy child chunk is downloading / initialising.
 */
const GroupContentSkeleton = () => (
  <div className="p-6 md:p-10 max-w-5xl mx-auto animate-pulse">
    {/* Page header skeleton */}
    <div className="flex items-start justify-between gap-4 mb-8 pb-6 border-b border-black/[0.08]">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-20 h-4 rounded-full" />
        <Skeleton className="w-56 h-8 rounded-[8px]" />
        <Skeleton className="w-80 h-4 rounded-full mt-1" />
      </div>
      <Skeleton className="w-28 h-9 rounded-[8px] shrink-0" />
    </div>

    {/* Two-column card grid skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-[12px] border border-black/[0.08] p-5 flex flex-col gap-3 min-h-[160px]"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="w-24 h-3 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
          <Skeleton className="w-full h-5 rounded" />
          <Skeleton className="w-3/4 h-4 rounded" />
          <Skeleton className="w-full h-10 rounded mt-auto" />
        </div>
      ))}
    </div>
  </div>
);

export default GroupContentSkeleton;
