import type { Metadata } from "next";
import { Geist } from "next/font/google";
import ScrollReveal from "@/components/scroll-reveal";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Toko Seragam Buah Hati",
    default: "Toko Seragam Buah Hati",
  },
  description: "Pilihan seragam sekolah dan panduan ukuran dari Toko Seragam Buah Hati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={geistSans.variable}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ScrollReveal />
      </body>
    </html>
  );
}
