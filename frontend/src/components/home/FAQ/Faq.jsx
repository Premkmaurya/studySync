import React from "react";
import FaqCard from "./FaqCard";

const qusArr = [
  {
    q: "What is Gen AI, and how can i use it?",
    ans: `Geni AI is an innovative AI-powered tool designed to enhance
            productivity and creativity. It helps users write professional
            emails, engaging blogs, and unique content in seconds. Beyond
            writing, Geni AI can generate stunning images and create custom bots
            tailored to your specific needs, such as grammar correction, travel
            planning, or automated workflows.`,
  },
  {
    q: "What is Gen AI, and how can i use it?",
    ans: `Geni AI is an innovative AI-powered tool designed to enhance
            productivity and creativity. It helps users write professional
            emails, engaging blogs, and unique content in seconds. Beyond
            writing, Geni AI can generate stunning images and create custom bots
            tailored to your specific needs, such as grammar correction, travel
            planning, or automated workflows.`,
  },
  {
    q: "What is Gen AI, and how can i use it?",
    ans: `Geni AI is an innovative AI-powered tool designed to enhance
            productivity and creativity. It helps users write professional
            emails, engaging blogs, and unique content in seconds. Beyond
            writing, Geni AI can generate stunning images and create custom bots
            tailored to your specific needs, such as grammar correction, travel
            planning, or automated workflows.`,
  },
  {
    q: "What is Gen AI, and how can i use it?",
    ans: `Geni AI is an innovative AI-powered tool designed to enhance
            productivity and creativity. It helps users write professional
            emails, engaging blogs, and unique content in seconds. Beyond
            writing, Geni AI can generate stunning images and create custom bots
            tailored to your specific needs, such as grammar correction, travel
            planning, or automated workflows.`,
  },
];

const Faq = () => {
  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <h1 className="capitalize font-semibold text-[3.5rem] text-center">
          Frquently ask questions
        </h1>
        <p className="text-md text-gray-700">
          From setup steps to feature details, our FAQs cover <br /> everything
          you need to know.
        </p>
      </div>
      <div className="w-full h-full mt-8 items-center justify-center flex flex-col gap-8">
        {qusArr.map((item, idx) => (
          <FaqCard q={item.q} ans={item.ans} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
