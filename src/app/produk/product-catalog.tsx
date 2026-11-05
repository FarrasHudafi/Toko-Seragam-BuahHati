"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductCard from "@/components/product-card";
import { categories, getCategoryLabel, sampleProducts, type CategorySlug } from "@/lib/catalog";

type SortOption = "featured" | "low" | "high";

function isCategorySlug(value: string | null): value is CategorySlug {
  return categories.some((category) => category.slug === value);
}

export default function ProductCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const requestedCategory = searchParams.get("kategori");
  const category = isCategorySlug(requestedCategory) ? requestedCategory : null;
  const [sort, setSort] = useState<SortOption>("featured");

  function selectCategory(slug: CategorySlug | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) params.set("kategori", slug);
    else params.delete("kategori");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const filtered = category
    ? sampleProducts.filter((product) => product.category === category)
    : sampleProducts;
  const products =
    sort === "featured"
      ? filtered
      : [...filtered].sort((a, b) => (sort === "low" ? a.price - b.price : b.price - a.price));
  const filterOptions: { slug: CategorySlug | null; label: string }[] = [
    { slug: null, label: "Semua" },
    ...categories,
  ];

  return (
    <>
      <p className="notice catalog-notice">
        Produk dan harga di bawah ini adalah contoh tampilan, bukan data resmi toko. Konfirmasi
        produk, harga, dan ketersediaan langsung kepada toko.
      </p>
      <div className="catalog-toolbar">
        <div className="filter-row" role="group" aria-label="Filter kategori">
          {filterOptions.map((item) => (
            <button
              className={`filter-chip${category === item.slug ? " filter-chip-active" : ""}`}
              key={item.label}
              onClick={() => selectCategory(item.slug)}
              type="button"
              aria-pressed={category === item.slug}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="sort-label">
          Urutkan
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>
            <option value="featured">Pilihan toko</option>
            <option value="low">Harga terendah</option>
            <option value="high">Harga tertinggi</option>
          </select>
        </label>
      </div>
      <h2 className="sr-only">Daftar produk</h2>
      <p className="sr-only" aria-live="polite">
        {products.length} produk {category ? getCategoryLabel(category) : "semua kategori"}
      </p>
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="catalog-empty-panel">
          <div>
            <p className="eyebrow">{category ? getCategoryLabel(category) : "Etalase toko"}</p>
            <h2>Belum ada produk</h2>
            <p>
              Belum ada produk untuk kategori ini. Silakan hubungi toko untuk menanyakan koleksi dan
              ketersediaan.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
