"use client";

import { useState } from "react";
import { CloseIcon, WhatsAppIcon } from "./Icons";
import { SITE, waLink } from "@/lib/site";

const KEY = "buahhati.sidetab.dismissed";

export default function SideDiscountTab() {
  const [visible, setVisible] = useState(() =>
    typeof window !== "undefined" ? sessionStorage.getItem(KEY) !== "1" : false,
  );
  const [open, setOpen] = useState(false);

  if (!visible) return null;

  return (
    <div className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 md:block">
      {open && (
        <div className="fade-in absolute right-full top-0 mr-2 w-64 border border-ink bg-white p-4 text-sm">
          <p className="font-display text-lg font-extrabold">Diskon tambahan 10%</p>
          <p className="mt-1">Untuk pesanan sekolah minimal {SITE.freeShippingMinQty} pcs. Syarat dan besaran final dikonfirmasi admin.</p>
          <a href={waLink("Halo, saya ingin menanyakan diskon tambahan 10% untuk pesanan sekolah.")} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center justify-center gap-2 bg-ink py-2.5 text-xs font-bold uppercase text-white">
            <WhatsAppIcon className="h-4 w-4" /> Tanya admin
          </a>
        </div>
      )}
      <div className="relative">
        <button aria-label="Tutup tab diskon" className="absolute -top-6 right-1 text-ink" onClick={() => { sessionStorage.setItem(KEY, "1"); setVisible(false); }}>
          <CloseIcon className="h-4 w-4" />
        </button>
        <button
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="bg-black px-3 py-5 text-sm font-medium text-white [writing-mode:vertical-rl] rotate-180 hover:bg-neutral-800"
        >
          Diskon tambahan 10% untuk sekolah
        </button>
      </div>
    </div>
  );
}
