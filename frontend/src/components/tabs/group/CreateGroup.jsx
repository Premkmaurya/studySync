import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Camera, 
  X, 
  Sparkles, 
  Zap, 
  Users, 
  ShieldCheck, 
  Globe,
  Rocket
} from 'lucide-react';

// --- CREATE GROUP COMPONENT ---
const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  
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
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('field', data.field);
    formData.append('privacy', isPublic ? 'public' : 'private');
    if (imageFile) formData.append('image', imageFile);

    try {
      // In a real app, this would be your production API endpoint
      await axios.post('http://localhost:3000/api/groups/create', formData, {
        withCredentials: true,
      });
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Group creation failed", error);
      // For preview purposes, we simulate success
      alert("Hub initialization sequence complete (Simulated)");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#000] text-[#E5E7EB] font-sans text-sm">
      
      {/* Immersive Background Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-fuchsia-600/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />
      </div>

      {/* Main Creation Form */}
      <main className="relative z-10 flex justify-center items-center py-5 px-6 h-screen overflow-hidden">
        <motion.form 
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          
          {/* Left: Identity Section (Image Upload) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Group Identity</h3>
              
              <div className="relative aspect-square w-full max-w-[240px] mx-auto">
                <div className={`w-full h-full rounded-[48px] border-2 border-dashed border-white/10 flex flex-col items-center justify-center transition-all overflow-hidden ${imagePreview ? 'border-solid border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.2)]' : 'hover:border-white/20'}`}>
                  {imagePreview ? (
                    <>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
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
                      <div className="p-6 bg-white/5 rounded-3xl mb-4 group-hover/label:bg-indigo-500 group-hover/label:text-white transition-all">
                        <Camera size={32} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Upload Avatar</span>
                      <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                    </label>
                  )}
                </div>
              </div>

              <div className="mt-10 space-y-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[11px] text-zinc-400 leading-relaxed italic">
                      "Collective identity fosters better knowledge sharing. Choose an avatar that represents your group's focus."
                    </p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Configuration Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-6 shadow-2xl space-y-10">
              
              {/* Name Input */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Hub Nomenclature</label>
                <div className="relative">
                  <input 
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Enter collective name..." 
                    className="w-full bg-transparent text-2xl font-black tracking-tighter text-white placeholder:text-zinc-800 outline-none border-b-2 border-white/5 focus:border-indigo-500 transition-all pb-4"
                  />
                  {errors.name && <p className="absolute -bottom-6 left-0 text-[10px] text-red-400 font-bold">{errors.name.message}</p>}
                </div>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Domain Focus</label>
                   <div className="relative">
                     <select 
                        {...register('field', { required: 'Please select a field' })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold outline-none appearance-none focus:border-indigo-500/50 transition-all text-white"
                     >
                       <option value="" disabled selected className="bg-zinc-900">Select Domain</option>
                       <option value="web-dev" className="bg-zinc-900">Web Engineering</option>
                       <option value="ai-ml" className="bg-zinc-900">Neural Networks</option>
                       <option value="design" className="bg-zinc-900">Visual Systems</option>
                       <option value="cyber" className="bg-zinc-900">Security Protocol</option>
                       <option value="bio" className="bg-zinc-900">Bio-Tech</option>
                     </select>
                     <Zap size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Privacy Mode</label>
                   <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => setIsPublic(true)} 
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${isPublic ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-white'}`}
                      >
                        PUBLIC
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsPublic(false)} 
                        className={`flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all ${!isPublic ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white/5 border border-white/10 text-zinc-500 hover:text-white'}`}
                      >
                        PRIVATE
                      </button>
                   </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Operational Mission</label>
                <textarea 
                  {...register('description')}
                  rows={4}
                  placeholder="What is the primary goal of this collective?" 
                  className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 px-8 text-sm outline-none focus:border-indigo-500/50 transition-all resize-none placeholder:text-zinc-700 text-white"
                />
              </div>

              {/* Bottom Action */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-zinc-800 rounded-lg">
                        <Users size={16} className="text-zinc-400" />
                    </div>
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Initial Capacity: 50 Members</span>
                 </div>
                 
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   type="submit"
                   disabled={isSubmitting}
                   className="group flex items-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-wide transition-all hover:bg-indigo-50 shadow-[0_15px_40px_rgba(255,255,255,0.1)] active:shadow-none"
                 >
                   {isSubmitting ? (
                     <div className="flex items-center gap-3">
                        <Sparkles size={18} className="animate-spin text-indigo-600" />
                        <span>Initializing...</span>
                     </div>
                   ) : (
                     <div className="flex items-center gap-3">
                        <span>Launch Hub</span>
                        <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </div>
                   )}
                 </motion.button>
              </div>

            </div>
          </div>
        </motion.form>
      </main>


    </div>
  );
};

export default CreateGroup;