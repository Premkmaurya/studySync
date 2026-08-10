import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { selectAuthLoading, selectAuthError } from "../../features/auth/authSelectors";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme?.mode || "dark");
  const reduxLoading = useSelector(selectAuthLoading);
  const reduxError = useSelector(selectAuthError);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setAuthError("");
    const resultAction = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/home");
    } else {
      setAuthError(resultAction.payload || "Authentication failed. Please check your credentials.");
    }
  };

  const isDarkMode = theme === "dark";

  return (
    <div className={`min-h-screen w-full flex flex-col md:flex-row ${isDarkMode ? "bg-zinc-950 text-white" : "bg-white text-gray-900"}`}>
      {/* Left side: Visual Image */}
      <div className="w-full md:w-1/2 hidden md:block h-screen overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="leftSideImage"
        />
      </div>

      {/* Right side: Form container */}
      <div className="w-full md:w-1/2 min-h-screen flex flex-col items-center justify-center p-6 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className={`text-4xl font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Sign in
          </h2>

          <p className={`text-sm mt-3 ${isDarkMode ? "text-zinc-400" : "text-gray-500/90"}`}>
            Welcome back! Please sign in to continue
          </p>

          <button
            type="button"
            className={`w-full mt-8 flex items-center justify-center h-12 rounded-full transition-colors ${
              isDarkMode ? "bg-zinc-800/80 hover:bg-zinc-800" : "bg-gray-500/10 hover:bg-gray-500/20"
            }`}
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className={`w-full h-px ${isDarkMode ? "bg-zinc-800" : "bg-gray-300/90"}`}></div>
            <p className={`w-full text-nowrap text-sm ${isDarkMode ? "text-zinc-400" : "text-gray-500/90"}`}>
              or sign in with email
            </p>
            <div className={`w-full h-px ${isDarkMode ? "bg-zinc-800" : "bg-gray-300/90"}`}></div>
          </div>

          {(authError || reduxError) && (
            <div className="w-full mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-xs text-red-500 text-center font-medium">
              {authError || reduxError}
            </div>
          )}

          {/* Email input */}
          <div className="w-full flex flex-col">
            <div className={`flex items-center w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors ${
              errors.email ? "border-red-500" : isDarkMode ? "border-zinc-700/80 focus-within:border-indigo-500" : "border-gray-300/60 focus-within:border-indigo-500"
            }`}>
              <input
                type="email"
                placeholder="Email id"
                {...register("email", { required: "Email is required" })}
                className={`bg-transparent outline-none text-sm w-full h-full ${
                  isDarkMode ? "text-white placeholder-zinc-500" : "text-gray-800 placeholder-gray-500/80"
                }`}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-500 ml-4 mt-1">{errors.email.message}</span>
            )}
          </div>

          {/* Password input */}
          <div className="w-full flex flex-col mt-6">
            <div className={`flex items-center w-full bg-transparent border h-12 rounded-full overflow-hidden pl-6 gap-2 transition-colors ${
              errors.password ? "border-red-500" : isDarkMode ? "border-zinc-700/80 focus-within:border-indigo-500" : "border-gray-300/60 focus-within:border-indigo-500"
            }`}>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`bg-transparent outline-none text-sm w-full h-full ${
                  isDarkMode ? "text-white placeholder-zinc-500" : "text-gray-800 placeholder-gray-500/80"
                }`}
              />
            </div>
            {errors.password && (
              <span className="text-xs text-red-500 ml-4 mt-1">{errors.password.message}</span>
            )}
          </div>

          {/* Remember me & Forgot Password */}
          <div className={`w-full flex items-center justify-between mt-8 ${isDarkMode ? "text-zinc-400" : "text-gray-500/80"}`}>
            <div className="flex items-center gap-2">
              <input
                className="h-5 w-5 accent-indigo-500 rounded cursor-pointer"
                type="checkbox"
                id="checkbox"
              />
              <label className="text-sm cursor-pointer select-none" htmlFor="checkbox">
                Remember me
              </label>
            </div>

            <span className="text-sm underline cursor-pointer hover:text-indigo-400 transition-colors">
              Forgot password?
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting || reduxLoading}
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 transition-all font-medium flex items-center justify-center disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting || reduxLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Login"
            )}
          </button>

          {/* Navigation to Sign up */}
          <p className={`text-sm mt-4 ${isDarkMode ? "text-zinc-400" : "text-gray-500/90"}`}>
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
