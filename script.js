/*==================== SERVICES ACCORDION ====================*/
// Efek klik untuk expand/collapse skill
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
ScrollReveal({
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: false // Animasi hanya sekali saat scroll ke bawah
});

ScrollReveal().reveal('.hero-content, .section-header', { origin: 'top' });
ScrollReveal().reveal('.hero-img', { origin: 'bottom', delay: 500 });
ScrollReveal().reveal('.stats, .services-list, .work-grid, .row, .skills-wrapper, .contact-card', { origin: 'bottom', interval: 100 });