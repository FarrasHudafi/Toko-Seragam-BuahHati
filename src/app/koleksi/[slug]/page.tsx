import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/catalog";
import CollectionClient from "./CollectionClient";

const SLUGS = ["semua", "promo", ...CATEGORIES.map((c) => c.id)];

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug)) notFound();
  return (
    <Suspense fallback={<div className="px-8 py-24 text-center text-sm">Memuat koleksi...</div>}>
      <CollectionClient slug={slug} />
    </Suspense>
  );
}
