import Link from "next/link";
import PageShell from "@/components/PageShell";
import { WhatsAppIcon } from "@/components/Icons";
import { SITE, waLink } from "@/lib/site";

export default function AccountPage() {
  return (
    <PageShell title="Akun" narrow intro="Login dan riwayat pesanan akan tersedia setelah database terhubung. Untuk sekarang, semua pesanan diproses lewat WhatsApp.">
      <div className="space-y-4 text-sm">
        <p className="border border-neutral-200 bg-soft p-5 text-ink">Fitur login dan daftar belum aktif. Wishlist dan tas belanja tersimpan di browser ini.</p>
        <ul className="divide-y divide-neutral-200 border-y border-neutral-200">
          <li><Link href="/keranjang" className="block py-4 text-ink hover:underline">Tas belanja</Link></li>
          <li><Link href="/wishlist" className="block py-4 text-ink hover:underline">Wishlist</Link></li>
          <li><Link href="/informasi/pengiriman" className="block py-4 text-ink hover:underline">Info pengiriman</Link></li>
        </ul>
        <a href={waLink("Halo, saya ingin menanyakan status pesanan saya.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-ink px-8 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800">
          <WhatsAppIcon className="h-5 w-5" /> Cek status pesanan ({SITE.whatsappDisplay})
        </a>
      </div>
    </PageShell>
  );
}
