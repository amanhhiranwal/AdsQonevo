import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Qonevo | Enterprise Display • Smart Computing • Intelligent Collaboration",
  description: "Powering enterprise digital innovation with intelligent interactive displays, 4K commercial panels, and Gravity AI.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-[#f5f7fa] text-black font-sans selection:bg-[#163c58] selection:text-white overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}
