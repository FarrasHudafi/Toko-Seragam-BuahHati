import type { Metadata } from "next";
import SmpCategoryClient from "./SmpCategoryClient";

export const metadata: Metadata = {
  title: "Seragam SMP (Putih Biru) | Seragam Buah Hati",
  description:
    "Koleksi seragam SMP putih biru untuk kebutuhan sekolah harian. Kemeja, celana, rok dan setelan lengkap. Bahan katun premium, jahitan rapi, ukuran lengkap untuk siswa SMP.",
};

export default function SmpCategoryPage() {
  return <SmpCategoryClient />;
}
