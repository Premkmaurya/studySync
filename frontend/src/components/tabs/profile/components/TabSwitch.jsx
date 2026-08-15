import React from "react";

/**
 * TabSwitch
 * Compact profile navigation tab bar.
 */
const TabSwitch = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="w-full border-b border-black/[0.08] mb-6">
      <div
        className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"
        aria-label="Profile navigation tabs"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-cursor-ignore="true"
              className={`h-9 px-3.5 py-1.5 rounded-[8px] text-[13px] font-semibold flex items-center justify-center gap-2 transition-all duration-150 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#0075de] text-white shadow-2xs"
                  : "bg-white/80 hover:bg-white text-[#615d59] hover:text-[#111111] border border-black/[0.08]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitch;
