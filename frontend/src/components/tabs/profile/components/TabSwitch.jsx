
import { useSelector } from 'react-redux';

const TabSwitch = ({ tabs, activeTab, setActiveTab }) => {
  const theme = useSelector((state) => state.theme.mode);
  
  return (
    <div className="flex justify-center mb-12">
      <div className={`inline-flex items-center p-1.5 ${theme === "dark" ? "bg-zinc-900/50 border-white/5" : "bg-zinc-200/50 border-black/10"} backdrop-blur-xl border rounded-[24px] shadow-2xl`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id
                ? "bg-white text-black shadow-xl shadow-white/5 scale-105"
                : theme === "dark" ? "text-zinc-500 hover:text-white" : "text-zinc-700 hover:text-black"
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
