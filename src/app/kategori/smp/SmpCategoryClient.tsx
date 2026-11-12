"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, CloseIcon, HeartIcon } from "@/components/Icons";
import { PRODUCTS, type Product } from "@/data/catalog";
import { formatRupiah } from "@/lib/site";
import { useStore } from "@/context/StoreContext";

/* Royal blue theme used across this SMP category page. */
const BLUE = "#1d4e89";

const SMP_PRODUCTS = PRODUCTS.filter((p) => p.categoryId === "smp");

const SIZE_OPTIONS = Array.from(new Set(SMP_PRODUCTS.flatMap((p) => p.sizes))).sort(
  (a, b) => Number(a) - Number(b),
);

const COLOR_OPTIONS = [
  { name: "Putih", hex: "#ffffff" },
  { name: "Biru", hex: "#1d4e89" },
  { name: "Biru Dongker", hex: "#14213d" },
];

const PRICE_MIN = 50000;
const PRICE_MAX = 200000;

/* Photos for the SMP redesign will live in /public/images/smp. */
const PHOTO: Record<string, string> = {
  // "kemeja-smp-putih-saku": "/images/smp/Product Image.webp",
  // "celana-panjang-biru-smp": "/images/smp/Product Image 2.webp",
  // "rok-biru-smp-lipit": "/images/smp/Product Image 3.webp",
  // "blus-smp-putih-lengan-panjang": "/images/smp/Product Image 4.webp",
  // "setelan-smp-lengkap": "/images/smp/Product Image 5.webp",
};

type Avail = "ready" | "preorder";
const AVAILABILITY: Record<string, Avail> = {
  "kemeja-smp-putih-saku": "ready",
  "celana-panjang-biru-smp": "ready",
  "rok-biru-smp-lipit": "ready",
  "blus-smp-putih-lengan-panjang": "ready",
  "setelan-smp-lengkap": "preorder",
};
const availOf = (p: Product): Avail => AVAILABILITY[p.slug] ?? "ready";

const GENDERS = [
  { key: "laki", label: "Laki-laki" },
  { key: "perempuan", label: "Perempuan" },
] as const;
type GenderKey = (typeof GENDERS)[number]["key"];

type Sort = "baru" | "murah" | "mahal";

