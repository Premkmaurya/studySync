import React from "react";
import {
  Search,
  Filter,
  LayoutGrid,
  Code,
  Cpu,
  Shield,
  Palette,
  Globe,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  { id: "All", label: "All Hubs", icon: LayoutGrid, color: "text-white" },
  {
    id: "web-dev",
    label: "Web Engineering",
    icon: Code,
    color: "text-cyan-400",
  },
  { id: "dsa", label: "Algorithms", icon: Cpu, color: "text-amber-400" },
  {
    id: "ai-ml",
    label: "Neural Networks",
    icon: Sparkles,
    color: "text-indigo-400",
  },
  {
    id: "cybersecurity",
    label: "Security",
    icon: Shield,
    color: "text-emerald-400",
  },
  {
    id: "design",
    label: "Visual Systems",
    icon: Palette,
    color: "text-fuchsia-400",
  },
  { id: "bio", label: "Bio-Tech", icon: Globe, color: "text-emerald-300" },
  { id: "other", label: "Others", icon: Globe, color: "text-zinc-400" },
];

const Header = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <section className="mb-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6">
            Find your <br />
            <span className="text-indigo-500">Collective.</span>
          </h1>
          <p className="text-xl text-zinc-500 font-medium leading-relaxed max-w-lg">
            Connect with high-performance professional groups across
            engineering, design, and research domains.
          </p>
        </div>

        <div className="relative w-full lg:w-[400px] group">
          <div className="relative bg-transparent border-b border-white/10 py-2 pl-14 pr-8">
            <Search
              size={24}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-transparent text-lg outline-none text-white placeholder:text-zinc-800"
            />
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar"
        style={{
          willChange: "scroll-position",
          WebkitTransform: "translate3d(0,0,0)",
        }}
      >
        <div className="p-2 bg-white/5 rounded-xl text-zinc-500">
          <Filter size={16} />
        </div>
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all border-1 ${
              selectedCategory === category.id
                ? "bg-white text-black border-white"
                : "bg-white/5 text-zinc-500 border-zinc-700 hover:border-white/20"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Header;