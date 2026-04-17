import { useSelector } from "react-redux";
import { Icon } from "lucide-react";

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  color = "indigo",
}) => {
  const theme = useSelector((state) => state.theme.mode);
  return (
    <div className="flex items-start gap-4 mb-8">
      <div
        className={`p-3 rounded-2xl ${theme === "dark" ? `bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 shadow-lg shadow-${color}-500/5` : `bg-${color}-400/10 text-${color}-600 border border-${color}-400/20 shadow-lg shadow-${color}-400/5`}`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className={`text-xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-black"} uppercase`}>
          {title}
        </h3>
        <p className={`text-xs font-medium ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"} mt-1 max-w-md leading-relaxed`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;
