"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/catalog";

export default function ProductCarousel({
  title,
  href,
  products,
  center = false,
}: {
  title: string;
  href?: string;
  products: Product[];
  center?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section data-cc-animate="" className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16" aria-label={title}>
      <div className={`mb-6 flex items-end ${center ? "justify-center" : "justify-between"}`}>
        <h2 className="font-display text-3xl font-extrabold md:text-4xl">{title}</h2>
        {href && <Link href={href} className="text-xs text-muted underline underline-offset-4 transition-colors duration-200 hover:text-ink">Lihat semua</Link>}
      </div>
      <div className="relative">
        <button aria-label="Geser ke kiri" onClick={() => scroll(-1)} className="absolute -left-3 top-[30%] z-10 hidden h-10 w-10 place-items-center rounded-full border border-ink bg-white text-ink transition-colors duration-200 hover:bg-ink hover:text-white md:grid">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div ref={track} className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-4 overflow-x-auto px-3 py-3">
          {products.map((p) => (
            <div key={p.slug} className="w-[62%] shrink-0 snap-start sm:w-[34%] md:w-[24%] xl:w-[19%]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        <button aria-label="Geser ke kanan" onClick={() => scroll(1)} className="absolute -right-3 top-[30%] z-10 hidden h-10 w-10 place-items-center rounded-full border border-ink bg-white text-ink transition-colors duration-200 hover:bg-ink hover:text-white md:grid">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
