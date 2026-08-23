document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');
    let t1, t2;

    // Buka Halaman
    btnOpen.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        // Flip kertas Halaman 2 (memperlihatkan hal 3)
        t1 = setTimeout(() => {
            page2.classList.add('flipped');
        }, 3000);

        // Flip kertas Halaman 3 (memperlihatkan hal 4) - 4 detik kemudian
        t2 = setTimeout(() => {
            page3.classList.add('flipped');
        }, 7000);
    });

    // Reset jika halaman 4 diklik (tutup kembali)
    page4.addEventListener('click', () => {
        page1.classList.remove('hidden');
        page2.classList.remove('flipped');
        page3.classList.remove('flipped');
        clearTimeout(t1);
        clearTimeout(t2);
    });
});
