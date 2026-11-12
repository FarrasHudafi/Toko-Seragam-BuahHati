"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import GarmentArt from "@/components/GarmentArt";
import {
  CATEGORIES,
  PRODUCT_BY_SLUG,
  PRODUCTS,
  type CategoryId,
} from "@/data/catalog";
import { formatRupiah } from "@/lib/site";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08 },
  }),
};

const CATEGORY_IMAGES: Partial<Record<CategoryId, string>> = {
  sd: "/images/Frame.png",
  smp: "/images/Frame2.png",
  sma: "/images/Frame3.png",
  pramuka: "/images/Frame4.png",
  "olahraga-batik": "/images/Frame5.png",
};

const CATEGORY_LABELS: Partial<Record<CategoryId, string>> = {
  sd: "SD (Merah Putih)",
  smp: "SMP (Putih Biru)",
  sma: "SMA (Putih Abu-abu)",
};

const FEATURED = [
  {
    slug: "kemeja-sd-putih-lengan-pendek",
    name: "Seragam SD Putih",
    image: "/images/Frame produk unggulan sd-original.png",
  },
  {
    slug: "celana-panjang-biru-smp",
    name: "Seragam SMP Biru",
    image: "/images/Frame produk unggulan smp.png",
  },
  {
    slug: "celana-panjang-abu-sma",
    name: "Seragam SMA Abu",
    image: "/images/Frame produk unggulan sma.png",
  },
  {
    slug: "setelan-pramuka-siaga",
    name: "Setelan Pramuka",
    image: "/images/Frame produk unggulan pramuka.png",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Seragam anak rapi sampai akhir tahun ajaran. Jahitan tidak menganga walau dicuci mingguan.",
    name: "Bu Rina",
    role: "Orang tua siswa SD",
  },
  {
    quote:
      "Pesan 120 pcs untuk sekolah, ukuran seragamnya konsisten. Gratis ongkir sesuai janji.",
    name: "Pak Dedi",
    role: "Wakil Kepala Sekolah",
  },
  {
    quote:
      "Tabel ukuran lengkap jadi tidak salah pilih. Blus anak saya pas sekali dipakai.",
    name: "Sari",
    role: "Orang tua siswa SMP",
  },
];

