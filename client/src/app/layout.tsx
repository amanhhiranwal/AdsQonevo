import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Interactive Flat Panel for Education & Classroom Teaching | Qonevo",
  description:
    "Make classroom teaching interactive with Qonevo smart boards. 4K interactive flat panels for schools with touch, wireless casting, AI tools & expert installation.",
  metadataBase: new URL("https://panel.qonevo.in"),
  alternates: {
    canonical: "https://panel.qonevo.in/",
  },
  openGraph: {
    title: "Interactive Flat Panel for Education & Classroom Teaching | Qonevo",
    description:
      "Make classroom teaching interactive with Qonevo smart boards. 4K interactive flat panels for schools with touch, wireless casting, AI tools & expert installation.",
    url: "https://panel.qonevo.in/",
    siteName: "Qonevo",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://panel.qonevo.in/showcase/classroom_interactive_display.webp",
        width: 1200,
        height: 630,
        alt: "Qonevo Interactive Flat Panel for Education & Classroom Teaching",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interactive Flat Panel for Education & Classroom Teaching | Qonevo",
    description:
      "Make classroom teaching interactive with Qonevo smart boards. 4K interactive flat panels for schools with touch, wireless casting, AI tools & expert installation.",
    images: [
      "https://panel.qonevo.in/showcase/classroom_interactive_display.webp",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://qonevo.in/#organization",
  name: "Qonevo Technologies Private Limited",
  url: "https://qonevo.in/",
  logo: "https://panel.qonevo.in/Synergy-Qonevo-logo.webp",
  address: {
    "@type": "PostalAddress",
    streetAddress: "B66, Sector 65",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "business@qonevo.in",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/qonevo-technologies-private-limited",
  ],
};

const webpageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://panel.qonevo.in/#webpage",
  url: "https://panel.qonevo.in/",
  name: "Interactive Flat Panel for Business & Conference Rooms | Qonevo",
  description:
    "Qonevo interactive flat panels for business meetings, conference rooms, and corporate training. Explore 65, 75 & 86 inch 4K displays with AI conferencing, wireless casting, and enterprise security.",
  isPartOf: { "@id": "https://qonevo.in/#organization" },
  about: { "@id": "https://qonevo.in/#organization" },
  primaryImageOfPage:
    "https://panel.qonevo.in/showcase/executive_boardroom_multiscreen.png",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Qonevo",
      item: "https://qonevo.in/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Interactive Flat Panel for Education",
      item: "https://panel.qonevo.in/",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size interactive flat panel is best for a classroom?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best interactive flat panel size depends on classroom size and viewing distance. A 65-inch panel is suitable for small classrooms, a 75-inch interactive flat panel works well for standard classrooms, and an 86-inch panel is ideal for large classrooms, lecture halls, and coaching institutes. For most school classrooms, a 75-inch interactive flat panel for education offers a comfortable balance of visibility and usability.",
      },
    },
    {
      "@type": "Question",
      name: "Can teachers use PowerPoint, PDF, and Google Classroom on an interactive flat panel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Teachers can open, display, and annotate PowerPoint presentations and PDF files directly on an interactive flat panel. Google Classroom and other online education tools can also be accessed through the panel’s browser or supported apps, depending on the model, software compatibility, and internet connection.",
      },
    },
    {
      "@type": "Question",
      name: "Does Qonevo provide installation for interactive flat panels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Qonevo provides installation support for interactive flat panels, including wall-mount or stand setup based on the classroom requirement. Installation coverage, mounting type, and teacher training can be confirmed while placing the order.",
      },
    },
    {
      "@type": "Question",
      name: "Is special training required for teachers to use an IFP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No special technical training is required. Most teachers can start using an interactive flat panel for basic teaching activities such as writing, opening files, annotating, and presenting within a short time. A brief training session can help teachers use advanced features such as wireless casting, cloud saving, quizzes, and video conferencing more confidently.",
      },
    },
    {
      "@type": "Question",
      name: "What is an interactive flat panel for business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An interactive flat panel for business is a large 4K touchscreen display used for meetings, presentations, training, and collaboration. It combines a display, digital whiteboard, wireless screen sharing, and video conferencing tools in one device.",
      },
    },
    {
      "@type": "Question",
      name: "Which display size is best for a conference room?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A 65-inch panel suits small meeting rooms, a 75-inch panel suits standard conference rooms, and an 86-inch panel is better for large boardrooms and training rooms.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webpageSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#f5f7fa] text-black font-sans selection:bg-[#163c58] selection:text-white overflow-x-hidden w-full">
        {children}
      </body>
    </html>
  );
}
