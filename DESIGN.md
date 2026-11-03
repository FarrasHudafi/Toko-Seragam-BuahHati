# Design direction: Toko Seragam Buah Hati

Reference: layout and shopping features of hushpuppies.co.id, observed with REA (screenshots of home, collection and product pages; Shopify theme tokens from the page source). Only structure, rhythm and behaviour are reused. The brand name, logo, photos and copy are not.

## Purpose
School uniform shop. Parents pick a school level, choose colour and size, and send the order by WhatsApp. There is no online payment.

## Palette (3 core + 1 accent)
- Ink `#000000`: announcement bar, headings, primary buttons.
- Paper `#ffffff` and soft grey `#f3f4f6`: page and product-image ground.
- Body text `#374151`, muted `#6b7280`.
- Accent yellow `#ffcb00` / light `#fdda6f`: promo banners, newsletter card border, footer wave, discount pill. Used only at those moments.
- Promo red `#bd2949`: discount percentage text, "Promo" nav link, sold-out marks. Nothing else.

## Type
- Display: a high-contrast bold serif (Playfair Display 800) for page titles and section headings. It stands in for the reference's proprietary display face; chosen because the reference's identity is its heavy serif headings against plain sans body.
- Body: Helvetica / Arial stack. The reference body font is Swiss 721, a Helvetica-class face.
- Product names: small uppercase with moderate tracking on collection grids, as in the reference.

## Shape, depth, motion
- Square corners on inputs, buttons and cards. Circles only for size chips and carousel arrows (they are controls with a clear shape language).
- No shadows except the open mega menu, cart drawer and search panel (they sit above the page).
- No glass, glow or gradients. Photos are placeholders until the owner uploads images: garment line-art on soft grey, labelled.
- Motion: carousel slide change, drawer slide, hover underline. Hero autoplay pauses on hover and respects `prefers-reduced-motion`. No looping effects.

## Content rules
- Prices, discounts, sizes and product names in `src/data/catalog.ts` are sample data for layout review and must be replaced by the owner.
- The WhatsApp number in `src/lib/site.ts` is a placeholder.
- Social links render only when a URL is configured in `src/lib/site.ts`.
