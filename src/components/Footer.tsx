"use client";

import Link from "next/link";
import { useState } from "react";
import { FacebookIcon, InstagramIcon, MailIcon, WhatsAppIcon } from "./Icons";
import { SITE, waLink } from "@/lib/site";

const COLS = [
  { title: "Jenjang", links: [["Seragam SD", "/koleksi/sd"], ["Seragam SMP", "/koleksi/smp"], ["Seragam SMA", "/koleksi/sma"], ["Pramuka", "/koleksi/pramuka"]] },
  { title: "Akun Saya", links: [["Tas belanja", "/keranjang"], ["Wishlist", "/wishlist"], ["Akun", "/akun"]] },
  { title: "Layanan", links: [["Hubungi kami", "/kontak"], ["Info pengiriman", "/informasi/pengiriman"], ["Penukaran & pengembalian", "/informasi/penukaran"], ["Cara pembayaran", "/informasi/pembayaran"], ["Ambil di toko", "/informasi/ambil-di-toko"]] },
  { title: "Sumber", links: [["Panduan ukuran", "/panduan-ukuran"], ["Tentang kami", "/tentang-kami"], ["Kebijakan privasi", "/informasi/privasi"]] },
];

export default function Footer() {
  const [phone, setPhone] = useState("");

  return (
    <footer data-cc-animate="" className="mt-24">
      <div className="relative bg-brand-soft py-9">
        <svg className="absolute -top-px left-0 w-full text-white" viewBox="0 0 1440 14" preserveAspectRatio="none" height="14" aria-hidden="true">
          <path d="M0 0H1440V4C1200 14 1000 0 720 6S240 14 0 4Z" fill="currentColor" />
        </svg>
        <div className="flex items-center justify-center gap-8 text-ink">
          <a href={waLink("Halo, saya ingin bertanya.")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-opacity duration-200 hover:opacity-60"><WhatsAppIcon className="h-7 w-7" /></a>
          <a href={`mailto:${SITE.email}`} aria-label="Email" className="transition-opacity duration-200 hover:opacity-60"><MailIcon className="h-7 w-7" /></a>
          {SITE.socials.instagram && <a href={SITE.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-opacity duration-200 hover:opacity-60"><InstagramIcon className="h-7 w-7" /></a>}
          {SITE.socials.facebook && <a href={SITE.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-opacity duration-200 hover:opacity-60"><FacebookIcon className="h-7 w-7" /></a>}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr_1fr_1fr_1.4fr]">
        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-sans text-sm font-bold text-ink" style={{ fontFamily: "inherit", letterSpacing: 0 }}>{col.title}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              {col.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="hp-footer-link hover:text-ink">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="font-display text-3xl font-black leading-tight">Dapatkan info promo.</h3>
          <form
            className="mt-5 flex"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(`Halo, tolong daftarkan nomor ${phone} untuk info promo dan stok seragam.`), "_blank", "noopener");
            }}
          >
            <label htmlFor="promo-phone" className="sr-only">Nomor WhatsApp</label>
            <input id="promo-phone" required inputMode="tel" pattern="[0-9+\- ]{8,16}" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="NOMOR WHATSAPP" className="min-w-0 flex-1 border border-r-0 border-neutral-300 px-3 py-3 text-xs text-ink placeholder:text-neutral-400" />
            <button className="bg-brand px-5 text-xs font-bold uppercase text-ink transition-colors duration-200 hover:bg-brand-soft">Kirim</button>
          </form>
          <p className="mt-3 text-xs text-muted">Nomor Anda dikirim lewat WhatsApp ke admin, belum disimpan di situs ini.</p>
        </div>
      </div>

      <div className="border-t border-neutral-200 bg-soft py-5 text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} {SITE.name}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
