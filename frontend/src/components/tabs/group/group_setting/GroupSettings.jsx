import { motion } from "framer-motion";
import Identity from "./components/Identity";
import Danger from "./components/Danger";

const GroupSettings = () => {
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
    <div className="relative min-h-screen bg-[#030303] text-zinc-300 font-sans selection:bg-indigo-500/30">
      {/* 1. Page Header */}
      <header className="sticky top-0 z-40 bg-black/60 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3 mb-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3"></div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none">
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
