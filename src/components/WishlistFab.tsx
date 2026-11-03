"use client";

import Link from "next/link";
import { HeartIcon } from "./Icons";
import { useStore } from "@/context/StoreContext";

export default function WishlistFab() {
  const { wishlist } = useStore();
  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${wishlist.length} produk`}
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-white text-ink hover:bg-soft"
    >
      <HeartIcon className="h-7 w-7" filled={wishlist.length > 0} />
      <span className="absolute bottom-2 right-2 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-white">{wishlist.length}</span>
    </Link>
  );
}
