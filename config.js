// ==========================================
// KONFIGURASI TEKS BUKU (TEMPLATE)
// ==========================================
// Silakan ubah teks di dalam tanda kutip untuk menyesuaikan isi buku.
// Jangan hapus tanda kutip ("") atau koma (,).

const CONFIG = {
    // --- PENGATURAN MUSIK & COVER AWAL ---
    // Sesuaikan musik disini
    music: {
        title: "Shape of My Heart",
        artist: "Backstreet Boys",
        btnText: "▶ Putar Lagu & Buka"
    },
    cover: {
        titleWord1: "SCRAP", // Teks baris 1 di cover (Maks. 5 huruf agar rapi)
        titleWord2: "BOOK",  // Teks baris 2 di cover (Maks. 5 huruf agar rapi)
        subtitle: "Aku punya sesuatu buat kamu...",
        sealText: "Buka Scrapbook 👉"
    },
    loading: {
        text: "sedang menyusun sesuatu untukmu"
    },
    
    // --- HALAMAN 3: SUSUNAN HURUF (Misal: Nama) ---
    // Susun kata per baris. Maksimal 5-8 huruf per baris agar tidak kepanjangan.
    page3_letters: [
        "HAPPY",
        "BIRTHDAY",
        "UBAH",
        "NAMANYA"
    ],
    
    // --- HALAMAN 4: FOTO POLAROID 1 ---
    // Sesuaikan usia disini
    page4: {
        caption: "Cie udah umur (angka) tahun nih :)"
    },
    
    // --- HALAMAN 5: PESAN SINGKAT ---
    page5: {
        message: "Hari ini adalah hari spesial seseorang yang selalu berhasil membuat hariku lebih berwarna. Terima kasih sudah jadi alasan aku tersenyum setiap hari, jadi tempat aku pulang ketika lelah, dan jadi sosok yang selalu menguatkan di setiap langkah. Semoga di ulang tahunmu ini, semua doa baik terkabul, semua impian tercapai, dan kebahagiaan selalu menyertai perjalananmu"
    },
    
    // --- HALAMAN 6: TANGGAL KOLASE FOTO ---
    // Sesuaikan tanggal disini
    page6: {
        date: "27 September 2005"
    },
    
    // --- HALAMAN 7: PESAN PANJANG ---
    page7: {
        message: "Selamat ulang tahun ya! Semoga di umur yang baru ini, kamu makin dikelilingi orang-orang baik, makin banyak alasan buat tertawa, dan makin percaya sama proses hidupmu sendiri. Aku bersyukur banget bisa mengenalmu dan jadi bagian dari cerita hidupmu sampai sejauh ini."
    },
    
    // --- HALAMAN 8: HARAPAN & DOA ---
    // Sesuaikan harapan & doa disini
    page8: {
        wishesTitle: "Semoga...",
        wishesList: [
            "selalu sehat",
            "panjang umur",
            "lancar rezekinya",
            "tambah bahagia",
            "semua impian tercapai",
            "makin sukses"
        ],
        miniPolaroidText: "Aamiin..."
    },
    
    // --- HALAMAN 9: KOTAK HADIAH (PENUTUP) ---
    page9: {
        hintText: "Ketuk kotaknya",
        finalMessage: "Terima kasih sudah menjadi bagian dari cerita indahku. Happy Birthday Sayangku ❤️",
        signature: "Dari, (nama si pemberi kado)"
    }
};
