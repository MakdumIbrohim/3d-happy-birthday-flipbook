document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.querySelector('.btn-open');
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    const page4 = document.getElementById('page4');
    const page5 = document.getElementById('page5');
    const page6 = document.getElementById('page6');
    let t1, t2, t3, t4;

    // Buka Halaman
    btnOpen.addEventListener('click', () => {
        page1.classList.add('hidden');
        
        t1 = setTimeout(() => { page2.classList.add('flipped'); }, 3000);
        t2 = setTimeout(() => { page3.classList.add('flipped'); }, 7000);
        t3 = setTimeout(() => { page4.classList.add('flipped'); }, 11000);
        t4 = setTimeout(() => { page5.classList.add('flipped'); }, 15000);
    });

    // Reset di halaman terakhir (6)
    page6.addEventListener('click', () => {
        page1.classList.remove('hidden');
        page2.classList.remove('flipped');
        page3.classList.remove('flipped');
        page4.classList.remove('flipped');
        page5.classList.remove('flipped');
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
    });
});
