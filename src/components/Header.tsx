"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BagIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { CATEGORIES, TYPE_LABEL } from "@/data/catalog";
import { SITE } from "@/lib/site";
import { useStore } from "@/context/StoreContext";
import useDialog from "@/lib/useDialog";

const uniformCats = CATEGORIES.filter((c) => ["sd", "smp", "sma", "pramuka"].includes(c.id));

const ANNOUNCEMENTS = [
  {
    text: `Gratis ongkir untuk pesanan sekolah minimal ${SITE.freeShippingMinQty} pcs.`,
    cta: "Hubungi kami",
    href: "/kontak",
  },
  {
    text: "Paket seragam tahun ajaran baru hemat s.d. 15% untuk produk pilihan.",
    cta: "Lihat promo",
    href: "/koleksi/promo",
  },
  {
    text: "Bingung pilih nomor seragam anak? Cek tabel ukuran lengkap kami.",
    cta: "Panduan ukuran",
    href: "/panduan-ukuran",
  },
];

const NAV = [
  { label: "Beranda", href: "/" },
  { label: "Kategori", href: "/koleksi/semua", mega: true },
  { label: "Ukuran", href: "/panduan-ukuran" },
  { label: "Tentang", href: "/tentang-kami" },
  { label: "Kontak", href: "/kontak" },
];

