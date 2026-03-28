import React from 'react'

const StartCard = ({ label, value, icon: Icon, color }) => {
  return (
    <div className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:bg-white/10 transition-all group">
    <div
      className={`p-3 rounded-2xl w-fit mb-4 ${color} bg-opacity-10 shadow-lg`}
    >
      <Icon size={20} className={color} />
    </div>
    <div className="text-2xl font-black tracking-tighter text-white">
      {value}
    </div>
    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mt-1">
      {label}
    </div>
  </div>
  )
}

export default StartCard