"use client";

import Link from "next/link";
import { useState } from "react";
import ProductCarousel from "@/components/ProductCarousel";
import ProductImage from "@/components/ProductImage";
import SizeChartModal from "@/components/SizeChartModal";
import { ChevronLeft, ChevronRight, HeartIcon, MinusIcon, PlusIcon, ReturnIcon, RulerIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";
import { CATEGORIES, discountPercent, GENDER_LABEL, relatedProducts, TYPE_LABEL, type Product } from "@/data/catalog";
import type { ArtView } from "@/components/GarmentArt";
import { formatRupiah, SITE, waLink } from "@/lib/site";
import { useStore } from "@/context/StoreContext";

const VIEWS: { view: ArtView; label: string }[] = [
  { view: "depan", label: "Depan" },
  { view: "belakang", label: "Belakang" },
  { view: "detail", label: "Detail" },
  { view: "lipat", label: "Lipat" },
];

function Accordion({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-neutral-200">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 py-4 text-left text-sm font-bold text-ink">
        {icon}
        <span className="flex-1">{title}</span>
        {open ? <MinusIcon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
      </button>
      <div className={`hp-disclosure-panel grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.6,0.4,1)] ${open ? "is-open grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="hp-disclosure-inner overflow-hidden">
          <div className={`hp-disclosure-content pb-4 text-sm leading-relaxed transition-opacity duration-300 delay-100 ${open ? "opacity-100" : "opacity-0"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function ProductView({ product }: { product: Product }) {
  const { addToCart, wishlist, toggleWishlist } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [idx, setIdx] = useState(0);
  const [chart, setChart] = useState(false);
  const [tab, setTab] = useState<"detail" | "ulasan">("detail");
  const [hint, setHint] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === product.categoryId)!;
  const pct = discountPercent(product);
  const wished = wishlist.includes(product.slug);
  const go = (d: number) => setIdx((i) => (i + d + VIEWS.length) % VIEWS.length);
  const needsSize = product.sizes.length > 0;

  const add = () => {
    if (!size) { setHint(true); return; }
    addToCart(product.slug, color, size, qty);
  };

  const waText = `Halo ${SITE.name}, saya ingin memesan:\n${product.name}\nWarna: ${color}\nUkuran: ${size ?? "(belum dipilih)"}\nJumlah: ${qty}\nTotal: ${formatRupiah(product.price * qty)}\n\nMohon konfirmasi stok dan ongkir.`;

  return (
    <div data-cc-animate="" className="mx-auto max-w-6xl px-4 pb-8 md:px-8">
      <nav aria-label="Breadcrumb" className="py-4 text-xs uppercase text-muted">
        <Link href="/" className="hover:text-ink">Beranda</Link> <span className="mx-1">/</span>
        <Link href={`/koleksi/${cat.id}`} className="hover:text-ink">{cat.name}</Link> <span className="mx-1">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="relative aspect-square overflow-hidden bg-soft">
            <div key={idx} className="fade-in h-full w-full">
              <ProductImage product={product} color={color} view={VIEWS[idx].view} index={idx} priority />
            </div>
            <button aria-label="Foto sebelumnya" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 text-ink transition-colors duration-200 hover:bg-white"><ChevronLeft className="h-6 w-6" /></button>
            <button aria-label="Foto berikutnya" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 text-ink transition-colors duration-200 hover:bg-white"><ChevronRight className="h-6 w-6" /></button>
            {product.badge && <span className="absolute left-0 top-4 bg-black px-3 py-1.5 text-xs font-bold uppercase text-white">{product.badge}</span>}
          </div>
          <ul className="mt-3 grid grid-cols-4 gap-3">
            {VIEWS.map((v, i) => (
              <li key={v.view}>
                <button type="button" aria-label={`Foto ${v.label}`} aria-current={idx === i} onClick={() => setIdx(i)} className={`hp-opt-label block aspect-square w-full overflow-hidden border-b-2 ${idx === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"}`}>
                  <ProductImage product={product} color={color} view={v.view} index={i} />
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted">Ilustrasi sementara. Foto produk asli menyusul.</p>
        </div>

        <div>
          <h1 className="font-display text-3xl font-extrabold leading-tight md:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted">{cat.name} / {GENDER_LABEL[product.gender]} / {TYPE_LABEL[product.type]}</p>
          <p className="mt-4 flex flex-wrap items-center gap-3 text-ink">
            <span className="text-2xl font-bold">{formatRupiah(product.price)}</span>
            {pct > 0 && (
              <>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-promo">{pct}%</span>
                <span className="text-sm text-muted line-through">{formatRupiah(product.compareAt!)}</span>
              </>
            )}
          </p>

          <div className="mt-6">
            <p className="text-sm text-ink">Warna: <span className="font-bold">{color}</span></p>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Warna">
              {product.colors.map((c) => (
                <button key={c.name} type="button" role="radio" aria-checked={color === c.name} aria-label={c.name} title={c.name} onClick={() => setColor(c.name)} className={`hp-opt-label h-12 w-12 border p-1 ${color === c.name ? "border-ink" : "border-neutral-300 hover:border-ink"}`}>
                  <span className="block h-full w-full border border-black/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <p className="text-ink">Ukuran: <span className="font-bold">{size ?? "pilih ukuran"}</span></p>
              <button type="button" onClick={() => setChart(true)} className="flex items-center gap-2 text-ink underline underline-offset-4"><RulerIcon className="h-5 w-5" /> Tabel ukuran</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Ukuran">
              {product.sizes.map((s) => {
                const out = product.soldOut?.includes(s);
                return (
                  <button key={s} type="button" role="radio" aria-checked={size === s} disabled={out} onClick={() => { setSize(s); setHint(false); }} className={`hp-opt-label grid h-11 min-w-11 place-items-center rounded-full border px-3 text-sm ${size === s ? "border-ink bg-ink text-white" : "border-neutral-300 text-ink"} ${out ? "text-neutral-300 line-through" : "hover:border-ink"}`} title={out ? "Stok habis" : undefined}>
                    {s}
                  </button>
                );
              })}
            </div>
            {hint && needsSize && <p role="alert" className="mt-2 text-sm text-promo">Pilih ukuran dulu sebelum menambah ke tas.</p>}
            {product.soldOut && <p className="mt-2 text-xs text-muted">Ukuran bercoret sedang habis. Tanyakan admin untuk estimasi stok.</p>}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-sm text-ink">Jumlah</span>
            <div className="flex items-center border border-neutral-300">
              <button aria-label="Kurangi" className="p-3" onClick={() => setQty(Math.max(1, qty - 1))}><MinusIcon className="h-4 w-4" /></button>
              <span className="min-w-10 text-center text-ink">{qty}</span>
              <button aria-label="Tambah" className="p-3" onClick={() => setQty(qty + 1)}><PlusIcon className="h-4 w-4" /></button>
            </div>
          </div>

          <button type="button" onClick={add} className="hp-btn-primary mt-6 w-full bg-ink py-4 text-sm font-bold uppercase text-white hover:bg-neutral-800">Tambah ke tas</button>
          <a href={waLink(waText)} target="_blank" rel="noopener noreferrer" className="hp-btn-secondary mt-3 flex w-full items-center justify-center gap-2 border border-ink py-4 text-sm font-bold uppercase text-ink hover:bg-ink hover:text-white">
            <WhatsAppIcon className="h-5 w-5" /> Pesan langsung via WhatsApp
          </a>
          <button type="button" aria-pressed={wished} onClick={() => toggleWishlist(product.slug)} className="mx-auto mt-5 flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink">
            <HeartIcon className="h-5 w-5" filled={wished} /> {wished ? "Tersimpan di wishlist" : "Simpan ke wishlist"}
          </button>

          <div className="mt-8 border-t border-neutral-200">
            <Accordion icon={<TruckIcon className="h-6 w-6" />} title="Pengiriman">
              Gratis ongkir untuk pesanan sekolah minimal {SITE.freeShippingMinQty} pcs. Pesanan lain: ongkir dan estimasi dihitung admin setelah alamat diterima. <Link href="/informasi/pengiriman" className="underline">Selengkapnya</Link>
            </Accordion>
            <Accordion icon={<ReturnIcon className="h-6 w-6" />} title="Penukaran & pengembalian">
              Ukuran tidak cocok bisa ditukar selama label masih terpasang dan belum dicuci. <Link href="/informasi/penukaran" className="underline">Syarat lengkap</Link>
            </Accordion>
          </div>
        </div>
      </div>

      <section data-cc-animate="" className="mt-16" aria-label="Rincian produk">
        <div className="flex gap-8 border-b border-neutral-200 text-lg">
          {([["detail", "Detail Produk"], ["ulasan", "Ulasan"]] as const).map(([k, l]) => (
            <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)} className={`-mb-px border-b-2 pb-3 uppercase transition-colors duration-200 ${tab === k ? "border-ink text-ink" : "border-transparent text-muted"}`}>{l}</button>
          ))}
        </div>
        {tab === "detail" ? (
          <dl className="fade-in divide-y divide-dashed divide-neutral-300 text-sm">
            <div className="grid gap-2 py-5 md:grid-cols-[160px_1fr]"><dt>Deskripsi</dt><dd><ul className="list-disc space-y-1.5 pl-5 text-ink">{product.details.map((d) => <li key={d}>{d}</li>)}<li>Bahan: {product.material}</li></ul></dd></div>
            <div className="grid gap-2 py-5 md:grid-cols-[160px_1fr]"><dt>Tipe</dt><dd className="text-ink">{TYPE_LABEL[product.type]}</dd></div>
            <div className="grid gap-2 py-5 md:grid-cols-[160px_1fr]"><dt>Ukuran tersedia</dt><dd className="text-ink">{product.sizes.join(", ")}</dd></div>
          </dl>
        ) : (
          <p className="fade-in py-8 text-sm">Belum ada ulasan untuk produk ini. Setelah pesanan diterima, kirim foto dan komentar Anda lewat <a href={waLink(`Halo, saya ingin memberi ulasan untuk ${product.name}.`)} target="_blank" rel="noopener noreferrer" className="underline">WhatsApp</a>.</p>
        )}
      </section>

      <div className="mt-16 -mx-4 md:-mx-8">
        <ProductCarousel title="Rekomendasi Produk" products={relatedProducts(product)} center />
      </div>

      <SizeChartModal open={chart} onClose={() => setChart(false)} />
    </div>
  );
}
