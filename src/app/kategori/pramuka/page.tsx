import type { Metadata } from "next";
import PramukaCategoryClient from "./PramukaCategoryClient";

export const metadata: Metadata = {
  title: "Seragam Pramuka | Seragam Buah Hati",
  description:
    "Setelan Pramuka siaga, penggalang dan penegak sesuai ketentuan. Bahan rapih drill, warna tidak mudah pudar, ukuran lengkap untuk semua jenjang.",
};

export default function PramukaCategoryPage() {
  return <PramukaCategoryClient />;
}
