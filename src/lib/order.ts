import type { ResolvedLine } from "@/context/StoreContext";
import { formatRupiah, SITE, waLink } from "./site";

export interface Customer {
  nama?: string;
  telepon?: string;
  sekolah?: string;
  alamat?: string;
  catatan?: string;
}

export function orderMessage(lines: ResolvedLine[], customer: Customer = {}) {
  const qty = lines.reduce((a, l) => a + l.qty, 0);
  const total = lines.reduce((a, l) => a + l.qty * l.product.price, 0);
  const out: string[] = [`Halo ${SITE.name}, saya ingin memesan:`, ""];
  lines.forEach((l, i) => {
    out.push(`${i + 1}. ${l.product.name}`);
    out.push(`   Warna: ${l.color} | Ukuran: ${l.size} | Jumlah: ${l.qty}`);
    out.push(`   ${formatRupiah(l.product.price)} x ${l.qty} = ${formatRupiah(l.product.price * l.qty)}`);
  });
  out.push("", `Total ${qty} pcs: ${formatRupiah(total)}`);
  if (qty >= SITE.freeShippingMinQty) out.push(`(Memenuhi gratis ongkir minimal ${SITE.freeShippingMinQty} pcs)`);
  const info = [
    customer.nama && `Nama: ${customer.nama}`,
    customer.telepon && `No. HP: ${customer.telepon}`,
    customer.sekolah && `Sekolah: ${customer.sekolah}`,
    customer.alamat && `Alamat: ${customer.alamat}`,
    customer.catatan && `Catatan: ${customer.catatan}`,
  ].filter(Boolean) as string[];
  if (info.length) out.push("", ...info);
  out.push("", "Mohon konfirmasi stok, ongkir dan cara pembayaran. Terima kasih.");
  return out.join("\n");
}

export const orderLink = (lines: ResolvedLine[], customer?: Customer) => waLink(orderMessage(lines, customer));
