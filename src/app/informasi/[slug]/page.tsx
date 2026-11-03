import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/site";

const PAGES: Record<string, { title: string; intro: string; sections: { h: string; p: string }[] }> = {
  pengiriman: {
    title: "Info Pengiriman",
    intro: "Pesanan dikirim setelah admin mengonfirmasi stok dan pembayaran lewat WhatsApp.",
    sections: [
      { h: "Gratis ongkir", p: `Pesanan sekolah atau instansi dengan total minimal ${SITE.freeShippingMinQty} pcs mendapat gratis ongkir.` },
      { h: "Ongkir pesanan lain", p: "Ongkir dihitung admin berdasarkan alamat dan berat paket, lalu dikirim bersama total pembayaran." },
      { h: "Estimasi waktu", p: "Estimasi diberitahukan saat konfirmasi pesanan. Pesanan partai dengan bordir membutuhkan waktu produksi tambahan." },
    ],
  },
  penukaran: {
    title: "Penukaran & Pengembalian",
    intro: "Ukuran tidak cocok? Kami bantu tukar.",
    sections: [
      { h: "Syarat tukar ukuran", p: "Barang belum dicuci, label masih terpasang, dan dikirim kembali maksimal 7 hari setelah diterima." },
      { h: "Barang cacat", p: "Kirim foto cacat lewat WhatsApp maksimal 3 hari setelah diterima. Kami ganti dengan barang yang sama jika stok ada." },
      { h: "Tidak dapat ditukar", p: "Pesanan custom (bordir nama atau logo) dan atribut yang sudah dipakai." },
    ],
  },
  pembayaran: {
    title: "Cara Pembayaran",
    intro: "Pembayaran hanya lewat WhatsApp. Tidak ada pembayaran online di situs ini.",
    sections: [
      { h: "1. Kirim pesanan", p: "Isi tas belanja, lengkapi data pemesan, lalu tekan Kirim pesanan via WhatsApp." },
      { h: "2. Konfirmasi admin", p: "Admin mengecek stok, menghitung ongkir, dan mengirim total beserta rincian rekening." },
      { h: "3. Transfer dan kirim bukti", p: "Transfer sesuai total, kirim bukti lewat chat yang sama. Pesanan diproses setelah pembayaran diterima." },
    ],
  },
  "ambil-di-toko": {
    title: "Ambil di Toko",
    intro: "Pesan dulu lewat WhatsApp, ambil di toko tanpa ongkir.",
    sections: [
      { h: "Alamat", p: SITE.address },
      { h: "Jam buka", p: SITE.hours },
      { h: "Cara", p: "Kirim pesanan dan pilih ambil di toko pada catatan. Kami kabari saat pesanan siap diambil." },
    ],
  },
  privasi: {
    title: "Kebijakan Privasi",
    intro: "Data apa yang kami simpan, dan di mana.",
    sections: [
      { h: "Data di browser Anda", p: "Isi tas belanja dan wishlist disimpan di browser perangkat ini (local storage). Kami tidak menerimanya sampai Anda mengirim pesanan." },
      { h: "Data yang Anda kirim", p: "Nama, nomor HP dan alamat hanya dikirim lewat WhatsApp saat Anda menekan tombol kirim, dan dipakai untuk memproses pesanan." },
      { h: "Perubahan", p: "Kebijakan ini akan diperbarui ketika login dan database aktif." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((slug) => ({ slug }));
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGES[slug];
  if (!page) notFound();
  return (
    <PageShell title={page.title} intro={page.intro} narrow>
      <div className="divide-y divide-neutral-200 border-y border-neutral-200">
        {page.sections.map((s) => (
          <section key={s.h} className="grid gap-2 py-6 md:grid-cols-[200px_1fr]">
            <h2 className="font-sans text-sm font-bold text-ink" style={{ fontFamily: "inherit", letterSpacing: 0 }}>{s.h}</h2>
            <p className="leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
