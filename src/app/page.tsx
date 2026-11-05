import Link from "next/link";
import ProductCard from "@/components/product-card";
import { categories, sampleProducts } from "@/lib/catalog";

const featuredProducts = sampleProducts.filter((_, index) => index % 2 === 0);

export default function Home() {
  return (
    <main>
      <section className="hero-shell">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Toko Seragam Buah Hati · Teman hari sekolah</p>
            <h1>Seragam rapi untuk setiap langkah belajar.</h1>
            <p className="muted">
              Jelajahi kebutuhan seragam sekolah dan temukan panduan ukuran yang membantu keluarga
              memilih dengan lebih yakin.
            </p>
            <div className="button-row">
              <Link className="button button-dark" href="/produk">
                Jelajahi katalog
              </Link>
              <Link className="text-link" href="/ukuran">
                Lihat panduan ukuran <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label="Ilustrasi editorial kemeja seragam sekolah"
          >
            <span className="illustration-label">Ilustrasi seragam</span>
            <span className="hero-garment" aria-hidden="true">
              <span className="hero-shirt" />
              <span className="hero-collar" />
              <span className="hero-pocket" />
            </span>
            <span className="hero-art-caption">Rapi · Nyaman · Siap belajar</span>
          </div>
        </div>
      </section>

      <section className="section-wrap section-block reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Temukan yang dibutuhkan</p>
            <h2>Mulai dari jenjang sekolah</h2>
          </div>
          <p className="muted">Pilih kategori untuk langsung menuju koleksinya di katalog.</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              className="category-card"
              href={`/produk?kategori=${category.slug}`}
              key={category.slug}
            >
              <span className="category-index">Koleksi 0{index + 1}</span>
              <span className="category-symbol" aria-hidden="true" />
              <span className="category-card-copy">
                <strong>{category.label}</strong>
                <span>
                  Jelajahi kategori <span aria-hidden="true">→</span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-tint section-block reveal">
        <div className="section-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Etalase toko</p>
              <h2>Temukan kebutuhan sekolah</h2>
            </div>
            <Link className="text-link" href="/produk">
              Buka katalog <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <p className="sample-note">
            Produk dan harga di atas adalah contoh tampilan, bukan data resmi toko.
          </p>
        </div>
      </section>

      <section className="section-wrap section-block reveal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Belanja lebih terarah</p>
            <h2>Hal penting sebelum memilih</h2>
          </div>
        </div>
        <div className="reason-row">
          <article>
            <span className="reason-number">01</span>
            <h3>Kenali ukuran</h3>
            <p>Lihat cara mengukur dan konfirmasi ukuran produk kepada toko.</p>
          </article>
          <article>
            <span className="reason-number">02</span>
            <h3>Cari sesuai jenjang</h3>
            <p>Mulai dari kategori sekolah agar pencarian lebih terarah.</p>
          </article>
          <article>
            <span className="reason-number">03</span>
            <h3>Tanyakan detail</h3>
            <p>Pastikan produk dan ketersediaan langsung kepada toko.</p>
          </article>
        </div>
      </section>

      <section className="section-ink">
        <div className="section-wrap fit-callout reveal">
          <div>
            <p className="eyebrow">Panduan ukuran</p>
            <h2>Ukuran yang tepat membuat hari sekolah lebih nyaman.</h2>
            <p className="muted">
              Ikuti panduan pengukuran sebagai langkah awal, lalu tanyakan detail ukuran produk
              kepada toko.
            </p>
          </div>
          <Link className="button button-light" href="/ukuran">
            Baca panduan
          </Link>
        </div>
      </section>
    </main>
  );
}
