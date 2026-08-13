import React from "react";

const Pill = ({
  children,
  variant = "sky", // 'sky' | 'marigold' | 'coral' | 'blue' | 'dark' | 'gray' | 'highlight'
  size = "md", // 'sm' | 'md' | 'lg'
  className = "",
  icon: Icon = null,
  onClick = null,
  active = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-150 select-none";

  const variants = {
    sky: "bg-[#e6f3fe] text-[#0075de]",
    marigold: "bg-[#ffb110] text-black",
    coral: "bg-[#f64932] text-white",
    blue: "bg-[#0075de] text-white",
    dark: "bg-[#02093a] text-white",
    gray: "bg-black/[0.05] text-[#615d59] hover:bg-black/[0.08] hover:text-black",
    highlight: "bg-[#f6d5b8] text-black font-semibold",
  };

  const activeStyle = active
    ? "ring-2 ring-[#0075de] bg-[#0075de] text-white"
    : "";

  const sizes = {
    sm: "text-[12px] px-2.5 py-0.5 gap-1",
    md: "text-[13px] px-3 py-1 gap-1.5",
    lg: "text-[15px] px-4 py-1.5 gap-2",
  };

  const clickableStyle = onClick ? "cursor-pointer active:scale-95" : "";

  return (
    <span
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.sky}
        ${sizes[size] || sizes.md}
        ${activeStyle}
        ${clickableStyle}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Pill;
