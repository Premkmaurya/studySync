import React from "react";

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      {Icon && (
        <div className="p-2.5 rounded-[8px] bg-[#e6f3fe] text-[#0075de]">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div>
        <h3 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
          {title}
        </h3>
        {description && (
          <p className="text-[14px] text-[#615d59] mt-0.5 max-w-md leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
