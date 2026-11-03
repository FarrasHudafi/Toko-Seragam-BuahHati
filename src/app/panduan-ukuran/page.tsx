"use client";

import Link from "next/link";
import { useState } from "react";
import PageShell from "@/components/PageShell";
import { RulerIcon, WhatsAppIcon } from "@/components/Icons";
import { SIZE_TABLE } from "@/data/catalog";
import { waLink } from "@/lib/site";

const STEPS = [
  { n: "01", t: "Lingkar dada", d: "Lingkarkan pita ukur di bagian dada terlebar, melewati bawah ketiak. Pita mendatar dan tidak menekan." },
  { n: "02", t: "Panjang baju", d: "Ukur dari titik bahu dekat leher sampai batas bawah baju yang diinginkan, anak berdiri tegak." },
  { n: "03", t: "Panjang lengan", d: "Dari ujung bahu sampai pergelangan tangan. Untuk anak yang cepat tinggi, tambah 1 sampai 2 cm." },
];

export default function SizeGuidePage() {
  const [tab, setTab] = useState<"anak" | "dewasa">("anak");
  return (
    <PageShell title="Panduan Ukuran" intro="Gunakan pita ukur di atas pakaian tipis. Tabel ini panduan umum, hasil akhir bisa berbeda 1 sampai 2 cm tergantung bahan dan model.">
      <section aria-label="Cara mengukur" className="grid gap-10 border-t border-neutral-200 py-12 md:grid-cols-[1fr_1.2fr]">
        <div className="bg-soft p-6">
          <svg viewBox="0 0 200 260" className="mx-auto h-80" role="img" aria-label="Titik pengukuran: dada, panjang baju, lengan" fill="none" stroke="#111827" strokeWidth="2" strokeLinejoin="round">
            <path d="M62 34 L82 24 H118 L138 34 L172 62 L154 92 L138 80 V176 H62 V80 L46 92 L28 62 Z" fill="#fff" />
            <path d="M82 24 Q100 52 118 24" />
            <line x1="62" y1="104" x2="138" y2="104" stroke="#bd2949" strokeDasharray="4 4" />
            <line x1="100" y1="46" x2="100" y2="176" stroke="#111827" strokeDasharray="4 4" />
            <line x1="138" y1="34" x2="172" y2="62" stroke="#0f766e" strokeWidth="3" />
            <text x="10" y="108" fontSize="12" fill="#bd2949" stroke="none" fontFamily="Helvetica, Arial">1</text>
            <text x="106" y="140" fontSize="12" fill="#111827" stroke="none" fontFamily="Helvetica, Arial">2</text>
            <text x="160" y="40" fontSize="12" fill="#0f766e" stroke="none" fontFamily="Helvetica, Arial">3</text>
          </svg>
        </div>
        <ol className="space-y-6">
          {STEPS.map((s) => (
            <li key={s.n} className="flex gap-5">
              <span className="font-display text-4xl font-black text-ink">{s.n}</span>
              <div>
                <h2 className="font-display text-2xl font-extrabold">{s.t}</h2>
                <p className="mt-1 leading-relaxed">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Tabel ukuran" className="border-t border-neutral-200 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="flex items-center gap-3 font-display text-3xl font-black"><RulerIcon className="h-7 w-7" /> Tabel Ukuran</h2>
          <div className="flex gap-6 text-sm">
            {(["anak", "dewasa"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t} className={`border-b-2 pb-1 capitalize ${tab === t ? "border-ink font-bold text-ink" : "border-transparent text-muted"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Ukuran dalam sentimeter</caption>
            <thead className="bg-soft text-xs uppercase text-ink">
              <tr><th className="p-4">Ukuran</th><th className="p-4">Lebar dada (cm)</th><th className="p-4">Panjang baju (cm)</th><th className="p-4">Panjang lengan (cm)</th><th className="p-4">Usia</th></tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-ink">
              {SIZE_TABLE[tab].map((r) => (
                <tr key={r.size}><td className="p-4 font-bold">{r.size}</td><td className="p-4">{r.chest}</td><td className="p-4">{r.length}</td><td className="p-4">{r.sleeve}</td><td className="p-4 text-muted">{r.age}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 grid gap-4 text-sm md:grid-cols-3">
          <li><strong className="text-ink">Di antara dua ukuran?</strong> Pilih yang lebih besar agar leluasa bergerak.</li>
          <li><strong className="text-ink">Ukur di atas pakaian tipis.</strong> Jangan langsung pada kulit.</li>
          <li><strong className="text-ink">Toleransi 1 sampai 2 cm.</strong> Normal akibat proses jahit dan kain.</li>
        </ul>
      </section>

      <section className="flex flex-col items-start justify-between gap-5 bg-brand-soft p-8 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-black">Masih ragu dengan ukurannya?</h2>
          <p className="mt-1 text-ink">Kirim tinggi dan berat anak, kami bantu pilihkan.</p>
        </div>
        <a href={waLink("Halo, saya butuh bantuan memilih ukuran seragam.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-ink px-8 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800"><WhatsAppIcon className="h-5 w-5" /> Tanya ukuran</a>
      </section>
      <p className="mt-6 text-sm"><Link href="/koleksi/semua" className="underline underline-offset-4">Lihat semua seragam</Link></p>
    </PageShell>
  );
}
