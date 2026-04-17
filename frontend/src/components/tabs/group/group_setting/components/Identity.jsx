import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Info, ChevronRight, Check, AlertCircle } from "lucide-react";
import { updateGroup } from "../../../../../features/groups/groupsSlice";
import SectionHeader from "./SectionHeader";

const Toggle = ({ enabled, setEnabled, label, subLabel, theme }) => (
  <div className="flex items-center justify-between py-4 group/toggle">
    <div className="flex flex-col gap-1">
      <span className={`text-sm font-bold ${theme === "dark" ? "text-zinc-200 group-hover/toggle:text-white" : "text-zinc-700 group-hover/toggle:text-black"} transition-colors`}>
        {label}
      </span>
      {subLabel && (
        <span className={`text-[10px] ${theme === "dark" ? "text-zinc-500" : "text-zinc-600"} font-medium uppercase tracking-widest`}>
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

const Identity = ({ itemVariants }) => {
  const theme = useSelector((state) => state.theme.mode);
  const context = useOutletContext();
  const { group, setGroup } = context || {};

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

      // Update local context immediately with the updated group data
      const updatedGroup = result.group || result;
      setGroup((prev) => ({ ...prev, ...updatedGroup }));

      // Also update form data to reflect changes
      setFormData({
        name: updatedGroup.name || formData.name,
        field: updatedGroup.field || formData.field,
      });

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

  return (
    <motion.section variants={itemVariants} className="relative">
      <SectionHeader
        icon={Info}
        title="Identity & Domain"
        description="Configure the primary identifiers and operational focus of this collective hub."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/2 border border-white/5 rounded-4xl p-8 md:p-10">
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
              <option value="" disabled selected className="bg-zinc-900">
                Select Domain
              </option>
              <option value="web-dev" className="bg-zinc-900">
                Web Engineering
              </option>
              <option value="dsa" className="bg-zinc-900">
                Algorithms
              </option>
              <option value="ai-ml" className="bg-zinc-900">
                Neural Networks
              </option>
              <option value="cybersecurity" className="bg-zinc-900">
                Security
              </option>
              <option value="design" className="bg-zinc-900">
                Visual Systems
              </option>
              <option value="bio" className="bg-zinc-900">
                Bio-Tech
              </option>
              <option value="other" className="bg-zinc-900">
                Others
              </option>
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
  );
};

export default Identity;
