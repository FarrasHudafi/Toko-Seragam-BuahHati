import { notFound } from "next/navigation";
import { PRODUCT_BY_SLUG, PRODUCTS } from "@/data/catalog";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PRODUCT_BY_SLUG[slug];
  return p ? { title: `${p.name} | Seragam Buah Hati`, description: p.details[0] } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCT_BY_SLUG[slug];
  if (!product) notFound();
  return <ProductView key={product.slug} product={product} />;
}
