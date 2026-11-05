import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Informasi kontak dan bantuan Toko Seragam Buah Hati.",
};

export default function ContactPage() {
  return (
    <main className="section-wrap">
      <header className="page-intro">
        <p className="eyebrow">Informasi dan bantuan</p>
        <h1>Hubungi Toko Seragam Buah Hati</h1>
        <p className="muted">
          Informasi kontak resmi belum tersedia di website. Halaman ini akan membantu mengarahkan
          pertanyaan setelah kanal toko dikonfirmasi.
        </p>
      </header>
      <section className="contact-layout section-block section-tight reveal">
        <div>
          <div className="contact-cards">
            <article className="contact-card">
              <strong>WhatsApp</strong>
              <span>Nomor toko belum tersedia.</span>
            </article>
            <article className="contact-card">
              <strong>Email</strong>
              <span>Email toko belum tersedia.</span>
            </article>
            <article className="contact-card">
              <strong>Lokasi</strong>
              <span>Alamat toko belum tersedia.</span>
            </article>
            <article className="contact-card">
              <strong>Jam operasional</strong>
              <span>Jadwal toko belum tersedia.</span>
            </article>
          </div>
          <div className="about-art contact-art">
            <span>Ruang informasi toko</span>
          </div>
        </div>
        <div className="contact-form">
          <p className="eyebrow">Kirim pertanyaan</p>
          <h2>Pesan belum dapat dikirim</h2>
          <p className="muted">
            Formulir akan diaktifkan setelah tersedia kanal tujuan yang resmi. Untuk saat ini,
            tanyakan kontak toko kepada pengelola website.
          </p>
          <button className="button button-dark" type="button" disabled aria-disabled="true">
            Formulir belum tersedia
          </button>
          <p className="form-note">Tidak ada pesan yang dikirim atau disimpan dari halaman ini.</p>
        </div>
      </section>
      <section className="section-block section-flush reveal">
        <p className="eyebrow">Sebelum menghubungi</p>
        <h2>Informasi yang mungkin dicari</h2>
        <div className="faq-list">
          <article>
            <h3>Bagaimana cara mengukur pakaian?</h3>
            <p>Buka panduan ukuran untuk melihat bagian yang perlu diukur.</p>
          </article>
          <article>
            <h3>Apakah produk tersedia?</h3>
            <p>Daftar produk belum ditampilkan. Informasi stok perlu dikonfirmasi kepada toko.</p>
          </article>
          <article>
            <h3>Bagaimana cara memesan?</h3>
            <p>Proses pemesanan belum dijelaskan di website ini.</p>
          </article>
          <article>
            <h3>Di mana lokasi toko?</h3>
            <p>Alamat resmi belum tersedia di website.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
