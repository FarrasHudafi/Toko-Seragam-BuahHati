"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

const SLIDES = [
  { kicker: "Tahun ajaran baru", title: "Seragam Lengkap.", big: "Hemat s.d. 15%*", note: "*Produk tertentu", href: "/koleksi/promo", cta: "Lihat promo" },
  { kicker: "Seragam SD", title: "Merah Putih Rapi.", big: "Mulai Rp 70.000", note: "*Sesuai ukuran dan model", href: "/koleksi/sd", cta: "Belanja SD" },
  { kicker: "Pesanan partai", title: "Untuk Sekolah & Yayasan.", big: "Gratis Ongkir", note: "*Minimal 20 pcs", href: "/kontak", cta: "Tanya admin" },
];

const BUTTONS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='%23f2b600' stroke-width='5'%3E%3Ccircle cx='30' cy='30' r='18'/%3E%3Ccircle cx='90' cy='90' r='18'/%3E%3C/g%3E%3Cg fill='%23f2b600'%3E%3Ccircle cx='25' cy='25' r='3'/%3E%3Ccircle cx='35' cy='25' r='3'/%3E%3Ccircle cx='25' cy='35' r='3'/%3E%3Ccircle cx='35' cy='35' r='3'/%3E%3Ccircle cx='85' cy='85' r='3'/%3E%3Ccircle cx='95' cy='85' r='3'/%3E%3Ccircle cx='85' cy='95' r='3'/%3E%3Ccircle cx='95' cy='95' r='3'/%3E%3C/g%3E%3C/svg%3E\")";

export default function HeroCarousel() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const go = useCallback((d: number) => {
    setI((cur) => {
      setPrev(cur);
      return (cur + d + SLIDES.length) % SLIDES.length;
    });
  }, []);

  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), 650);
    return () => clearTimeout(t);
  }, [prev]);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      data-cc-animate=""
      aria-roledescription="carousel"
      aria-label="Promo"
      className="relative overflow-hidden bg-[#ffd966]"
      style={{ backgroundImage: BUTTONS }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative mx-auto min-h-[420px] max-w-[1440px] md:min-h-[560px]">
        {SLIDES.map((s, idx) => {
          const active = idx === i;
          const exiting = idx === prev && idx !== i;
          return (
            <div
              key={s.title}
              aria-hidden={!active}
              className={`hp-slide absolute inset-0 flex items-center justify-center px-14 py-14 md:px-24 ${active ? "is-active visible opacity-100 pointer-events-auto" : exiting ? "is-exiting visible opacity-0 pointer-events-none" : "invisible opacity-0 pointer-events-none"}`}
            >
              <div
                className={`hp-slide-motion flex w-full max-w-5xl justify-center transition-all duration-600 ease-[cubic-bezier(0.215,0.61,0.355,1)] ${active ? "translate-x-0 opacity-100" : exiting ? "-translate-x-20 opacity-0" : "translate-x-40 opacity-0"}`}
              >
                <Link
                  href={s.href}
                  tabIndex={active ? 0 : -1}
                  aria-live={active ? "polite" : "off"}
                  className={`hp-text-overlay group relative flex w-full flex-col items-center bg-white px-6 py-12 text-center text-ink transition-all duration-1000 ease-[cubic-bezier(0.165,0.84,0.44,1)] md:py-16 ${active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                >
                  <span className="text-sm font-bold uppercase tracking-[0.2em]">{s.kicker}</span>
                  <span className="mt-4 font-display text-4xl font-black leading-none md:text-7xl">{s.title}</span>
                  <span className="mt-4 font-display text-5xl font-black leading-none md:text-8xl">{s.big}</span>
                  <span className="hp-btn-secondary mt-8 border border-ink px-8 py-3 text-xs font-bold uppercase text-ink group-hover:bg-ink group-hover:text-white">{s.cta}</span>
                  <span className="absolute bottom-3 left-4 text-[11px] text-muted">{s.note}</span>
                  <span className="absolute bottom-3 right-4 text-[11px] text-muted">Syarat &amp; ketentuan berlaku</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <button type="button" aria-label="Slide sebelumnya" onClick={() => go(-1)} className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-ink transition-transform duration-200 hover:scale-110 md:left-6"><ChevronLeft className="h-7 w-7" /></button>
      <button type="button" aria-label="Slide berikutnya" onClick={() => go(1)} className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-ink transition-transform duration-200 hover:scale-110 md:right-6"><ChevronRight className="h-7 w-7" /></button>
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3" aria-hidden="true">
        <span className="text-xs font-bold text-ink">{i + 1} / {SLIDES.length}</span>
        <span className="relative h-0.5 w-12 overflow-hidden bg-black/20">
          {!paused && <span key={i} className="hp-slide-timer block h-full w-full bg-ink" />}
        </span>
      </div>
    </section>
  );
}
