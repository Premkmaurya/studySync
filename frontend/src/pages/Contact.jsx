import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import Button from "../components/design-system/Button";
import Input from "../components/design-system/Input";
import Card from "../components/design-system/Card";
import Pill from "../components/design-system/Pill";
import { SectionHeader } from "../components/design-system/SectionHeader";
import StudySyncFooter from "../components/home/footer/StudySyncFooter";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-[#f6f5f4] text-[#000000] min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        <Pill variant="sky" size="sm" className="mb-4">
          Contact Us
        </Pill>
        <h1 className="text-[40px] sm:text-[60px] font-bold tracking-[-2px] leading-tight max-w-2xl mb-4">
          Get in touch with the StudySync team.
        </h1>
        <p className="text-[18px] text-[#615d59] font-['Source_Serif_4',Georgia,serif] italic max-w-xl leading-relaxed mb-12">
          Have feedback, questions about study groups, or need support? Send us a message and we'll get back to you promptly.
        </p>
      </section>

      {/* Main Content Form Card */}
      <section className="pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Details Column */}
          <div className="flex flex-col gap-6">
            <Card variant="white" className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#e6f3fe] text-[#0075de] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <h4 className="text-[16px] font-bold text-[#000000]">Email support</h4>
              <p className="text-[13px] text-[#615d59]">support@studysync.edu</p>
            </Card>

            <Card variant="white" className="flex flex-col gap-3">
              <div className="w-8 h-8 rounded-[8px] bg-[#fff4cc] text-[#e89d01] flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="text-[16px] font-bold text-[#000000]">Campus Hub</h4>
              <p className="text-[13px] text-[#615d59]">San Francisco, CA</p>
            </Card>
          </div>

          {/* Form Column */}
          <div className="md:col-span-2">
            <Card variant="white" className="p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-10 gap-3">
                  <CheckCircle2 className="w-12 h-12 text-[#0075de]" />
                  <h3 className="text-[20px] font-bold text-[#000000]">Message received!</h3>
                  <p className="text-[14px] text-[#615d59]">
                    Thank you for reaching out. A team member will respond to your email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Alex Morgan"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />

                  <Input
                    label="Email address"
                    type="email"
                    placeholder="alex@university.edu"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />

                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-[13px] font-medium text-[#111111]">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can we help your study group?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white text-[#111111] placeholder-[#757575] text-[14px] px-3.5 py-2 rounded-[8px] border border-black/[0.12] outline-none focus:border-[#0075de] focus:ring-2 focus:ring-[#0075de]/20"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" icon={Send} iconPosition="right">
                    Send message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <StudySyncFooter />
    </div>
  );
};

export default Contact;
