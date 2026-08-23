document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');
    const page5 = document.getElementById('page5');
    let t1, t2, t3;

    // Buka Halaman
    btnOpen.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        // Flip kertas Halaman 2 -> tampilkan Hal 3 (3s)
        t1 = setTimeout(() => {
            page2.classList.add('flipped');
        }, 3000);

        // Flip kertas Halaman 3 -> tampilkan Hal 4 (7s)
        t2 = setTimeout(() => {
            page3.classList.add('flipped');
        }, 7000);

        // Flip kertas Halaman 4 -> tampilkan Hal 5 (11s)
        t3 = setTimeout(() => {
            page4.classList.add('flipped');
        }, 11000);
    });

    // Reset jika halaman 5 (terakhir) diklik (tutup kembali ke awal)
    page5.addEventListener('click', () => {
        page1.classList.remove('hidden');
        page2.classList.remove('flipped');
        page3.classList.remove('flipped');
        page4.classList.remove('flipped');
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    });
});
