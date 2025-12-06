/*==================== SERVICES ACCORDION ====================*/
const serviceItems = document.querySelectorAll('.service-item');

serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        // Hapus kelas active dari semua item lain
        serviceItems.forEach(i => {
            if(i !== item) i.classList.remove('active');
        });
        // Toggle kelas active pada item yang diklik
        item.classList.toggle('active');
    });
});

/*==================== SCROLL REVEAL ====================*/
// Pastikan library ScrollReveal sudah dimuat sebelum script ini dijalankan
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: false 
    });

    ScrollReveal().reveal('.hero-content, .section-header', { origin: 'top' });
    ScrollReveal().reveal('.hero-img', { origin: 'bottom', delay: 500 });
    ScrollReveal().reveal('.services-list, .experience-grid, .skills-wrapper-modern, .contact-card', { origin: 'bottom', interval: 100 });
    ScrollReveal().reveal('.exp-card', { interval: 200 }); // Efek muncul satu per satu untuk kartu experience
}