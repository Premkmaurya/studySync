import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Check, AlertCircle } from "lucide-react";
import { updateGroup } from "../../../../../features/groups/groupsSlice";
import Input from "../../../../design-system/Input";
import Button from "../../../../design-system/Button";
import Card from "../../../../design-system/Card";

const Identity = () => {
  const context = useOutletContext();
  const { group, setGroup } = context || {};

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: group?.name || "",
    field: group?.field || "Engineering",
    description: group?.description || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (group) {
      setFormData({
        name: group.name || "",
        field: group.field || "Engineering",
        description: group.description || "",
      });
    }
  }, [group]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!group?._id) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const result = await dispatch(
        updateGroup({
          groupId: group._id,
          groupData: formData,
        })
      ).unwrap();

      const updatedGroup = result.group || result;
      if (setGroup) {
        setGroup((prev) => ({ ...prev, ...updatedGroup }));
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err?.message || "Failed to save settings");
      setTimeout(() => setSaveError(null), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card variant="white" className="p-6 md:p-8 flex flex-col gap-6">
      <div className="border-b border-black/[0.06] pb-4">
        <h3 className="text-[18px] font-bold text-[#000000]">
          General Settings
        </h3>
        <p className="text-[14px] text-[#615d59] mt-0.5">
          Update your group name, academic field, and description.
        </p>
      </div>

      <form onSubmit={handleSaveChanges} className="flex flex-col gap-5">
        <Input
          label="Group Name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[13px] font-medium text-[#111111]">
            Category / Subject
          </label>
          <select
            value={formData.field}
            onChange={(e) => handleInputChange("field", e.target.value)}
            className="w-full bg-white text-[#111111] text-[14px] px-3.5 py-2 rounded-[8px] border border-black/[0.12] outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
          >
            <option value="Engineering">Web Engineering</option>
            <option value="dsa">Algorithms & Data Structures</option>
            <option value="ai-ml">Artificial Intelligence & ML</option>
            <option value="cybersecurity">Cybersecurity & Networks</option>
            <option value="design">Design & Visual Systems</option>
            <option value="bio">Biotechnology</option>
            <option value="other">Other / General</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-[13px] font-medium text-[#111111]">
            Group Description
          </label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full bg-white text-[#111111] placeholder-[#757575] text-[14px] px-3.5 py-2 rounded-[8px] border border-black/[0.12] outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20 resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <div>
            {saveSuccess && (
              <span className="text-[13px] text-green-600 font-medium flex items-center gap-1.5">
                <Check className="w-16 h-16" /> Changes saved
              </span>
            )}
            {saveError && (
              <span className="text-[13px] text-[#e32d14] font-medium flex items-center gap-1.5">
                <AlertCircle className="w-16 h-16" /> {saveError}
              </span>
            )}
          </div>

          <Button type="submit" variant="primary" loading={isSaving} className="px-8">
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Identity;
