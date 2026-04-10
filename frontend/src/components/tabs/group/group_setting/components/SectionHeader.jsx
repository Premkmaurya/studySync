import { Icon } from "lucide-react";

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  color = "indigo",
}) => {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div
        className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 shadow-lg shadow-${color}-500/5`}
      >
        <Icon size={22} />
      </div>
      <div>
        <h3 className="text-xl font-black tracking-tighter text-white uppercase">
          {title}
        </h3>
        <p className="text-xs font-medium text-zinc-500 mt-1 max-w-md leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SectionHeader;
