import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchPanel from "@/components/SearchPanel";
import SideDiscountTab from "@/components/SideDiscountTab";
import WishlistFab from "@/components/WishlistFab";
import ScrollEffects from "@/components/ScrollEffects";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Seragam Buah Hati | Toko Seragam Sekolah",
  description:
    "Seragam SD, SMP, SMA, Pramuka, olahraga dan atribut sekolah. Pilih warna dan ukuran, pesan lewat WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${display.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-white text-body">
        <StoreProvider>
          <Header />
          <SearchPanel />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SideDiscountTab />
          <WishlistFab />
          <ScrollEffects />
        </StoreProvider>
      </body>
    </html>
  );
}
