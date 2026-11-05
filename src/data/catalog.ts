/**
 * Sample catalogue for layout review. Names, prices, discounts and sizes are placeholders.
 * Replace with real data (later: database). To use real photos, fill `images` per colour with
 * paths under /public, for example { "Putih": ["/produk/kemeja-sd-putih-1.jpg"] }.
 */

export type Gender = "putra" | "putri" | "unisex";
export type GarmentType =
  | "kemeja" | "blus" | "kaos" | "batik" | "jaket"
  | "celana" | "rok" | "setelan" | "kerudung" | "dasi" | "topi" | "sabuk";

export interface ColorOption { name: string; hex: string }

export interface Product {
  slug: string;
  name: string;
  categoryId: CategoryId;
  type: GarmentType;
  gender: Gender;
  price: number;
  compareAt?: number;
  colors: ColorOption[];
  sizes: string[];
  soldOut?: string[];
  badge?: string;
  material: string;
  details: string[];
  order: number;
  accent?: string;
  images?: Record<string, string[]>;
}

export type CategoryId = "sd" | "smp" | "sma" | "pramuka" | "olahraga-batik" | "atribut";

export interface Category {
  id: CategoryId;
  name: string;
  label: string;
  blurb: string;
  art: GarmentType;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "sd", name: "Seragam SD", label: "SD", blurb: "Merah putih untuk sekolah dasar. Bahan adem, jahitan kuat untuk anak yang aktif.", art: "kemeja", color: "#c1121f" },
  { id: "smp", name: "Seragam SMP", label: "SMP", blurb: "Putih biru dengan potongan rapi dan nyaman dipakai seharian.", art: "kemeja", color: "#1d4e89" },
  { id: "sma", name: "Seragam SMA", label: "SMA", blurb: "Putih abu-abu dengan potongan semi-slim untuk remaja.", art: "kemeja", color: "#6b7280" },
  { id: "pramuka", name: "Pramuka", label: "Pramuka", blurb: "Setelan Pramuka siaga, penggalang dan penegak sesuai ketentuan.", art: "setelan", color: "#8b5a2b" },
  { id: "olahraga-batik", name: "Olahraga & Batik", label: "Olahraga & Batik", blurb: "Kaos olahraga, training dan batik sekolah.", art: "kaos", color: "#0f766e" },
  { id: "atribut", name: "Atribut", label: "Atribut", blurb: "Dasi, topi, sabuk dan kerudung seragam.", art: "dasi", color: "#111827" },
];

export const GENDER_LABEL: Record<Gender, string> = { putra: "Putra", putri: "Putri", unisex: "Unisex" };

export const TYPE_LABEL: Record<GarmentType, string> = {
  kemeja: "Kemeja", blus: "Blus", kaos: "Kaos", batik: "Batik", jaket: "Jaket",
  celana: "Celana", rok: "Rok", setelan: "Setelan", kerudung: "Kerudung", dasi: "Dasi", topi: "Topi", sabuk: "Sabuk",
};

const C = {
  putih: { name: "Putih", hex: "#ffffff" },
  merah: { name: "Merah", hex: "#c1121f" },
  biru: { name: "Biru", hex: "#1d4e89" },
  dongker: { name: "Biru Dongker", hex: "#14213d" },
  abu: { name: "Abu-abu", hex: "#6b7280" },
  coklat: { name: "Coklat Pramuka", hex: "#8b5a2b" },
  coklatMuda: { name: "Coklat Muda", hex: "#c9a66b" },
  hitam: { name: "Hitam", hex: "#111827" },
  hijau: { name: "Hijau Tua", hex: "#14532d" },
  kuning: { name: "Kuning", hex: "#f2c200" },
  toska: { name: "Toska", hex: "#0f766e" },
};

const SD = ["24", "26", "28", "30", "32", "34"];
const SMP = ["26", "28", "30", "32", "34", "36"];
const SMA = ["28", "30", "32", "34", "36", "38"];
const LTR = ["S", "M", "L", "XL", "XXL"];
const ONE = ["All size"];

let n = 0;
function p(x: Omit<Product, "order">): Product {
  return { ...x, order: ++n };
}