export default function Home() {
  const countFor = (id: CategoryId) =>
    PRODUCTS.filter((p) => p.categoryId === id).length;
  const reduced = useReducedMotion();
  const variants = reduced ? undefined : fadeUp;
  const itemVariants = reduced ? undefined : fadeUpItem;
  const viewport = { once: false, margin: "-80px" };

  return (
    <>
      <section className="bg-white" aria-label="Pengantar toko">
        <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-14 md:grid-cols-[5fr_7fr] md:px-8 xl:px-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-black leading-[1.02] text-ink md:text-6xl"
            >
              Seragam rapi, nyaman dipakai seharian.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-md text-xs text-body md:text-sm"
            >
              Kualitas premium dengan bahan katun lembut dan jahitan tahan lama.
              Cocok untuk kebutuhan sekolah harian dan acara formal.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start"
            >
              <Link
                href="/kategori/semua"
                className="border border-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-colors duration-200 hover:bg-ink hover:text-white rounded-lg"
              >
                Lihat Koleksi
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="relative aspect-square max-h-[720px] overflow-hidden rounded-xl"
          >
            <Image
              src="/images/Hero Image.png"
              alt="Siswa mengenakan seragam sekolah"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-right"
            />
          </motion.div>
        </div>
      </section>

      <section
        className="mx-auto max-w-[1440px] px-4 py-10 md:px-8 xl:px-16"
        aria-label="Belanja per kategori"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-4xl font-black">
            Belanja Berdasarkan Kategori
          </h2>
          <p className="mt-3 text-sm text-body">
            Pilih kategori yang sesuai dengan kebutuhan sekolah atau organisasi
            Anda
          </p>
        </motion.div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.filter((c) => c.id !== "atribut").map((c, i) => (
            <motion.li
              key={c.id}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={itemVariants}
              custom={i}
            >
              <Link
                href={`/kategori/${c.id}`}
                className="group block overflow-hidden rounded-xl border border-neutral-200"
              >
                <span className="block aspect-[4/3] overflow-hidden bg-soft">
                  <span className="hp-tile-media relative block h-full w-full">
                    {CATEGORY_IMAGES[c.id] ? (
                      <Image
                        src={CATEGORY_IMAGES[c.id]!}
                        alt={c.name}
                        fill
                        sizes="20vw"
                        className="object-contain"
                      />
                    ) : (
                      <GarmentArt
                        type={c.art}
                        color={c.id === "atribut" ? "#c1121f" : c.color}
                        accent={c.color}
                      />
                    )}
                  </span>
                </span>
                <span className="flex flex-col gap-1 p-4">
                  <span className="font-display text-lg font-extrabold text-ink group-hover:underline underline-offset-4">
                    {CATEGORY_LABELS[c.id] ?? c.label}
                  </span>
                  <span className="text-xs text-muted">
                    {countFor(c.id)} item
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </section>

      <div className="space-y-20 pt-16">
        <section
          className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16"
          aria-label="Produk unggulan"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="font-display text-4xl font-black">
              Produk Unggulan
            </h2>
            <p className="mt-3 text-sm text-body">
              Pilihan terbaik dari kami untuk kebutuhan sekolah harian
            </p>
          </motion.div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED.map((f, i) => {
              const prod = PRODUCT_BY_SLUG[f.slug];
              const sizeRange = `${prod.sizes[0]} - ${prod.sizes[prod.sizes.length - 1]}`;
              return (
                <motion.li
                  key={f.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={itemVariants}
                  custom={i}
                >
                  <Link href={`/produk/${f.slug}`} className="group block overflow-hidden rounded-xl">
                    <span className="relative block aspect-square overflow-hidden rounded-xl bg-soft">
                      <Image
                        src={f.image}
                        alt={f.name}
                        fill
                        sizes="25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-3 block font-display text-lg font-extrabold text-ink group-hover:underline underline-offset-4">
                      {f.name}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      Ukuran: {sizeRange}
                    </span>
                    <span className="mt-1 block text-ink">
                      {formatRupiah(prod.price)}
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </section>

        <section
          className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16"
          aria-label="Kenapa beli di sini"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="text-center font-display text-3xl font-extrabold md:text-4xl"
          >
            Kenapa Beli di Sini?
          </motion.h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Bahan Awet Jahitan Kuat",
                body: (
                  <>
                    Katun Oxford TC, drill dan rapih drill dipilih supaya adem,
                    tidak mudah melar dan tahan dicuci berulang kali.
                  </>
                ),
              },
              {
                title: "Ukuran yang Pas",
                body: (
                  <>
                    Tabel ukuran lengkap di setiap produk, plus{" "}
                    <Link
                      href="/panduan-ukuran"
                      className="underline underline-offset-4"
                    >
                      panduan cara mengukur
                    </Link>{" "}
                    yang mudah diikuti.
                  </>
                ),
              },
            ].map((item, i) => (
              <motion.li
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={itemVariants}
                custom={i}
                className="flex flex-col items-center gap-3 rounded-xl border border-neutral-200 bg-soft p-10 text-center"
              >
                <span className="font-display text-2xl font-black">
                  {item.title}
                </span>
                <p className="max-w-sm text-sm">{item.body}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        <section
          className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16"
          aria-label="Ukuran"
        >
          <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={variants}
            >
              <h3 className="font-display text-2xl font-black md:text-3xl">
                Ukuran yang Pas
              </h3>
              <p className="mt-4 text-sm text-body">
                Kami menyediakan panduan ukuran untuk memastikan seragam Anda
                nyaman dipakai. Cek panduan lengkap kami untuk memilih ukuran
                yang tepat.
              </p>
              <Link
                href="/panduan-ukuran"
                className="mt-4 inline-block text-sm font-bold text-ink underline underline-offset-4"
              >
                Lihat panduan lengkap &rarr;
              </Link>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={variants}
              className="flex w-full flex-col justify-center overflow-hidden rounded-xl border border-neutral-200"
            >
              <table className="w-full text-center text-sm">
                <thead className="bg-soft">
                  <tr>
                    <th className="px-4 py-3 font-bold text-ink">Ukuran</th>
                    <th className="px-4 py-3 font-bold text-ink">24</th>
                    <th className="px-4 py-3 font-bold text-ink">26</th>
                    <th className="px-4 py-3 font-bold text-ink">28</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-neutral-200">
                    <td className="px-4 py-3 font-bold text-ink">Lebar Dada</td>
                    <td className="px-4 py-3 text-muted">34cm</td>
                    <td className="px-4 py-3 text-muted">36cm</td>
                    <td className="px-4 py-3 text-muted">38cm</td>
                  </tr>
                  <tr className="border-t border-neutral-200">
                    <td className="px-4 py-3 font-bold text-ink">Panjang Baju</td>
                    <td className="px-4 py-3 text-muted">52cm</td>
                    <td className="px-4 py-3 text-muted">54cm</td>
                    <td className="px-4 py-3 text-muted">56cm</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        <section
          className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-16"
          aria-label="Testimoni"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="text-center font-display text-3xl font-extrabold md:text-4xl"
          >
            Testimoni
          </motion.h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <motion.li
                key={t.name}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={itemVariants}
                custom={i}
                className="flex flex-col rounded-xl border border-neutral-200 p-8"
              >
                <p className="flex-1 text-sm leading-relaxed">
                  {"\u201C"}
                  {t.quote}
                  {"\u201D"}
                </p>
                <p className="mt-6 font-bold text-ink">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </motion.li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
