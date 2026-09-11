"use client";

import React, { useState, useMemo } from "react";
import {
  Loader2,
  Users,
  Building2,
  Globe2,
  Cpu,
  Mic,
  Camera,
  HandMetal,
  Layers,
  FileText,
  Brain,
  CheckCircle2,
  ShieldCheck,
  MonitorCheck,
  Network,
  Video,
  PenTool,
  Zap,
  ArrowRight,
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  websiteUrl: string;
  message: string;
}

const CLIENT_LOGOS = Array.from(
  { length: 28 },
  (_, i) => `/clients/${String(i + 1).padStart(2, "0")}.png`
);

export default function LandingPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    websiteUrl: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Email format validation
  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.email.trim());
  }, [formData.email]);

  // Form filled validation: Full Name, Email, and Phone Number required
  const isFormFilled = useMemo(() => {
    return (
      formData.fullName.trim().length >= 2 &&
      isEmailValid &&
      formData.phoneNumber.trim().length >= 6
    );
  }, [formData.fullName, isEmailValid, formData.phoneNumber]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) setStatusMessage(null);
  };

  const triggerPdfDownload = () => {
    const link = document.createElement("a");
    link.href = "/Qonevo_Brochure_2026.pdf";
    link.download = "Qonevo_Brochure_2026.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (actionType: "contact" | "download") => {
    if (!isFormFilled) {
      setStatusMessage({
        type: "error",
        text: "Please fill in your Full Name, Corporate Email, and Phone Number.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

    try {
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          downloadedBrochure: actionType === "download",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (actionType === "download") {
          triggerPdfDownload();
          setStatusMessage({
            type: "success",
            text: "Thank you! Your official Qonevo Enterprise Brochure download has started.",
          });
        } else {
          setStatusMessage({
            type: "success",
            text: "Thank you! An enterprise solutions specialist will connect with you within 24 hours.",
          });
        }
      } else {
        if (actionType === "download") {
          triggerPdfDownload();
          setStatusMessage({
            type: "success",
            text: "Brochure download started.",
          });
        } else {
          setStatusMessage({
            type: "error",
            text: data.error || "Submission failed. Please try again.",
          });
        }
      }
    } catch (err: any) {
      console.warn("Backend API unreachable:", err.message);
      if (actionType === "download") {
        triggerPdfDownload();
        setStatusMessage({
          type: "success",
          text: "Brochure downloaded successfully.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "Could not reach the server. Please verify the backend is running.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-black flex flex-col relative selection:bg-[#163c58] selection:text-white w-full overflow-x-hidden">
      {/* 1. FLOATING RIGHT TAB */}
      <button
        onClick={scrollToForm}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-[#163c58] hover:bg-black text-white text-xs font-semibold px-2.5 py-4 rounded-l-lg shadow-2xl transition-all cursor-pointer flex items-center justify-center [writing-mode:vertical-rl] tracking-wider border-l border-t border-b border-[#23557a]"
        title="Request a Quote"
      >
        Request a Quote
      </button>

      {/* 2. TOP HEADER (LOGO AT EXTREME LEFT CORNER) */}
      <header className="w-full px-4 sm:px-8 lg:px-12 pt-6 pb-2 flex items-center justify-start">
        <img
          src="/Synergy-Qonevo-logo.webp"
          alt="Synergy Qonevo Technologies"
          className="h-9 sm:h-12 w-auto object-contain"
          loading="eager"
        />
      </header>

      {/* 3. HERO: 2-COLUMN LAYOUT (FORM ON LEFT, HEADLINE & TEXT ON RIGHT) */}
      <section
        id="form-section"
        className="pt-4 pb-16 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SIDE: THE FORM */}
          <div className="lg:col-span-6 w-full">
            <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/90">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-black mb-1.5">
                  Request an Enterprise Consultation
                </h3>
                <p className="text-sm text-slate-500 font-normal">
                  Fill in your details below to consult with our enterprise solution engineers
                  or download the official product brochure.
                </p>
              </div>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`mb-6 p-4 rounded-xl text-sm text-center font-medium ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit("contact");
                }}
                className="space-y-6"
              >
                {/* Row 1: Full Name & Corporate Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="fullName"
                      className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="enterprise-input"
                      autoComplete="name"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                    >
                      Corporate Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="enterprise-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="phoneNumber"
                      className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                    >
                      Direct / Mobile Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="enterprise-input"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="hidden md:block" />
                </div>

                {/* Row 3: Company Name & Website URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col">
                    <label
                      htmlFor="companyName"
                      className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                    >
                      Company / Organization Name
                    </label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      placeholder="e.g. Acme Corp / Global University"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="enterprise-input"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label
                      htmlFor="websiteUrl"
                      className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                    >
                      Corporate Website URL
                    </label>
                    <input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="text"
                      placeholder="https://company.com"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      className="enterprise-input"
                      autoComplete="url"
                    />
                  </div>
                </div>

                {/* Row 4: Project Scope */}
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-xs uppercase tracking-wider font-bold text-slate-700 mb-1.5"
                  >
                    Project Scope &amp; Requirements
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={2}
                    placeholder="Number of rooms, display sizes (65'', 75'', 86'', 98''), video conferencing needs, or tender requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className="enterprise-input resize-y min-h-[70px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-start gap-3.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-7 py-3 bg-black hover:bg-slate-800 text-white text-sm font-semibold rounded-xl active:scale-[0.98] transition-all min-w-[150px] cursor-pointer disabled:opacity-60 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </span>
                    ) : (
                      "Submit Inquiry"
                    )}
                  </button>

                  <button
                    type="button"
                    disabled={!isFormFilled || isSubmitting}
                    onClick={() => handleSubmit("download")}
                    title={
                      !isFormFilled
                        ? "Fill in Name, Corporate Email, and Phone Number to download the brochure"
                        : "Download Official 2026 Product Brochure"
                    }
                    className={`px-7 py-3 text-sm font-semibold rounded-xl transition-all min-w-[180px] ${
                      isFormFilled && !isSubmitting
                        ? "bg-[#163c58] hover:bg-black text-white shadow-md shadow-[#163c58]/20 active:scale-[0.98] cursor-pointer"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                      </span>
                    ) : (
                      "Download Brochure"
                    )}
                  </button>
                </div>
              </form>

              {/* Footer Direct Contact in Form */}
              <div className="mt-6 pt-4 text-xs text-slate-500 border-t border-slate-100 flex items-center justify-between">
                <span>Direct solutions desk:</span>
                <a
                  href="mailto:business@qonevo.in"
                  className="text-[#163c58] font-bold hover:underline"
                >
                  business@qonevo.in
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: TEXT & PRODUCT SHOWCASE */}
          <div className="lg:col-span-6 flex flex-col justify-center pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black mb-2 leading-tight">
              Intelligent Interactive Displays
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#163c58] mb-5 leading-tight">
              Engineered for Enterprise Collaboration
            </h2>

            <p className="text-base sm:text-lg text-slate-600 font-normal mb-8 leading-relaxed">
              Equip your smart classrooms, schools, executive boardrooms, and modern workspaces with 4K UHD precision touch, seamless interactive collaboration, and Gravity AI™ workflow intelligence.
            </p>

            {/* Hero Product Showcase in Clean White Frame */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-white p-2 sm:p-2.5 border border-slate-200/90">
              <img
                src="/showcase/executive_boardroom_multiscreen.png"
                alt="Qonevo Interactive Commercial Display in Corporate Boardroom"
                className="w-full h-auto object-cover object-center rounded-xl"
                loading="eager"
              />
              <div className="flex flex-col sm:flex-row items-center justify-between px-3 py-2 text-xs text-slate-500 bg-white gap-2">
                <span className="font-semibold text-black flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  Live Deployment: Corporate Boardroom 4-Way Multi-Screen Split
                </span>
                <span className="text-slate-400">Qonevo Series 2026 Commercial Interactive Panel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY METRICS BAR */}
      <section className="py-14 border-y border-slate-200/80 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {/* Stat 1 */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#163c58]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#163c58] text-white flex items-center justify-center mb-4 shadow-sm">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                1,00,000+
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-1">
                Active Daily Collaborators
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#163c58]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#163c58] text-white flex items-center justify-center mb-4 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                1,000+
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-1">
                Enterprise &amp; Campus Deployments
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#163c58]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#163c58] text-white flex items-center justify-center mb-4 shadow-sm">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                5+
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-1">
                Global Markets &amp; Presence
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center p-6 rounded-2xl bg-[#f8fafc] border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#163c58]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#163c58] text-white flex items-center justify-center mb-4 shadow-sm">
                <MonitorCheck className="w-6 h-6" />
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                99.9%
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-1">
                Commercial-Grade Uptime &amp; SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENTERPRISE HARDWARE SPECIFICATIONS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#163c58] mb-2">
            Built for Modern Business
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
            Commercial-Grade Hardware &amp; Architecture
          </p>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-2">
            Architected to empower enterprise boardrooms, corporate training centers,
            and government institutions with mission-critical reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <HandMetal className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              40+ Point Multi-Touch
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              ≤ 4ms Ultra-Low Latency
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              Zero Bonding Technology with ±1mm writing precision. Enables multi-user
              simultaneous whiteboarding, design annotation, and document markup.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              48 MP AI Video Conferencing
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              120° Wide-Angle Lens
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              Integrated camera with AI auto-framing and voice tracking for flawless
              boardroom hybrid meetings across Zoom, Microsoft Teams, and Google Meet.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <Mic className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              8-Array Microphone System
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              10-Meter Omnidirectional Pickup
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              Advanced acoustic echo cancellation and AI background noise reduction
              ensure every participant in large conference rooms is heard crisply.
            </p>
          </div>

          {/* Card 4 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              OPS Dual-OS Computing
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              Intel Core i5/i7 (12th-14th Gen)
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              Modular computing with up to 64GB DDR4 RAM and 2TB SSD. Hot-swap seamlessly
              between corporate Windows 11 Pro Enterprise and Android 14.
            </p>
          </div>

          {/* Card 5 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              Google EDLA Enterprise Security
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              Enterprise MDM &amp; Encryption
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              SOC-ready certified ecosystem with centralized IT remote management,
              over-the-air firmware upgrades, and corporate policy enforcement.
            </p>
          </div>

          {/* Card 6 */}
          <div className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:bg-[#163c58] hover:border-[#163c58] shadow-sm hover:shadow-2xl hover:shadow-[#163c58]/25 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
            <div className="w-10 h-10 rounded-lg bg-[#163c58] group-hover:bg-white flex items-center justify-center text-white group-hover:text-[#163c58] mb-4 shadow-sm transition-colors duration-300">
              <Network className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-black group-hover:text-white mb-1 transition-colors duration-300">
              BYOD Wireless Screen Casting
            </div>
            <div className="text-xs font-semibold text-[#163c58] group-hover:text-sky-200 mb-2 transition-colors duration-300">
              Multi-Screen Split Layout
            </div>
            <p className="text-sm text-slate-600 group-hover:text-slate-100 leading-relaxed transition-colors duration-300">
              Instant wireless screen mirroring for iOS, macOS, Windows, and Android.
              Support for up to 9 simultaneous device feeds with two-way touchback.
            </p>
          </div>
        </div>
      </section>

      {/* 5. REAL-WORLD DEPLOYMENT SCENARIOS */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#163c58]/10 text-[#163c58] mb-4">
              <Building2 className="w-3.5 h-3.5" /> Commercial Deployment Scenarios
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black tracking-tight mb-5 leading-tight">
              Engineered for High-Stakes Collaboration
            </h3>
            <p className="text-base text-slate-600 leading-relaxed">
              Experience authentic hardware engineered for how modern enterprises,
              universities, and institutions actually work. No artificial compromises—just
              crystal-clear telepresence, natural digital ink, and 24/7 industrial uptime.
            </p>
          </div>

          {/* Deployment 1: Hybrid Video Conferencing */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-20">
            <div className="flex-1 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#163c58] mb-3">
                <Video className="w-3.5 h-3.5" /> Hybrid Telepresence
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-4">
                Crystal-Clear Video Meetings with Auto-Framing AI
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Connect distributed teams and satellite offices seamlessly. The built-in 48 MP
                AI camera automatically tracks active speakers, while the 8-array beamforming
                microphone with acoustic noise cancellation captures every voice up to 10 meters away.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  Native Zoom, Teams &amp; Meet
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  48 MP Auto-Framing Optical Sensor
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  10m Microphone Voice Pickup
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  Picture-in-Picture Dual Video
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                <img
                  src="/showcase/hybrid_videoconferencing_display.png"
                  alt="Qonevo 4K Hybrid Video Conferencing in Live Conference Room"
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-3 bg-white flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-black">Hybrid Telepresence Setup</span>
                  <span>4K UHD • 400 nits • Anti-Glare</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deployment 2: Interactive Whiteboard & Natural Writing */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14 mb-20">
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                <img
                  src="/showcase/interactive_whiteboard_classroom.png"
                  alt="Qonevo Zero-Bonding Interactive Whiteboard with Mathematical Canvas"
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-3 bg-white flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-black">Live Interactive Studio</span>
                  <span>40+ Point Touch • ≤4ms Response</span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#163c58] mb-3">
                <PenTool className="w-3.5 h-3.5" /> Zero-Bonding Touch Engine
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-4">
                Natural Writing with Zero Optical Parallax
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Eliminate the visual gap between pen tip and digital ink. Zero-bonding
                directly laminates the 4K display against 4mm anti-glare glass. Experience
                ≤4ms touch response for natural sketching, complex math, and collaborative brainstorming.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  40+ Concurrent Touch Points
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  Ultra-Fast ≤ 4ms Response Time
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  Dual Magnetic Active Stylus
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  1-Click Cloud &amp; QR Code Export
                </div>
              </div>
            </div>
          </div>

          {/* Deployment 3: Commercial Reliability & Smart Power Management */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-100 text-[#163c58] mb-3">
                <Zap className="w-3.5 h-3.5" /> Industrial SLA &amp; Energy Efficiency
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-black tracking-tight mb-4">
                24/7 Commercial Duty Cycle with Smart Power Saving
              </h4>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Built to withstand continuous corporate and institutional demands. 7H hardness
                toughened glass protects against accidental impacts, while intelligent ambient light
                sensors and automated power-saving standby keep energy consumption minimal.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  24/7 Continuous Duty Rating
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  7H Mohs Toughened Safety Glass
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  Automatic Eco Power-Saving Standby
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#f5f7fa] p-3 rounded-lg border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#163c58] flex-shrink-0" />
                  All-Metal Convective Thermal Chassis
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                <img
                  src="/showcase/power_saving_classroom.png"
                  alt="Qonevo Commercial Display in Power Saving & Optical Efficiency Mode"
                  className="w-full h-auto object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="p-3 bg-white flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-black">Commercial Power Saving</span>
                  <span>Eco Standby • 400 nits • 7H Toughened</span>
                </div>
              </div>
            </div>
          </div>

          {/* Centered "Know More" Button Redirecting to Form */}
          <div className="mt-14 sm:mt-16 flex justify-center">
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#163c58] hover:bg-black text-white text-sm font-semibold rounded-xl shadow-lg shadow-[#163c58]/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Know More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. GRAVITY AI™ ENTERPRISE PRODUCTIVITY */}
      <section className="py-16 bg-[#f5f7fa] border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-[#163c58]/10 text-[#163c58] mb-3">
                <Brain className="w-3.5 h-3.5" /> Gravity AI™ Enterprise Engine
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-4">
                Automate Meeting Workflows &amp; Analysis
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                Gravity AI accelerates executive decision-making and cross-team
                collaboration with real-time document analysis, meeting synthesis,
                and interactive visual thinking tools.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#163c58] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong className="text-black">Document RAG Intelligence:</strong> Ingest corporate PDFs, contracts, &amp; data reports for instant conversational Q&amp;A
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#163c58] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong className="text-black">Executive Text Summarization:</strong> Condense comprehensive meeting transcripts into actionable items
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#163c58] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong className="text-black">Strategic Mind Mapping:</strong> Auto-generate structured visual diagrams and business roadmaps with 1 click
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#163c58] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">
                    <strong className="text-black">Smart Annotation &amp; FX Pen:</strong> Precision mathematical analysis, chart conversion, and clean vector rendering
                  </span>
                </div>
              </div>
            </div>

            {/* Commercial Readiness Spec Sheet */}
            <div className="w-full lg:w-96 p-6 rounded-2xl bg-[#f5f7fa] border border-slate-200 shadow-sm">
              <h4 className="text-sm font-bold text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#163c58]" /> Commercial SLA &amp; Build
              </h4>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Duty Cycle</span>
                  <span className="font-semibold text-black">24/7 Commercial Grade</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Glass Hardness</span>
                  <span className="font-semibold text-black">4mm Anti-Glare 7H Toughened</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Wireless Collaboration</span>
                  <span className="font-semibold text-black">Wi-Fi 6 / BT 5.2 / Gigabit LAN</span>
                </li>
                <li className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500">Conferencing Audio</span>
                  <span className="font-semibold text-black">20W x 2 + Subwoofer</span>
                </li>
                <li className="flex justify-between py-1.5">
                  <span className="text-slate-500">Mounting Flexibility</span>
                  <span className="font-semibold text-black">Mobile Motorized / Wall Mount</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR CLIENTS SHOWCASE */}
      <section className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[2.5rem] bg-white border border-slate-200/90 shadow-xl py-12 sm:py-16 md:py-20 px-2 sm:px-6 md:px-8 text-center">
          {/* Ambient Top Glow / Subtle Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-[radial-gradient(ellipse_at_top,rgba(22,60,88,0.06),transparent_70%)] pointer-events-none blur-xl" />

          {/* Pill Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-[#163c58] bg-[#163c58]/10 border border-[#163c58]/20 mb-5 sm:mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#163c58] animate-pulse" />
            <span>Our Clients</span>
          </div>

          {/* Section Heading - Multi-line matching typography */}
          <h2 className="relative z-10 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black mb-3 sm:mb-4 leading-tight px-2">
            Our Clients: Leading <br />
            <span className="text-[#163c58] font-bold">Brands That Trust</span> <br />
            <span className="text-black">Qonevo</span>
          </h2>

          {/* Subtitle */}
          <p className="relative z-10 max-w-2xl mx-auto text-xs sm:text-base text-slate-600 leading-relaxed mb-8 sm:mb-14 px-3">
            Discover the top brands and businesses that choose Qonevo as their
            partner. We are proud to work with industry leaders and innovative
            companies across diverse sectors.
          </p>

          {/* Infinite Marquee Rows with Left/Right Soft Fade Gradients */}
          <div className="relative z-10 overflow-hidden space-y-4 sm:space-y-5 w-full">
            {/* Left/Right Edge Shadow Fade Masks matching white background */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

            {/* Row 1 - Marquee Left (Logos 01 to 14 duplicated) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee flex items-center gap-3 sm:gap-6 py-2">
                {[...CLIENT_LOGOS.slice(0, 14), ...CLIENT_LOGOS.slice(0, 14)].map((logo, idx) => (
                  <div
                    key={`row1-${idx}`}
                    className="flex items-center justify-center h-14 sm:h-20 w-32 sm:w-48 px-3 sm:px-4 py-2 bg-[#f8fafc] hover:bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#163c58]/40 hover:scale-105 transition-all duration-300 flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={logo}
                      alt="Qonevo Client Partner"
                      className="max-h-8 sm:max-h-12 w-auto max-w-full object-contain filter contrast-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Marquee Reverse Right (Logos 15 to 28 duplicated) */}
            <div className="flex overflow-hidden">
              <div className="animate-marquee-reverse flex items-center gap-3 sm:gap-6 py-2">
                {[...CLIENT_LOGOS.slice(14, 28), ...CLIENT_LOGOS.slice(14, 28)].map((logo, idx) => (
                  <div
                    key={`row2-${idx}`}
                    className="flex items-center justify-center h-14 sm:h-20 w-32 sm:w-48 px-3 sm:px-4 py-2 bg-[#f8fafc] hover:bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#163c58]/40 hover:scale-105 transition-all duration-300 flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={logo}
                      alt="Qonevo Client Partner"
                      className="max-h-8 sm:max-h-12 w-auto max-w-full object-contain filter contrast-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM FOOTER */}
      <footer className="w-full bg-black text-white py-10 px-4 text-xs border-t border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="p-2 bg-white rounded-xl inline-block shadow-sm">
              <img
                src="/Synergy-Qonevo-logo.webp"
                alt="Synergy Qonevo Technologies"
                className="h-8 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <p className="font-semibold text-white">
                Qonevo Technologies Private Limited
              </p>
              <p className="text-slate-400 mt-0.5">
                B66, Sector 65, Noida, Uttar Pradesh 201301 - INDIA
              </p>
            </div>
          </div>
          <div className="text-slate-400 text-center sm:text-right">
            <p>© 2026 Qonevo Technologies. All rights reserved.</p>
            <p>A member of the Synergy Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
