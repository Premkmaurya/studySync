import React from "react";
import Pill from "../../../design-system/Pill";

const TabSwitch = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
      {tabs.map((tab) => (
        <Pill
          key={tab.id}
          variant={activeTab === tab.id ? "blue" : "gray"}
          size="md"
          icon={tab.icon}
          active={activeTab === tab.id}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Pill>
      ))}
    </div>
  );
};

export default TabSwitch;
