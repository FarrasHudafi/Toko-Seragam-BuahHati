import Link from "next/link";

export default function BrandLink() {
  return (
    <Link className="brand" href="/" aria-label="Toko Seragam Buah Hati, beranda">
      <span className="brand-mark" aria-hidden="true">
        TS
      </span>
      <span>Toko Seragam Buah Hati</span>
    </Link>
  );
}
