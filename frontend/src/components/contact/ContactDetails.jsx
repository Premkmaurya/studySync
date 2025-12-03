import React from "react";

const details = [
  {
    value: "+1234567890",
    imgSrc: "https://framerusercontent.com/images/2JsO0XAvOzDbHbqGwSK7qI4BkQ.svg",
    desc: "Reach out to us for more information.",
  },
  {
    desc: "Receive prompt assistance for urgant issues.",
    value: "example@example.com",
    imgSrc: "https://framerusercontent.com/images/LgWMkNgjOs1gjikyN4KvZfWTALY.svg",
  },
  {
    desc: "24 gomtinagar, Lucknow, UP",
    value: "Gen AI Tech",
    imgSrc: "https://framerusercontent.com/images/HGVab5MUMEFY22PD7B7YACPVjy0.svg",
  },
];

const ContactDetails = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full ml-[6vw]">
      {details.map((detail, index) => (
        <div key={index} className="text-black flex w-[80%] rounded-2xl p-2 border border-gray-300 flex-col gap-2 mb-6 shadow-xl">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 shadow-xl py-4">
            <img
              src={detail.imgSrc}
              alt={detail.label}
              className="w-24 h-24 object-contain rounded-xl shadow-2xl"
            />
            <h1 className="leading-tighter text-2xl">{detail.value}</h1>
            <div className="text-center text-lg text-gray-500">{detail.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactDetails;
