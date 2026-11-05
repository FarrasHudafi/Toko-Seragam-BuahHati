import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
};

export default function NotFound() {
  return (
    <main className="section-wrap">
      <header className="page-intro">
        <p className="eyebrow">Error 404</p>
        <h1>Halaman tidak ditemukan</h1>
        <p className="muted">Halaman yang kamu cari tidak tersedia atau alamatnya sudah berubah.</p>
        <div className="button-row">
          <Link className="button button-dark" href="/">
            Kembali ke beranda
          </Link>
          <Link className="text-link" href="/produk">
            Buka katalog <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
    </main>
  );
}
