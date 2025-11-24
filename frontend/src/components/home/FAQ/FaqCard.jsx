import React,{useState} from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";

const FaqCard = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openHandler = () =>{
        if(isOpen) setIsOpen(false)
        else setIsOpen(true)
    }

  return (
    <div className="w-[80%] p-2 rounded-xl border border-black/50">
      <div onClick={openHandler} className="w-full h-auto bg-blue-300 rounded-xl flex flex-col justify-between px-8 py-6 items-center">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl text-black/70">
            What is Geni AI, and how can it help me?
          </p>
          {!isOpen ? <FaPlus />: <FaMinus />}
        </div>
        <div onClick={openHandler} className={`mt-6 ${!isOpen ? "hidden":""}`}>
          <p>
            Geni AI is an innovative AI-powered tool designed to enhance
            productivity and creativity. It helps users write professional
            emails, engaging blogs, and unique content in seconds. Beyond
            writing, Geni AI can generate stunning images and create custom bots
            tailored to your specific needs, such as grammar correction, travel
            planning, or automated workflows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
