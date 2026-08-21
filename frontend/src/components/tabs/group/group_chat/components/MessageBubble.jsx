import React from "react";
import Avatar from "../../../../design-system/Avatar";
import { Lock } from "lucide-react";

const MessageBubble = ({ message }) => {
  const isYou = message.isYou;
  const fullName = `${message.sender?.firstname || ""} ${message.sender?.lastname || ""}`.trim() || "Member";
  const isPending = message.decryptionStatus === "pending";

  return (
    <div className={`flex w-full mb-4 ${isYou ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[85%] sm:max-w-[75%] gap-3 ${isYou ? "flex-row-reverse" : "flex-row"}`}>
        <Avatar
          name={isYou ? "You" : fullName}
          size="sm"
          borderColor="#e6f3fe"
        />

        <div className={`flex flex-col ${isYou ? "items-end" : "items-start"}`}>
          {!isYou && (
            <span className="text-[12px] font-semibold text-[#111111] mb-1">
              {fullName}
            </span>
          )}
          <div
            className={`px-3 py-1.5 rounded-[12px] text-[14px] leading-relaxed shadow-none ${
              isYou
                ? "bg-transparent text-[#111111] border-none"
                : "bg-white text-[#111111] max-w-[220px]"
            }`}
          >
            {isPending ? (
              <span className="inline-flex items-center gap-1.5 text-[13px] text-[#757575] font-medium animate-pulse py-0.5">
                <Lock className="w-3.5 h-3.5 text-[#0075de]" />
                <span>Decrypting message...</span>
              </span>
            ) : (
              message.text
            )}
          </div>
          <span className="text-[11px] text-[#757575] mt-1 px-1">
            {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
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
