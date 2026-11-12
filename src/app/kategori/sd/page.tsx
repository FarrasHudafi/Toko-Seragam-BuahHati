import type { Metadata } from "next";
import SdCategoryClient from "./SdCategoryClient";

export const metadata: Metadata = {
  title: "Seragam SD (Merah Putih) | Seragam Buah Hati",
  description:
    "Koleksi seragam SD merah putih untuk kebutuhan sekolah harian. Kemeja, celana, rok dan setelan lengkap. Bahan katun premium, jahitan rapi, ukuran lengkap untuk siswa SD.",
};

export default function SdCategoryPage() {
  return <SdCategoryClient />;
}
