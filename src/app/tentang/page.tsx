import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang kami",
  description: "Mengenal Toko Seragam Buah Hati.",
};

export default function AboutPage() {
  return (
    <main className="section-wrap">
      <header className="page-intro">
        <p className="eyebrow">Mengenal toko</p>
        <h1>Tentang Toko Seragam Buah Hati</h1>
        <p className="muted">
          Halaman ini akan memuat cerita toko dan informasi yang membantu keluarga mengenal Toko
          Seragam Buah Hati.
        </p>
      </header>
      <section className="about-grid section-block section-tight reveal">
        <div className="about-art" role="img" aria-label="Ilustrasi label pakaian">
          <span>Ilustrasi · Label pakaian</span>
        </div>
        <div className="about-copy">
          <p className="eyebrow">Ruang cerita toko</p>
          <h2>Cerita terbaik datang dari toko itu sendiri.</h2>
          <p>
            Profil, sejarah, dan nilai Toko Seragam Buah Hati belum tersedia untuk ditampilkan. Kami
            tidak mengarang informasi tersebut agar halaman ini bisa diisi dengan cerita yang benar
            saat detailnya sudah ada.
          </p>
          <p>
            Untuk sementara, kamu dapat menjelajahi kategori seragam atau membaca panduan ukuran.
          </p>
        </div>
      </section>
      <section className="section-block section-tight reveal">
        <div className="about-values">
          <article>
            <strong>Kategori seragam</strong>
            <p>Mulai jelajahi kebutuhan berdasarkan jenjang sekolah.</p>
          </article>
          <article>
            <strong>Panduan mengukur</strong>
            <p>Siapkan ukuran pakaian sebelum bertanya ke toko.</p>
          </article>
          <article>
            <strong>Informasi terkonfirmasi</strong>
            <p>Tanyakan detail produk langsung kepada toko.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
