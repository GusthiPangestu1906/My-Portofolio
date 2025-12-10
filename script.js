/* =========================================
   1. INITIALIZATION & UTILS
   ========================================= */

// Inisialisasi AOS (Animate On Scroll) & Swiper
window.addEventListener('load', function() {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }

    // --- SWIPER INITIALIZATION ---
    if (typeof Swiper !== 'undefined') {
        // Portfolio Carousel
        var portfolioSwiper = new Swiper(".portfolioSwiper", {
            slidesPerView: 1, // Default Mobile
            spaceBetween: 30,
            loop: true, // Infinite loop
            grabCursor: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

        // Skills Carousel
        var swiper = new Swiper('.skillsSwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 24,
            coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 140,
                modifier: 1.1,
                slideShadows: false,
            },
            autoplay: {
                delay: 2800,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.skillsSwiper .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
        });

        // Inject styles to emulate the centered large-card carousel for Skills
        (function(){
            var css = `
            .skillsSwiper { padding-bottom: 2.5rem; }
            .skillsSwiper .swiper-slide { width: 260px !important; }
            @media (min-width: 640px) { .skillsSwiper .swiper-slide { width: 300px !important; } }
            @media (min-width: 1024px) { .skillsSwiper .swiper-slide { width: 340px !important; } }

            .skillsSwiper .swiper-slide .group { border-radius: 1rem; overflow: hidden; }
            .skillsSwiper .swiper-slide { opacity: 0.7; transform-origin: center center; transition: transform 300ms ease, opacity 300ms ease; }
            .skillsSwiper .swiper-slide-active { transform: scale(1.06) translateY(-10px) !important; opacity: 1; z-index: 50; }
            .skillsSwiper .swiper-slide-next, .skillsSwiper .swiper-slide-prev { opacity: 0.9; }
            .skillsSwiper .swiper-pagination { bottom: 0.5rem; }

            /* Active slide glow: make center card glow automatically */
            .skillsSwiper .swiper-slide-active .group > .-inset-0.5 {
                opacity: 1 !important;
                filter: blur(14px);
                transition: opacity 300ms ease, filter 300ms ease;
            }

            .skillsSwiper .swiper-slide-active .group {
                box-shadow: 0 20px 50px rgba(135,80,247,0.14), 0 0 40px rgba(99,102,241,0.06) inset;
                border: 1px solid rgba(135,80,247,0.08);
                transition: box-shadow 300ms ease, border-color 300ms ease, transform 300ms ease;
            }

            .skillsSwiper .swiper-slide-active .group .h-24.w-24 {
                box-shadow: 0 0 30px rgba(135,80,247,0.32), 0 6px 20px rgba(0,0,0,0.25);
                transform: translateZ(0) scale(1.02);
                transition: box-shadow 300ms ease, transform 300ms ease;
            }

            /* Slightly boost icon brightness on active */
            .skillsSwiper .swiper-slide-active .group img {
                filter: none !important;
                transform: scale(1.08);
                transition: transform 300ms ease, filter 300ms ease;
            }
            `;
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css));
            document.head.appendChild(style);
        })();

        // Experience Carousel
        var experienceSwiper = new Swiper(".experienceSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 4500, // Sedikit berbeda agar tidak berbarengan
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

    } else {
        console.error("Swiper JS is not loaded yet.");
    }
});

/* =========================================
   2. MOBILE MENU & NAVIGATION
   ========================================= */
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('mobile-menu-overlay');

if (btn && menu && overlay) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        overlay.classList.toggle('show');
        
        // Animasi icon menu
        const icon = btn.querySelector('i');
        if(menu.classList.contains('hidden')) {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        } else {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        menu.classList.add('hidden');
        overlay.classList.remove('show');
        const icon = btn.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
}

// Close menu when clicking link
document.querySelectorAll('#mobile-menu a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (menu && overlay && btn) {
            menu.classList.add('hidden');
            overlay.classList.remove('show');
            const icon = btn.querySelector('i');
            if(icon) {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* =========================================
   3. DYNAMIC NAVBAR SCROLL
   ========================================= */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
        header.style.background = 'rgba(9, 9, 16, 0.95)';
        header.style.padding = '10px 0';
    } else {
        header.classList.remove('shadow-lg');
        header.style.background = 'rgba(9, 9, 16, 0.8)';
        header.style.padding = '16px 0'; 
    }
});

/* =========================================
   4. TYPEWRITER EFFECT (Efek Mengetik)
   ========================================= */
const typeWriterElement = document.querySelector('.typewriter');
const words = ["LCD Operator", "Graphic Designer", "Tech Enthusiast", "UI/UX Developer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    if (!typeWriterElement) return;

    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; 
    } else {
        typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeEffect);

/* =========================================
   5. 3D TILT EFFECT ON CARDS (Efek Miring 3D)
   ========================================= */
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
        card.style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

/* =========================================
   6. MOUSE GLOW FOLLOWER (Cahaya Kursor)
   ========================================= */
if (!document.querySelector('.mouse-glow')) {
    const glow = document.createElement('div');
    glow.classList.add('mouse-glow');
    document.body.appendChild(glow);

    glow.style.position = 'fixed';
    glow.style.width = '300px';
    glow.style.height = '300px';
    glow.style.background = 'radial-gradient(circle, rgba(135, 80, 247, 0.15) 0%, rgba(135, 80, 247, 0) 70%)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none'; 
    glow.style.zIndex = '9999';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.transition = 'opacity 0.3s ease';
    glow.style.mixBlendMode = 'screen';
    
    if(window.innerWidth < 768) {
        glow.style.display = 'none';
    }

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* =========================================
   7. SANGAR LOADING SCREEN LOGIC
   ========================================= */
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const percentageText = document.getElementById('loading-percentage');
const statusText = document.getElementById('loader-status');

const loadingStatuses = [
    "> INITIALIZING KERNEL...",
    "> LOADING ASSETS...",
    "> COMPILING SHADERS...",
    "> ESTABLISHING CONNECTION...",
    "> DECRYPTING DATA...",
    "> ACCESS GRANTED"
];

let width = 0;
// Only run if loading screen elements exist
if (loadingScreen && progressBar) {
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // Final Status
            if(statusText) statusText.innerText = "> SYSTEM READY";
            if(percentageText) percentageText.innerText = "100%";
            
            // Fade Out
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }, 500);

        } else {
            width++;
            if(progressBar) progressBar.style.width = width + '%';
            if(percentageText) percentageText.innerText = width + '%';

            // Change text based on width
            if (width < 30 && statusText) statusText.innerText = loadingStatuses[0];
            else if (width < 50 && statusText) statusText.innerText = loadingStatuses[1];
            else if (width < 70 && statusText) statusText.innerText = loadingStatuses[2];
            else if (width < 90 && statusText) statusText.innerText = loadingStatuses[4];
            else if (statusText) statusText.innerText = loadingStatuses[5];
        }
    }, 30); // Speed of loading
}