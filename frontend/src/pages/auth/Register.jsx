import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, BrowserRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Bot,
  Zap,
  ChevronLeft,
  Github,
  Chrome,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      const response = await dispatch(registerUser(data));
      if(response.payload.user) {
        navigate("/find-groups");
      }
    } catch (err) {
      setAuthError("Authentication failed. Please check your credentials.");
      // For preview purposes, we allow bypass if needed, but here we simulate a real check
    }
  };

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#050505] overflow-hidden">
      {/* 1. LEFT SIDE: VISUAL ANCHOR (Hidden on small mobile if needed, but here made responsive) */}
      <motion.section
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative w-full lg:w-1/2 h-[40vh] lg:h-full overflow-hidden group"
      >
        {/* Background Image with Neural Overlay */}
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000"
          alt="Collective Sync"
        />
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

        {/* Cinematic Content */}
        <div className="relative z-20 h-full flex flex-col justify-end p-10 lg:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black font-black italic shadow-2xl">
              S
            </div>
            <span className="text-xl font-black tracking-tighter uppercase text-white">
              StudySync_AI
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6">
            ENTER THE <br />{" "}
            <span className="text-indigo-500">COLLECTIVE.</span>
          </h2>
          <p className="text-zinc-400 max-w-md font-medium leading-relaxed">
            Your intelligence, synchronized. Join 12,000+ professionals
            architecture-syncing their knowledge bases.
          </p>

        </div>
      </motion.section>

      {/* 2. RIGHT SIDE: THE GLASS PORTAL */}
      <section className="relative w-full lg:w-1/2 h-full flex items-center justify-center p-6 lg:p-8">
        {/* Background Mesh for depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-6 lg:p-8 backdrop-blur-3xl shadow-3xl relative z-30 overflow-hidden"
        >
          {/* Form Header */}
          <div className="text-center mb-4">
            <div className="inline-flex p-2 bg-white/5 rounded-2xl mb-3 text-indigo-400">
              <Bot size={24} />
            </div>
            <h3 className="text-xl font-black tracking-tight text-white uppercase">
              Neural Uplink
            </h3>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              Provide your credentials to sync
            </p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] font-bold text-red-400 text-center uppercase tracking-widest">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {/* full name Input */}
            <div className="flex gap-3">
              <div className="space-y-1 w-1/2">
                <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase ml-2">
                  First Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    placeholder="Jane"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-4 text-xs font-bold text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all placeholder:text-zinc-800"
                  />
                </div>
                {errors.firstName && (
                  <p className="text-[10px] text-red-500 font-bold ml-2">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-1 w-1/2">
                <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase ml-2">
                  Last Name
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    placeholder="Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-4 pr-4 text-xs font-bold text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all placeholder:text-zinc-800"
                  />
                </div>
                {errors.lastName && (
                  <p className="text-[10px] text-red-500 font-bold ml-2">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase ml-2">
                Uplink_ID (Email)
              </label>
              <div className="relative group">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  type="email"
                  {...register("email", { required: "Uplink ID is required" })}
                  placeholder="name@studysync.ai"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all placeholder:text-zinc-800"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-red-500 font-bold ml-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-zinc-600 tracking-[0.2em] uppercase ml-2">
                Pass_Key
              </label>
              <div className="relative group">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-400 transition-colors"
                />
                <input
                  type="password"
                  {...register("password", {
                    required: "Pass Key is required",
                  })}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-xs font-bold text-white outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all placeholder:text-zinc-800"
                />
              </div>
              {errors.password && (
                <p className="text-[10px] text-red-500 font-bold ml-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-3 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-white/5 hover:bg-indigo-50 transition-all"
              >
                {isSubmitting ? (
                  <Zap size={16} className="animate-spin text-indigo-600" />
                ) : (
                  <>
                    Initialize Sync{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </motion.button>

              <div className="flex items-center gap-4 py-1">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">
                  Or Auth Via
                </span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  <Chrome size={16} />
                </button>
                <button
                  type="button"
                  className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  <Github size={16} />
                </button>
              </div>
            </div>

            {/* Login Path */}
            <div className="mt-4 text-center">
              <p className="text-[10px] text-zinc-600 font-medium">
                Already on the network?{" "}
                <Link
                  to="/login"
                  className="text-white font-black hover:text-indigo-400 transition-colors uppercase tracking-widest text-[10px]"
                >
                  Authenticate
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .shadow-3xl { box-shadow: 0 40px 100px rgba(0,0,0,0.8); }
        input::placeholder { color: #27272a !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 10px; }
      `,
        }}
      />
    </div>
  );
};

// --- PREVIEW WRAPPER ---
export default Register;
