import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Camera, X, Plus, BookOpen, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { createGroup } from "../../../../../features/groups/groupsSlice";
import Button from "../../../../design-system/Button";
import Input from "../../../../design-system/Input";
import Card from "../../../../design-system/Card";
import Pill from "../../../../design-system/Pill";
import Avatar from "../../../../design-system/Avatar";
import { PageHeader } from "../../../../design-system/SectionHeader";

const CreateGroupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const watchedName = watch("name", "");
  const watchedField = watch("field", "Engineering");
  const watchedDescription = watch("description", "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("field", data.field || "Engineering");
    formData.append("privacy", isPublic ? "public" : "private");
    if (imageFile) formData.append("image", imageFile);

    const res = await dispatch(createGroup(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/find-groups`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <PageHeader
        title="Create a study group"
        description="Set up a shared workspace for your course, project, or study topic."
        badge={<Pill variant="sky" size="sm">New Group</Pill>}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Group Details Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card variant="white" className="p-8 flex flex-col gap-6">
            <h3 className="text-[18px] font-bold text-[#000000] border-b border-black/[0.06] pb-3">
              Group Details
            </h3>

            {/* Name Input */}
            <Input
              label="Group Name"
              placeholder="e.g. Data Structures & Algorithms Peer Group"
              error={errors.name?.message}
              {...register("name", { required: "Group name is required" })}
            />

            {/* Field/Category Select */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[13px] font-medium text-[#111111]">
                Category / Subject
              </label>
              <select
                {...register("field", { required: "Please select a category" })}
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
              {errors.field && (
                <span className="text-[12px] text-[#e32d14] font-medium">
                  {errors.field.message}
                </span>
              )}
            </div>

            {/* Privacy Toggle */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#111111]">
                Privacy Mode
              </label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={isPublic ? "primary" : "ghost"}
                  className="flex-1"
                  onClick={() => setIsPublic(true)}
                >
                  Public Group
                </Button>
                <Button
                  type="button"
                  variant={!isPublic ? "primary" : "ghost"}
                  className="flex-1"
                  onClick={() => setIsPublic(false)}
                >
                  Private Group
                </Button>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-[13px] font-medium text-[#111111]">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Describe what your study group focuses on, study goals, or weekly schedules..."
                className="w-full bg-white text-[#111111] placeholder-[#757575] text-[14px] px-3.5 py-2 rounded-[8px] border border-black/[0.12] outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20 resize-none"
              />
            </div>

            {/* Avatar Upload */}
            <div className="flex flex-col gap-2 pt-2 border-t border-black/[0.06]">
              <label className="text-[13px] font-medium text-[#111111]">
                Group Avatar (Optional)
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-32 rounded-full border border-black/15 bg-[#f6f5f4] flex items-center justify-center overflow-hidden shrink-0">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-[#757575]" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer">
                    <span className="inline-flex items-center justify-center font-medium text-[13px] px-3 py-1.5 rounded-[8px] bg-[#e6f3fe] text-[#0075de] hover:bg-[#d4ebfe] transition-colors">
                      Choose Image
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  {imagePreview && (
                    <Button variant="text" size="sm" onClick={removeImage}>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06]">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
              >
                Create Study Group
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Card Preview */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <span className="text-[13px] font-semibold text-[#757575] uppercase tracking-wider">
            Live Group Preview
          </span>
          <Card variant="white" className="p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Pill variant="gray" size="sm">
                {watchedField || "Category"}
              </Pill>
              <Pill variant="sky" size="sm">
                {isPublic ? "Public" : "Private"}
              </Pill>
            </div>

            <div className="flex items-start gap-4">
              <Avatar
                src={imagePreview}
                name={watchedName || "New Group"}
                size="lg"
                borderColor="#0075de"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-[18px] font-bold text-[#000000] truncate">
                  {watchedName || "Untitled Study Group"}
                </h4>
                <p className="text-[13px] text-[#615d59] line-clamp-3 mt-1 leading-relaxed">
                  {watchedDescription ||
                    "Your group description will appear here as you type."}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-[13px] text-[#757575]">
              <div className="flex items-center gap-1">
                <Users className="w-16 h-16" />
                <span>1 member (you)</span>
              </div>
              <Pill variant="sky" size="sm">
                Workspace Preview
              </Pill>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupForm;