import React,{useState} from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
// import {useGSAP} from "@gsap/react"

const FaqCard = ({q,ans}) => {
    const [isOpen, setIsOpen] = useState(false)

    const openHandler = () =>{
        if(isOpen) setIsOpen(false)
        else setIsOpen(true)
    }

    // useGSAP(()=>{

    // })

  return (
    <div className="w-[80%] p-2 rounded-xl hover:bg-linear-to-t from-white to-blue-100 border border-black/50 transition-all duration-125">
      <div onClick={openHandler} className="w-full h-auto border border-black/20 rounded-xl flex flex-col justify-between px-8 py-6 items-center">
        <div className="w-full flex justify-between items-center">
          <p className="text-xl text-black/70">
            {q}
          </p>
          {!isOpen ? <FaPlus size={24} color="#cccccc" />: <FaMinus size={24} color="#cccccc" />}
        </div>
        <div onClick={openHandler} className={`mt-6 transition-all duration-105 ${!isOpen ? "hidden":""}`}>
          <p>
            {ans}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
