import React from "react";
import { Loader2 } from "lucide-react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // 'primary' | 'ghost' | 'text' | 'outlined' | 'danger'
  size = "md", // 'sm' | 'md' | 'lg'
  disabled = false,
  loading = false,
  className = "",
  icon: Icon = null,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de]/40 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-[#0075de] text-white hover:bg-[#097fe8] active:bg-[#0060b8] rounded-[8px] shadow-none",
    ghost:
      "bg-[#e6f3fe] text-[#0075de] hover:bg-[#d4ebfe] active:bg-[#c2e2fe] rounded-[8px]",
    text:
      "bg-transparent text-[#000000]/90 hover:bg-black/5 active:bg-black/10 rounded-[8px]",
    outlined:
      "bg-transparent text-[#000000]/90 border border-black/15 hover:bg-black/5 active:bg-black/10 rounded-[4px]",
    danger:
      "bg-[#e32d14] text-white hover:bg-[#f64932] active:bg-[#c1220c] rounded-[8px]",
  };

  const sizes = {
    sm: "text-[12px] px-3 py-1 gap-1.5 min-h-[30px]",
    md: "text-[14px] px-4 py-1.5 gap-2 min-h-[36px]",
    lg: "text-[16px] px-6 py-2.5 gap-2.5 min-h-[44px]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className={`w-4 h-4 shrink-0`} />
          )}
          <span>{children}</span>
          {Icon && iconPosition === "right" && (
            <Icon className={`w-4 h-4 shrink-0`} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
