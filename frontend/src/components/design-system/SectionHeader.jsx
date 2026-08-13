import React from "react";

export const SectionHeader = ({
  eyebrow,
  title,
  description,
  align = "left", // 'left' | 'center'
  className = "",
  titleClassName = "",
}) => {
  const alignmentClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-2.5 max-w-3xl ${alignmentClass} ${className}`}>
      {eyebrow && (
        <span className="text-[13px] font-semibold uppercase tracking-wider text-[#0075de]">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={`text-[32px] sm:text-[40px] font-bold text-[#000000] leading-[1.15] tracking-[-1.2px] ${titleClassName}`}
        >
          {title}
        </h2>
      )}
      {description && (
        <p className="text-[16px] sm:text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic leading-[1.56]">
          {description}
        </p>
      )}
    </div>
  );
};

export const PageHeader = ({
  title,
  description,
  actions,
  badge,
  className = "",
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/[0.08] ${className}`}>
      <div className="flex flex-col gap-1 max-w-2xl">
        {badge && <div className="mb-1">{badge}</div>}
        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#000000] tracking-[-0.8px] leading-tight">
          {title}
        </h1>
        {description && (
          <p className="text-[14px] sm:text-[16px] text-[#615d59]">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
};

export default SectionHeader;
