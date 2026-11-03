import Link from "next/link";
import GarmentArt from "@/components/GarmentArt";
import HeroCarousel from "@/components/HeroCarousel";
import ProductCarousel from "@/components/ProductCarousel";
import { RulerIcon, TruckIcon, WhatsAppIcon } from "@/components/Icons";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { SITE } from "@/lib/site";

export default function Home() {
  const bestSellers = PRODUCTS.filter((p) => p.badge === "Terlaris" || p.badge === "Hemat").concat(PRODUCTS.filter((p) => !p.badge).slice(0, 4)).slice(0, 10);
  const featured = [...PRODUCTS].sort((a, b) => b.order - a.order).slice(0, 10);
  const tiles = [
    { title: "Paket Lengkap", sub: "Atasan dan bawahan satu paket", href: "/koleksi/semua?tipe=setelan", type: "setelan" as const, color: "#ffffff", bg: "bg-brand-soft" },
    { title: "Olahraga", sub: "Kaos, training dan jaket", href: "/koleksi/olahraga-batik", type: "kaos" as const, color: "#0f766e", bg: "bg-neutral-200" },
    { title: "Atribut", sub: "Dasi, topi, sabuk, kerudung", href: "/koleksi/atribut", type: "dasi" as const, color: "#c1121f", bg: "bg-brand" },
    { title: "Batik Sekolah", sub: "Motif cetak tahan cuci", href: "/koleksi/olahraga-batik?tipe=batik", type: "batik" as const, color: "#c9a66b", bg: "bg-soft" },
  ];

  return (
    <>
      <section data-cc-animate="" className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:px-8 xl:px-16" aria-label="Belanja per jenjang">
        <h2 className="shrink-0 font-display text-4xl font-black md:w-56">Belanja per Jenjang</h2>
        <ul className="no-scrollbar -mx-4 flex flex-1 gap-4 overflow-x-auto px-4 md:mx-0 md:justify-between md:px-0">
          {CATEGORIES.map((c) => (
            <li key={c.id} className="w-28 shrink-0 md:w-auto md:flex-1">
              <Link href={`/koleksi/${c.id}`} className="group flex flex-col items-center gap-2">
                <span className="block h-28 w-28 overflow-hidden md:h-32 md:w-32">
                  <span className="hp-tile-media block h-full w-full">
                    <GarmentArt type={c.art} color={c.id === "atribut" ? "#c1121f" : c.id === "sd" || c.id === "smp" || c.id === "sma" ? "#ffffff" : c.color} accent={c.color} />
                  </span>
                </span>
                <span className="text-center text-sm text-ink underline underline-offset-4 group-hover:no-underline">{c.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HeroCarousel />

      <div className="space-y-20 pt-16">
        <ProductCarousel title="Seragam Terlaris" href="/koleksi/semua" products={bestSellers} />

        <section data-cc-animate="" className="mx-auto grid max-w-[1440px] gap-0 px-4 md:grid-cols-2 md:px-8 xl:px-16" aria-label="Bahan nyaman">
          <div className="flex flex-col justify-end bg-brand p-8 md:min-h-[460px] md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink">Bahan pilihan</p>
            <h2 className="mt-3 font-display text-5xl font-black leading-[0.95] md:text-6xl">Nyaman dari pagi sampai pulang sekolah.</h2>
            <p className="mt-4 max-w-md text-ink">Katun Oxford TC, drill dan rapih drill dipilih supaya adem, tidak mudah melar dan tahan dicuci berulang kali.</p>
            <Link href="/panduan-ukuran" className="mt-6 w-fit text-sm font-bold text-ink underline underline-offset-4">Cek panduan ukuran</Link>
          </div>
          <div className="grid grid-rows-2">
            <div className="group flex items-center justify-between overflow-hidden bg-soft p-8">
              <div>
                <h3 className="font-display text-4xl font-black">Putih Bersih</h3>
                <Link href="/koleksi/semua?warna=Putih" className="mt-3 inline-block text-sm text-ink underline underline-offset-4">Lihat koleksi</Link>
              </div>
              <div className="hp-tile-media h-40 w-40 shrink-0"><GarmentArt type="kemeja" color="#ffffff" /></div>
            </div>
            <div className="group flex items-center justify-between overflow-hidden bg-neutral-900 p-8 text-white">
              <div>
                <h3 className="font-display text-4xl font-black !text-white">Merah Putih</h3>
                <Link href="/koleksi/sd" className="mt-3 inline-block text-sm underline underline-offset-4">Seragam SD</Link>
              </div>
              <div className="hp-tile-media h-40 w-40 shrink-0"><GarmentArt type="rok" color="#c1121f" /></div>
            </div>
          </div>
        </section>

        <ProductCarousel title="Koleksi Terbaru" href="/koleksi/semua" products={featured} />

        <section data-cc-animate="" className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16" aria-label="Koleksi">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {tiles.map((t) => (
              <li key={t.title}>
                <Link href={t.href} className="group block border border-neutral-200">
                  <span className={`block aspect-[4/3] overflow-hidden ${t.bg}`}>
                    <span className="hp-tile-media block h-full w-full">
                      <span className="block h-full w-full scale-90"><GarmentArt type={t.type} color={t.color} accent="#c1121f" className="mix-blend-multiply" /></span>
                    </span>
                  </span>
                  <span className="block p-4 text-center">
                    <span className="block font-display text-xl font-extrabold">{t.title}</span>
                    <span className="mt-1 block text-xs text-muted">{t.sub}</span>
                    <span className="mt-3 inline-block text-xs text-ink underline underline-offset-4 group-hover:no-underline">Lihat koleksi</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section data-cc-animate="" className="mx-auto max-w-[1440px] border-y border-neutral-200 md:px-8 xl:px-16" aria-label="Keunggulan">
          <ul className="grid divide-neutral-200 md:grid-cols-3 md:divide-x">
            <li className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <TruckIcon className="h-9 w-9 text-ink" />
              <p className="font-bold text-ink">Gratis ongkir pesanan sekolah</p>
              <p className="text-sm">Minimal {SITE.freeShippingMinQty} pcs. Ongkir pesanan lain dikonfirmasi admin.</p>
            </li>
            <li className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <WhatsAppIcon className="h-9 w-9 text-ink" />
              <p className="font-bold text-ink">Pesan dan bayar lewat WhatsApp</p>
              <p className="text-sm">Kirim isi tas belanja, admin membalas dengan total dan rincian transfer.</p>
            </li>
            <li className="flex flex-col items-center gap-2 px-6 py-8 text-center">
              <RulerIcon className="h-9 w-9 text-ink" />
              <p className="font-bold text-ink">Ukuran jelas</p>
              <p className="text-sm">Tabel ukuran di setiap produk, plus <Link href="/panduan-ukuran" className="underline">panduan cara mengukur</Link>.</p>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
