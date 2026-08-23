document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const bookWrapper = document.querySelector('.book-wrapper');
    const paperFull = document.querySelector('.paper-full');

    // Buka buku (Flip ke Halaman 2)
    btnOpen.addEventListener('click', () => {
        bookWrapper.classList.add('flipped');
    });

    // Tutup buku kembali (Flip ke Halaman 1 jika area kertas diklik)
    paperFull.addEventListener('click', () => {
        bookWrapper.classList.remove('flipped');
    });
});