export const PRODUCTS: Product[] = [
  p({ slug: "kemeja-sd-putih-lengan-pendek", name: "Kemeja SD Putih Lengan Pendek", categoryId: "sd", type: "kemeja", gender: "unisex", price: 75000, colors: [C.putih], sizes: SD, soldOut: ["24"], badge: "Terlaris", material: "Katun Oxford TC", details: ["Kemeja polos dengan saku dada", "Kancing awet, jahitan ganda di bahu", "Mudah disetrika, tidak mudah melar"], images: { "Putih": ["/images/Frame produk unggulan sd.png"] } }),
  p({ slug: "celana-pendek-merah-sd", name: "Celana Pendek Merah SD", categoryId: "sd", type: "celana", gender: "putra", price: 70000, compareAt: 85000, colors: [C.merah], sizes: SD, material: "Drill Nagata", details: ["Pinggang karet dengan kait", "Saku samping dan saku belakang", "Kain tebal tahan gesekan"] }),
  p({ slug: "rok-merah-sd-rempel", name: "Rok Merah SD Rempel", categoryId: "sd", type: "rok", gender: "putri", price: 84000, colors: [C.merah], sizes: SD, material: "Drill Nagata", details: ["Rempel keliling", "Resleting samping, pinggang karet", "Panjang di bawah lutut"] }),
  p({ slug: "setelan-sd-lengkap-putra", name: "Setelan SD Lengkap Putra", categoryId: "sd", type: "setelan", gender: "putra", price: 145000, compareAt: 165000, colors: [{ name: "Putih + Merah", hex: "#ffffff" }], accent: "#c1121f", sizes: SD, badge: "Hemat", material: "Oxford dan Drill", details: ["Kemeja putih dan celana merah", "Tersedia dasi dan sabuk terpisah", "Cocok untuk paket tahun ajaran baru"], images: { "Putih + Merah": ["/images/Frame produk unggulan sd.png"] } }),
  p({ slug: "setelan-sd-lengkap-putri", name: "Setelan SD Lengkap Putri", categoryId: "sd", type: "setelan", gender: "putri", price: 155000, compareAt: 175000, colors: [{ name: "Putih + Merah", hex: "#ffffff" }], accent: "#c1121f", sizes: SD, material: "Oxford dan Drill", details: ["Kemeja putih dan rok merah", "Tersedia kerudung terpisah", "Jahitan rapi, bahan adem"] }),
  p({ slug: "kemeja-sd-lengan-panjang", name: "Kemeja SD Lengan Panjang", categoryId: "sd", type: "kemeja", gender: "unisex", price: 78000, colors: [C.putih], sizes: SD, material: "Katun TC Halus", details: ["Kancing di pergelangan", "Cocok untuk muslimah dan acara resmi"] }),
  p({ slug: "kemeja-smp-putih-saku", name: "Kemeja SMP Putih Saku", categoryId: "smp", type: "kemeja", gender: "unisex", price: 85000, compareAt: 99000, colors: [C.putih], sizes: SMP, badge: "Terlaris", material: "Katun Oxford TC", details: ["Saku dada, kerah rapi", "Kain tidak tembus pandang", "Tahan cuci berulang"], images: { "Putih": ["/images/Frame produk unggulan smp.png"] } }),
  p({ slug: "celana-panjang-biru-smp", name: "Celana Panjang Biru SMP", categoryId: "smp", type: "celana", gender: "putra", price: 95000, colors: [C.biru, C.dongker], sizes: SMP, material: "American Drill", details: ["Potongan lurus, saku samping", "Pinggang dengan lubang ikat sabuk"] }),
  p({ slug: "rok-biru-smp-lipit", name: "Rok Biru SMP Lipit", categoryId: "smp", type: "rok", gender: "putri", price: 92000, colors: [C.biru, C.dongker], sizes: SMP, soldOut: ["36"], material: "American Drill", details: ["Lipit hadap", "Resleting samping", "Panjang di bawah lutut"] }),
  p({ slug: "blus-smp-putih-lengan-panjang", name: "Blus SMP Putih Lengan Panjang", categoryId: "smp", type: "blus", gender: "putri", price: 89000, colors: [C.putih], sizes: SMP, material: "Katun TC", details: ["Kancing depan tertutup", "Lengan panjang dengan manset"] }),
  p({ slug: "setelan-smp-lengkap", name: "Setelan SMP Lengkap", categoryId: "smp", type: "setelan", gender: "unisex", price: 175000, compareAt: 199000, colors: [{ name: "Putih + Biru", hex: "#ffffff" }], accent: "#1d4e89", sizes: SMP, badge: "Hemat", material: "Oxford dan Drill", details: ["Atasan putih dan bawahan biru", "Pilih celana atau rok saat memesan lewat WhatsApp"], images: { "Putih + Biru": ["/images/Frame produk unggulan smp.png"] } }),
  p({ slug: "kemeja-sma-putih-slim", name: "Kemeja SMA Putih Slim", categoryId: "sma", type: "kemeja", gender: "unisex", price: 99000, colors: [C.putih], sizes: SMA, material: "Katun Premium", details: ["Potongan semi-slim", "Kerah kaku, tidak mudah layu"] }),
  p({ slug: "celana-panjang-abu-sma", name: "Celana Panjang Abu-abu SMA", categoryId: "sma", type: "celana", gender: "putra", price: 110000, compareAt: 125000, colors: [C.abu], sizes: SMA, material: "Drill Premium", details: ["Potongan lurus", "Saku samping dan belakang berkancing"] }),
  p({ slug: "rok-abu-sma-span", name: "Rok Abu-abu SMA Span", categoryId: "sma", type: "rok", gender: "putri", price: 105000, colors: [C.abu], sizes: SMA, soldOut: ["28"], material: "Drill Premium", details: ["Potongan span dengan belahan belakang", "Resleting belakang"] }),
  p({ slug: "blus-sma-putih-lengan-panjang", name: "Blus SMA Putih Lengan Panjang", categoryId: "sma", type: "blus", gender: "putri", price: 99000, colors: [C.putih], sizes: SMA, material: "Katun TC", details: ["Lengan panjang dengan manset", "Cocok dipadukan dengan kerudung"] }),
  p({ slug: "setelan-sma-lengkap", name: "Setelan SMA Lengkap", categoryId: "sma", type: "setelan", gender: "unisex", price: 199000, compareAt: 229000, colors: [{ name: "Putih + Abu-abu", hex: "#ffffff" }], accent: "#6b7280", sizes: SMA, badge: "Hemat", material: "Katun dan Drill Premium", details: ["Atasan putih dan bawahan abu-abu", "Pilih celana atau rok saat memesan lewat WhatsApp"], images: { "Putih + Abu-abu": ["/images/Frame produk unggulan sma.png"] } }),
  p({ slug: "setelan-pramuka-siaga", name: "Setelan Pramuka Siaga", categoryId: "pramuka", type: "setelan", gender: "unisex", price: 120000, colors: [C.coklat, C.coklatMuda], sizes: SD, material: "Rapih Drill", details: ["Atasan dan bawahan satu paket", "Saku dada berkancing, lengan pendek"] }),
  p({ slug: "setelan-pramuka-penggalang", name: "Setelan Pramuka Penggalang", categoryId: "pramuka", type: "setelan", gender: "unisex", price: 135000, compareAt: 150000, colors: [C.coklat], sizes: SMP, badge: "Hemat", material: "Rapih Drill", details: ["Atasan dan bawahan satu paket", "Warna tidak mudah pudar"], images: { "Coklat Pramuka": ["/images/Frame produk unggulan pramuka.png"] } }),
  p({ slug: "kemeja-pramuka-penegak", name: "Kemeja Pramuka Penegak", categoryId: "pramuka", type: "kemeja", gender: "unisex", price: 98000, colors: [C.coklat], sizes: SMA, material: "Rapih Drill", details: ["Lengan panjang", "Dua saku dada"] }),
  p({ slug: "kaos-olahraga-sd", name: "Kaos Olahraga SD", categoryId: "olahraga-batik", type: "kaos", gender: "unisex", price: 55000, colors: [C.merah, C.biru, C.kuning], sizes: SD, badge: "Baru", material: "Katun Combed 30s", details: ["Menyerap keringat", "Kerah bulat berlapis rib"] }),
  p({ slug: "kaos-olahraga-smp-sma", name: "Kaos Olahraga SMP / SMA", categoryId: "olahraga-batik", type: "kaos", gender: "unisex", price: 65000, compareAt: 75000, colors: [C.biru, C.hitam, C.toska], sizes: LTR, material: "Katun Combed 30s", details: ["Potongan reguler", "Sablon tidak mudah retak"] }),
  p({ slug: "celana-training-sekolah", name: "Celana Training Sekolah", categoryId: "olahraga-batik", type: "celana", gender: "unisex", price: 89000, colors: [C.hitam, C.dongker], sizes: LTR, soldOut: ["XXL"], material: "Taslan", details: ["Pinggang karet dengan tali", "Saku samping berresleting"] }),
  p({ slug: "jaket-olahraga-sekolah", name: "Jaket Olahraga Sekolah", categoryId: "olahraga-batik", type: "jaket", gender: "unisex", price: 159000, compareAt: 189000, colors: [C.hitam, C.dongker], sizes: LTR, material: "Babytery", details: ["Resleting penuh", "Dua saku samping", "Bagian dalam lembut"] }),
  p({ slug: "kemeja-batik-sekolah", name: "Kemeja Batik Sekolah", categoryId: "olahraga-batik", type: "batik", gender: "unisex", price: 95000, colors: [C.coklatMuda, C.biru, C.hijau], sizes: SMP, material: "Katun Primisima", details: ["Motif cetak, warna tahan cuci", "Lengan pendek"] }),
  p({ slug: "batik-sekolah-lengan-panjang", name: "Batik Sekolah Lengan Panjang", categoryId: "olahraga-batik", type: "batik", gender: "unisex", price: 105000, colors: [C.coklatMuda, C.hijau], sizes: SMA, material: "Katun Primisima", details: ["Lengan panjang berkancing manset"] }),
  p({ slug: "dasi-sekolah-merah", name: "Dasi Sekolah Merah", categoryId: "atribut", type: "dasi", gender: "unisex", price: 15000, colors: [C.merah], sizes: ONE, material: "Satin", details: ["Karet pengait di leher", "Panjang 38 cm"] }),
  p({ slug: "dasi-sekolah-abu", name: "Dasi Sekolah Abu-abu", categoryId: "atribut", type: "dasi", gender: "unisex", price: 15000, colors: [C.abu], sizes: ONE, material: "Satin", details: ["Karet pengait di leher", "Panjang 42 cm"] }),
  p({ slug: "topi-sekolah", name: "Topi Sekolah", categoryId: "atribut", type: "topi", gender: "unisex", price: 25000, colors: [C.merah, C.abu, C.biru], sizes: ONE, material: "Drill", details: ["Pengait ukuran di belakang", "Logo sekolah bisa ditambahkan lewat pesanan partai"] }),
  p({ slug: "sabuk-sekolah", name: "Sabuk Sekolah", categoryId: "atribut", type: "sabuk", gender: "unisex", price: 20000, colors: [C.hitam], sizes: ["S", "M", "L"], material: "Kulit sintetis", details: ["Kepala sabuk logam", "Panjang dapat disesuaikan"] }),
  p({ slug: "kerudung-segi-empat-putih", name: "Kerudung Segi Empat Putih", categoryId: "atribut", type: "kerudung", gender: "putri", price: 35000, colors: [C.putih, C.abu, C.coklat], sizes: ONE, material: "Polycotton", details: ["Ukuran 110 x 110 cm", "Jahit tepi rapi, tidak menerawang"] }),
  p({ slug: "kerudung-instan-sekolah", name: "Kerudung Instan Sekolah", categoryId: "atribut", type: "kerudung", gender: "putri", price: 45000, compareAt: 55000, colors: [C.putih, C.abu, C.coklat, C.hitam], sizes: ["S", "M", "L"], badge: "Baru", material: "Jersey", details: ["Tinggal pakai, tanpa peniti", "Bahan jersey lentur"] }),
];

