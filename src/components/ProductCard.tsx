"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "./Icons";
import ProductImage from "./ProductImage";
import { discountPercent, GENDER_LABEL, type Product } from "@/data/catalog";
import { formatRupiah } from "@/lib/site";
import { useStore } from "@/context/StoreContext";

export default function ProductCard({
  product,
  caps = false,
  list = false,
}: {
  product: Product;
  caps?: boolean;
  list?: boolean;
}) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(null);
  const wished = wishlist.includes(product.slug);
  const pct = discountPercent(product);
  const shownSizes = product.sizes.slice(0, 4);
  const extra = product.sizes.length - shownSizes.length;

  return (
    <article className={`hp-card group relative flex transition-transform duration-550 ease-in-out ${list ? "gap-6" : "hp-card-scale flex-col hover:scale-105"}`}>
      <div className={`relative ${list ? "w-44 shrink-0 sm:w-56" : ""}`}>
        <Link href={`/produk/${product.slug}`} className="relative block aspect-square overflow-hidden bg-soft" aria-label={product.name}>
          <div className="hp-card-main-img h-full w-full transition-opacity duration-500 group-hover:opacity-0">
            <ProductImage product={product} color={color} view="depan" />
          </div>
          <div className="hp-card-hover-img invisible absolute inset-0 h-full w-full opacity-0 transition-opacity duration-500 group-hover:visible group-hover:opacity-100">
            <ProductImage product={product} color={color} view="belakang" index={1} />
          </div>
        </Link>
        {product.badge && (
          <span className="absolute left-0 top-3 bg-black px-2 py-1 text-[10px] font-bold uppercase text-white">{product.badge}</span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Hapus ${product.name} dari wishlist` : `Simpan ${product.name} ke wishlist`}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center text-ink transition-transform duration-200 hover:scale-110"
        >
          <HeartIcon className="h-5 w-5" filled={wished} />
        </button>
      </div>

      <div className={`${list ? "flex-1" : "mt-3"} text-sm`}>
        <Link href={`/produk/${product.slug}`} className={`block text-ink hover:underline ${caps ? "text-xs font-medium uppercase tracking-[0.12em]" : ""}`}>
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-muted">{GENDER_LABEL[product.gender]}</p>
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-ink">
          <span>{formatRupiah(product.price)}</span>
          {pct > 0 && (
            <>
              <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-promo">{pct}%</span>
              <span className="text-xs text-muted line-through">{formatRupiah(product.compareAt!)}</span>
            </>
          )}
        </p>

        {product.colors.length > 1 && (
          <div className="mt-3">
            <p className="text-ink">Pilih Warna</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Warna">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  role="radio"
                  aria-checked={color === c.name}
                  aria-label={c.name}
                  title={c.name}
                  onClick={() => setColor(c.name)}
                  className={`hp-opt-label h-8 w-8 border p-0.5 transition-colors duration-600 ${color === c.name ? "border-ink" : "border-neutral-300 hover:border-ink"}`}
                >
                  <span className="block h-full w-full border border-black/10" style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-3">
          <p className="text-ink">Pilih Ukuran</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5" role="radiogroup" aria-label="Ukuran">
            {shownSizes.map((s) => {
              const out = product.soldOut?.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={size === s}
                  disabled={out}
                  onClick={() => setSize(s)}
                  className={`hp-opt-label grid h-8 min-w-8 place-items-center rounded-full border px-2 text-xs transition-colors duration-600 ${size === s ? "border-ink bg-ink text-white" : "border-neutral-300 text-ink"} ${out ? "text-neutral-300 line-through" : "hover:border-ink"}`}
                >
                  {s}
                </button>
              );
            })}
            {extra > 0 && (
              <Link href={`/produk/${product.slug}`} className="text-xs text-muted transition-colors duration-200 hover:text-ink">+{extra}</Link>
            )}
          </div>
        </div>

        {size && (
          <button
            type="button"
            onClick={() => addToCart(product.slug, color, size)}
            className="hp-quick-add is-visible hp-btn-primary fade-in mt-3 w-full bg-ink py-2.5 text-xs font-bold uppercase text-white hover:bg-neutral-800"
          >
            Tambah ke tas
          </button>
        )}
      </div>
    </article>
  );
}
