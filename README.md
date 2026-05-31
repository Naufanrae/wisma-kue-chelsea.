# Wisma Kue Chelsea

Demo website toko kue static yang siap di-hosting. Fiturnya:

- Homepage dengan hero visual bakery
- Katalog produk dan filter kategori
- Keranjang sederhana
- Checkout dengan pilihan delivery atau pick up
- Section best seller dan lokasi toko

## Jalanin lokal

Kalau Node.js tersedia:

```bash
npm start
```

Lalu buka:

```txt
http://localhost:4173
```

Di environment Codex ini, Node yang bisa dipakai ada di:

```txt
C:\Users\THINKPAD T14s\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe
```

## Ganti data toko

- Nomor WhatsApp admin: edit link `wa.me` di `index.html`
- Nama toko dan alamat: edit teks di `index.html`
- Produk, harga, deskripsi, dan foto: edit array `products` di `script.js`
- Foto hero: ganti `assets/bakery-hero.png`

## Hosting paling gampang

### Vercel

1. Buat repo GitHub dan upload folder ini.
2. Buka Vercel, pilih `Add New Project`.
3. Import repo GitHub.
4. Framework preset pilih `Other`.
5. Build command kosongkan.
6. Output directory isi `.`.
7. Deploy.

### Netlify

1. Upload folder ini ke GitHub.
2. Buka Netlify, pilih `Add new site`.
3. Import repo.
4. Build command kosongkan.
5. Publish directory isi `.`.
6. Deploy.

### Custom domain

Setelah deploy, beli domain lalu arahkan DNS sesuai instruksi dari Vercel/Netlify. Biasanya cukup tambah `A record` atau `CNAME` yang diberikan dashboard hosting.
