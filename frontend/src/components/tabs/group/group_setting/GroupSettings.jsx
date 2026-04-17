import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Identity from "./components/Identity";
import Danger from "./components/Danger";

const GroupSettings = () => {
  const theme = useSelector((state) => state.theme.mode);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`relative min-h-screen ${theme === "dark" ? "bg-[#030303] text-zinc-300" : "bg-white text-zinc-700"} font-sans selection:${theme === "dark" ? "bg-indigo-500/30" : "bg-indigo-100"}`}>
      {/* 1. Page Header */}
      <header className={`sticky top-0 z-40 ${theme === "dark" ? "bg-black/60 border-white/5" : "bg-white/60 border-black/10"} backdrop-blur-xl border-b px-4 md:px-8 py-3 mb-12`}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3"></div>
            <h1 className={`text-3xl md:text-5xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-black"} uppercase leading-none`}>
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-8 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* SECTION: Identity */}
          <Identity itemVariants={itemVariants} />

          {/* SECTION: Danger Zone */}
          <Danger itemVariants={itemVariants} />
        </motion.div>
      </main>
    </div>
  );
};

export default GroupSettings;
