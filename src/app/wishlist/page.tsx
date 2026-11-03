"use client";

import Link from "next/link";
import PageShell from "@/components/PageShell";
import ProductCard from "@/components/ProductCard";
import { PRODUCT_BY_SLUG } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = wishlist.flatMap((s) => (PRODUCT_BY_SLUG[s] ? [PRODUCT_BY_SLUG[s]] : []));

  return (
    <PageShell title="Wishlist" intro="Produk yang Anda simpan. Tersimpan di browser ini, belum terhubung ke akun.">
      {items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl font-extrabold">Belum ada produk tersimpan</p>
          <p className="mt-2 text-sm">Tekan ikon hati pada produk untuk menyimpannya di sini.</p>
          <Link href="/koleksi/semua" className="mt-6 inline-block bg-ink px-10 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800">Lihat koleksi</Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {items.map((p) => <li key={p.slug}><ProductCard product={p} caps /></li>)}
        </ul>
      )}
    </PageShell>
  );
}
