import Link from "next/link";
import BrandLink from "@/components/brand-link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <BrandLink />
          <p>Temukan seragam sekolah dan panduan ukuran dengan lebih mudah.</p>
        </div>
        <div>
          <h2>Jelajahi</h2>
          <Link href="/produk">Katalog</Link>
          <Link href="/ukuran">Panduan ukuran</Link>
          <Link href="/tentang">Tentang kami</Link>
        </div>
        <div>
          <h2>Bantuan</h2>
          <Link href="/kontak">Hubungi kami</Link>
          <span>Konfirmasi produk dan ukuran langsung ke toko.</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Toko Seragam Buah Hati</span>
        <span>Informasi produk dapat dikonfirmasi kepada toko.</span>
      </div>
    </footer>
  );
}
