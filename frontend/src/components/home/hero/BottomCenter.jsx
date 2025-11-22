import React from "react";
import CircularText from "../../react-bits-components/CircularText"
import { FaArrowDown } from "react-icons/fa";

const BottomCenter = () => {
  return (
    <div className="absolute bottom-0 left-[40%] w-[25vw] bg-white flex items-center justify-center h-[40vh]">
      <div className="rounded-[50%] w-38 h-38 relative overflow-hidden">
        <CircularText
          text="REACT*BITS*COMPONENTS*"
          onHover="speedUp"
          spinDuration={20}
          className="w-full h-full"
        />
        <div className="text-center text-lg absolute top-10 left-13 flex items-center tracking-tighter flex-col">
            Scroll <br />Down <br />
            <FaArrowDown size={20} />
        </div>
      </div>
    </div>
  );
};

export default BottomCenter;
