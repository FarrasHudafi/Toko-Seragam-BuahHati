"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "./Icons";
import ProductImage from "./ProductImage";
import { CATEGORIES, searchProducts } from "@/data/catalog";
import { formatRupiah } from "@/lib/site";
import { useStore } from "@/context/StoreContext";
import useDialog from "@/lib/useDialog";

export default function SearchPanel() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q]);
  const total = useMemo(() => searchProducts(q).length, [q]);

  const panelRef = useDialog<HTMLDivElement>(searchOpen, () => setSearchOpen(false), inputRef);

  const close = () => setSearchOpen(false);

  return (
    <div
      className={`fixed inset-0 z-50 ${searchOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Cari produk"
      aria-hidden={!searchOpen}
    >
      <button
        type="button"
        className={`hp-overlay absolute inset-0 bg-black/50 transition-opacity duration-300 ${searchOpen ? "is-open visible opacity-100" : "invisible opacity-0"}`}
        aria-label="Tutup pencarian"
        tabIndex={searchOpen ? 0 : -1}
        onClick={close}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`hp-search-panel absolute inset-x-0 top-0 max-h-[90vh] overflow-y-auto bg-white shadow-[0_12px_24px_-12px_rgba(0,0,0,0.35)] outline-none transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] ${searchOpen ? "is-open visible translate-y-0 opacity-100" : "invisible -translate-y-6 opacity-0"}`}
      >
        <form action="/koleksi/semua" className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-5">
          <SearchIcon className="h-6 w-6 shrink-0 text-ink" />
          <input
            ref={inputRef}
            name="q"
            aria-label="Cari produk"
            value={q}
            tabIndex={searchOpen ? 0 : -1}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kemeja, rok, SD, batik..."
            className="w-full border-0 border-b border-ink bg-transparent py-2 text-lg text-ink outline-none placeholder:text-muted"
            autoComplete="off"
          />
          <button type="button" aria-label="Tutup" tabIndex={searchOpen ? 0 : -1} onClick={close}><CloseIcon className="h-6 w-6 text-ink" /></button>
        </form>

        <div className="mx-auto max-w-4xl px-4 pb-8">
          {q.trim() === "" ? (
            <div>
              <p className="mb-3 text-xs font-bold uppercase text-ink">Pencarian populer</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <Link key={c.id} href={`/koleksi/${c.id}`} tabIndex={searchOpen ? 0 : -1} onClick={close} className="hp-opt-label border border-neutral-300 px-4 py-2 text-sm text-ink transition-colors duration-500 hover:border-ink">{c.name}</Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="py-6 text-sm">Tidak ada produk untuk &ldquo;{q}&rdquo;. Coba kata lain seperti &ldquo;kemeja&rdquo; atau &ldquo;pramuka&rdquo;, atau tanyakan stok lewat <Link href="/kontak" tabIndex={searchOpen ? 0 : -1} onClick={close} className="underline">WhatsApp</Link>.</p>
          ) : (
            <>
              <ul className="divide-y divide-neutral-100">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/produk/${p.slug}`} tabIndex={searchOpen ? 0 : -1} onClick={close} className="flex items-center gap-4 py-3 transition-colors duration-200 hover:bg-soft">
                      <span className="block h-16 w-16 shrink-0 overflow-hidden"><ProductImage product={p} /></span>
                      <span className="flex-1 text-sm text-ink">{p.name}</span>
                      <span className="text-sm font-bold text-ink">{formatRupiah(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/koleksi/semua?q=${encodeURIComponent(q)}`} tabIndex={searchOpen ? 0 : -1} onClick={close} className="mt-4 inline-block text-sm font-bold text-ink underline underline-offset-4">
                Lihat {total} hasil
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
