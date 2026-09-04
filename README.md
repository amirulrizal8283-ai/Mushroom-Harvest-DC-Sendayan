# Harvest Cendawan — DC Sendayan

Live mobile dashboard untuk data harvest cendawan tiram DC Sendayan 2026.

## Sumber data
- Google Sheet: `MUSHROOM DATA HARVEST DC SENDAYAN DASHBOARD 2026`
- Sheet ID: `1LT37I49uJdoNZ4x_z6nkPbHSAlIKQ4xMSqwVO0mIM8s`
- Sharing wajib kekal: **Anyone with the link – Viewer**
- App baca terus 13 tab (`RINGKASAN TAHUNAN`, `JAN`–`DIS`) melalui Google Visualization API (JSONP), auto-refresh setiap 5 minit semasa app dibuka, ditambah refresh manual (butang status di app bar) dan refresh automatik bila tukar bulan.
- Fail `index.html` turut menyimpan salinan cache data (snapshot semasa dibina) supaya app tetap boleh dipapar walaupun sambungan live gagal.

## Fail
- `index.html` — app penuh (single file, styling + logic)
- `manifest.json` — PWA manifest (boleh "Add to Home Screen" / Install)
- `sw.js` — service worker untuk app-shell offline
- `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` — ikon app

## Kemas kini data
Staff terus isi data macam biasa dalam Google Sheet di atas. Tidak perlu upload semula fail — app baca terus dari Sheet setiap kali dibuka/refresh.

## Tukar/naik taraf sumber data
Jika struktur baris dalam Sheet berubah (contohnya tambah shedhouse baru atau susun semula lajur), kemas kini pemalar offset baris/lajur dalam fungsi `parseAnnual()` dan `parseMonth()` di dalam `index.html`.
