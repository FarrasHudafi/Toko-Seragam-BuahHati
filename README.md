# Toko-Seragam-BuahHati

Tugas akhir PPPL membuat webstore online seragam

## Teknologi

- [Next.js](https://nextjs.org) 16 (App Router) dan React 19
- TypeScript
- Tailwind CSS 4 dan CSS global (`src/app/globals.css`)
- ESLint dan Prettier

## Menjalankan proyek

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Script

| Perintah               | Fungsi                                 |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Menjalankan server development         |
| `npm run build`        | Membuat build production               |
| `npm run start`        | Menjalankan hasil build production     |
| `npm run lint`         | Memeriksa kode dengan ESLint           |
| `npm run typecheck`    | Memeriksa tipe TypeScript              |
| `npm run format`       | Merapikan format kode dengan Prettier  |
| `npm run format:check` | Mengecek format kode tanpa mengubahnya |

## Struktur folder

```
src/
├── app/            # Route dan halaman (App Router)
│   ├── produk/     # Katalog produk
│   ├── ukuran/     # Panduan ukuran
│   ├── tentang/    # Tentang toko
│   └── kontak/     # Kontak toko
├── components/     # Komponen yang dipakai bersama
└── lib/            # Data katalog dan fungsi bantu
```

Data produk di `src/lib/catalog.ts` masih berupa data contoh, bukan data resmi toko.
