import React from "react";

/**
 * DashboardSkeleton
 * Subtle skeleton loader matching the shape of the redesigned dashboard.
 */
const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-black/[0.08]">
        <div className="space-y-2">
          <div className="w-32 h-4 bg-black/10 rounded" />
          <div className="w-64 h-8 bg-black/10 rounded" />
          <div className="w-80 h-4 bg-black/10 rounded" />
        </div>
        <div className="flex gap-3">
          <div className="w-32 h-10 bg-black/10 rounded-[8px]" />
          <div className="w-32 h-10 bg-black/10 rounded-[8px]" />
        </div>
      </div>

      {/* Overview Metrics Skeleton */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-white rounded-[12px] border border-black/[0.08] p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-black/10" />
            <div className="space-y-1">
              <div className="w-10 h-5 bg-black/10 rounded" />
              <div className="w-20 h-3 bg-black/10 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning Skeleton */}
      <div className="h-28 bg-white rounded-[16px] border border-black/[0.08] p-6" />

      {/* Groups Grid Skeleton */}
      <div className="space-y-4">
        <div className="w-48 h-6 bg-black/10 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-white rounded-[16px] border border-black/[0.08] p-5" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
