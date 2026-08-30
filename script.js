document.addEventListener('DOMContentLoaded', () => {

    // -- TERAPKAN KONFIGURASI TEMPLATE --
    if (typeof CONFIG !== 'undefined') {
        try {
            document.querySelector('.music-title').textContent = CONFIG.music.title;
            document.querySelector('.music-artist').textContent = CONFIG.music.artist;
            document.getElementById('btn-play-music').textContent = CONFIG.music.btnText;
            
            document.querySelector('#page1 .subtitle').textContent = CONFIG.cover.subtitle;
            document.querySelector('#page1 .seal-text').textContent = CONFIG.cover.sealText;
            
            const coverCard = document.querySelector('#page1 .scrapbook-card');
            if (coverCard) {
                const clip = coverCard.querySelector('.clip');
                coverCard.innerHTML = '';
                if(clip) coverCard.appendChild(clip);
                const colors = ['c-pink', 'c-white', 'c-blue', 'c-dark', 'c-yellow', 'c-red'];
                let cIdx = 0;
                const renderWord = (text) => {
                    const wordDiv = document.createElement('div');
                    wordDiv.className = 'word';
                    [...text].forEach((char, i) => {
                        const span = document.createElement('span');
                        const color = colors[cIdx % colors.length];
                        cIdx++;
                        const tilt = i % 2 === 0 ? 'tilt-l' : 'tilt-r';
                        span.className = 'letter ' + color + ' ' + tilt;
                        span.textContent = char;
                        wordDiv.appendChild(span);
                    });
                    return wordDiv;
                };
                coverCard.appendChild(renderWord(CONFIG.cover.titleWord1));
                coverCard.appendChild(renderWord(CONFIG.cover.titleWord2));
                
                const page3 = document.querySelector('#page3 .paper-full');
                if (page3) {
                    page3.querySelectorAll('.word').forEach(w => w.remove());
                    CONFIG.page3_letters.forEach((wordText, idx) => {
                        const wDiv = renderWord(wordText);
                        if(idx > 0) { wDiv.classList.add(idx % 2 !== 0 ? 'mt-2' : 'mt-4'); }
                        page3.appendChild(wDiv);
                    });
                }
            }

            document.getElementById('loadingText').innerHTML = CONFIG.loading.text + '<span class="dots"></span>';
            
            const p4 = document.querySelector('#page4 .polaroid-text');
            if(p4) p4.textContent = CONFIG.page4.caption;
            
            const p5 = document.querySelector('#page5 .message-text');
            if(p5) p5.textContent = CONFIG.page5.message;
            
            const p6 = document.querySelector('#page6 .center-date');
            if(p6) p6.textContent = CONFIG.page6.date;
            
            const p7 = document.querySelector('#page7 .message-text-long');
            if(p7) p7.textContent = CONFIG.page7.message;
            
            const p8Title = document.querySelector('#page8 .wishes-title');
            if(p8Title) {
                p8Title.textContent = CONFIG.page8.wishesTitle;
                const wishesList = document.querySelector('#page8 .wishes-list');
                wishesList.innerHTML = '';
                CONFIG.page8.wishesList.forEach(wish => {
                    const li = document.createElement('li');
                    li.innerHTML = '<span class="bullet">-</span> ' + wish;
                    wishesList.appendChild(li);
                });
                const miniPol = document.querySelector('#page8 .polaroid-text');
                if (miniPol) miniPol.textContent = CONFIG.page8.miniPolaroidText;
            }
            
            const p9 = document.getElementById('giftText');
            if (p9) {
                p9.textContent = CONFIG.page9.hintText;
                const page9Texts = document.querySelectorAll('#page9 .paper-text');
                if (page9Texts.length > 1) {
                    page9Texts[1].textContent = CONFIG.page9.finalMessage;
                    if (page9Texts.length > 2) page9Texts[2].textContent = CONFIG.page9.signature;
                }
            }
        } catch(e) { console.error("Gagal memuat CONFIG", e); }
    }
    // -- AKHIR KONFIGURASI TEMPLATE --


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
        swipePlaster.addEventListener('touchstart', startSwipePlaster, { passive: true });
        document.addEventListener('mousemove', moveSwipePlaster);
        document.addEventListener('touchmove', moveSwipePlaster, { passive: false });
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
