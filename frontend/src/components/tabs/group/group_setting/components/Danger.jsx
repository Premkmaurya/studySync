import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Trash2, AlertCircle } from "lucide-react";
import SectionHeader from "./SectionHeader";
import { deleteGroup } from "../../../../../features/groups/groupsSlice";

const Danger = ({ itemVariants }) => {
  const theme = useSelector((state) => state.theme.mode);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteGroup = async () => {
    const res = await dispatch(deleteGroup(group._id));
    if (deleteGroup.fulfilled.match(res)) {
      // Handle successful deletion (e.g., navigate away, show message)
      navigate("/home");
    } else {
      // Handle error (e.g., show error message)
      setDeleteError(res.payload || "Failed to delete group");
      setTimeout(() => setDeleteError(null), 3000);
    }
  };
  return (
    <motion.section variants={itemVariants} className="pt-10">
      <div className={`border-t ${theme === "dark" ? "border-white/5" : "border-black/5"} pt-12`}>
        <SectionHeader
          icon={Trash2}
          title="Danger Zone"
          color="rose"
          description="Destructive actions that result in permanent data loss from the global registry."
          theme={theme}
        />
        <div className={`${theme === "dark" ? "bg-rose-500/5 border-rose-500/10" : "bg-rose-400/5 border-rose-400/10"} border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 w-full`}>
          <div className="space-y-2 px-2 md:px-5 text-center md:text-left">
            <h4 className="text-lg font-black text-rose-500 uppercase tracking-tight">
              Decommission Hub
            </h4>
            <p className="text-sm text-zinc-500 font-medium max-w-full md:max-w-lg leading-relaxed">
              This will permanently invalidate all access tokens and purge every
              document fragment associated with this node.{" "}
              <span className="text-rose-400 font-bold underline italic">
                This cannot be undone.
              </span>
            </p>
          </div>
          <button
            onClick={handleDeleteGroup}
            className="w-full md:w-auto text-center whitespace-nowrap px-5 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
          >
            Delete
          </button>
        </div>
        <p className="text-sm text-zinc-500 font-medium max-w-full md:max-w-lg leading-relaxed mt-4">
          Once deleted, all data associated with this hub will be permanently
          removed and cannot be recovered.
        </p>
        {deleteError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2 text-red-400 mt-4"
          >
            <AlertCircle size={18} />
            <span className="text-sm font-bold">{deleteError}</span>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Danger;
