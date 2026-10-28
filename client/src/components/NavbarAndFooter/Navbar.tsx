"use client";

import React, { useState, useEffect, useRef } from "react";

const DISPLAY_ITEMS = [
  {
    title: "Interactive Flat Panel",
    img: "/DisplayNav/image1.webp",
    link: "https://qonevo.in/IFP",
  },
  {
    title: "Active LED Display",
    img: "/DisplayNav/image5.webp",
    link: "https://qonevo.in/active-led",
  },
  {
    title: "Advertising Display & Signage",
    img: "/DisplayNav/image2.webp",
    link: "https://qonevo.in/advertising-display",
  },
  {
    title: "Kiosk & Smart Display",
    img: "/DisplayNav/image3.webp",
    link: "https://qonevo.in/kiosk-display",
  },
  {
    title: "Video Conferencing Solutions",
    img: "/DisplayNav/VideoConfrencingSolutions.webp",
    link: "https://qonevo.in/camera",
  },
];

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(true);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.innerWidth > 991) {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
      setIsProductsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (typeof window !== "undefined" && window.innerWidth > 991) {
      leaveTimerRef.current = setTimeout(() => {
        setIsProductsOpen(false);
      }, 250);
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
    const element =
      document.getElementById("contact-section") ||
      document.getElementById("form-section");
    if (element) {
      const navbarHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.paddingTop = "80px";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.paddingTop = "0px";
      }
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[80px] bg-white border-b border-black/[0.06] z-50 flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between">
          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="lg:hidden p-2 -ml-2 text-neutral-800 hover:text-black focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.75"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo on Left: Links to https://qonevo.in/ */}
          <a
            href="https://qonevo.in/"
            className="flex items-center"
            title="Qonevo Technologies"
          >
            <img
              src="/Synergy-Qonevo-logo.webp"
              alt="Synergy | Qonevo"
              className="h-[28px] sm:h-[30px] w-auto object-contain"
            />
          </a>

          {/* Empty spacer for mobile layout balance */}
          <div className="w-7 lg:hidden" />

          {/* Desktop Navigation Links on Right */}
          <div className="hidden lg:flex items-center gap-9">
            {/* Products Dropdown Item */}
            <div
              className="relative py-7 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className={`text-[15px] font-sans font-normal transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer ${
                  isProductsOpen
                    ? "text-[#e41346] font-semibold"
                    : "text-[#131313] hover:text-[#e41346]"
                }`}
              >
                <span>Products</span>
                {/* <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180 text-[#e41346]" : "text-neutral-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg> */}
              </button>
            </div>

            {/* About Link: Links to https://qonevo.in/about-us */}
            <a
              href="https://qonevo.in/about-us"
              className="text-[15px] font-sans font-normal text-[#131313] hover:text-[#e41346] hover:font-semibold transition-all duration-150"
            >
              About
            </a>

            {/* Support Link: Links to https://qonevo.in/support */}
            <a
              href="https://qonevo.in/support"
              className="text-[15px] font-sans font-normal text-[#131313] hover:text-[#e41346] hover:font-semibold transition-all duration-150"
            >
              Support
            </a>

            {/* Contact Us: Smooth scroll to consultation form */}
            <button
              onClick={scrollToContact}
              className="text-[15px] font-sans font-normal text-[#131313] hover:text-[#e41346] hover:font-semibold transition-all duration-150 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Mega Menu Overlay */}
      {isProductsOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 top-[80px]"
          onClick={() => setIsProductsOpen(false)}
        />
      )}

      {/* Desktop Mega Menu Panel */}
      <div
        className={`fixed top-[80px] left-0 right-0 bg-[#f5f5f5] z-50 border-t border-neutral-200 shadow-2xl transition-all duration-300 overflow-hidden ${
          isProductsOpen
            ? "opacity-100 visible pointer-events-auto max-h-[500px] py-10"
            : "opacity-0 invisible pointer-events-none max-h-0 py-0"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex flex-wrap items-stretch justify-start gap-5">
            {DISPLAY_ITEMS.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="group flex flex-col items-center justify-between bg-white rounded-2xl p-4 w-[190px] h-[230px] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 text-decoration-none cursor-pointer"
              >
                <div className="w-full flex-1 flex items-center justify-center overflow-hidden p-2">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="max-h-[120px] w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs font-semibold text-center text-slate-700 group-hover:text-[#e41346] transition-colors mt-auto leading-tight">
                  {item.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-white z-40 lg:hidden overflow-y-auto px-6 py-6 border-t border-neutral-200 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            {/* Mobile Products Accordion */}
            <div className="border-b border-neutral-100 pb-3">
              <button
                type="button"
                onClick={() => setIsMobileProductsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between text-base font-semibold text-neutral-800 py-2 cursor-pointer"
              >
                <span>Products</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMobileProductsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isMobileProductsOpen && (
                <div className="grid grid-cols-2 gap-3 pt-3">
                  {DISPLAY_ITEMS.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      className="bg-neutral-100 hover:bg-neutral-200/80 rounded-xl p-3 flex flex-col items-center text-center transition-colors text-decoration-none"
                    >
                      <div className="w-full h-20 flex items-center justify-center mb-2">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <span className="text-[11px] font-medium text-neutral-700 leading-tight">
                        {item.title}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About */}
            <div className="border-b border-neutral-100 py-3">
              <a
                href="https://qonevo.in/about-us"
                className="block text-base font-semibold text-neutral-800 hover:text-[#e41346]"
              >
                About
              </a>
            </div>

            {/* Mobile Support */}
            <div className="border-b border-neutral-100 py-3">
              <a
                href="https://qonevo.in/support"
                className="block text-base font-semibold text-neutral-800 hover:text-[#e41346]"
              >
                Support
              </a>
            </div>

            {/* Mobile Contact Us */}
            <div className="py-3">
              <button
                onClick={scrollToContact}
                className="block text-left w-full text-base font-semibold text-neutral-800 hover:text-[#e41346] cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
