"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CloseIcon } from "./Icons";
import { SIZE_TABLE } from "@/data/catalog";

export default function SizeChartModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Tabel ukuran">
      <button className="fade-in absolute inset-0 bg-black/50" aria-label="Tutup tabel ukuran" onClick={onClose} />
      <div className="fade-in relative w-full max-w-2xl bg-white p-6 md:p-8">
        <button aria-label="Tutup" onClick={onClose} className="absolute right-4 top-4"><CloseIcon className="h-6 w-6 text-ink" /></button>
        <h2 className="font-display text-3xl font-black">Tabel Ukuran</h2>
        <p className="mt-1 text-sm">Semua angka dalam cm, diukur pada pakaian.</p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[480px] text-left text-sm">
            <caption className="sr-only">Tabel ukuran umum dalam sentimeter</caption>
            <thead className="text-xs uppercase text-muted">
              <tr><th className="py-2 pr-4">Ukuran</th><th className="pr-4">Lebar dada</th><th className="pr-4">Panjang baju</th><th className="pr-4">Panjang lengan</th></tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-ink">
              {SIZE_TABLE.map((r) => (
                <tr key={r.size}><td className="py-3 pr-4 font-bold">{r.size}</td><td className="pr-4">{r.chest}</td><td className="pr-4">{r.length}</td><td className="pr-4">{r.sleeve}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted">Di antara dua ukuran, pilih yang lebih besar. Toleransi 1 sampai 2 cm. <Link href="/panduan-ukuran" onClick={onClose} className="underline">Cara mengukur</Link></p>
      </div>
    </div>
  );
}