export default function Header() {
  const { totalQty, wishlist, setCartOpen, setSearchOpen } = useStore();
  const [mobile, setMobile] = useState(false);
  const [mobileSub, setMobileSub] = useState(false);
  const [annIdx, setAnnIdx] = useState(0);
  const [annPaused, setAnnPaused] = useState(false);
  const closeMobile = () => setMobile(false);
  const mobileRef = useDialog<HTMLDivElement>(mobile, closeMobile);

  useEffect(() => {
    if (annPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setAnnIdx((v) => (v + 1) % ANNOUNCEMENTS.length);
    }, 7000);
    return () => clearInterval(t);
  }, [annPaused]);

  const ann = ANNOUNCEMENTS[annIdx];

  return (
    <>
      <div
        className="overflow-hidden bg-black px-4 py-1.5 text-center text-xs font-medium text-white"
        onMouseEnter={() => setAnnPaused(true)}
        onMouseLeave={() => setAnnPaused(false)}
      >
        <p key={annIdx} className="fade-in">
          {ann.text}{" "}
          <Link href={ann.href} className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-75">
            {ann.cta}
          </Link>
        </p>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="flex items-center px-4 py-3 md:px-8 xl:px-16">
          <div className="flex flex-1 items-center gap-4">
            <button type="button" className="md:hidden" aria-label="Buka menu" aria-expanded={mobile} onClick={() => setMobile(true)}>
              <MenuIcon className="h-6 w-6 text-ink" />
            </button>
            <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name}, beranda`}>
              <span className="grid h-9 w-9 place-items-center bg-ink font-display text-sm font-black text-brand">SB</span>
              <span className="font-display text-lg font-extrabold leading-none text-ink">
                Seragam<br className="hidden xl:block" /> Buah Hati
              </span>
            </Link>
          </div>

          <nav aria-label="Menu utama" className="hidden items-center gap-6 md:flex">
              {NAV.map((item) =>
                item.mega ? (
                  <div key={item.label} className="group static">
                    <Link href={item.href} className="flex items-center gap-1 py-6 text-[15px] text-ink hover:underline underline-offset-8">
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </Link>
                    <div className="hp-mega-nav invisible absolute inset-x-0 top-full -translate-y-1.5 border-t border-neutral-200 bg-white opacity-0 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_1fr_1fr_1fr_1.3fr] gap-8 px-8 py-8">
                        {uniformCats.map((c) => (
                          <div key={c.id}>
                            <Link href={`/koleksi/${c.id}`} className="font-display text-lg font-extrabold text-ink hover:underline">{c.name}</Link>
                            <ul className="mt-3 space-y-2 text-sm">
                              {(["kemeja", "blus", "celana", "rok", "setelan"] as const).map((t) => (
                                <li key={t}>
                                  <Link href={`/koleksi/${c.id}?tipe=${t}`} className="text-muted transition-colors duration-200 hover:text-ink">{TYPE_LABEL[t]}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <Link href="/koleksi/promo" className="group/promo flex flex-col justify-between overflow-hidden bg-brand-soft p-6 text-ink">
                          <span className="font-display text-2xl font-black leading-tight transition-transform duration-500 group-hover/promo:translate-x-1">Paket tahun ajaran baru</span>
                          <span className="mt-6 text-sm font-bold underline underline-offset-4">Lihat promo</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                     className="py-6 text-[15px] text-ink hover:underline underline-offset-8"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

          <div className="flex flex-1 items-center justify-end gap-5 text-ink">
            <button type="button" aria-label="Cari produk" onClick={() => setSearchOpen(true)} className="transition-opacity duration-200 hover:opacity-60"><SearchIcon className="h-6 w-6" /></button>
            <button type="button" aria-label={`Tas belanja, ${totalQty} barang`} onClick={() => setCartOpen(true)} className="relative transition-opacity duration-200 hover:opacity-60">
              <BagIcon className="h-6 w-6" />
              {totalQty > 0 && <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center bg-ink px-1 text-[10px] font-bold text-white">{totalQty}</span>}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 md:hidden ${mobile ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!mobile}
      >
        <button
          type="button"
          className={`hp-overlay absolute inset-0 bg-black/50 transition-opacity duration-300 ${mobile ? "is-open visible opacity-100" : "invisible opacity-0"}`}
          aria-label="Tutup menu"
          tabIndex={mobile ? 0 : -1}
          onClick={() => setMobile(false)}
        />
        <div
          ref={mobileRef}
          tabIndex={-1}
          className={`hp-drawer-left absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white outline-none transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${mobile ? "is-open visible translate-x-0" : "invisible -translate-x-full"}`}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
            <span className="font-display text-lg font-extrabold text-ink">Menu</span>
            <button type="button" aria-label="Tutup menu" tabIndex={mobile ? 0 : -1} onClick={() => setMobile(false)}><CloseIcon className="h-6 w-6 text-ink" /></button>
          </div>
          <nav className={`hp-drawer-content flex-1 overflow-y-auto px-5 py-2 text-ink transition-opacity duration-600 ${mobile ? "opacity-100" : "opacity-0"}`}>
            {NAV.map((item) =>
              item.mega ? (
                <div key={item.label} className="border-b border-neutral-100">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left text-base"
                    aria-expanded={mobileSub}
                    tabIndex={mobile ? 0 : -1}
                    onClick={() => setMobileSub((v) => !v)}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${mobileSub ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`hp-disclosure-panel grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.6,0.4,1)] ${mobileSub ? "is-open grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="hp-disclosure-inner overflow-hidden">
                      <ul className={`hp-disclosure-content mb-3 space-y-3 pl-3 text-sm text-body transition-opacity duration-300 delay-100 ${mobileSub ? "opacity-100" : "opacity-0"}`}>
                        <li><Link href="/koleksi/semua" tabIndex={mobile && mobileSub ? 0 : -1} onClick={() => setMobile(false)}>Semua seragam</Link></li>
                        {uniformCats.map((c) => (
                          <li key={c.id}><Link href={`/koleksi/${c.id}`} tabIndex={mobile && mobileSub ? 0 : -1} onClick={() => setMobile(false)}>{c.name}</Link></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  tabIndex={mobile ? 0 : -1}
                  onClick={() => setMobile(false)}
                   className="block border-b border-neutral-100 py-4 text-base"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <div className={`hp-drawer-footer flex items-center gap-6 border-t border-neutral-200 px-5 py-4 text-sm text-ink transition-all duration-400 delay-200 ease-[cubic-bezier(0.165,0.84,0.44,1)] ${mobile ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
            <Link href="/akun" tabIndex={mobile ? 0 : -1} onClick={() => setMobile(false)}>Akun</Link>
            <Link href="/wishlist" tabIndex={mobile ? 0 : -1} onClick={() => setMobile(false)}>Wishlist ({wishlist.length})</Link>
          </div>
        </div>
      </div>
    </>
  );
}
