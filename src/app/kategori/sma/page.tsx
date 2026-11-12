import type { Metadata } from "next";
import SmaCategoryClient from "./SmaCategoryClient";

export const metadata: Metadata = {
  title: "Seragam SMA (Putih Abu-abu) | Seragam Buah Hati",
  description:
    "Koleksi seragam SMA putih abu-abu dengan potongan semi-slim untuk remaja. Kemeja, celana, rok dan setelan lengkap. Bahan katun premium, jahitan rapi, ukuran lengkap untuk siswa SMA.",
};

export default function SmaCategoryPage() {
  return <SmaCategoryClient />;
}
