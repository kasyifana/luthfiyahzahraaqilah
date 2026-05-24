import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luthfiyah Zahra Aqilah | Portfolio Analis Ekonomi Pembangunan",
  description: "Academic & Data Portfolio of Luthfiyah Zahra Aqilah, a 2nd-semester Development Economics student at Universitas Pendidikan Indonesia (UPI). Specialized in econometrics, regional disparity, and BPS microdata analysis.",
  keywords: ["Luthfiyah Zahra Aqilah", "Ekonomi Pembangunan", "Development Economics", "UPI", "Analis Data", "Ekonometrika", "BPS", "Jawa Barat"],
  authors: [{ name: "Luthfiyah Zahra Aqilah" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`}>
      <body className="font-sans bg-slate-50/50 text-slate-900 min-h-screen antialiased selection:bg-sky-200 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
