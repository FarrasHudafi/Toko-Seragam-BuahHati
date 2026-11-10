"use client";

import PageShell from "@/components/PageShell";
import { RulerIcon } from "@/components/Icons";
import { SIZE_TABLE } from "@/data/catalog";

const POINTS = [
  { n: "01", t: "Lingkar Dada", d: "Lingkarkan pita ukur di bagian dada terlebar, melewati bawah ketiak. Jaga pita tetap mendatar dan tidak menekan tubuh. Sisakan ruang gerak saat memilih ukuran pakaian." },
  { n: "02", t: "Panjang Baju", d: "Ukur dari titik bahu dekat pangkal leher hingga batas bawah baju yang diinginkan. Anak berdiri tegak. Anda juga dapat mengukur baju yang sudah pas sebagai pembanding." },
  { n: "03", t: "Panjang Lengan", d: "Dari titik pertemuan lengan dengan bahu hingga pergelangan tangan. Jika anak memiliki postur lebih tinggi, pertimbangkan untuk menambah 1 sampai 2 cm pada lengan." },
];

const TIPS = [
  { t: "Pilih ukuran lebih besar", d: "Jika anak berada di batas antara dua ukuran, pilih ukuran yang lebih besar agar lebih nyaman digunakan sehari-hari." },
  { t: "Ukur di atas pakaian tipis", d: "Jangan mengukur langsung pada kulit. Gunakan pita pengukur di atas kaos tipis untuk hasil yang lebih akurat." },
  { t: "Toleransi 1 sampai 2 cm", d: "Perbedaan 1 sampai 2 cm antara ukuran tabel dan produk jadi adalah normal. Hal ini tergantung pada proses finishing kain." },
];

export default function SizeGuidePage() {
  return (
    <PageShell
      title="Panduan Ukuran"
      intro="Pastikan ukuran seragam anak Anda pas nyaman. Gunakan pita pengukur di atas pakaian tipis untuk hasil akurat. Tabel di bawah ini merupakan panduan umum dan dapat berbeda-beda tergantung jenis bahan dan gaya potongan."
    >
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
          {POINTS.map((s) => (
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
          <div>
            <h2 className="flex items-center gap-3 font-display text-3xl font-black"><RulerIcon className="h-7 w-7" /> Tabel Ukuran Umum</h2>
            <p className="mt-2 text-sm">Pilih kategori usia untuk melihat detail ukuran</p>
          </div>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <caption className="sr-only">Tabel ukuran umum dalam sentimeter</caption>
            <thead className="bg-soft text-xs uppercase text-ink">
              <tr><th className="p-4">Ukuran</th><th className="p-4">Lebar Dada (cm)</th><th className="p-4">Panjang Baju (cm)</th><th className="p-4">Panjang Lengan (cm)</th></tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 text-ink">
              {SIZE_TABLE.map((r) => (
                <tr key={r.size}><td className="p-4 font-bold">{r.size}</td><td className="p-4">{r.chest}</td><td className="p-4">{r.length}</td><td className="p-4">{r.sleeve}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-body">
          <span className="font-bold text-ink">Catatan:</span> panduan umum untuk baju lengan panjang. Lebar dada diukur mendatar dari ketiak ke ketiak pada pakaian; nilainya setengah lingkar dada pakaian, bukan tubuh. Pilih lingkar dada pakaian yang lebih besar dari tubuh agar leluasa. Usia hanya perkiraan.
        </p>
      </section>

      <section aria-label="Tips pemilihan ukuran" className="border-t border-neutral-200 py-12">
        <h2 className="font-display text-3xl font-black">Tips Pemilihan Ukuran</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {TIPS.map((t) => (
            <article key={t.t} className="border border-neutral-200 p-6">
              <h3 className="font-display text-xl font-extrabold text-ink">{t.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-body">{t.d}</p>
            </article>
          ))}
        </div>
      </section>

    </PageShell>
  );
}
