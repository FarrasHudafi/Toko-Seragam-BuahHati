export const SITE = {
  name: "Seragam Buah Hati",
  tagline: "Toko seragam sekolah",
  // Placeholder number. Replace with the shop's real WhatsApp number (country code, no plus or dashes).
  whatsapp: "6281234567890",
  whatsappDisplay: "0812-3456-7890",
  email: "info@seragambuahhati.id",
  address: "Jl. Raya Boulevard No. 45, Jakarta Timur",
  hours: "Senin sampai Sabtu, 08.00 - 17.00 WIB",
  freeShippingMinQty: 20,
  // Add a URL to show the matching icon in the footer. Empty entries are not rendered.
  socials: { instagram: "", facebook: "", tiktok: "" } as Record<string, string>,
};

export function waLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function formatRupiah(value: number) {
  return "Rp " + new Intl.NumberFormat("id-ID").format(value);
}
