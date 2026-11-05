import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panduan ukuran",
  description:
    "Cara mengukur lingkar dada, lingkar pinggang, dan panjang baju sebelum memilih seragam.",
};

export default function SizeGuidePage() {
  return (
    <main className="section-wrap">
      <header className="page-intro">
        <p className="eyebrow">Bantuan memilih ukuran</p>
        <h1>Panduan ukuran</h1>
        <p className="muted">
          Cara mengukur ini membantu menyiapkan informasi sebelum bertanya. Ukuran resmi produk
          perlu dikonfirmasi kepada toko.
        </p>
      </header>
      <section className="size-layout section-block section-tight reveal">
        <div
          className="measure-illustration"
          role="img"
          aria-label="Ilustrasi pengukuran lingkar dada"
        >
          <span className="measure-figure" aria-hidden="true">
            <span className="measure-line" />
          </span>
          <span className="measure-caption">Ilustrasi cara mengukur pakaian</span>
        </div>
        <div className="size-copy">
          <p className="eyebrow">Mulai dari pakaian yang pas</p>
          <h2>Catat ukuran dengan nyaman</h2>
          <p className="muted">
            Gunakan pita ukur dan ukur pakaian yang ukurannya sudah terasa pas. Hindari menarik pita
            ukur terlalu kencang.
          </p>
          <div className="size-list">
            <article>
              <h3>Lingkar dada</h3>
              <p>Ukur mengelilingi bagian dada yang paling lebar.</p>
            </article>
            <article>
              <h3>Lingkar pinggang</h3>
              <p>Ukur mengelilingi pinggang dengan posisi tubuh rileks.</p>
            </article>
            <article>
              <h3>Panjang baju</h3>
              <p>Ukur dari bagian bahu tertinggi hingga ujung bawah baju.</p>
            </article>
          </div>
        </div>
      </section>
      <section className="section-block section-tight reveal">
        <p className="eyebrow">Sebelum memilih</p>
        <h2>Pastikan ukuran produk</h2>
        <p className="muted size-note">
          Tabel ukuran resmi belum tersedia. Ukuran dapat berbeda menurut jenis pakaian dan produk;
          silakan tanyakan detail ukurannya kepada toko sebelum memilih.
        </p>
        <p className="notice">
          Panduan ini menjelaskan cara mengukur, bukan tabel ukuran produk toko. Kami tidak
          menampilkan angka ukuran yang belum terverifikasi.
        </p>
      </section>
    </main>
  );
}
