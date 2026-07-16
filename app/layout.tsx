import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider, themeInitScript } from "@/lib/theme";
import "./globals.css";

const manrope = localFont({
  src: "../public/fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MeMomy — Your Pregnancy Companion",
  description:
    "A calm, private companion for the pregnancy journey — TTC, pregnancy, and postpartum — with trusted Farsi-speaking specialists.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8FE" },
    { media: "(prefers-color-scheme: dark)", color: "#16101F" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${manrope.variable} font-sans bg-background text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
