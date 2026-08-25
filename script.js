document.addEventListener('DOMContentLoaded', () => {
    const musicOverlay = document.getElementById('music-overlay');
    const btnPlayMusic = document.getElementById('btn-play-music');
    const bgMusic = document.getElementById('bg-music');
    const swipePlaster = document.getElementById('swipePlaster');
    const swipeContainer = document.getElementById('swipeOpenContainer');
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
            
            // Tampilkan panah kiri jika halaman kertas dalam (di luar sampul) sudah ada yang dibalik
            if (currentIndex > 0) {
                navLeft.classList.add('show');
            } else {
                navLeft.classList.remove('show');
            }
            
            // Karena sampul (page1) sudah terbuka, buku otomatis menjadi format buku terbuka (center)
            book.classList.add('open-book');
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
            
            // Efek party di halaman 3
            if (currentIndex === 1) {
                setTimeout(() => {
                    document.getElementById('page3').classList.add('party-time');
                }, 500);
            }
        }
    }

    function flipPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            flipPages[currentIndex].classList.remove('flipped');
            updateUI();
            
            // Matikan efek agar bisa diputar ulang kalau halaman dibalik lagi
            if (currentIndex === 0) {
                document.getElementById('page3').classList.remove('party-time');
            }
        }
    }

    // Event Panah Visual
    navLeft.addEventListener('click', flipPrev);
    navRight.addEventListener('click', flipNext);

    // Event Mulai Musik
    btnPlayMusic.addEventListener('click', () => {
        bgMusic.play();
        musicOverlay.classList.add('hidden');
        book.classList.add('show-book');
    });

    // Logika Swipe Plaster (Pengganti Tombol Buka)
    if (swipePlaster && swipeContainer) {
        let isDraggingPlaster = false;
        let startXPlaster = 0;
        let currentXPlaster = 0;
        let maxSlidePlaster = 0;

        function startSwipePlaster(e) {
            isDraggingPlaster = true;
            startXPlaster = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            maxSlidePlaster = swipeContainer.offsetWidth; // Menggunakan lebar container sebagai batas rotasi
            swipePlaster.style.transition = 'none';
            // Set titik poros di sebelah kanan agar seolah dikelupas dari kiri ke kanan!
            swipePlaster.style.transformOrigin = 'right center';
        }

        function moveSwipePlaster(e) {
            if (!isDraggingPlaster) return;
            let x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            currentXPlaster = x - startXPlaster;
            if (currentXPlaster < 0) currentXPlaster = 0;
            if (currentXPlaster > maxSlidePlaster) currentXPlaster = maxSlidePlaster;
            
            // Kalkulasi sudut putar (maksimal 110 derajat saat ditarik full) - lengkungan 3D
            let peelAngle = (currentXPlaster / maxSlidePlaster) * 110;
            swipePlaster.style.transform = `perspective(1000px) rotateY(${peelAngle}deg)`;
        }

        function endSwipePlaster() {
            if (!isDraggingPlaster) return;
            isDraggingPlaster = false;
            // Jika dikelupas lebih dari 40%, segel kertas terbuka sepenuhnya
            if (currentXPlaster >= maxSlidePlaster * 0.4) {
                swipePlaster.style.transition = 'transform 0.6s ease, opacity 0.5s ease';
                swipePlaster.style.transform = `perspective(1000px) rotateY(140deg)`;
                swipePlaster.style.opacity = '0';
                
                setTimeout(() => {
                    swipeContainer.style.display = 'none'; // Sembunyikan slider/segel
                    page1.classList.add('hidden');
                    document.getElementById('loadingText').style.opacity = '1';
                    
                    // Halaman 2 (loading) terbuka otomatis setelah 3 detik
                    setTimeout(() => {
                        if (currentIndex === 0 && !flipPages[0].classList.contains('flipped')) {
                            flipNext();
                        }
                    }, 3000);
                    updateUI();
                }, 400);
            } else {
                // Batal, menempel kembali dengan mulus
                swipePlaster.style.transition = 'transform 0.4s ease';
                swipePlaster.style.transform = `perspective(1000px) rotateY(0deg)`;
                currentXPlaster = 0;
            }
        }

        swipePlaster.addEventListener('mousedown', startSwipePlaster);
        swipePlaster.addEventListener('touchstart', startSwipePlaster, {passive: true});
        document.addEventListener('mousemove', moveSwipePlaster);
        document.addEventListener('touchmove', moveSwipePlaster, {passive: false});
        document.addEventListener('mouseup', endSwipePlaster);
        document.addEventListener('touchend', endSwipePlaster);
    }

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
        document.getElementById('loadingText').style.opacity = '0';
        flipPages.forEach(p => p.classList.remove('flipped'));
        currentIndex = 0;
        
        giftBox.classList.remove('open');
        finalCard.classList.remove('show-final');
        updateUI();
    });
});
