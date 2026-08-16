import React, { forwardRef } from "react";
import { Search, X } from "lucide-react";

export const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      type = "text",
      className = "",
      containerClassName = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
        {label && (
          <label className="text-[13px] font-medium text-[#111111] select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {Icon && (
            <div className="absolute left-3 text-[#757575] pointer-events-none flex items-center justify-center">
              <Icon className="w-16 h-16" />
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={`
              w-full bg-white text-[#111111] placeholder-[#757575] text-[14px]
              px-3.5 py-2 rounded-[8px] border border-black/[0.12]
              transition-all duration-150 outline-none
              focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20
              disabled:bg-black/[0.03] disabled:cursor-not-allowed
              ${Icon ? "pl-9" : ""}
              ${error ? "border-[#e32d14] focus:border-[#e32d14] focus:ring-[#e32d14]/20" : ""}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-[12px] text-[#e32d14] font-medium">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-[12px] text-[#757575]">{helperText}</span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const SearchInput = forwardRef(
  (
    {
      value,
      onChange,
      onClear,
      placeholder = "Search...",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative flex items-center w-full ${className}`}>
        <Search className="absolute left-3.5 w-16 h-16 text-[#757575] pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-white text-[#111111] placeholder-[#757575] text-[14px] pl-10 pr-9 py-2 rounded-[8px] border border-black/[0.12] transition-all duration-150 outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
          {...props}
        />
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1 rounded-full text-[#757575] hover:text-black hover:bg-black/5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default Input;
