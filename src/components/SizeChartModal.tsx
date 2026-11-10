"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon } from "./Icons";
import { SIZE_TABLE } from "@/data/catalog";
import useDialog from "@/lib/useDialog";

export default function SizeChartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"anak" | "dewasa">("anak");

  const panelRef = useDialog<HTMLDivElement>(open, onClose);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Tabel ukuran">
      <button className="fade-in absolute inset-0 bg-black/50" aria-label="Tutup tabel ukuran" onClick={onClose} />
      <div ref={panelRef} tabIndex={-1} className="fade-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 outline-none md:p-8">
        <button aria-label="Tutup" onClick={onClose} className="absolute right-4 top-4"><CloseIcon className="h-6 w-6 text-ink" /></button>
        <h2 className="font-display text-3xl font-black">Tabel Ukuran</h2>
        <p className="mt-1 text-sm">Semua angka dalam cm, diukur pada pakaian.</p>
        <div className="mt-5 flex gap-6 border-b border-neutral-200 text-sm">
          {(["anak", "dewasa"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} aria-pressed={tab === t} className={`-mb-px border-b-2 pb-2 capitalize ${tab === t ? "border-ink font-bold text-ink" : "border-transparent text-muted"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-120 text-left text-sm">
            <thead className="text-xs uppercase text-muted">
              <tr><th className="py-2 pr-4">Ukuran</th><th className="pr-4">Lebar dada</th><th className="pr-4">Panjang baju</th><th className="pr-4">Panjang lengan</th><th>Usia</th></tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-ink">
              {SIZE_TABLE[tab].map((r) => (
                <tr key={r.size}><td className="py-3 pr-4 font-bold">{r.size}</td><td className="pr-4">{r.chest}</td><td className="pr-4">{r.length}</td><td className="pr-4">{r.sleeve}</td><td className="text-muted">{r.age}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted">Di antara dua ukuran, pilih yang lebih besar. Toleransi 1 sampai 2 cm. <Link href="/panduan-ukuran" onClick={onClose} className="underline">Cara mengukur</Link></p>
      </div>
    </div>
  );
}
