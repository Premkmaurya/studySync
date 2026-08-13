import React from "react";
import Card from "../../../../../design-system/Card";

const StartCard = ({ label, value, icon: IconComponent }) => {
  return (
    <Card variant="white" className="p-5 flex flex-col gap-2">
      {IconComponent && (
        <div className="w-9 h-9 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center mb-1">
          <IconComponent className="w-4 h-4" />
        </div>
      )}
      <div className="text-[24px] font-bold text-[#000000] tracking-[-0.5px]">
        {value}
      </div>
      <div className="text-[12px] font-medium text-[#757575]">
        {label}
      </div>
    </Card>
  );
};

export default StartCard;