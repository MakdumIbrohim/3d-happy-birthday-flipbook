document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    let timeoutId;

    // Buka Halaman 1 -> 2 (Hal 1 cukup memudar/hilang)
    btnOpen.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        // Setelah animasi fade out (0.6s) dan waktu baca (3s) -> flip kertas Halaman 2
        timeoutId = setTimeout(() => {
            page2.classList.add('flipped');
        }, 3000);
    });

    // Reset jika halaman 3 diklik (tutup kembali)
    page3.addEventListener('click', () => {
        page1.classList.remove('hidden');
        page2.classList.remove('flipped');
        clearTimeout(timeoutId);
    });
});
