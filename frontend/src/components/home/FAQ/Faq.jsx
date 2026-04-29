import React from "react";
import { useSelector } from "react-redux";
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
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <p className={`text-md mt-10 ${theme === "dark" ? "text-whitesmoke" : "text-zinc-600"}`}>
          From setup steps to feature details, our FAQs cover <br /> everything
          you need to know.
        </p>
      </div>
      <div className="w-full h-full mt-8 items-center justify-center flex flex-col gap-8">
        {qusArr.map((item, idx) => (
          <FaqCard q={item.q} ans={item.ans} theme={theme} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default Faq;
