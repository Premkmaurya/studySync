import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../features/auth/authSlice";
import { selectAuthLoading, selectAuthError } from "../../features/auth/authSelectors";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import Button from "../../components/design-system/Button";
import Input from "../../components/design-system/Input";
import Card from "../../components/design-system/Card";
import Pill from "../../components/design-system/Pill";

const GOOGLE_AUTH_URL = `${import.meta.env.API_URL || "https://studysync-zgwh.onrender.com/api"}/auth/google`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxLoading = useSelector(selectAuthLoading);
  const reduxError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setAuthError("");
    const resultAction = await dispatch(
      loginUser({
        email: data.email,
        password: data.password,
        rememberMe: !!data.rememberMe,
      })
    );
    if (loginUser.fulfilled.match(resultAction)) {
      navigate("/dashboard/home");
    } else {
      setAuthError(
        resultAction.payload || "Authentication failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f5f4] flex flex-col md:flex-row text-[#000000]">
      {/* Left side: Editorial product statement panel */}
      <div className="hidden md:flex w-1/2 bg-[#02093a] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center font-bold">
            <BookOpen className="w-16 h-16" />
          </div>
          <span className="font-bold text-[20px] tracking-[-0.3px] text-white">
            studySync
          </span>
        </Link>

        <div className="z-10 max-w-lg my-auto flex flex-col gap-6">
          <Pill variant="sky" size="sm" className="w-fit">
            Academic Collaboration Platform
          </Pill>
          <h1 className="text-[40px] lg:text-[48px] font-bold tracking-[-1.5px] leading-[1.1]">
            Welcome back to your shared knowledge base.
          </h1>
          <p className="text-[16px] text-white/80 font-['Source_Serif_4',Georgia,serif] italic leading-relaxed">
            "Knowledge increases by sharing but not by saving." Pick up right where you left off with your study groups and notes.
          </p>
        </div>

        <div className="z-10 text-[13px] text-white/60">
          © {new Date().getFullYear()} StudySync Platform
        </div>
      </div>

      {/* Right side: Clean Form Card */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo Header */}
          <div className="md:hidden flex items-center gap-2.5 mb-8">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-16 h-16" />
              </div>
              <span className="font-bold text-[18px] text-[#000000]">studySync</span>
            </Link>
          </div>

          <Card variant="white" className="p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-[26px] font-bold text-[#000000] tracking-[-0.5px]">
                Sign in
              </h2>
              <p className="text-[14px] text-[#615d59] mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            {(authError || reduxError) && (
              <div className="mb-6 p-3.5 bg-[#e32d14]/10 border border-[#e32d14]/20 rounded-[8px] text-[13px] text-[#e32d14] font-medium">
                {authError || reduxError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <Input
                label="Email address"
                type="email"
                placeholder="name@university.edu"
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />

              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[13px] font-medium text-[#111111] select-none">
                  Password
                </label>
                <div className="relative flex items-center w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`
                      w-full bg-white text-[#111111] placeholder-[#757575] text-[14px]
                      px-3.5 py-2 pr-10 rounded-[8px] border border-black/[0.12]
                      transition-all duration-150 outline-none
                      focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20
                      disabled:bg-black/[0.03] disabled:cursor-not-allowed
                      ${errors.password ? "border-[#e32d14] focus:border-[#e32d14] focus:ring-[#e32d14]/20" : ""}
                    `}
                    {...register("password", { required: "Password is required" })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 text-[#332e2e] hover:text-[#111111] transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-[12px] text-[#e32d14] font-medium">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <label className="flex items-center gap-2 text-[#615d59] cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-black/20 text-[#0075de] focus:ring-[#0075de]"
                    {...register("rememberMe")}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="text-[#0075de] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isSubmitting || reduxLoading}
                className="mt-2"
              >
                Sign in
              </Button>
            </form>

            <div className="mt-10 w-full h-[3rem] rounded-[8px] border border-black/[0.12] bg-white text-[14px] font-semibold text-[#000000] transition-colors hover:bg-[#f6f5f4] focus:outline-none focus:ring-2 focus:ring-[#0075de]/30"
            >
              <button
                type="button"
                onClick={() => window.location.assign(GOOGLE_AUTH_URL)}
                className="w-full h-full flex items-center justify-center"
              >
                Continue with Google <FcGoogle className="ml-2 w-[1.5rem] h-[1.5rem]" />
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-black/[0.08] text-center text-[14px] text-[#615d59]">
              New to StudySync?{" "}
              <Link to="/register" className="text-[#0075de] font-semibold hover:underline">
                Create an account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
