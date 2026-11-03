"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "./Icons";

export default function ScrollEffects() {
  const pathname = usePathname();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-cc-animate]"));
    if (els.length === 0) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      els.forEach((el) => el.classList.add("cc-animate-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.classList.contains("cc-animate-in")) {
            entry.target.classList.add("cc-animate-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Kembali ke atas"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`hp-back-to-top fixed bottom-[76px] right-4 z-30 grid h-12 w-12 place-items-center rounded-full border border-neutral-300 bg-white text-ink shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-200 ease-in-out hover:bg-ink hover:text-white ${showTop ? "is-visible scale-100" : "pointer-events-none scale-0"}`}
    >
      <ChevronDown className="h-5 w-5 rotate-180" />
    </button>
  );
}
