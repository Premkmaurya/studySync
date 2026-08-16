/* eslint-disable no-unused-vars */
import React from "react";
import Button from "./Button";
import Card from "./Card";
import { FolderOpen, AlertCircle, Loader2 } from "lucide-react";

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No items found",
  description = "There is nothing here yet. Start by creating a new entry or exploring options.",
  actionLabel = null,
  onAction = null,
  className = "",
}) => {
  return (
    <Card className={`flex flex-col items-center justify-center text-center p-10 max-w-md mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-full bg-[#e6f3fe] text-[#0075de] flex items-center justify-center mb-4">
        <Icon className="w-14 h-14" />
      </div>
      <h3 className="text-[18px] font-semibold text-[#000000] mb-1.5">{title}</h3>
      <p className="text-[14px] text-[#615d59] mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" className="px-8" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export const LoadingState = ({ message = "Loading content...", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <Loader2 className="w-8 h-8 text-[#0075de] animate-spin mb-3" />
      <span className="text-[14px] font-medium text-[#615d59]">{message}</span>
    </div>
  );
};

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn't process your request. Please try again.",
  onRetry = null,
  className = "",
}) => {
  return (
    <Card className={`border-[#e32d14]/20 bg-[#e32d14]/5 p-6 max-w-md mx-auto text-center ${className}`}>
      <div className="w-10 h-10 rounded-full bg-[#e32d14]/10 text-[#e32d14] flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="w-14 h-14" />
      </div>
      <h4 className="text-[16px] font-semibold text-[#000000] mb-1">{title}</h4>
      <p className="text-[13px] text-[#615d59] mb-4">{message}</p>
      {onRetry && (
        <Button variant="outlined" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </Card>
  );
};

export const Skeleton = ({ className = "", width, height }) => {
  return (
    <div
      style={{ width, height }}
      className={`animate-pulse bg-black/[0.06] rounded-[6px] ${className}`}
    />
  );
};
