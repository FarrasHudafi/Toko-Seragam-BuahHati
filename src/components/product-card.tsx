import { formatPrice, getCategoryLabel, type Product } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className={`product-art product-art-${product.category}`}>
        <span className="sample-badge">Contoh</span>
        <span
          className={product.illustration === "atribut" ? "product-accessory" : "product-garment"}
          aria-hidden="true"
        />
      </div>
      <div className="product-info">
        <span className="product-category">{getCategoryLabel(product.category)}</span>
        <h3>{product.name}</h3>
        <span className="product-sizes">Ukuran {product.sizes.join(", ")}</span>
        <span className="product-price">
          {formatPrice(product.price)} <small>harga contoh</small>
        </span>
      </div>
    </article>
  );
}
