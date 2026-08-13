import React from "react";
import Pill from "../design-system/Pill";
import Card from "../design-system/Card";

const HeroSection = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 text-center mb-16">
      <div className="flex justify-center mb-6">
        <Pill variant="sky" size="md">
          Platform Mission
        </Pill>
      </div>

      <h1 className="text-[40px] md:text-[56px] font-bold tracking-[-1.5px] text-[#000000] leading-tight mb-6">
        Collaborative Knowledge, Amplified.
      </h1>

      <Card variant="white" className="p-8 max-w-2xl mx-auto">
        <p className="font-serif text-[18px] md:text-[20px] text-[#111111] italic leading-relaxed">
          "We believe effective learning isn't driven by isolated effort, but by the seamless, structured synthesis of shared notes and collective group intelligence."
        </p>
      </Card>
    </section>
  );
};

export default HeroSection;
