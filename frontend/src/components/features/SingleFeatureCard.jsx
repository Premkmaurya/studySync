import React from "react";
import Card from "../design-system/Card";
import Button from "../design-system/Button";
import { ArrowRight } from "lucide-react";

const SingleFeatureCard = ({ title, desc, icon: IconComponent }) => {
  return (
    <Card variant="white" className="p-6 md:p-8 flex flex-col justify-between h-full group">
      <div>
        {IconComponent && (
          <div className="w-10 h-10 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center mb-4">
            <IconComponent className="w-5 h-5" />
          </div>
        )}
        <h3 className="text-[20px] font-bold text-[#000000] tracking-[-0.3px] mb-2">
          {title}
        </h3>
        <p className="text-[14px] text-[#615d59] leading-relaxed mb-4">
          {desc}
        </p>
      </div>

      <div className="pt-2">
        <Button variant="text" size="sm" icon={ArrowRight} iconPosition="right">
          Learn feature
        </Button>
      </div>
    </Card>
  );
};

export default SingleFeatureCard;
