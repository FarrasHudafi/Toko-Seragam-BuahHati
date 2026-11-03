"use client";

import { useState } from "react";
import PageShell from "@/components/PageShell";
import { MailIcon, MinusIcon, PinIcon, PlusIcon, WhatsAppIcon } from "@/components/Icons";
import { FAQS } from "@/data/catalog";
import { SITE, waLink } from "@/lib/site";

const TOPICS = ["Pesanan partai sekolah", "Konsultasi ukuran", "Pesanan satuan", "Bordir nama / logo", "Pengiriman dan penukaran", "Lainnya"];

export default function ContactPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [f, setF] = useState({ nama: "", telepon: "", topik: TOPICS[0], pesan: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <PageShell title="Hubungi Kami" intro="Pertanyaan soal ukuran, stok, pesanan partai atau pengiriman? Admin membalas lewat WhatsApp pada jam layanan.">
      <ul className="grid gap-4 border-t border-neutral-200 py-10 md:grid-cols-3">
        {[
          { icon: <WhatsAppIcon className="h-7 w-7" />, t: "WhatsApp", v: SITE.whatsappDisplay, href: waLink("Halo, saya ingin bertanya."), cta: "Chat sekarang" },
          { icon: <MailIcon className="h-7 w-7" />, t: "Email", v: SITE.email, href: `mailto:${SITE.email}`, cta: "Kirim email" },
          { icon: <PinIcon className="h-7 w-7" />, t: "Toko", v: SITE.address, href: "/informasi/ambil-di-toko", cta: "Info kunjungan" },
        ].map((c) => (
          <li key={c.t} className="flex flex-col border border-neutral-200 p-6">
            <span className="text-ink">{c.icon}</span>
            <p className="mt-4 text-xs font-bold uppercase text-muted">{c.t}</p>
            <p className="mt-1 text-lg font-bold text-ink">{c.v}</p>
            <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-5 text-sm text-ink underline underline-offset-4">{c.cta}</a>
          </li>
        ))}
      </ul>

      <div className="grid gap-12 border-t border-neutral-200 py-12 md:grid-cols-[1.3fr_1fr]">
        <section aria-label="Kirim pesan">
          <h2 className="font-display text-3xl font-black">Kirim pesan</h2>
          <p className="mt-1 text-sm">Pesan dibuka di WhatsApp, tinggal tekan kirim.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              window.open(waLink(`Halo, saya ${f.nama} (${f.telepon}).\nTopik: ${f.topik}\n\n${f.pesan}`), "_blank", "noopener");
            }}
          >
            <label className="block text-xs font-bold text-ink">Nama lengkap
              <input required value={f.nama} onChange={set("nama")} placeholder="Nama Anda" className="mt-1 w-full border border-neutral-300 px-3 py-3 text-sm font-normal" />
            </label>
            <label className="block text-xs font-bold text-ink">Nomor HP
              <input required inputMode="tel" value={f.telepon} onChange={set("telepon")} placeholder="08xx-xxxx-xxxx" className="mt-1 w-full border border-neutral-300 px-3 py-3 text-sm font-normal" />
            </label>
            <label className="block text-xs font-bold text-ink">Topik
              <select value={f.topik} onChange={set("topik")} className="mt-1 w-full border border-neutral-300 bg-white px-3 py-3 text-sm font-normal">
                {TOPICS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </label>
            <label className="block text-xs font-bold text-ink">Pesan
              <textarea required rows={5} value={f.pesan} onChange={set("pesan")} placeholder="Tulis kebutuhan Anda di sini" className="mt-1 w-full border border-neutral-300 px-3 py-3 text-sm font-normal" />
            </label>
            <button className="hp-btn-primary flex items-center gap-2 bg-ink px-8 py-4 text-xs font-bold uppercase text-white hover:bg-neutral-800"><WhatsAppIcon className="h-5 w-5" /> Buka WhatsApp</button>
          </form>
        </section>

        <section aria-label="Jam layanan">
          <h2 className="font-display text-3xl font-black">Jam layanan</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="font-bold text-ink">Alamat</dt><dd>{SITE.address}</dd></div>
            <div><dt className="font-bold text-ink">Jam</dt><dd>{SITE.hours}</dd></div>
          </dl>
          <div className="mt-6 grid aspect-[4/3] place-items-center bg-soft text-sm text-muted">Peta lokasi menyusul</div>
        </section>
      </div>

      <section id="faq" aria-label="Pertanyaan umum" className="border-t border-neutral-200 py-12">
        <h2 className="font-display text-3xl font-black">Pertanyaan Umum</h2>
        <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQS.map((q, i) => {
            const isOpen = open === i;
            return (
              <div key={q.question}>
                <button aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left font-bold text-ink">
                  {q.question}
                  {isOpen ? <MinusIcon className="h-5 w-5 shrink-0" /> : <PlusIcon className="h-5 w-5 shrink-0" />}
                </button>
                <div className={`hp-disclosure-panel grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.2,0.6,0.4,1)] ${isOpen ? "is-open grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="hp-disclosure-inner overflow-hidden">
                    <p className={`hp-disclosure-content max-w-3xl pb-5 leading-relaxed transition-opacity duration-300 delay-100 ${isOpen ? "opacity-100" : "opacity-0"}`}>{q.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
