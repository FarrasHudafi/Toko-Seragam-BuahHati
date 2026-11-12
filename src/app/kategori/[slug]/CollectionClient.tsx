"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, CloseIcon, GridIcon, ListIcon, PlusIcon, MinusIcon, WhatsAppIcon } from "@/components/Icons";
import {
  CATEGORIES, GENDER_LABEL, PRODUCTS, TYPE_LABEL, searchProducts,
  type Gender, type GarmentType, type Product,
} from "@/data/catalog";
import { formatRupiah, waLink } from "@/lib/site";

const PAGE = 12;
const ALL_COLORS = Array.from(new Map(PRODUCTS.flatMap((p) => p.colors).map((c) => [c.name, c])).values());
const SIZE_ORDER = ["24", "26", "28", "30", "32", "34", "36", "38", "S", "M", "L", "XL", "XXL", "All size"];
const ALL_SIZES = Array.from(new Set(PRODUCTS.flatMap((p) => p.sizes))).sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
const MAX_PRICE = Math.max(...PRODUCTS.map((p) => p.price));

type Sort = "baru" | "murah" | "mahal";

function toggle<T>(set: Set<T>, v: T) {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border border-neutral-200">
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between bg-soft px-4 py-3 text-left text-sm text-ink">
        {title}
        {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
      </button>
      <div className={`hp-disclosure-panel grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.6,0.4,1)] ${open ? "is-open grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="hp-disclosure-inner overflow-hidden">
          <div className={`hp-disclosure-content p-4 transition-opacity duration-300 delay-100 ${open ? "opacity-100" : "opacity-0"}`}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function CheckList<T extends string>({ items, selected, onToggle, limit = 6 }: { items: { value: T; label: string; count: number }[]; selected: Set<T>; onToggle: (v: T) => void; limit?: number }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, limit);
  return (
    <div className="space-y-3">
      {shown.map((it) => (
        <label key={it.value} className="flex cursor-pointer items-center gap-3 text-sm text-ink">
          <input type="checkbox" checked={selected.has(it.value)} onChange={() => onToggle(it.value)} className="h-4 w-4 accent-black" />
          <span className="flex-1">{it.label}</span>
          <span className="text-xs text-muted">({it.count})</span>
        </label>
      ))}
      {items.length > limit && (
        <button type="button" onClick={() => setAll(!all)} className="flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-ink">
          <PlusIcon className="h-3.5 w-3.5" /> {all ? "Lebih sedikit" : "Lihat lainnya"}
        </button>
      )}
    </div>
  );
}

export default function CollectionClient({ slug }: { slug: string }) {
  const sp = useSearchParams();
  return <CollectionView key={`${slug}?${sp.toString()}`} slug={slug} q={sp.get("q") ?? ""} tipe={sp.get("tipe")} warna={sp.get("warna")} />;
}

function CollectionView({ slug, q, tipe, warna }: { slug: string; q: string; tipe: string | null; warna: string | null }) {
  const cat = CATEGORIES.find((c) => c.id === slug);
  const [colors, setColors] = useState<Set<string>>(new Set(warna ? [warna] : []));
  const [sizes, setSizes] = useState<Set<string>>(new Set());
  const [genders, setGenders] = useState<Set<Gender>>(new Set());
  const [types, setTypes] = useState<Set<GarmentType>>(new Set(tipe && tipe in TYPE_LABEL ? [tipe as GarmentType] : []));
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(MAX_PRICE);
  const [sort, setSort] = useState<Sort>("baru");
  const [list, setList] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [drawer, setDrawer] = useState(false);

  const base = useMemo<Product[]>(() => {
    if (q) return searchProducts(q);
    if (slug === "promo") return PRODUCTS.filter((p) => p.compareAt);
    if (cat) return PRODUCTS.filter((p) => p.categoryId === cat.id);
    return PRODUCTS;
  }, [slug, q, cat]);

  const result = useMemo(() => {
    const out = base.filter(
      (p) =>
        (!colors.size || p.colors.some((c) => colors.has(c.name))) &&
        (!sizes.size || p.sizes.some((s) => sizes.has(s))) &&
        (!genders.size || genders.has(p.gender)) &&
        (!types.size || types.has(p.type)) &&
        (!cats.size || cats.has(p.categoryId)) &&
        p.price >= min && p.price <= max,
    );
    if (sort === "murah") out.sort((a, b) => a.price - b.price);
    if (sort === "mahal") out.sort((a, b) => b.price - a.price);
    if (sort === "baru") out.sort((a, b) => b.order - a.order);
    return out;
  }, [base, colors, sizes, genders, types, cats, min, max, sort]);

  const count = <K extends string>(get: (p: Product) => K) => {
    const m = new Map<K, number>();
    base.forEach((p) => {
      const k = get(p);
      m.set(k, (m.get(k) ?? 0) + 1);
    });
    return m;
  };
  const genderCount = count((p) => p.gender);
  const typeCount = count((p) => p.type);
  const catCount = count((p) => p.categoryId);

  const active = colors.size + sizes.size + genders.size + types.size + cats.size + (min > 0 || max < MAX_PRICE ? 1 : 0);
  const reset = () => { setColors(new Set()); setSizes(new Set()); setGenders(new Set()); setTypes(new Set()); setCats(new Set()); setMin(0); setMax(MAX_PRICE); };
  const title = q ? `Hasil untuk "${q}"` : slug === "promo" ? "Promo" : cat ? cat.name : "Semua Seragam";

  const filters = (
    <div className="space-y-4">
      <Section title="Warna">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((c) => (
            <button key={c.name} type="button" aria-pressed={colors.has(c.name)} aria-label={c.name} title={c.name} onClick={() => setColors(toggle(colors, c.name))} className={`hp-opt-label h-9 w-9 border p-0.5 ${colors.has(c.name) ? "border-ink" : "border-neutral-300 hover:border-ink"}`}>
              <span className="block h-full w-full border border-black/10" style={{ background: c.hex }} />
            </button>
          ))}
        </div>
      </Section>

      <Section title="Harga">
        <div className="flex items-center gap-2 text-sm">
          <label className="flex-1"><span className="sr-only">Harga minimum</span>
            <input type="number" min={0} max={max} step={5000} value={min} onChange={(e) => setMin(Math.min(Number(e.target.value) || 0, max))} className="w-full border border-neutral-300 px-2 py-2 text-ink" />
          </label>
          <span>-</span>
          <label className="flex-1"><span className="sr-only">Harga maksimum</span>
            <input type="number" min={min} max={MAX_PRICE} step={5000} value={max} onChange={(e) => setMax(Math.max(Number(e.target.value) || 0, min))} className="w-full border border-neutral-300 px-2 py-2 text-ink" />
          </label>
        </div>
        <div className="dual-range mt-5">
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-neutral-300" />
          <div className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink" style={{ left: `${(min / MAX_PRICE) * 100}%`, right: `${100 - (max / MAX_PRICE) * 100}%` }} />
          <input type="range" aria-label="Harga minimum" min={0} max={MAX_PRICE} step={5000} value={min} onChange={(e) => setMin(Math.min(Number(e.target.value), max))} />
          <input type="range" aria-label="Harga maksimum" min={0} max={MAX_PRICE} step={5000} value={max} onChange={(e) => setMax(Math.max(Number(e.target.value), min))} />
        </div>
        <p className="mt-2 text-xs text-muted">{formatRupiah(min)} sampai {formatRupiah(max)}</p>
      </Section>

      <Section title="Ukuran">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((s) => (
            <button key={s} type="button" aria-pressed={sizes.has(s)} onClick={() => setSizes(toggle(sizes, s))} className={`hp-opt-label min-w-9 border px-2 py-1.5 text-xs ${sizes.has(s) ? "border-ink bg-ink text-white" : "border-neutral-300 bg-soft text-ink hover:border-ink"}`}>
              {s}
            </button>
          ))}
        </div>
      </Section>

      <Section title="Gender">
        <CheckList items={(["putra", "putri", "unisex"] as Gender[]).map((g) => ({ value: g, label: GENDER_LABEL[g], count: genderCount.get(g) ?? 0 }))} selected={genders} onToggle={(v) => setGenders(toggle(genders, v))} />
      </Section>

      {(slug === "semua" || slug === "promo" || q) && (
        <Section title="Jenjang">
          <CheckList items={CATEGORIES.map((c) => ({ value: c.id as string, label: c.name, count: catCount.get(c.id) ?? 0 }))} selected={cats} onToggle={(v) => setCats(toggle(cats, v))} />
        </Section>
      )}

      <Section title="Tipe">
        <CheckList items={(Object.keys(TYPE_LABEL) as GarmentType[]).filter((t) => typeCount.get(t)).map((t) => ({ value: t, label: TYPE_LABEL[t], count: typeCount.get(t) ?? 0 }))} selected={types} onToggle={(v) => setTypes(toggle(types, v))} />
      </Section>
    </div>
  );

  return (
    <div data-cc-animate="" className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8 xl:px-16">
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Beranda</Link> <span className="mx-1">/</span> <span className="text-ink">{title}</span>
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4 pb-6 pt-6 md:pt-10">
        <div>
          <h1 className="font-display text-4xl font-black md:text-5xl">{title}</h1>
          <p className="mt-1 text-sm">{result.length} produk{cat ? `. ${cat.blurb}` : ""}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          <span className="font-medium uppercase text-ink">Urutkan</span>
          {([["murah", "Harga terendah"], ["mahal", "Harga tertinggi"], ["baru", "Terbaru"]] as [Sort, string][]).map(([k, l]) => (
            <button key={k} type="button" aria-pressed={sort === k} onClick={() => setSort(k)} className={`uppercase ${sort === k ? "font-bold text-ink underline underline-offset-4" : "text-muted hover:text-ink"}`}>{l}</button>
          ))}
          <span className="ml-2 hidden items-center gap-3 md:flex">
            <span className="uppercase">Tampilan</span>
            <button type="button" aria-label="Tampilan daftar" aria-pressed={list} onClick={() => setList(true)} className={list ? "text-ink" : "text-muted"}><ListIcon className="h-5 w-5" /></button>
            <button type="button" aria-label="Tampilan grid" aria-pressed={!list} onClick={() => setList(false)} className={!list ? "text-ink" : "text-muted"}><GridIcon className="h-5 w-5" /></button>
          </span>
          <button type="button" onClick={() => setDrawer(true)} className="border border-ink px-4 py-2 font-bold uppercase text-ink md:hidden">Filter{active ? ` (${active})` : ""}</button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block" aria-label="Filter">{filters}</aside>

        <div>
          {active > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
              {[...colors].map((v) => <Chip key={v} label={v} onRemove={() => setColors(toggle(colors, v))} />)}
              {[...sizes].map((v) => <Chip key={v} label={`Ukuran ${v}`} onRemove={() => setSizes(toggle(sizes, v))} />)}
              {[...genders].map((v) => <Chip key={v} label={GENDER_LABEL[v]} onRemove={() => setGenders(toggle(genders, v))} />)}
              {[...types].map((v) => <Chip key={v} label={TYPE_LABEL[v]} onRemove={() => setTypes(toggle(types, v))} />)}
              {[...cats].map((v) => <Chip key={v} label={CATEGORIES.find((c) => c.id === v)?.name ?? v} onRemove={() => setCats(toggle(cats, v))} />)}
              {(min > 0 || max < MAX_PRICE) && <Chip label={`${formatRupiah(min)} - ${formatRupiah(max)}`} onRemove={() => { setMin(0); setMax(MAX_PRICE); }} />}
              <button type="button" onClick={reset} className="ml-1 underline underline-offset-4 hover:text-ink">Hapus semua</button>
            </div>
          )}

          {result.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-extrabold">Belum ada produk yang cocok</p>
              <p className="mt-2 text-sm">Longgarkan filter, atau tanyakan stok ukuran khusus ke admin.</p>
              <div className="mt-5 flex justify-center gap-3">
                <button type="button" onClick={reset} className="hp-btn-primary px-6 py-3 text-xs font-bold uppercase text-white">Hapus filter</button>
                <a href={waLink(`Halo, saya mencari ${title} tetapi belum menemukan yang cocok.`)} target="_blank" rel="noopener noreferrer" className="hp-btn-secondary flex items-center gap-2 border border-ink px-6 py-3 text-xs font-bold uppercase text-ink"><WhatsAppIcon className="h-4 w-4" /> Tanya admin</a>
              </div>
            </div>
          ) : (
            <ul className={list ? "space-y-8" : "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 xl:grid-cols-4"}>
              {!list && (
                <li className="col-span-2 border-[6px] border-brand p-6 text-center lg:col-span-1 lg:row-span-1">
                  <p className="font-display text-2xl font-black leading-tight">Pesan partai untuk sekolah?</p>
                  <p className="mt-3 text-sm">Harga khusus, bordir nama dan logo, gratis ongkir minimal 20 pcs.</p>
                  <a href={waLink("Halo, saya ingin menanyakan pesanan partai untuk sekolah.")} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-center gap-2 bg-brand py-3 text-xs font-bold uppercase text-ink transition-colors duration-200 hover:bg-brand-soft"><WhatsAppIcon className="h-4 w-4" /> Hubungi admin</a>
                </li>
              )}
              {result.slice(0, limit).map((p) => (
                <li key={p.slug}><ProductCard product={p} caps list={list} /></li>
              ))}
            </ul>
          )}

          {result.length > limit && (
            <div className="mt-12 text-center">
              <p className="mb-3 text-xs text-muted">Menampilkan {limit} dari {result.length} produk</p>
              <button type="button" onClick={() => setLimit(limit + PAGE)} className="hp-btn-secondary inline-flex items-center gap-2 border border-ink px-8 py-3 text-xs font-bold uppercase text-ink">
                Tampilkan lebih banyak <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 md:hidden ${drawer ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Filter"
        aria-hidden={!drawer}
      >
        <button
          type="button"
          className={`hp-overlay absolute inset-0 bg-black/50 transition-opacity duration-300 ${drawer ? "is-open visible opacity-100" : "invisible opacity-0"}`}
          aria-label="Tutup filter"
          tabIndex={drawer ? 0 : -1}
          onClick={() => setDrawer(false)}
        />
        <div className={`hp-drawer-right absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-white transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${drawer ? "is-open visible translate-x-0" : "invisible translate-x-full"}`}>
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <span className="font-display text-xl font-extrabold">Filter</span>
            <button type="button" aria-label="Tutup" tabIndex={drawer ? 0 : -1} onClick={() => setDrawer(false)}><CloseIcon className="h-6 w-6" /></button>
          </div>
          <div className={`hp-drawer-content flex-1 overflow-y-auto p-4 transition-opacity duration-600 ${drawer ? "opacity-100" : "opacity-0"}`}>{filters}</div>
          <div className={`hp-drawer-footer flex gap-3 border-t border-neutral-200 bg-white p-4 transition-all duration-400 delay-200 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${drawer ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <button type="button" tabIndex={drawer ? 0 : -1} onClick={reset} className="hp-btn-secondary flex-1 border border-ink py-3 text-xs font-bold uppercase text-ink hover:bg-ink hover:text-white">Reset</button>
            <button type="button" tabIndex={drawer ? 0 : -1} onClick={() => setDrawer(false)} className="hp-btn-primary flex-1 bg-ink py-3 text-xs font-bold uppercase text-white hover:bg-neutral-800">Lihat {result.length} produk</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-neutral-300 bg-soft px-2.5 py-1 text-ink">
      {label}
      <button type="button" aria-label={`Hapus filter ${label}`} onClick={onRemove}><CloseIcon className="h-3 w-3" /></button>
    </span>
  );
}
