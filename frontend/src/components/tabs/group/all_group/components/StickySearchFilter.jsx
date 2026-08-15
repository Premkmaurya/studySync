import React from "react";
import { Search, X } from "lucide-react";

const CATEGORIES = [
  { id: "All", label: "All Groups" },
  { id: "Engineering", label: "Engineering" },
  { id: "dsa", label: "Algorithms" },
  { id: "ai-ml", label: "AI & ML" },
  { id: "cybersecurity", label: "Security" },
  { id: "design", label: "Design" },
  { id: "other", label: "Other" },
];

/**
 * StickySearchFilter
 * Sticky control bar containing the wide search bar and category filter pill triggers.
 */
const StickySearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="sticky top-18 sm:top-20 z-30 bg-[#f6f5f4]/95 backdrop-blur-md py-3.5 border-b border-black/[0.08] mb-8 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Wide Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#757575]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search study groups, subjects, or interests..."
            data-cursor-ignore="true"
            className="w-full pl-10 pr-10 py-2.5 bg-white rounded-[12px] border border-black/[0.12] text-[13px] sm:text-[14px] text-[#111111] placeholder-[#757575] focus:outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20 transition-all duration-150 shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              data-cursor-ignore="true"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#757575] hover:text-[#111111]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none shrink-0" aria-label="Filter groups by category">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                data-cursor-ignore="true"
                className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-semibold transition-all duration-150 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-[#0075de] text-white shadow-2xs"
                    : "bg-white/80 hover:bg-white text-[#615d59] hover:text-[#111111] border border-black/[0.08]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default StickySearchFilter;
