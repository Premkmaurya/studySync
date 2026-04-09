import React from "react";

const details = [
  {
    value: "+1234567890",
    imgSrc: "https://framerusercontent.com/images/2JsO0XAvOzDbHbqGwSK7qI4BkQ.svg",
    desc: "Reach out to us for more information.",
  },
  {
    desc: "Receive prompt assistance for urgent issues.",
    value: "example@example.com",
    imgSrc: "https://framerusercontent.com/images/LgWMkNgjOs1gjikyN4KvZfWTALY.svg",
  },
  {
    desc: "24 Gomti Nagar, Lucknow, UP",
    value: "Gen AI Tech",
    imgSrc: "https://framerusercontent.com/images/HGVab5MUMEFY22PD7B7YACPVjy0.svg",
  },
];

const ContactDetails = () => {
  return (
    <>
      {details.map((detail, index) => (
        <div 
          key={index} 
          className="flex flex-col items-center justify-center text-center gap-4 p-8 rounded-[32px] bg-white/[0.02] border border-white/5 shadow-2xl transition-all hover:bg-white/[0.04]"
        >
          <div className="mb-2">
            <img src={detail.imgSrc} alt="Icon" className="w-16 h-16 object-contain opacity-90" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight break-all">{detail.value}</h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-[200px]">{detail.desc}</p>
        </div>
      ))}
    </>
  );
};

export default ContactDetails;
