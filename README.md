# Social Dise

Social Dise adalah sebuah platform media sosial sederhana yang terinspirasi oleh Instagram. Yang membedakan Social Dise adalah fokus kami pada keaslian konten. Setiap gambar atau video yang diunggah akan melalui proses verifikasi untuk mendeteksi manipulasi deepfake.

Postingan yang terdeteksi sebagai deepfake tidak akan dapat dipublikasikan. Selain itu, setiap postingan akan menampilkan 'Trust Score' sebagai indikator keasliannya—semakin tinggi skornya, semakin otentik konten tersebut.

## 🚀 Aplikasi Live

Anda dapat mengakses aplikasi yang telah di-deploy di:
[**https://fortunate-youthfulness-production.up.railway.app/**](https://fortunate-youthfulness-production.up.railway.app/)

## 👥 Anggota Kelompok

Proyek ini dikembangkan oleh:

* Jeffrey Chandra (221111220)
* Jouwine Liepangi (221112311)
* Kevin Lidan (221111044)

## 🧭 Petunjuk Penggunaan Aplikasi

Untuk menggunakan aplikasi, ikuti langkah-langkah berikut:

1.  **Registrasi:** Buat akun baru dengan mengunjungi halaman registrasi.
2.  **Login:** Masuk ke akun Anda menggunakan email dan password yang telah didaftarkan.
3.  **Buat Postingan:** Tekan tombol 'Create Post', unggah gambar atau video, dan tambahkan caption.
4.  **Verifikasi:** Sistem akan otomatis memproses dan memverifikasi keaslian media Anda di latar belakang.
5.  **Publikasi:** Jika media Anda lolos verifikasi deepfake, postingan akan muncul di beranda. Anda juga dapat melihat 'Trust Score' pada detail postingan tersebut.

## 🛠️ Instalasi & Menjalankan Proyek Lokal

Pastikan Anda memiliki [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) (npm), dan [Docker Desktop](https://www.docker.com/products/docker-desktop/) terinstal di mesin Anda.

### 🌐 Frontend

1.  Clone repository (jika Anda memiliki URL repo):
    ```bash
    git clone https://github.com/JeffreyChandra/SocialDise-Backend.git
    cd Proyek Frontend/
    ```

2.  Instal dependensi:
    ```bash
    npm install
    ```

3.  Buat file `.env` di root folder frontend dan isi dengan:
    ```dotenv
    VITE_API_BASE_URL=https://socialdise-backend-production.up.railway.app/ 
    ```
    *(Catatan: Ini akan mengarahkan frontend lokal Anda untuk berkomunikasi dengan backend yang sudah di-deploy. Jika Anda ingin terhubung ke backend lokal Anda, ganti URL ini menjadi `http://localhost:3000`)*

4.  Jalankan aplikasi development:
    ```bash
    npm run dev
    ```

5.  Buka `http://localhost:3001` (atau port lain yang ditampilkan di terminal) di browser Anda.

### ⚙️ Backend

1.  Clone repository (jika belum):
    ```bash
    git clone https://github.com/JeffreyChandra/SocialDise-Backend.git
    cd Proyek Backend/
    ```

2.  Buat file `.env` di root folder backend dan isi dengan kredensial berikut:
    ```dotenv
    # Sightengine API Keys
    SIGHTENGINE_API_USER=73702169
    SIGHTENGINE_API_SECRET=9usQyxFasppmjan3amJkRXEgDj8b5fPC
    
    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=dnrvpf3j0
    CLOUDINARY_API_KEY=818544434872464
    CLOUDINARY_API_SECRET=V11pHy7WPm7T-X2D4vbd2TmWxxY
    
    # Postgres DB Credentials
    POSTGRES_HOST=socialdise-socialdise-123.i.aivencloud.com
    POSTGRES_PORT=21244
    POSTGRES_USER=avnadmin
    POSTGRES_PASSWORD=AVNS_wfp2SlbB4x4NZXcy7MZ
    POSTGRES_DATABASE=socialdise
    POSTGRES_SSL_CA_PATH=/app/ca.pem
    
    # JWT Secret
    JWT_SECRET=ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890
    ```

3.  Pastikan Docker Desktop sedang berjalan di mesin Anda.

4.  Jalankan container menggunakan Docker Compose:
    ```bash
    docker compose up
    ```

5.  API backend sekarang akan berjalan di `http://localhost:3000`.

## 💻 Teknologi yang Digunakan

* **Frontend:** [React, Vite, Tailwind CSS]
* **Backend:** [NestJs]
* **Database:** PostgreSQL
* **Deteksi Deepfake:** Sightengine
* **Penyimpanan Media:** Cloudinary
* **Kontainerisasi:** Docker
* **Deployment:** Railway
