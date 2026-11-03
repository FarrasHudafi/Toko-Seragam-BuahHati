import Link from "next/link";
import PageShell from "@/components/PageShell";
import { WhatsAppIcon } from "@/components/Icons";
import { SITE, waLink } from "@/lib/site";

export default function AboutPage() {
  return (
    <PageShell title="Tentang Kami" intro="Seragam yang nyaman, awet dan rapi, supaya anak fokus belajar, bukan membetulkan baju.">
      <div className="grid gap-10 border-t border-neutral-200 py-12 md:grid-cols-[1fr_1.4fr]">
        <h2 className="font-display text-3xl font-black">Cerita kami</h2>
        <div className="space-y-4 leading-relaxed">
          <p>{SITE.name} berawal dari kebutuhan orang tua akan seragam yang tidak cepat rusak setelah beberapa kali cuci. Kami memilih bahan yang menyerap keringat, memeriksa setiap jahitan, dan menyediakan ukuran dari anak SD sampai SMA.</p>
          <p>Kami melayani satuan untuk keluarga dan partai untuk sekolah, termasuk bordir nama dan logo. Pemesanan dan pembayaran lewat WhatsApp supaya Anda bisa bertanya langsung soal ukuran dan stok.</p>
        </div>
      </div>

      <section aria-label="Cara kami bekerja" className="border-t border-neutral-200 py-12">
        <h2 className="font-display text-3xl font-black">Cara pesan</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-4">
          {[["01", "Pilih produk", "Tentukan warna dan ukuran, masukkan ke tas."], ["02", "Kirim lewat WhatsApp", "Isi data pengiriman, pesanan terkirim sebagai chat."], ["03", "Konfirmasi dan bayar", "Admin mengonfirmasi stok, ongkir dan rekening."], ["04", "Pesanan dikirim", "Atau ambil sendiri di toko tanpa ongkir."]].map(([n, t, d]) => (
            <li key={n}>
              <span className="font-display text-4xl font-black text-ink">{n}</span>
              <h3 className="mt-2 font-display text-xl font-extrabold">{t}</h3>
              <p className="mt-1 text-sm leading-relaxed">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Lokasi" className="grid gap-8 border-t border-neutral-200 py-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-black">Kunjungi toko</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-bold text-ink">Alamat</dt><dd>{SITE.address}</dd></div>
            <div><dt className="font-bold text-ink">Jam buka</dt><dd>{SITE.hours}</dd></div>
            <div><dt className="font-bold text-ink">WhatsApp</dt><dd>{SITE.whatsappDisplay}</dd></div>
          </dl>
          <Link href="/informasi/ambil-di-toko" className="mt-4 inline-block text-sm underline underline-offset-4">Cara ambil di toko</Link>
        </div>
        <div className="grid min-h-48 place-items-center bg-soft text-sm text-muted">Peta lokasi menyusul</div>
      </section>

      <div className="flex flex-col items-start justify-between gap-5 bg-brand-soft p-8 md:flex-row md:items-center">
        <h2 className="font-display text-3xl font-black">Seragam untuk sekolah Anda?</h2>
        <a href={waLink("Halo, kami tertarik memesan seragam untuk sekolah.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-ink px-8 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800"><WhatsAppIcon className="h-5 w-5" /> Hubungi admin</a>
      </div>
    </PageShell>
  );
}
