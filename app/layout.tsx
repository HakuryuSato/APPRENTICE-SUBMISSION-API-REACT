import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Titillium_Web } from "next/font/google";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { AuthProvider } from "@contexts/AuthContext";

const titilliumWeb = Titillium_Web({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-titillium-web",
});

export const metadata: Metadata = {
  title: "Conduit",
  description: "A place to share your knowledge.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={titilliumWeb.variable}>
      <head>
        <meta charSet="utf-8" />
        <title>Conduit</title>
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
