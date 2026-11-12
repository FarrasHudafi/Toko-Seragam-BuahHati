import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/catalog";
import CollectionClient from "./CollectionClient";

const SLUGS: string[] = ["semua", "promo", ...CATEGORIES.map((c) => c.id)];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "semua") {
    return {
      title: "Semua Seragam | Seragam Buah Hati",
      description: "Koleksi lengkap seragam sekolah: SD, SMP, SMA dan Pramuka. Bahan katun premium, jahitan rapi, ukuran lengkap.",
    };
  }
  if (slug === "promo") {
    return {
      title: "Promo Seragam | Seragam Buah Hati",
      description: "Paket seragam tahun ajaran baru hemat s.d. 15% untuk produk pilihan.",
    };
  }
  const cat = CATEGORIES.find((c) => c.id === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} | Seragam Buah Hati`,
    description: `Koleksi ${cat.name.toLowerCase()}. ${cat.blurb}`,
  };
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return (
    <Suspense fallback={<div className="px-8 py-24 text-center text-sm">Memuat kategori...</div>}>
      <CollectionClient slug={slug} />
    </Suspense>
  );
}
