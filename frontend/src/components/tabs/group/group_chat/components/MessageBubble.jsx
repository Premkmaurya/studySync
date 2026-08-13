import React from "react";
import Avatar from "../../../../design-system/Avatar";

const MessageBubble = ({ message }) => {
  const isYou = message.isYou;
  const fullName = `${message.sender?.firstname || ""} ${message.sender?.lastname || ""}`.trim() || "Member";

  return (
    <div className={`flex w-full mb-4 ${isYou ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${isYou ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar
          name={isYou ? "You" : fullName}
          size="sm"
          borderColor={isYou ? "#0075de" : "#e6f3fe"}
        />

        <div className={`flex flex-col ${isYou ? "items-end" : "items-start"}`}>
          {!isYou && (
            <span className="text-[12px] font-semibold text-[#111111] mb-1">
              {fullName}
            </span>
          )}
          <div
            className={`px-4 py-2.5 rounded-[12px] text-[14px] leading-relaxed shadow-none border ${
              isYou
                ? "bg-[#0075de] text-white border-[#0075de]"
                : "bg-white text-[#111111] border-black/[0.08]"
            }`}
          >
            {message.text}
          </div>
          <span className="text-[11px] text-[#757575] mt-1 px-1">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
