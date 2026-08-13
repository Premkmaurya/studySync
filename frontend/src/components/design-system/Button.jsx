import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Button Component (Level 1 Micro-interaction System)
 * Restrained micro-interactions:
 * - Primary: -1px translateY on hover, subtle brightness shift, arrow translation (3-4px)
 * - Secondary/Ghost/Outlined: border/text transition with subtle translation
 */
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
    "group relative inline-flex items-center justify-center font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-[#0075de] text-white hover:bg-[#097fe8] active:bg-[#0060b8] hover:-translate-y-0.5 active:translate-y-0 rounded-[8px] shadow-sm hover:shadow",
    ghost:
      "bg-[#e6f3fe] text-[#0075de] hover:bg-[#d4ebfe] active:bg-[#c2e2fe] hover:-translate-y-0.5 active:translate-y-0 rounded-[8px]",
    text:
      "bg-transparent text-[#000000]/90 hover:bg-black/5 active:bg-black/10 rounded-[8px]",
    outlined:
      "bg-transparent text-[#000000]/90 border border-black/15 hover:border-black/30 hover:bg-black/5 active:bg-black/10 rounded-[8px]",
    danger:
      "bg-[#e32d14] text-white hover:bg-[#f64932] active:bg-[#c1220c] hover:-translate-y-0.5 active:translate-y-0 rounded-[8px]",
  };

  const sizes = {
    sm: "text-[12px] px-3 py-1 gap-1.5 min-h-[32px]",
    md: "text-[14px] px-4 py-1.5 gap-2 min-h-[38px]",
    lg: "text-[15px] px-6 py-2.5 gap-2.5 min-h-[44px]",
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
        <Loader2 className="w-5 h-5 animate-spin text-current" />
      ) : (
        <>
          {Icon && iconPosition === "left" && (
            <Icon className={`${size === "lg" ? "w-5 h-5" : "w-4.5 h-4.5"} shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5`} />
          )}
          <span>{children}</span>
          {Icon && iconPosition === "right" && (
            <Icon className={`${size === "lg" ? "w-5 h-5" : "w-4.5 h-4.5"} shrink-0 transition-transform duration-200 group-hover:translate-x-1`} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;
