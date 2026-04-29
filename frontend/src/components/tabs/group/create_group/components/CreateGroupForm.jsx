import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, X, Sparkles, Zap, Users, Rocket } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../../../../../features/groups/groupsSlice";

const CreateGroupForm = () => {
  const theme = useSelector((state) => state.theme.mode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);

  const dispatch = useDispatch();

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
    formData.append("description", data.description);
    formData.append("field", data.field);
    formData.append("privacy", isPublic ? "public" : "private");
    if (imageFile) formData.append("image", imageFile);

    const res = await dispatch(createGroup(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(`/find-groups`);
    }
  };


  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
    >
      {/* Left: Identity Section (Image Upload) */}
      <div className="lg:col-span-5 space-y-6">
        <div className={`backdrop-blur-3xl border rounded-[40px] p-8 shadow-2xl relative overflow-hidden group transition-all ${
          theme === "dark" ? "bg-zinc-900/40 border-white/5" : "bg-white border-black/5"
        }`}>
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">
            Group Identity
          </h3>

          <div className="relative aspect-square w-full max-w-60 mx-auto">
            <div
              className={`w-full h-full rounded-[48px] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden ${
                imagePreview 
                  ? "border-solid border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]" 
                  : (theme === "dark" ? "border-white/10 hover:border-white/20" : "border-black/10 hover:border-black/20")
              }`}
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <label className="flex flex-col items-center cursor-pointer group/label">
                  <div className={`p-6 rounded-3xl mb-4 group-hover/label:bg-indigo-500 group-hover/label:text-white transition-all ${
                    theme === "dark" ? "bg-white/5" : "bg-black/5 text-zinc-500"
                  }`}>
                    <Camera size={32} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Upload Avatar
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <div className={`p-4 rounded-2xl border transition-all ${
              theme === "dark" ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
            }`}>
              <p className={`text-[11px] leading-relaxed italic ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                "Collective identity fosters better knowledge sharing. Choose an
                avatar that represents your group's focus."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Configuration Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className={`backdrop-blur-3xl border rounded-[40px] p-6 shadow-2xl space-y-10 transition-all ${
          theme === "dark" ? "bg-zinc-900/40 border-white/5" : "bg-white border-black/5"
        }`}>
          {/* Name Input */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
              Hub Nomenclature
            </label>
            <div className="relative">
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter collective name..."
                className={`w-full bg-transparent text-2xl tracking-tighter outline-none border-b-2 transition-all pb-1 ${
                  theme === "dark" ? "text-white border-white/5 focus:border-indigo-500 placeholder:text-zinc-800" : "text-black border-black/5 focus:border-indigo-500 placeholder:text-zinc-300"
                }`}
              />
              {errors.name && (
                <p className="absolute -bottom-6 left-0 text-[10px] text-red-400 font-bold">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Domain Focus
              </label>
              <div className="relative">
                <select
                  {...register("field", { required: "Please select a field" })}
                  className={`w-full border rounded-2xl py-4 px-4 text-sm font-bold outline-none appearance-none focus:border-indigo-500/50 transition-all ${
                    theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-black"
                  }`}
                >
                  <option value="" disabled selected className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Select Domain
                  </option>
                  <option value="Engineering" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Web Engineering
                  </option>
                  <option value="dsa" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Algorithms
                  </option>
                  <option value="ai-ml" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Neural Networks
                  </option>
                  <option value="cybersecurity" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Security
                  </option>
                  <option value="design" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Visual Systems
                  </option>
                  <option value="bio" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Bio-Tech
                  </option>
                  <option value="other" className={theme === "dark" ? "bg-zinc-900" : "bg-white"}>
                    Others
                  </option>
                </select>
                <Zap
                  size={14}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                Privacy Mode
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublic(true)}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${
                    isPublic 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : (theme === "dark" ? "bg-white/5 border border-white/10 text-zinc-500 hover:text-white" : "bg-black/5 border border-black/10 text-zinc-500 hover:text-black")
                  }`}
                >
                  PUBLIC
                </button>
                <button
                  type="button"
                  onClick={() => setIsPublic(false)}
                  className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${
                    !isPublic 
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                      : (theme === "dark" ? "bg-white/5 border border-white/10 text-zinc-500 hover:text-white" : "bg-black/5 border border-black/10 text-zinc-500 hover:text-black")
                  }`}
                >
                  PRIVATE
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
              Operational Mission
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="What is the primary goal of this collective?"
              className={`w-full border rounded-3xl py-3 px-5 text-sm outline-none focus:border-indigo-500/50 transition-all resize-none ${
                theme === "dark" ? "bg-white/5 border-white/10 text-white placeholder:text-zinc-700" : "bg-black/5 border-black/10 text-black placeholder:text-zinc-400"
              }`}
            />
          </div>

          {/* Bottom Action */}
          <div className={`pt-6 border-t flex items-center justify-between text-xs ${
            theme === "dark" ? "border-white/5" : "border-black/5"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"}`}>
                <Users size={16} className={theme === "dark" ? "text-zinc-400" : "text-zinc-500"} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${theme === "dark" ? "text-zinc-500" : "text-zinc-400"}`}>
                Initial Capacity: 50 Members
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className={`group flex items-center gap-3 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wide transition-all active:shadow-none ${
                theme === "dark" 
                  ? "bg-white text-black hover:bg-indigo-50 shadow-[0_15px_40px_rgba(255,255,255,0.1)]" 
                  : "bg-black text-white hover:bg-zinc-900 shadow-xl shadow-black/10"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={18}
                    className="animate-spin text-indigo-600"
                  />
                  <span>Initializing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span>Launch Hub</span>
                  <Rocket
                    size={18}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </div>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};

export default CreateGroupForm;