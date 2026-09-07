import React from "react";
import { Skeleton } from "../../../design-system/States";

/**
 * EditorAreaSkeleton
 * Shown as the <Suspense> fallback while the TipTap Editor sub-component
 * initialises. Renders a toolbar skeleton + content lines so the editor area
 * never shows as blank white space.
 *
 * This is intentionally lightweight — no heavy library imports.
 */
const EditorAreaSkeleton = () => (
  <div className="bg-white border border-black/[0.08] rounded-[12px] p-4 min-h-[500px] animate-pulse">
    {/* Toolbar skeleton */}
    <div className="sticky top-16 z-30 bg-white/95 pb-3 border-b border-black/[0.08] mb-4 flex flex-wrap gap-1.5">
      {[80, 60, 64, 72, 56, 48, 64, 52, 56, 48, 64, 56].map((w, i) => (
        <Skeleton key={i} className="h-7 rounded-[6px]" style={{ width: w }} />
      ))}
    </div>

    {/* Content lines skeleton */}
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
);

export default EditorAreaSkeleton;
