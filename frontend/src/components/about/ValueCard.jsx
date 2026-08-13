import React from "react";
import Card from "../design-system/Card";

const ValueCard = ({ icon: IconComponent, title, desc }) => {
  return (
    <Card variant="white" className="p-6 md:p-8 flex flex-col gap-4">
      {IconComponent && (
        <div className="w-10 h-10 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center">
          <IconComponent className="w-5 h-5" />
        </div>
      )}
      <h3 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px]">
        {title}
      </h3>
      <p className="text-[14px] text-[#615d59] leading-relaxed">
        {desc}
      </p>
    </Card>
  );
};

export default ValueCard;
