import Link from "next/link";

export default function PageShell({
  title,
  crumb,
  intro,
  children,
  narrow = false,
}: {
  title: string;
  crumb?: string;
  intro?: string;
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <div data-cc-animate="" className={`mx-auto px-4 pb-8 md:px-8 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
      <nav aria-label="Breadcrumb" className="py-4 text-sm text-muted">
        <Link href="/" className="hover:text-ink">Beranda</Link> <span className="mx-1">/</span> <span className="text-ink">{crumb ?? title}</span>
      </nav>
      <header className="pb-8 pt-6">
        <h1 className="font-display text-4xl font-black md:text-5xl">{title}</h1>
        {intro && <p className="mt-3 max-w-2xl text-base leading-relaxed">{intro}</p>}
      </header>
      {children}
    </div>
  );
}
