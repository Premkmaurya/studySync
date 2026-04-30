import React, { useRef } from "react";
import { Zap, Mail, User, Pencil } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../features/auth/authSelectors";
import { updateProfilePicture, setUser } from "../../../../features/auth/authSlice";

const HeroSection = () => {
  const imageRef = useRef(null);
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const userId = user?._id || user?.id;
      const res = await dispatch(updateProfilePicture({ id: userId, profilePicture: formData }));
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(setUser({ ...user, profilePicture: res.payload.user.profilePicture }));
      }
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center gap-8 mb-16">
      <div className="relative group">
        <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
        {user && user.profilePicture ? (
          <img
            src={user.profilePicture}
            className={`relative w-32 h-32 md:w-38 md:h-38 rounded-full object-cover shadow-2xl`}
            alt="Profile"
          />
        ) : (
          <User className="relative w-32 h-32 md:w-34 md:h-34 rounded-full border-4 border-black object-cover shadow-xl" />
        )}
        <input
          ref={imageRef}
          type="file"
          name="profilePicture"
          id="profilePicture"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <label
          htmlFor="profilePicture"
          className={`absolute bottom-0 right-0 p-2 rounded-full transition-colors cursor-pointer ${theme === "dark" ? "bg-white/70 hover:bg-white" : "bg-gray-700 hover:bg-gray-800"}`}
        >
          <Pencil
            className={`${theme === "dark" ? "text-indigo-600" : "text-white"}`}
            size={20}
          />
        </label>
      </div>

      <div className="text-center md:text-left">
        <h1
          className={`text-5xl md:text-7xl font-black tracking-tighter ${theme === "dark" ? "text-white" : "text-black"} mb-2`}
        >
          {user
            ? user.fullname.firstname.charAt(0).toUpperCase() + user.fullname.firstname.slice(1) + " " + user.fullname.lastname.charAt(0).toUpperCase() + user.fullname.lastname.slice(1)
            : "Loading..."}
        </h1>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
          <span
            className={`${theme === "dark" ? "text-zinc-600" : "text-zinc-500"} font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2`}
          >
            <Mail size={14} /> {user ? user.email : "Loading..."}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
