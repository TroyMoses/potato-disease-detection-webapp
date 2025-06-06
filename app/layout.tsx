import type React from "react";
import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BookmarkProvider } from "@/context/bookmark-context";
import { Toaster } from "sonner";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
// });

export const metadata: Metadata = {
  title: "Legacy Potato Doctor",
  description: "Identify potato plant diseases instantly with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <BookmarkProvider>
            {children}
            <Toaster theme="dark" position="top-right" richColors />
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
