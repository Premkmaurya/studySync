import React from "react";

const Card = ({
  children,
  variant = "white", // 'white' | 'accent' | 'dark' | 'paper'
  accentBg = "#ffb110",
  className = "",
  padding = "p-6", // 24px default padding
  onClick = null,
  hoverable = false,
  ...props
}) => {
  const baseStyles = "rounded-[12px] transition-all duration-200";

  const variants = {
    white: "bg-white border border-black/[0.08] shadow-none text-black",
    paper: "bg-[#f6f5f4] border border-black/[0.06] text-black",
    accent: "text-black border-none",
    dark: "bg-[#02093a] text-white border-none",
  };

  const hoverStyle = hoverable
    ? "hover:border-black/20 hover:-translate-y-[1px] cursor-pointer"
    : "";

  const customStyle =
    variant === "accent" ? { backgroundColor: accentBg } : {};

  return (
    <div
      onClick={onClick}
      style={customStyle}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.white}
        ${padding}
        ${hoverStyle}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
