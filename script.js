document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const giftBox = document.getElementById('giftBox');
    const finalCard = document.getElementById('finalCard');
    const page1 = document.getElementById('page1');
    const book = document.querySelector('.book');
    const navLeft = document.getElementById('navLeft');
    const navRight = document.getElementById('navRight');
    
    // Halaman yang bisa dibalik (Page 2 sampai 8)
    const flipPages = [
        document.getElementById('page2'), document.getElementById('page3'),
        document.getElementById('page4'), document.getElementById('page5'),
        document.getElementById('page6'), document.getElementById('page7'),
        document.getElementById('page8')
    ];
    let currentIndex = 0;

    function updateUI() {
        if (page1.classList.contains('hidden') && !finalCard.classList.contains('show-final')) {
            // Tampilkan panah kanan jika belum di akhir
            if (currentIndex < flipPages.length) navRight.classList.add('show');
            else navRight.classList.remove('show');
            
            // Tampilkan panah kiri dan geser buku ke tengah jika halaman sudah ada yang dibalik
            if (currentIndex > 0) {
                navLeft.classList.add('show');
                book.classList.add('open-book');
            } else {
                navLeft.classList.remove('show');
                book.classList.remove('open-book');
            }
        } else {
            // Sembunyikan semuanya saat cover tertutup atau foto akhir terbuka
            navLeft.classList.remove('show');
            navRight.classList.remove('show');
            book.classList.remove('open-book');
        }
    }

    function flipNext() {
        if (currentIndex < flipPages.length) {
            flipPages[currentIndex].classList.add('flipped');
            currentIndex++;
            updateUI();
        }
    }

    function flipPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            flipPages[currentIndex].classList.remove('flipped');
            updateUI();
        }
    }

    // Event Panah Visual
    navLeft.addEventListener('click', flipPrev);
    navRight.addEventListener('click', flipNext);

    // Buka cover
    btnOpen.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        // Halaman 2 (loading) terbuka otomatis setelah 3 detik
        setTimeout(() => {
            if (currentIndex === 0 && !flipPages[0].classList.contains('flipped')) {
                flipNext();
            }
        }, 3000);
        updateUI();
    });

    // Logika Swipe / Gesture (Mobile & Mouse Drag)
    let startX = 0;
    let endX = 0;

    const handleSwipe = () => {
        if (finalCard.classList.contains('show-final')) return;
        
        const diff = startX - endX;
        if (diff > 50) flipNext();
        else if (diff < -50) flipPrev();
    };

    book.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].screenX; }, { passive: true });
    book.addEventListener('touchend', (e) => { endX = e.changedTouches[0].screenX; handleSwipe(); });
    book.addEventListener('mousedown', (e) => { startX = e.screenX; });
    book.addEventListener('mouseup', (e) => { endX = e.screenX; handleSwipe(); });

    // Deteksi Keyboard
    document.addEventListener('keydown', (e) => {
        if (finalCard.classList.contains('show-final') || !page1.classList.contains('hidden')) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') flipNext();
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') flipPrev();
    });

    // Interaksi Kotak Hadiah
    giftBox.addEventListener('click', () => {
        giftBox.classList.add('open');
        
        setTimeout(() => {
            finalCard.classList.add('show-final');
            updateUI();
        }, 400);
    });

    // Reset jika halaman terakhir diklik
    finalCard.addEventListener('click', () => {
        page1.classList.remove('hidden');
        flipPages.forEach(p => p.classList.remove('flipped'));
        currentIndex = 0;
        
        giftBox.classList.remove('open');
        finalCard.classList.remove('show-final');
        updateUI();
    });
});