function toggle<T>(set: Set<T>, v: T) {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

function sizeRange(p: Product) {
  if (p.sizes.length <= 1) return p.sizes[0] ?? "-";
  return `${p.sizes[0]} - ${p.sizes[p.sizes.length - 1]}`;
}

function matchesGender(p: Product, g: Set<GenderKey>) {
  if (!g.size) return true;
  const laki = g.has("laki") && (p.gender === "putra" || p.gender === "unisex");
  const perempuan = g.has("perempuan") && (p.gender === "putri" || p.gender === "unisex");
  return laki || perempuan;
}

export default function SmpCategoryClient() {
  const [genders, setGenders] = useState<Set<GenderKey>>(new Set());
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [min, setMin] = useState(PRICE_MIN);
  const [max, setMax] = useState(PRICE_MAX);
  const [avail, setAvail] = useState<Set<Avail>>(new Set());
  const [colors, setColors] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<Sort>("baru");
  const [showFilter, setShowFilter] = useState(false);

  const result = useMemo(() => {
    const out = SMP_PRODUCTS.filter(
      (p) =>
        matchesGender(p, genders) &&
        (!sizes.size || p.sizes.some((s) => sizes.has(s))) &&
        (!avail.size || avail.has(availOf(p))) &&
        (!colors.size || [...colors].some((c) => p.colors.some((pc) => pc.name.toLowerCase().includes(c.toLowerCase())))) &&
        p.price >= min &&
        p.price <= max,
    );
    if (sort === "murah") out.sort((a, b) => a.price - b.price);
    else if (sort === "mahal") out.sort((a, b) => b.price - a.price);
    else out.sort((a, b) => b.order - a.order);
    return out;
  }, [genders, sizes, avail, colors, min, max, sort]);

  const priceChanged = min > PRICE_MIN || max < PRICE_MAX;
  const activeCount =
    genders.size + sizes.size + avail.size + colors.size + (priceChanged ? 1 : 0);

  const reset = () => {
    setGenders(new Set());
    setSizes(new Set());
    setAvail(new Set());
    setColors(new Set());
    setMin(PRICE_MIN);
    setMax(PRICE_MAX);
  };

  const availLabel = (a: Avail) => (a === "ready" ? "Ready stock" : "Pre-order");

  return (
    <div className="bg-[#f7f6f2]" style={{ ["--smp" as string]: BLUE }}>
      <div className="mx-auto max-w-[1280px] px-4 pb-16 md:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-5 text-sm text-neutral-500">
          <Link href="/" className="transition-colors hover:text-ink">Beranda</Link>
          <span className="mx-1.5">/</span>
          <Link href="/kategori/semua" className="transition-colors hover:text-ink">Kategori</Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink">Seragam SMP</span>
        </nav>

        {/* Title + count */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.75rem]">
            Seragam SMP (Putih Biru)
          </h1>
          <span className="shrink-0 whitespace-nowrap pt-2 text-sm text-neutral-500">
            {result.length} produk
          </span>
        </div>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-neutral-600">
          Koleksi seragam SMP putih biru untuk kebutuhan sekolah harian. Kemeja, celana, rok dan setelan
          lengkap. Bahan katun premium, jahitan rapi, ukuran lengkap untuk siswa SMP.
        </p>

        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={() => setShowFilter((v) => !v)}
          aria-expanded={showFilter}
          className="mt-6 flex w-full items-center justify-between rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-medium text-ink md:hidden"
        >
          Filter produk{activeCount ? ` (${activeCount})` : ""}
          <ChevronDown className={`h-4 w-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
        </button>

        <div className="mt-6 grid gap-6 md:grid-cols-[256px_1fr] lg:gap-8">
          {/* ---------- Filter sidebar ---------- */}
          <aside
            aria-label="Filter produk"
            className={`${showFilter ? "block" : "hidden"} h-fit rounded-xl border border-neutral-200 bg-white p-6 md:block`}
          >
            <h2 className="font-display text-lg font-bold text-ink">Filter produk</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
              Sesuaikan hasil pencarian dengan kategori, ukuran, dan ketersediaan stok.
            </p>

            {/* Jenis kelamin */}
            <FilterGroup title="Jenis kelamin">
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((g) => {
                  const on = genders.has(g.key);
                  return (
                    <button
                      key={g.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setGenders(toggle(genders, g.key))}
                      className={pillCls(on)}
                    >
                      {g.label}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>

            {/* Kelas / usia */}
            <FilterGroup title="Kelas / usia">
              <div className="flex flex-wrap gap-2">
                <Link href="/kategori/sd" className={pillCls(false)}>SD</Link>
                <span className={pillCls(true)}>SMP (12&ndash;15 tahun)</span>
                <Link href="/kategori/sma" className={pillCls(false)}>SMA</Link>
              </div>
            </FilterGroup>

            {/* Ukuran */}
            <FilterGroup title="Ukuran">
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((s) => {
                  const on = sizes.has(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSizes(toggle(sizes, s))}
                      className={sizeCls(on)}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>

            {/* Rentang harga */}
            <FilterGroup title="Rentang harga">
              <div className="flex justify-between text-xs text-neutral-500">
                <span>{formatRupiah(PRICE_MIN)}</span>
                <span>{formatRupiah(PRICE_MAX)}</span>
              </div>
              <div className="dual-range smp mt-2">
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-neutral-200" />
                <div
                  className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--smp)]"
                  style={{
                    left: `${((min - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                    right: `${100 - ((max - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  aria-label="Harga minimum"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5000}
                  value={min}
                  onChange={(e) => setMin(Math.min(Number(e.target.value), max - 5000))}
                />
                <input
                  type="range"
                  aria-label="Harga maksimum"
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5000}
                  value={max}
                  onChange={(e) => setMax(Math.max(Number(e.target.value), min + 5000))}
                />
              </div>
              <div className="mt-3 flex justify-between text-sm font-medium text-ink">
                <span>{formatRupiah(min)}</span>
                <span>{formatRupiah(max)}</span>
              </div>
            </FilterGroup>

            {/* Ketersediaan */}
            <FilterGroup title="Ketersediaan">
              <div className="flex flex-wrap gap-2">
                {(["ready", "preorder"] as Avail[]).map((a) => {
                  const on = avail.has(a);
                  return (
                    <button
                      key={a}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setAvail(toggle(avail, a))}
                      className={pillCls(on)}
                    >
                      {availLabel(a)}
                    </button>
                  );
                })}
              </div>
            </FilterGroup>

            {/* Warna */}
            <FilterGroup title="Warna" last>
              <div className="flex flex-wrap gap-4">
                {COLOR_OPTIONS.map((c) => {
                  const on = colors.has(c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      aria-pressed={on}
                      aria-label={c.name}
                      onClick={() => setColors(toggle(colors, c.name))}
                      className="flex flex-col items-center gap-1.5"
                    >
                      <span
                        className={`grid h-9 w-9 place-items-center rounded-full border transition-shadow ${on ? "border-[var(--smp)] ring-2 ring-[var(--smp)] ring-offset-2" : "border-neutral-300"}`}
                      >
                        <span className="h-7 w-7 rounded-full border border-black/10" style={{ background: c.hex }} />
                      </span>
                      <span className={`text-xs ${on ? "font-medium text-ink" : "text-neutral-500"}`}>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </FilterGroup>
          </aside>

          {/* ---------- Results ---------- */}
          <section aria-label="Daftar produk">
            {/* Active filters + sort */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {[...genders].map((g) => (
                  <Chip key={g} label={GENDERS.find((x) => x.key === g)!.label} onRemove={() => setGenders(toggle(genders, g))} />
                ))}
                {[...sizes].map((s) => (
                  <Chip key={s} label={`Ukuran ${s}`} onRemove={() => setSizes(toggle(sizes, s))} />
                ))}
                {[...colors].map((c) => (
                  <Chip key={c} label={c} onRemove={() => setColors(toggle(colors, c))} />
                ))}
                {[...avail].map((a) => (
                  <Chip key={a} label={availLabel(a)} onRemove={() => setAvail(toggle(avail, a))} />
                ))}
                {priceChanged && (
                  <Chip label={`${formatRupiah(min)} - ${formatRupiah(max)}`} onRemove={() => { setMin(PRICE_MIN); setMax(PRICE_MAX); }} />
                )}
                {activeCount === 0 && (
                  <span className="text-sm text-neutral-400">Belum ada filter yang dipilih.</span>
                )}
              </div>

              <label className="flex shrink-0 items-center gap-2 text-sm text-neutral-600">
                <span className="hidden sm:inline">Urutkan</span>
                <span className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as Sort)}
                    className="appearance-none rounded-lg border border-neutral-300 bg-white py-2.5 pl-4 pr-10 text-sm text-ink focus:border-[var(--smp)] focus:outline-none"
                  >
                    <option value="baru">Urutkan: Terbaru</option>
                    <option value="murah">Harga terendah</option>
                    <option value="mahal">Harga tertinggi</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </span>
              </label>
            </div>

            {activeCount > 0 && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm text-ink transition-colors hover:border-[var(--smp)] hover:text-[var(--smp)]"
                >
                  Reset filter
                </button>
              </div>
            )}

            {/* Grid */}
            {result.length === 0 ? (
              <div className="mt-10 rounded-xl border border-dashed border-neutral-300 bg-white py-20 text-center">
                <p className="font-display text-xl font-bold text-ink">Belum ada produk yang cocok</p>
                <p className="mt-2 text-sm text-neutral-500">Longgarkan filter untuk melihat lebih banyak seragam SMP.</p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 rounded-lg bg-[var(--smp)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Reset filter
                </button>
              </div>
            ) : (
              <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result.map((p) => (
                  <li key={p.slug}>
                    <SmpCard product={p} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ helpers ------------------------------ */

const pillCls = (active: boolean) =>
  `rounded-lg border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-transparent bg-[var(--smp)] text-white"
      : "border-neutral-300 bg-white text-ink hover:border-[var(--smp)]"
  }`;

const sizeCls = (active: boolean) =>
  `grid h-11 min-w-11 place-items-center rounded-lg border px-3 text-sm transition-colors ${
    active
      ? "border-transparent bg-[var(--smp)] text-white"
      : "border-neutral-300 bg-white text-ink hover:border-[var(--smp)]"
  }`;

function FilterGroup({ title, last, children }: { title: string; last?: boolean; children: React.ReactNode }) {
  return (
    <div className={`${last ? "" : "border-b border-neutral-100 pb-5"} mt-5`}>
      <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm text-ink">
      {label}
      <button type="button" aria-label={`Hapus filter ${label}`} onClick={onRemove} className="text-neutral-400 transition-colors hover:text-ink">
        <CloseIcon className="h-3.5 w-3.5" />
      </button>
    </span>
  );
}

function SmpCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist, ready } = useStore();
  const wished = ready && wishlist.includes(product.slug);
  const photo = PHOTO[product.slug];
  const availability = availOf(product);

  return (
    <article className="group overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
        <Link href={`/produk/${product.slug}`} aria-label={product.name} className="block h-full w-full">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={encodeURI(photo)}
              alt={product.name}
              width={640}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs text-neutral-400">{product.name}</span>
          )}
        </Link>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Hapus ${product.name} dari wishlist` : `Simpan ${product.name} ke wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-white/95 text-ink shadow-sm transition-transform duration-200 hover:scale-105"
        >
          <HeartIcon className="h-[18px] w-[18px]" filled={wished} />
        </button>

        <span
          className={`absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white ${
            availability === "ready" ? "bg-[var(--smp)]" : "bg-neutral-800"
          }`}
        >
          {availability === "ready" ? "Ready Stock" : "Pre-order"}
        </span>
      </div>

      <div className="p-4">
        <Link href={`/produk/${product.slug}`} className="block font-medium text-ink transition-colors hover:text-[var(--smp)]">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-neutral-500">Ukuran: {sizeRange(product)}</p>
        <p className="mt-2 font-semibold text-ink">{formatRupiah(product.price)}</p>
      </div>
    </article>
  );
}
