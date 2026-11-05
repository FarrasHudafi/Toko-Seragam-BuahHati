"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    // Elemen yang sudah terlihat saat halaman dibuka langsung ditampilkan agar tidak berkedip.
    for (const element of document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")) {
      if (element.getBoundingClientRect().top < window.innerHeight)
        element.classList.add("is-visible");
      else observer.observe(element);
    }
    document.documentElement.classList.add("reveal-ready");

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
