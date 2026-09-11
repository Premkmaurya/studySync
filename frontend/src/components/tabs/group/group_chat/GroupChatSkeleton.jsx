import React from "react";
import { Skeleton } from "../../../design-system/States";

/**
 * GroupChatSkeleton
 * Suspense placeholder for the Chat tab.
 * Mirrors the GroupChat layout: header + message feed + composer.
 */
const GroupChatSkeleton = () => (
  <div className="flex flex-col h-[calc(100vh-64px)] w-full max-w-5xl mx-auto p-3 sm:p-6 animate-pulse min-w-0">
    {/* Page header */}
    <div className="flex items-start justify-between gap-4 pb-6 border-b border-black/[0.08]">
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="w-16 h-4 rounded-full" />
        <Skeleton className="w-48 h-8 rounded-[8px]" />
        <Skeleton className="w-64 h-4 rounded-full mt-1" />
      </div>
      <Skeleton className="w-36 h-6 rounded-full shrink-0 mt-2" />
    </div>

    {/* Message feed */}
    <div className="flex-1 w-full min-w-0 my-4 sm:my-6 p-3 sm:p-4 bg-white border border-black/[0.08] rounded-[12px] flex flex-col justify-end gap-4 min-h-[330px]">
      <div className="flex items-end gap-2">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
        <Skeleton className="w-48 h-10 rounded-[10px]" />
      </div>
      <div className="flex items-end gap-2">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
        <Skeleton className="w-64 h-10 rounded-[10px]" />
      </div>
      <div className="flex items-end justify-end gap-2">
        <Skeleton className="w-56 h-10 rounded-[10px]" />
      </div>
      <div className="flex items-end justify-end gap-2">
        <Skeleton className="w-40 h-10 rounded-[10px]" />
      </div>
      <div className="flex items-end gap-2">
        <Skeleton className="w-8 h-8 rounded-full shrink-0" />
        <Skeleton className="w-52 h-10 rounded-[10px]" />
      </div>
    </div>

    {/* Message composer */}
    <div className="flex w-full min-w-0 items-center gap-1.5 sm:gap-2 p-2 bg-white border border-black/[0.12] rounded-[12px] min-h-[64px]">
      <Skeleton className="flex-1 h-10 rounded-[8px]" />
      <Skeleton className="w-8 h-8 rounded-[6px] shrink-0" />
      <Skeleton className="w-20 h-8 rounded-[8px] shrink-0" />
    </div>
  </div>
);

export default GroupChatSkeleton;
