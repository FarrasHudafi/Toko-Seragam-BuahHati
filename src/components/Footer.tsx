"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl font-black leading-tight text-ink">
            {SITE.name}
          </h3>
          <p className="mt-4 text-sm text-muted">
            Toko seragam sekolah terpercaya di Indonesia. Menyediakan seragam
            berkualitas premium untuk kebutuhan harian dan formal.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">
            Kategori
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/koleksi/sd" className="hover:text-ink">
                SD
              </Link>
            </li>
            <li>
              <Link href="/koleksi/smp" className="hover:text-ink">
                SMP
              </Link>
            </li>
            <li>
              <Link href="/koleksi/sma" className="hover:text-ink">
                SMA
              </Link>
            </li>
            <li>
              <Link href="/koleksi/pramuka" className="hover:text-ink">
                Pramuka
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">
            Bantuan
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <Link href="/informasi/pembayaran" className="hover:text-ink">
                Cara Pemesanan
              </Link>
            </li>
            <li>
              <Link href="/informasi/pengiriman" className="hover:text-ink">
                Pengiriman
              </Link>
            </li>
            <li>
              <Link href="/informasi/penukaran" className="hover:text-ink">
                Retur & Pengembalian
              </Link>
            </li>
            <li>
              <Link href="/informasi/ambil-di-toko" className="hover:text-ink">
                Ambil di Toko
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-ink">
            Kontak
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
            <li>Email: {SITE.email}</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-neutral-200 py-5 text-center text-xs text-muted">
        <p>
          &copy; {new Date().getFullYear()} {SITE.name}. Seluruh hak dilindungi.
        </p>
        <p className="mt-2">
          <Link href="/informasi/privasi" className="underline underline-offset-4 hover:text-ink">
            Kebijakan Privasi
          </Link>
        </p>
      </div>
    </footer>
  );
}
