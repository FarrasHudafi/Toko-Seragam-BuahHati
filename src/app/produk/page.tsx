import type { Metadata } from "next";
import { Suspense } from "react";
import ProductCatalog from "./product-catalog";

export const metadata: Metadata = {
  title: "Katalog",
  description: "Jelajahi seragam sekolah SD, SMP, SMA, dan atribut sekolah berdasarkan jenjang.",
};

export default function ProductsPage() {
  return (
    <main className="section-wrap catalog-page">
      <header className="page-intro">
        <p className="eyebrow">Koleksi toko</p>
        <h1>Seragam sekolah</h1>
        <p className="muted">
          Jelajahi seragam sekolah berdasarkan jenjang, lalu konfirmasi ukuran dan ketersediaan
          kepada toko.
        </p>
      </header>
      <Suspense fallback={<p className="muted">Memuat katalog…</p>}>
        <ProductCatalog />
      </Suspense>
    </main>
  );
}
