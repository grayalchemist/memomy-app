import type { Metadata } from "next";
import { Lora, Raleway } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora", // Header font
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway", // Body font
});

export const metadata: Metadata = {
  title: "MeMomy - Your Pregnancy Companion",
  description: "Pitch MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${raleway.variable} font-sans antialiased bg-[#FAF8FF] text-[#1A1033]`}>
        {children}
      </body>
    </html>
  );
}
