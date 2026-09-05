import React from "react";
import { Skeleton } from "../../design-system/States";

/**
 * NotesEditorSkeleton
 * Shown as the <Suspense> fallback for the /note route while the TipTap /
 * Mantine rich-text editor chunk is downloading and initialising.
 * Mirrors the actual NotesEditor layout so there is no jarring layout shift
 * once the real component mounts.
 */
const NotesEditorSkeleton = () => (
  <div className="bg-[#f6f5f4] text-[#000000] min-h-screen flex flex-col animate-pulse">
    {/* Header bar skeleton */}
    <div className="sticky top-0 z-20 bg-[#f6f5f4] border-b border-black/[0.08] px-6 py-3 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-6 h-6 rounded-full" />
        <Skeleton className="w-32 h-4 rounded" />
      </div>
      <div className="flex items-center gap-3">
        <Skeleton className="w-28 h-8 rounded-[8px]" />
        <Skeleton className="w-16 h-8 rounded-[8px]" />
      </div>
    </div>

    {/* Document workspace skeleton */}
    <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-8 flex flex-col gap-6">
      {/* Title + action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-b border-black/[0.08] pb-4">
        <Skeleton className="w-72 h-10 rounded-[8px]" />
        <div className="flex items-center gap-5">
          <Skeleton className="w-36 h-9 rounded-[10px]" />
          <Skeleton className="w-20 h-9 rounded-[10px]" />
        </div>
      </div>

      {/* Editor container skeleton */}
      <div className="bg-white border border-black/[0.08] rounded-[12px] p-4 min-h-[500px]">
        {/* Toolbar skeleton */}
        <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md pb-3 border-b border-black/[0.08] mb-4 flex flex-wrap gap-1.5">
          {[80, 60, 64, 72, 56, 48, 64, 52, 56, 48, 64, 56].map((w, i) => (
            <Skeleton key={i} className="h-7 rounded-[6px]" style={{ width: w }} />
          ))}
        </div>

        {/* Content area skeleton lines */}
        <div className="flex flex-col gap-3 pt-2">
          <Skeleton className="w-3/4 h-5 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-5/6 h-4 rounded" />
          <div className="mt-2" />
          <Skeleton className="w-2/3 h-4 rounded" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-4/5 h-4 rounded" />
          <div className="mt-2" />
          <Skeleton className="w-full h-4 rounded" />
          <Skeleton className="w-3/4 h-4 rounded" />
        </div>
      </div>
    </div>
  </div>
);

export default NotesEditorSkeleton;
