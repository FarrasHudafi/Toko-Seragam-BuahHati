export type CategorySlug = "sd" | "smp" | "sma" | "atribut";

export type Category = {
  slug: CategorySlug;
  label: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  sizes: string[];
  illustration: "pakaian" | "atribut";
};

export const categories: Category[] = [
  { slug: "sd", label: "Seragam SD" },
  { slug: "smp", label: "Seragam SMP" },
  { slug: "sma", label: "Seragam SMA" },
  { slug: "atribut", label: "Atribut sekolah" },
];

// Data contoh untuk tampilan katalog, bukan data resmi toko. Ganti dengan daftar produk asli.
export const sampleProducts: Product[] = [
  {
    slug: "kemeja-putih-sd",
    name: "Kemeja Putih SD Lengan Pendek",
    category: "sd",
    price: 75000,
    sizes: ["S", "M", "L", "XL"],
    illustration: "pakaian",
  },
  {
    slug: "celana-merah-sd",
    name: "Celana Pendek Merah SD",
    category: "sd",
    price: 70000,
    sizes: ["S", "M", "L", "XL"],
    illustration: "pakaian",
  },
  {
    slug: "kemeja-putih-smp",
    name: "Kemeja Putih SMP Lengan Pendek",
    category: "smp",
    price: 85000,
    sizes: ["M", "L", "XL", "XXL"],
    illustration: "pakaian",
  },
  {
    slug: "celana-biru-smp",
    name: "Celana Panjang Biru SMP",
    category: "smp",
    price: 95000,
    sizes: ["M", "L", "XL", "XXL"],
    illustration: "pakaian",
  },
  {
    slug: "kemeja-putih-sma",
    name: "Kemeja Putih SMA Lengan Pendek",
    category: "sma",
    price: 90000,
    sizes: ["M", "L", "XL", "XXL"],
    illustration: "pakaian",
  },
  {
    slug: "rok-abu-sma",
    name: "Rok Panjang Abu-abu SMA",
    category: "sma",
    price: 100000,
    sizes: ["M", "L", "XL", "XXL"],
    illustration: "pakaian",
  },
  {
    slug: "dasi-sekolah",
    name: "Dasi Sekolah",
    category: "atribut",
    price: 15000,
    sizes: ["All size"],
    illustration: "atribut",
  },
  {
    slug: "topi-sekolah",
    name: "Topi Sekolah",
    category: "atribut",
    price: 25000,
    sizes: ["All size"],
    illustration: "atribut",
  },
];

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number) {
  return rupiah.format(price);
}

export function getCategoryLabel(slug: CategorySlug) {
  return categories.find((category) => category.slug === slug)?.label ?? slug;
}
