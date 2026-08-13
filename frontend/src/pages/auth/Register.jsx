import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { selectAuthLoading, selectAuthError } from "../../features/auth/authSelectors";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BookOpen } from "lucide-react";
import Button from "../../components/design-system/Button";
import Input from "../../components/design-system/Input";
import Card from "../../components/design-system/Card";
import Pill from "../../components/design-system/Pill";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxLoading = useSelector(selectAuthLoading);
  const reduxError = useSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    try {
      setAuthError("");
      const response = await dispatch(registerUser({ ...data }));
      if (response.payload?.user) {
        navigate("/find-groups");
      } else {
        setAuthError(response.payload || "Registration failed. Please try again.");
      }
    } catch (err) {
      setAuthError(err?.message || "Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f6f5f4] flex flex-col md:flex-row text-[#000000]">
      {/* Left side: Editorial accent panel */}
      <div className="hidden md:flex w-1/2 bg-[#02093a] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden">
        <Link to="/" className="flex items-center gap-2.5 z-10">
          <div className="w-8 h-8 rounded-[8px] bg-[#0075de] text-white flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="font-bold text-[20px] tracking-[-0.3px] text-white">
            studySync
          </span>
        </Link>

        <div className="z-10 max-w-lg my-auto flex flex-col gap-6">
          <Pill variant="marigold" size="sm" className="w-fit">
            Create Your Account
          </Pill>
          <h1 className="text-[40px] lg:text-[48px] font-bold tracking-[-1.5px] leading-[1.1]">
            Join a community of students learning together.
          </h1>
          <p className="text-[16px] text-white/80 font-['Source_Serif_4',Georgia,serif] italic leading-relaxed">
            Discover active study groups, create shared notes, and accelerate your academic goals with peers.
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
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-[18px] text-[#000000]">studySync</span>
            </Link>
          </div>

          <Card variant="white" className="p-8 sm:p-10">
            <div className="mb-6">
              <h2 className="text-[26px] font-bold text-[#000000] tracking-[-0.5px]">
                Create an account
              </h2>
              <p className="text-[14px] text-[#615d59] mt-1">
                Enter your details to start collaborating on StudySync
              </p>
            </div>

            {(authError || reduxError) && (
              <div className="mb-6 p-3.5 bg-[#e32d14]/10 border border-[#e32d14]/20 rounded-[8px] text-[13px] text-[#e32d14] font-medium">
                {authError || reduxError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First name"
                  type="text"
                  placeholder="Alex"
                  error={errors.firstname?.message}
                  {...register("firstname", { required: "First name is required" })}
                />
                <Input
                  label="Last name"
                  type="text"
                  placeholder="Morgan"
                  error={errors.lastname?.message}
                  {...register("lastname", { required: "Last name is required" })}
                />
              </div>

              <Input
                label="Email address"
                type="email"
                placeholder="name@university.edu"
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                error={errors.password?.message}
                {...register("password", { required: "Password is required" })}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                loading={isSubmitting || reduxLoading}
                className="mt-3"
              >
                Sign up
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-black/[0.08] text-center text-[14px] text-[#615d59]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#0075de] font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
