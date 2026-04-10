import React from "react";

const Header = ({ members, notes }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
      <div>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
          Collective
        </h1>
      </div>

      <div className="flex items-center gap-8">
        {/* Tiny Stats Horizon */}
        <div className="hidden lg:flex items-center gap-6 border-r border-white/5 pr-8">
          <div className="text-center">
            <div className="text-xs font-black text-white">
              {members.length}
            </div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">
              Total
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-black text-indigo-400">
              {notes?.length}
            </div>
            <div className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">
              Notes
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
