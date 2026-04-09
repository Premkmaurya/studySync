
const TabSwitch = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex items-center p-1.5 bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-[24px] shadow-2xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "bg-white text-black shadow-xl shadow-white/5 scale-105"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <tab.icon size={16} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitch;
