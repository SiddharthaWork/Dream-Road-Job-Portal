import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserLoginProvider } from "@/contexts/userLogin-context";
import { Toaster } from "react-hot-toast";
import UserBlockWrapper from "@/components/shared/UserBlockWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DreamRoad - Job Portal",
  description: "One Stop Solution For Your Dream Job",
  icons: {
    icon: "/dreamroad.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased` }
        suppressHydrationWarning={true}
      >
        <UserLoginProvider>
          <UserBlockWrapper>
            <Toaster position="top-center"   />
            {children}
          </UserBlockWrapper>
        </UserLoginProvider>
      </body>
    </html>
  );
}
