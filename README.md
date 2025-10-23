# Shoe Wash API

## Deskripsi Umum Proyek
API sederhana untuk layanan daftar barang cuci sepatu. Mengelola data sepatu yang sedang dicuci dengan operasi CRUD dan filter berdasarkan status.

## Tujuan dan Fitur Utama
- **Tujuan**: Memfasilitasi pengelolaan daftar sepatu di layanan cuci sepatu.
- **Fitur Utama**:
  - Tambah sepatu baru (Create).
  - Lihat daftar sepatu (Read), dengan filter status.
  - Update informasi sepatu.
  - Hapus sepatu (Delete).

## Struktur Data
Setiap item sepatu memiliki:
- `id` (UUID): ID unik.
- `nama_pemilik` (string): Nama pemilik.
- `jenis_sepatu` (string): Jenis sepatu.
- `status` (string): Status cuci (e.g., "Diterima", "Dicuci", "Selesai").
- `tanggal_masuk` (timestamp): Tanggal masuk.
- `created_at` (timestamp): Waktu dibuat.
- `updated_at` (timestamp): Waktu diupdate.

## Alur Kerja API
1. Client mengirim request ke endpoint (e.g., POST /items).
2. Server memproses request, berinteraksi dengan Supabase.
3. Response dikirim kembali dalam format JSON.

## Teknologi yang Digunakan
- **Backend**: Node.js + Express.js.
- **Database**: Supabase (PostgreSQL).
- **Deployment**: Vercel.
- **Lainnya**: CORS, dotenv.

## Hasil Akhir
API yang dapat diakses publik via Vercel, dengan endpoint CRUD dan filter.

## Contoh Request dan Response
- **POST /items** (Create):
  - Request: `{"nama_pemilik": "John Doe", "jenis_sepatu": "Sneakers"}`
  - Response: `{"id": "uuid", "nama_pemilik": "John Doe", ...}`
- **GET /items?status=Selesai** (Read with filter):
  - Response: Array of items with status "Selesai".
- **PUT /items/:id** (Update):
  - Request: `{"status": "Dicuci"}`
  - Response: Updated item.
- **DELETE /items/:id** (Delete):
  - Response: `{"message": "Item berhasil dihapus"}`

## Langkah Instalasi dan Cara Menjalankan API
1. Clone repo: `git clone <repo-url>`.
2. Install dependencies: `npm install`.
3. Setup `.env` dengan SUPABASE_URL dan SUPABASE_ANON_KEY.
4. Jalankan lokal: `npm run dev`.
5. Deploy ke Vercel: `vercel --prod`.

## Link Deploy (Vercel)
[https://your-project.vercel.app](https://your-project.vercel.app) (ganti dengan link aktual setelah deploy).
