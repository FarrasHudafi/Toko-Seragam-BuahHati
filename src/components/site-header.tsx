import Link from "next/link";
import BrandLink from "@/components/brand-link";
import MainNav from "@/components/main-nav";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLink />
        <MainNav />
        <Link className="header-cta" href="/kontak">
          Hubungi kami <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
