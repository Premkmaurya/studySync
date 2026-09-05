import React from "react";
import { Skeleton } from "../../../design-system/States";

/**
 * GroupMembersSkeleton
 * Suspense / data-loading placeholder for the Members tab.
 * Mirrors the GroupMembers layout: header + search bar + member rows.
 */
const GroupMembersSkeleton = () => (
  <div className="p-6 md:p-10 max-w-5xl mx-auto animate-pulse">
    {/* Page header */}
    <div className="flex flex-col gap-2 mb-8 pb-6 border-b border-black/[0.08]">
      <Skeleton className="w-20 h-4 rounded-full" />
      <Skeleton className="w-52 h-8 rounded-[8px]" />
      <Skeleton className="w-72 h-4 rounded-full mt-1" />
    </div>

    {/* Controls row */}
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <Skeleton className="w-full md:w-[480px] h-10 rounded-[8px]" />
      <Skeleton className="w-28 h-4 rounded-full" />
    </div>

    {/* Member list card */}
    <div className="bg-white rounded-[12px] border border-black/[0.08] p-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-2 py-3 border-b border-black/[0.06] last:border-0"
        >
          <Skeleton className="w-9 h-9 rounded-full shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <Skeleton className="w-36 h-4 rounded" />
            <Skeleton className="w-24 h-3 rounded-full" />
          </div>
          <Skeleton className="w-20 h-6 rounded-[6px] shrink-0" />
        </div>
      ))}
    </div>
  </div>
);

export default GroupMembersSkeleton;
