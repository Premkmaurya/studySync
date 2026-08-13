import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { DURATION, EASING } from "../motion/motionTokens";

/**
 * ContactForm
 * Polished, high-trust contact form component.
 * Features inline validation, clean focus states, responsive padding, keyboard accessibility,
 * loading state, error state with preserved inputs, and success state.
 */
const ContactForm = ({ selectedSubject, onClearSubject }) => {
  const shouldReduceMotion = useReducedMotion();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  // Update subject field if a topic is selected from external topic lists
  useEffect(() => {
    if (selectedSubject) {
      setFormData((prev) => ({ ...prev, subject: selectedSubject }));
      setErrors((prev) => ({ ...prev, subject: "" }));
    }
  }, [selectedSubject]);

  // Field validation helper
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Please enter your name.";
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Please enter your email address.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (name === "subject") {
      if (!value.trim()) error = "Please enter a subject.";
    } else if (name === "message") {
      if (!value.trim()) {
        error = "Please enter your message.";
      } else if (value.trim().length < 10) {
        error = "Message should be at least 10 characters.";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      subject: validateField("subject", formData.subject),
      message: validateField("message", formData.message),
    };

    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    const hasError = Object.values(newErrors).some((err) => Boolean(err));
    if (hasError) return;

    // Simulate submission state
    setStatus("loading");

    setTimeout(() => {
      // Clean success resolution
      setStatus("success");
    }, 1000);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
    if (onClearSubject) onClearSubject();
  };

  return (
    <div className="w-full bg-white border border-black/[0.08] rounded-[12px] p-6 sm:p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.04)]">
      <AnimatePresence mode="wait">
        
        {/* STATE A: SUCCESS CONFIRMATION */}
        {status === "success" ? (
          <motion.div
            key="success"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
            className="flex flex-col items-center justify-center text-center py-10 sm:py-14 space-y-4"
            aria-live="polite"
          >
            <div className="w-14 h-14 rounded-full bg-[#0075de]/10 border border-[#0075de]/20 text-[#0075de] flex items-center justify-center mb-1">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-[24px] sm:text-[28px] font-bold text-[#000000] tracking-[-0.5px]">
              Message sent.
            </h3>

            <p className="text-[14px] sm:text-[16px] text-[#615d59] leading-relaxed max-w-sm font-normal">
              Thanks for reaching out. We'll get back to you as soon as we can.
            </p>

            <button
              onClick={handleReset}
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f6f5f4] hover:bg-black/5 text-[#111111] text-[13px] font-medium rounded-[8px] border border-black/15 transition-all duration-150 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#757575]" />
              <span>Send another message</span>
            </button>
          </motion.div>
        ) : status === "error" ? (
          
          /* STATE B: SUBMISSION ERROR STATE (INPUTS PRESERVED) */
          <motion.div
            key="error"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: DURATION.COMPONENT, ease: EASING.SMOOTH }}
            className="flex flex-col items-center justify-center text-center py-10 space-y-4"
            aria-live="assertive"
          >
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 flex items-center justify-center mb-1">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-[22px] font-bold text-[#000000]">
              Something went wrong.
            </h3>

            <p className="text-[14px] text-[#615d59] leading-relaxed max-w-xs">
              We couldn't send your message. Please try again.
            </p>

            <button
              onClick={() => setStatus("idle")}
              className="mt-4 px-6 py-2.5 bg-[#0075de] hover:bg-[#097fe8] text-white text-[13px] font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              Try again
            </button>
          </motion.div>
        ) : (
          
          /* STATE C: MAIN ACTIVE FORM */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col space-y-5"
          >
            {/* Name Field */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label
                htmlFor="contact-name"
                className="text-[13px] font-medium text-[#111111]"
              >
                Name <span className="text-[#0075de]">*</span>
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Alex Morgan"
                className={`w-full h-11 px-3.5 bg-white text-[#111111] placeholder-[#757575] text-[14px] rounded-[8px] border outline-none transition-all duration-150 ${
                  errors.name && touched.name
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-black/[0.12] focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                }`}
              />
              {errors.name && touched.name && (
                <span className="text-[12px] text-rose-600 font-medium">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label
                htmlFor="contact-email"
                className="text-[13px] font-medium text-[#111111]"
              >
                Email <span className="text-[#0075de]">*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="alex@university.edu"
                className={`w-full h-11 px-3.5 bg-white text-[#111111] placeholder-[#757575] text-[14px] rounded-[8px] border outline-none transition-all duration-150 ${
                  errors.email && touched.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-black/[0.12] focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                }`}
              />
              {errors.email && touched.email && (
                <span className="text-[12px] text-rose-600 font-medium">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Subject Field */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label
                htmlFor="contact-subject"
                className="text-[13px] font-medium text-[#111111]"
              >
                Subject <span className="text-[#0075de]">*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Question about study groups"
                className={`w-full h-11 px-3.5 bg-white text-[#111111] placeholder-[#757575] text-[14px] rounded-[8px] border outline-none transition-all duration-150 ${
                  errors.subject && touched.subject
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-black/[0.12] focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                }`}
              />
              {errors.subject && touched.subject && (
                <span className="text-[12px] text-rose-600 font-medium">
                  {errors.subject}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div className="flex flex-col space-y-1.5 text-left">
              <label
                htmlFor="contact-message"
                className="text-[13px] font-medium text-[#111111]"
              >
                Message <span className="text-[#0075de]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="How can we help you with StudySync?"
                className={`w-full min-h-[140px] p-3.5 bg-white text-[#111111] placeholder-[#757575] text-[14px] rounded-[8px] border outline-none resize-y transition-all duration-150 ${
                  errors.message && touched.message
                    ? "border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
                    : "border-black/[0.12] focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                }`}
              />
              {errors.message && touched.message && (
                <span className="text-[12px] text-rose-600 font-medium">
                  {errors.message}
                </span>
              )}
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full h-11 inline-flex items-center justify-center gap-2 bg-[#0075de] hover:bg-[#097fe8] active:bg-[#0060b8] text-white text-[14px] font-semibold rounded-[8px] transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0075de] focus-visible:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send message</span>
                    <ArrowRight className="w-4 h-4 text-white transition-transform duration-200 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;