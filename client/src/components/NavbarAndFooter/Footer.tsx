"use client";

import React from "react";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f7fa] text-black border-t border-slate-200 mt-20">
      {/* Top Footer Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Company Details Column */}
          <div className="lg:col-span-5 pr-0 lg:pr-8">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#131313] mb-1">
              Synergy Global Private Limited
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mb-3">
              (Formerly Known as Qonevo Technologies Pvt Ltd.)
            </p>
            <p className="text-xs sm:text-sm text-neutral-800 mb-3">
              <span className="font-bold">CIN:</span> 72200UP2021PTC156318
            </p>

            <div className="mb-3 text-xs sm:text-sm text-neutral-800 leading-relaxed">
              <span className="font-bold block mb-0.5">Address:</span>
              <p className="text-neutral-700">
                B66, B Block, Sector 65, Noida, Uttar Pradesh, 201309
              </p>
            </div>

            <div className="text-xs sm:text-sm text-neutral-800">
              <span className="font-bold block mb-0.5">Toll free Number:</span>
              <a
                href="tel:18001205900"
                className="text-neutral-800 hover:text-[#e41346] transition-colors"
              >
                1800 120 5900
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#131313] mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://qonevo.in/"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/about-us"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/support"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Products Column */}
          <div className="lg:col-span-3">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#131313] mb-4">
              Products
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://qonevo.in/IFP"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Interactive Flat Panel
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/active-led"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Active Led Display
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/advertising-display"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Advertising Display & Signage
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/kiosk-display"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Kiosk & Smart Display
                </a>
              </li>
              <li>
                <a
                  href="https://qonevo.in/camera"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Video Conferencing Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="lg:col-span-2">
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wide text-[#131313] mb-4">
              Policies
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://qonevo.in/privacy-policy"
                  className="text-neutral-800 hover:text-[#e41346] hover:font-semibold transition-all inline-block"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Matching Image 4 */}
      <div className="w-full bg-[#e9e9e9] border-t border-slate-300/70 py-3.5">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Socials on Left: Inline horizontal */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-900 text-xs sm:text-sm">
              Socials:
            </span>
            <div className="flex items-center gap-3.5 text-neutral-800">
              <a
                href="https://www.linkedin.com/company/qonevo-technologies-private-limited/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e41346] transition-colors inline-flex items-center text-[15px]"
                aria-label="Qonevo LinkedIn"
              >
                <SocialIcon name="linkedin" />
              </a>
              <a
                href="https://www.instagram.com/qonevo/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e41346] transition-colors inline-flex items-center text-[15px]"
                aria-label="Qonevo Instagram"
              >
                <SocialIcon name="instagram" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61592653766628"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e41346] transition-colors inline-flex items-center text-[15px]"
                aria-label="Qonevo Facebook"
              >
                <SocialIcon name="facebook" />
              </a>
            </div>
          </div>

          {/* Contact Emails on Right: Inline horizontal */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-1 text-xs sm:text-sm">
            <div>
              <span className="font-semibold text-neutral-900">Sales E-mail:</span>{" "}
              <a
                href="mailto:business@qonevo.in"
                className="text-neutral-800 hover:text-[#e41346] hover:underline transition-colors"
              >
                business@qonevo.in
              </a>
            </div>
            <div>
              <span className="font-semibold text-neutral-900">Support E-mail:</span>{" "}
              <a
                href="mailto:support@qonevo.in"
                className="text-neutral-800 hover:text-[#e41346] hover:underline transition-colors"
              >
                support@qonevo.in
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
