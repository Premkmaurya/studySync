import React from "react";
import FaqCard from "./FaqCard";

const Faq = () => {
  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <h1 className="captialize text-4xl text-center">
          Frquently ask questions
        </h1>
        <p className="text-md text-gray-700">
          From setup steps to feature details, our FAQs cover <br /> everything
          you need to know.
        </p>
      </div>
      <div className="w-full h-full items-center justify-center flex flex-col gap-8">
        <FaqCard />
        <FaqCard />
      </div>
    </div>
  );
};

export default Faq;
