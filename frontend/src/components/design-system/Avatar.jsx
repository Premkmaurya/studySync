import React from "react";

const Avatar = ({
  src = null,
  name = "",
  size = "md", // 'sm' | 'md' | 'lg' | 'xl'
  borderColor = "#0075de",
  className = "w-14 h-14",
}) => {
  const getInitials = (n) => {
    if (!n) return "U";
    const parts = n.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const sizes = {
    sm: "w-7 h-7 text-[11px]",
    md: "w-9 h-9 text-[13px]",
    lg: "w-12 h-12 text-[15px]",
    xl: "w-16 h-16 text-[18px]",
  };

  return (
    <div
      style={{ borderColor }}
      className={`
        relative rounded-full border-2 bg-white flex items-center justify-center font-semibold text-[#000000] overflow-hidden shrink-0 select-none shadow-none
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={name || "Avatar"}
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
