import React from "react";
import { Skeleton } from "../../../design-system/States";

/**
 * GroupSettingsSkeleton
 * Suspense / data-loading placeholder for the Settings tab.
 * Mirrors the GroupSettings layout: page header + two card sections.
 */
const GroupSettingsSkeleton = () => (
  <div className="p-6 md:p-10 max-w-5xl mx-auto flex flex-col gap-8 animate-pulse">
    {/* Page header */}
    <div className="flex flex-col gap-2 pb-6 border-b border-black/[0.08]">
      <Skeleton className="w-16 h-4 rounded-full" />
      <Skeleton className="w-44 h-8 rounded-[8px]" />
      <Skeleton className="w-80 h-4 rounded-full mt-1" />
    </div>

    {/* Identity settings card */}
    <div className="bg-white rounded-[12px] border border-black/[0.08] p-6 md:p-8 flex flex-col gap-6">
      <div className="border-b border-black/[0.06] pb-4 flex flex-col gap-1.5">
        <Skeleton className="w-36 h-5 rounded" />
        <Skeleton className="w-64 h-4 rounded-full" />
      </div>
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <Skeleton className="w-24 h-3.5 rounded-full" />
            <Skeleton className="w-full h-9 rounded-[8px]" />
          </div>
        ))}
        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <Skeleton className="w-32 h-4 rounded-full" />
          <Skeleton className="w-28 h-9 rounded-[8px]" />
        </div>
      </div>
    </div>

    {/* Danger zone card */}
    <div className="bg-white rounded-[12px] border border-black/[0.08] p-6 md:p-8 flex flex-col gap-4">
      <div className="border-b border-black/[0.06] pb-4 flex flex-col gap-1.5">
        <Skeleton className="w-28 h-5 rounded" />
        <Skeleton className="w-56 h-4 rounded-full" />
      </div>
      <div className="flex items-center justify-between py-2">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="w-32 h-4 rounded" />
          <Skeleton className="w-52 h-3.5 rounded-full" />
        </div>
        <Skeleton className="w-28 h-9 rounded-[8px]" />
      </div>
    </div>
  </div>
);

export default GroupSettingsSkeleton;
