import React from 'react'
import { useSelector } from 'react-redux'

const StartCard = ({ label, value, icon: Icon, color }) => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className={`${theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"} border rounded-3xl p-6 ${theme === "dark" ? "hover:bg-white/10" : "hover:bg-black/10"} transition-all group`}>
    <div
      className={`p-3 rounded-2xl w-fit mb-4 ${color} bg-opacity-10 shadow-lg`}
    >
      <Icon size={20} className={color} />
    </div>
    <div className={`text-2xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-black"}`}>
      {value}
    </div>
    <div className={`text-[10px] font-bold uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"} mt-1`}>
      {label}
    </div>
  </div>
  )
}

export default StartCard