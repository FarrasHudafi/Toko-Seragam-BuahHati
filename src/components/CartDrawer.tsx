"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CloseIcon, MinusIcon, PlusIcon, TruckIcon, WhatsAppIcon } from "./Icons";
import ProductImage from "./ProductImage";
import { useStore } from "@/context/StoreContext";
import { formatRupiah, SITE } from "@/lib/site";
import { orderLink } from "@/lib/order";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, lines, totalQty, subtotal, setQty, removeLine } = useStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const close = () => setCartOpen(false);
  const remaining = Math.max(0, SITE.freeShippingMinQty - totalQty);

  return (
    <div
      className={`fixed inset-0 z-50 ${cartOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tas belanja"
      aria-hidden={!cartOpen}
    >
      <button
        type="button"
        className={`hp-overlay absolute inset-0 bg-black/50 transition-opacity duration-300 ${cartOpen ? "is-open visible opacity-100" : "invisible opacity-0"}`}
        aria-label="Tutup tas belanja"
        tabIndex={cartOpen ? 0 : -1}
        onClick={close}
      />
      <aside
        className={`hp-drawer-right absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-[-12px_0_24px_-12px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${cartOpen ? "is-open visible translate-x-0" : "invisible translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <h2 className="font-display text-xl font-extrabold">Tas Belanja ({totalQty})</h2>
          <button type="button" aria-label="Tutup" tabIndex={cartOpen ? 0 : -1} onClick={close}>
            <CloseIcon className="h-6 w-6 text-ink" />
          </button>
        </div>

        <div className="flex items-center gap-2 bg-brand-soft px-5 py-2.5 text-xs font-medium text-ink">
          <TruckIcon className="h-4 w-4 shrink-0" />
          {remaining === 0
            ? "Pesanan Anda mendapat gratis ongkir."
            : `Tambah ${remaining} pcs lagi untuk gratis ongkir pesanan sekolah.`}
        </div>

        {lines.length === 0 ? (
          <div className={`hp-drawer-content flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center transition-opacity duration-600 ${cartOpen ? "opacity-100" : "opacity-0"}`}>
            <p className="font-display text-xl font-extrabold">Tas Anda masih kosong</p>
            <p className="text-sm">Pilih seragam, tentukan warna dan ukuran, lalu tambahkan ke tas.</p>
            <Link href="/koleksi/semua" tabIndex={cartOpen ? 0 : -1} onClick={close} className="hp-btn-primary bg-ink px-8 py-3 text-xs font-bold uppercase text-white hover:bg-neutral-800">
              Mulai belanja
            </Link>
          </div>
        ) : (
          <>
            <ul className={`hp-drawer-content flex-1 divide-y divide-neutral-100 overflow-y-auto px-5 transition-opacity duration-600 ${cartOpen ? "opacity-100" : "opacity-0"}`}>
              {lines.map((l) => (
                <li key={`${l.slug}|${l.color}|${l.size}`} className="flex gap-4 py-4">
                  <Link href={`/produk/${l.slug}`} tabIndex={cartOpen ? 0 : -1} onClick={close} className="block h-24 w-24 shrink-0 overflow-hidden">
                    <ProductImage product={l.product} color={l.color} />
                  </Link>
                  <div className="flex flex-1 flex-col text-sm">
                    <Link href={`/produk/${l.slug}`} tabIndex={cartOpen ? 0 : -1} onClick={close} className="font-medium text-ink hover:underline">{l.product.name}</Link>
                    <p className="mt-0.5 text-muted">{l.color} / {l.size}</p>
                    <p className="mt-1 font-bold text-ink">{formatRupiah(l.product.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-300">
                        <button type="button" aria-label="Kurangi" tabIndex={cartOpen ? 0 : -1} className="p-2" onClick={() => setQty(l.slug, l.color, l.size, l.qty - 1)}><MinusIcon className="h-3.5 w-3.5" /></button>
                        <span className="min-w-8 text-center text-ink">{l.qty}</span>
                        <button type="button" aria-label="Tambah" tabIndex={cartOpen ? 0 : -1} className="p-2" onClick={() => setQty(l.slug, l.color, l.size, l.qty + 1)}><PlusIcon className="h-3.5 w-3.5" /></button>
                      </div>
                      <button type="button" className="text-xs text-muted underline hover:text-ink" tabIndex={cartOpen ? 0 : -1} onClick={() => removeLine(l.slug, l.color, l.size)}>Hapus</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className={`hp-drawer-footer space-y-3 border-t border-neutral-200 bg-white px-5 py-5 transition-all duration-400 delay-200 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${cartOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
              <div className="flex items-baseline justify-between text-ink">
                <span className="text-sm">Subtotal</span>
                <span className="text-lg font-bold">{formatRupiah(subtotal)}</span>
              </div>
              <p className="text-xs text-muted">Ongkir dan pembayaran dikonfirmasi admin lewat WhatsApp.</p>
              <a href={orderLink(lines)} tabIndex={cartOpen ? 0 : -1} target="_blank" rel="noopener noreferrer" className="hp-btn-primary flex w-full items-center justify-center gap-2 bg-ink py-3.5 text-xs font-bold uppercase text-white hover:bg-neutral-800">
                <WhatsAppIcon className="h-5 w-5" /> Pesan via WhatsApp
              </a>
              <Link href="/keranjang" tabIndex={cartOpen ? 0 : -1} onClick={close} className="hp-btn-secondary block border border-ink py-3.5 text-center text-xs font-bold uppercase text-ink hover:bg-ink hover:text-white">
                Lihat tas &amp; isi data pengiriman
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
