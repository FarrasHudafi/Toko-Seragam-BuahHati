import GarmentArt, { type ArtView } from "./GarmentArt";
import type { Product } from "@/data/catalog";

export default function ProductImage({
  product,
  color,
  view = "depan",
  index = 0,
  priority = false,
}: {
  product: Product;
  color?: string;
  view?: ArtView;
  index?: number;
  priority?: boolean;
}) {
  const chosen = product.colors.find((c) => c.name === color) ?? product.colors[0];
  const photo = product.images?.[chosen.name]?.[index];
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={`${product.name}, warna ${chosen.name}`}
        width={800}
        height={800}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="h-full w-full object-cover"
      />
    );
  }
  const accent = product.type === "setelan" ? (product.accent ?? chosen.hex) : undefined;
  return <GarmentArt type={product.type} color={chosen.hex} accent={accent} view={view} />;
}
