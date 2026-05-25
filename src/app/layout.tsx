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
  title: "Luthfiyah Zahra Aqilah | Development Economics Academic Portfolio",
  description: "Academic & Data Portfolio of Luthfiyah Zahra Aqilah, a 2nd-semester Development Economics student at Universitas Negeri Semarang (UNNES). Specialized in econometrics, regional disparity, and BPS microdata analysis.",
  keywords: ["Luthfiyah Zahra Aqilah", "Development Economics", "UNNES", "Data Analyst", "Econometrics", "BPS"],
  authors: [{ name: "Luthfiyah Zahra Aqilah" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen antialiased selection:bg-sky-200 selection:text-sky-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
