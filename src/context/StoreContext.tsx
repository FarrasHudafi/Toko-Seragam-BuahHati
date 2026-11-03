"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCT_BY_SLUG, type Product } from "@/data/catalog";

export interface CartLine { slug: string; color: string; size: string; qty: number }
export interface ResolvedLine extends CartLine { product: Product }

interface StoreValue {
  lines: ResolvedLine[];
  totalQty: number;
  subtotal: number;
  addToCart: (slug: string, color: string, size: string, qty?: number) => void;
  setQty: (slug: string, color: string, size: string, qty: number) => void;
  removeLine: (slug: string, color: string, size: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const Ctx = createContext<StoreValue | null>(null);
const CART_KEY = "buahhati.cart.v2";
const WISH_KEY = "buahhati.wishlist.v1";

const same = (a: CartLine, slug: string, color: string, size: string) =>
  a.slug === slug && a.color === color && a.size === size;

const readStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(() => readStorage(CART_KEY, []));
  const [wishlist, setWishlist] = useState<string[]>(() => readStorage(WISH_KEY, []));
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const addToCart = useCallback((slug: string, color: string, size: string, qty = 1) => {
    setCart((prev) => {
      const i = prev.findIndex((l) => same(l, slug, color, size));
      if (i === -1) return [...prev, { slug, color, size, qty }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
    setCartOpen(true);
  }, []);

  const setQty = useCallback((slug: string, color: string, size: string, qty: number) => {
    setCart((prev) =>
      prev.flatMap((l) => (same(l, slug, color, size) ? (qty > 0 ? [{ ...l, qty }] : []) : [l])),
    );
  }, []);

  const removeLine = useCallback((slug: string, color: string, size: string) => {
    setCart((prev) => prev.filter((l) => !same(l, slug, color, size)));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value = useMemo<StoreValue>(() => {
    const lines = cart.flatMap((l) => (PRODUCT_BY_SLUG[l.slug] ? [{ ...l, product: PRODUCT_BY_SLUG[l.slug] }] : []));
    return {
      lines,
      totalQty: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.qty * l.product.price, 0),
      addToCart,
      setQty,
      removeLine,
      clearCart: () => setCart([]),
      wishlist,
      toggleWishlist,
      cartOpen,
      setCartOpen,
      searchOpen,
      setSearchOpen,
    };
  }, [cart, wishlist, cartOpen, searchOpen, addToCart, setQty, removeLine, toggleWishlist]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used inside StoreProvider");
  return v;
}
