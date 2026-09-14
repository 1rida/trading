import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ApexTrader",
  description: "ApexTrader is a premium real-time paper trading simulator.",
};

import { DemoTradeProvider } from "@/lib/demo-trading";
import { AuthProvider } from "@/lib/auth-context";
import { NotificationProvider } from "@/lib/notification-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
            <NotificationProvider>
                <DemoTradeProvider>
                    <Navbar />
                    <div className="animate-entrance">
                        {children}
                    </div>
                    <Footer />
                </DemoTradeProvider>
            </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
