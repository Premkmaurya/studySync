import React from "react";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const BottomRight = () => {
  return (
    <div
      className="absolute bottom-0 flex justify-end pr-8 items-end gap-5 right-0 w-[40vw] h-[40vh] "
      style={{
        WebkitMaskImage: "url('/img/card-mask.svg')",
        maskImage: "url('/img/card-mask.svg')",
        WebkitMaskSize: "cover",
        maskSize: "cover",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        backgroundImage: "url('/img/your-hero-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "white", // the card is white except transparent holes
      }}
    >
      <div className="w-[30%] h-10 flex gap-8 items-center mb-10 justify-center pr-5">
        <a href="">
          <FaInstagram size={22} />
        </a>
        <a href="">
          <FaGithub size={22} />
        </a>
        <a href="">
          <FaLinkedin size={22} />
        </a>
      </div>
    </div>
  );
};

export default BottomRight;
