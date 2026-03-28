import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Info, ChevronRight, Check, AlertCircle } from "lucide-react";
import { updateGroup } from "../../../features/groups/groupsSlice";

const SectionHeader = ({
  icon: Icon,
  title,
  description,
  color = "indigo",
}) => (
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

const Toggle = ({ enabled, setEnabled, label, subLabel }) => (
  <div className="flex items-center justify-between py-4 group/toggle">
    <div className="flex flex-col gap-1">
      <span className="text-sm font-bold text-zinc-200 group-hover/toggle:text-white transition-colors">
        {label}
      </span>
      {subLabel && (
        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
          {subLabel}
        </span>
      )}
    </div>
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-all duration-500 flex items-center px-1 ${
        enabled
          ? "bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          : "bg-zinc-800"
      }`}
    >
      <motion.div
        animate={{ x: enabled ? 24 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-lg"
      />
    </button>
  </div>
);

const GroupSettings = () => {
  const context = useOutletContext();
  const group = context?.group || {
    _id: "",
    name: "Collective_Nexus",
    members: 42,
    field: "Engineering",
  };

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.groups);

  // Form state
  const [formData, setFormData] = useState({
    name: group.name || "",
    field: group.field || "Engineering",
  });

  const [publicHub, setPublicHub] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Update form when context changes
  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        field: group.field || "Engineering",
      });
    }
  }, [group]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    // Validate groupId exists
    if (!group?._id) {
      setSaveError("Group ID not found. Please refresh the page.");
      setTimeout(() => setSaveError(null), 3000);
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      // Dispatch update action and wait for it
      const result = await dispatch(
        updateGroup({
          groupId: group._id,
          groupData: formData,
        }),
      ).unwrap();

      // Update success
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Update error:", err);
      setSaveError(err || "Failed to save changes");
      setTimeout(() => setSaveError(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    formData.name !== group.name || formData.field !== group.field;

  const handleDeleteGroup = async () => {
    const res = await dispatch(deleteGroup(group._id));
    if (deleteGroup.fulfilled.match(res)) {
      // Handle successful deletion (e.g., navigate away, show message)
      navigate("/home");
    } else {
      // Handle error (e.g., show error message)
      setSaveError(res.payload || "Failed to delete group");
      setTimeout(() => setSaveError(null), 3000);
    }
  };

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
          <motion.section variants={itemVariants} className="relative">
            <SectionHeader
              icon={Info}
              title="Identity & Domain"
              description="Configure the primary identifiers and operational focus of this collective hub."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/5 rounded-[32px] p-8 md:p-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                  Collective Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all placeholder:text-zinc-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                  Domain Focus
                </label>
                <div className="relative">
                  <select
                    value={formData.field}
                    onChange={(e) => handleInputChange("field", e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-white outline-none appearance-none focus:border-indigo-500/50 transition-all"
                  >
                    <option>Engineering</option>
                    <option>Research</option>
                    <option>Strategic Ops</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                  </select>
                  <ChevronRight
                    size={16}
                    className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-zinc-600 pointer-events-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2 pt-4 border-t border-white/5 mt-4">
                <Toggle
                  enabled={publicHub}
                  setEnabled={setPublicHub}
                  label="Visible to Network"
                  subLabel="Allow discovery by other authorized professionals"
                />
              </div>

              {/* Save/Status Section */}
              <div className="md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <Check size={18} />
                      <span className="text-sm font-bold">
                        Changes saved successfully
                      </span>
                    </motion.div>
                  )}
                  {saveError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2 text-red-400"
                    >
                      <AlertCircle size={18} />
                      <span className="text-sm font-bold">{saveError}</span>
                    </motion.div>
                  )}
                </div>

                <button
                  onClick={handleSaveChanges}
                  disabled={!hasChanges || isSaving}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                    hasChanges && !isSaving
                      ? "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95"
                      : "bg-zinc-800 text-zinc-400 cursor-not-allowed"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </motion.section>

          {/* SECTION: Danger Zone */}
          <motion.section variants={itemVariants} className="pt-10">
            <div className="border-t border-white/5 pt-12">
              <SectionHeader
                icon={Trash2}
                title="Danger Zone"
                color="rose"
                description="Destructive actions that result in permanent data loss from the global registry."
              />
              <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10 w-full">
                <div className="space-y-2 px-2 md:px-5 text-center md:text-left">
                  <h4 className="text-lg font-black text-rose-500 uppercase tracking-tight">
                    Decommission Hub
                  </h4>
                  <p className="text-sm text-zinc-500 font-medium max-w-full md:max-w-lg leading-relaxed">
                    This will permanently invalidate all access tokens and purge
                    every document fragment associated with this node.{" "}
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
                Once deleted, all data associated with this hub will be
                permanently removed and cannot be recovered.
              </p>
              {setSaveError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 text-red-400 mt-4"
                >
                  <AlertCircle size={18} />
                  <span className="text-sm font-bold">{saveError}</span>
                </motion.div>
              )}
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default GroupSettings;
