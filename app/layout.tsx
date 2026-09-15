import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: {
    default: "Barmanji.com",
    template: "%s | Barmanji.com",
  },
  description: "Cooking in Nvim with opencode",
  openGraph: {
    title: "Barmanji.com",
    description: "Software Craftsman, Dating NEXT.js & TypeScript",
    url: "https://barmanji.com",
    siteName: "barmanji.com",
    images: [
      {
        url: "https://barmanji.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Barmanji",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={[
        inter.variable,
        calSans.variable,
        "h-full",
        "antialiased",
        "dark",
      ].join(" ")}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('barmanji-has-visited');if(t){document.documentElement.classList.add('barmanji-no-intro')}else{localStorage.setItem('barmanji-has-visited','true')}}catch(e){}})()`,
          }}
        />
        <Analytics />
      </head>
      <body
        className={`min-h-full flex flex-col bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : ""}`}
      >
        {children}
      </body>
    </html>
  );
}