export const PRODUCT_BY_SLUG = Object.fromEntries(PRODUCTS.map((x) => [x.slug, x])) as Record<string, Product>;

export function discountPercent(prod: Product) {
  if (!prod.compareAt) return 0;
  return Math.round((1 - prod.price / prod.compareAt) * 100);
}

export function relatedProducts(prod: Product, limit = 8) {
  const same = PRODUCTS.filter((x) => x.slug !== prod.slug && x.categoryId === prod.categoryId);
  const rest = PRODUCTS.filter((x) => x.slug !== prod.slug && x.categoryId !== prod.categoryId);
  return [...same, ...rest].slice(0, limit);
}

export function searchProducts(q: string) {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PRODUCTS.filter((x) =>
    [x.name, TYPE_LABEL[x.type], x.material, GENDER_LABEL[x.gender], CATEGORIES.find((c) => c.id === x.categoryId)?.name ?? ""]
      .join(" ").toLowerCase().includes(s),
  );
}

export type SizeRow = { size: string; chest: string; length: string; sleeve: string };

export const SIZE_TABLE: SizeRow[] = [
  { size: "S", chest: "34 - 36", length: "48 - 50", sleeve: "44 - 46" },
  { size: "M", chest: "38 - 40", length: "52 - 54", sleeve: "48 - 50" },
  { size: "L", chest: "42 - 44", length: "56 - 58", sleeve: "52 - 54" },
  { size: "XL", chest: "46 - 48", length: "60 - 62", sleeve: "56 - 58" },
];

export const FAQS = [
  { question: "Bagaimana cara memilih ukuran seragam yang tepat?", answer: "Ukur lingkar dada, panjang baju dan panjang lengan anak, lalu cocokkan dengan Panduan Ukuran. Jika berada di antara dua ukuran, pilih yang lebih besar agar leluasa bergerak." },
  { question: "Apakah bisa memesan dalam jumlah banyak untuk sekolah?", answer: "Bisa. Kami melayani pesanan partai untuk sekolah dan yayasan, termasuk bordir nama atau logo. Hubungi kami lewat WhatsApp untuk harga dan jadwal." },
  { question: "Bagaimana cara membayar?", answer: "Pembayaran hanya lewat WhatsApp. Kirim pesanan dari keranjang, admin mengonfirmasi stok dan total biaya, lalu Anda mendapat rincian transfer." },
  { question: "Berapa lama pengiriman?", answer: "Estimasi dan ongkos kirim dikonfirmasi admin setelah alamat diterima. Pesanan sekolah dengan minimal 20 pcs mendapat gratis ongkir." },
];

