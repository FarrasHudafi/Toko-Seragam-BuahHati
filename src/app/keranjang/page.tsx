"use client";

import Link from "next/link";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import ProductImage from "@/components/ProductImage";
import { MinusIcon, PlusIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";
import { useStore } from "@/context/StoreContext";
import { formatRupiah, SITE } from "@/lib/site";
import { orderLink } from "@/lib/order";

export default function CartPage() {
  const { lines, totalQty, subtotal, setQty, removeLine, clearCart } = useStore();
  const [form, setForm] = useState({ nama: "", telepon: "", sekolah: "", alamat: "", catatan: "" });
  const free = totalQty >= SITE.freeShippingMinQty;
  const canSend = form.nama.trim() && form.telepon.trim() && form.alamat.trim();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <PageShell title="Tas Belanja" intro="Periksa pesanan, isi data pengiriman, lalu kirim lewat WhatsApp. Admin mengonfirmasi stok, ongkir dan cara pembayaran.">
      {lines.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-2xl font-extrabold">Tas Anda masih kosong</p>
          <p className="mt-2 text-sm">Pilih seragam, tentukan warna dan ukuran, lalu tambahkan ke tas.</p>
          <Link href="/koleksi/semua" className="hp-btn-primary mt-6 inline-block bg-ink px-10 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800">Mulai belanja</Link>
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <section aria-label="Isi tas">
            <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
              {lines.map((l) => (
                <li key={`${l.slug}|${l.color}|${l.size}`} className="flex gap-4 py-5">
                  <Link href={`/produk/${l.slug}`} className="block h-28 w-28 shrink-0 overflow-hidden"><ProductImage product={l.product} color={l.color} /></Link>
                  <div className="flex flex-1 flex-col text-sm">
                    <div className="flex justify-between gap-4">
                      <Link href={`/produk/${l.slug}`} className="font-medium text-ink hover:underline">{l.product.name}</Link>
                      <span className="font-bold text-ink">{formatRupiah(l.product.price * l.qty)}</span>
                    </div>
                    <p className="mt-1 text-muted">{l.color} / Ukuran {l.size}</p>
                    <p className="text-muted">{formatRupiah(l.product.price)} per pcs</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-neutral-300">
                        <button aria-label="Kurangi" className="p-2.5" onClick={() => setQty(l.slug, l.color, l.size, l.qty - 1)}><MinusIcon className="h-4 w-4" /></button>
                        <span className="min-w-10 text-center text-ink">{l.qty}</span>
                        <button aria-label="Tambah" className="p-2.5" onClick={() => setQty(l.slug, l.color, l.size, l.qty + 1)}><PlusIcon className="h-4 w-4" /></button>
                      </div>
                      <button className="text-xs text-muted underline hover:text-ink" onClick={() => removeLine(l.slug, l.color, l.size)}>Hapus</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between text-sm">
              <Link href="/koleksi/semua" className="underline underline-offset-4 hover:text-ink">Lanjut belanja</Link>
              <button onClick={clearCart} className="text-muted underline underline-offset-4 hover:text-ink">Kosongkan tas</button>
            </div>
          </section>

          <aside aria-label="Ringkasan dan data pengiriman" className="h-fit bg-soft p-6">
            <h2 className="font-display text-2xl font-extrabold">Ringkasan</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt>Jumlah barang</dt><dd className="text-ink">{totalQty} pcs</dd></div>
              <div className="flex justify-between"><dt>Subtotal</dt><dd className="font-bold text-ink">{formatRupiah(subtotal)}</dd></div>
              <div className="flex justify-between"><dt>Ongkir</dt><dd className="text-ink">{free ? "Gratis" : "Dikonfirmasi admin"}</dd></div>
            </dl>
            {!free && (
              <p className="mt-3 flex items-start gap-2 bg-brand-soft p-3 text-xs text-ink"><TruckIcon className="mt-0.5 h-4 w-4 shrink-0" /> Tambah {SITE.freeShippingMinQty - totalQty} pcs lagi untuk gratis ongkir pesanan sekolah.</p>
            )}

            <form className="mt-6 space-y-4 border-t border-neutral-300 pt-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="font-display text-xl font-extrabold">Data pemesan</h3>
              {([["nama", "Nama lengkap", "Nama penerima"], ["telepon", "Nomor HP", "08xx-xxxx-xxxx"], ["sekolah", "Nama sekolah (opsional)", "Nama sekolah"]] as const).map(([k, label, ph]) => (
                <label key={k} className="block text-xs font-bold text-ink">{label}
                  <input value={form[k]} onChange={set(k)} placeholder={ph} inputMode={k === "telepon" ? "tel" : undefined} className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3 text-sm font-normal text-ink" />
                </label>
              ))}
              <label className="block text-xs font-bold text-ink">Alamat pengiriman
                <textarea rows={3} value={form.alamat} onChange={set("alamat")} placeholder="Jalan, kecamatan, kota, kode pos" className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3 text-sm font-normal text-ink" />
              </label>
              <label className="block text-xs font-bold text-ink">Catatan (opsional)
                <textarea rows={2} value={form.catatan} onChange={set("catatan")} placeholder="Contoh: tambah bordir nama" className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3 text-sm font-normal text-ink" />
              </label>
              {canSend ? (
                <a href={orderLink(lines, form)} target="_blank" rel="noopener noreferrer" className="hp-btn-primary flex w-full items-center justify-center gap-2 bg-ink py-4 text-sm font-bold uppercase text-white hover:bg-neutral-800"><WhatsAppIcon className="h-5 w-5" /> Kirim pesanan via WhatsApp</a>
              ) : (
                <button type="button" disabled className="flex w-full cursor-not-allowed items-center justify-center gap-2 bg-neutral-300 py-4 text-sm font-bold uppercase text-neutral-600"><WhatsAppIcon className="h-5 w-5" /> Isi nama, HP dan alamat dulu</button>
              )}
              <p className="text-xs text-muted">Tidak ada pembayaran online. Pembayaran dilakukan setelah admin mengonfirmasi lewat WhatsApp.</p>
            </form>
          </aside>
        </div>
      )}
    </PageShell>
  );
}
