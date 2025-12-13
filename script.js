/* =========================================
   1. INITIALIZATION & UTILS
   ========================================= */

// Variabel Global untuk menampung instance
let portfolioSwiper, skillsSwiper, servicesSwiper, aboutSwiper;

// Fungsi inisialisasi Swiper (Dipanggil saat siap)
function initSwipers() {
    if (typeof Swiper !== 'undefined') {
        // Portfolio Carousel
        portfolioSwiper = new Swiper(".portfolioSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            observer: true, // PENTING: Agar update saat hidden -> visible
            observeParents: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            },
        });

        // Skills Carousel
        skillsSwiper = new Swiper('.skillsSwiper', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            spaceBetween: 24,
            observer: true,
            observeParents: true,
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

        // Experience Carousel
        new Swiper(".experienceSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 4500,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
            },
        });

        // Services Carousel
        servicesSwiper = new Swiper(".servicesSwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            effect: 'coverflow',
            observer: true,
            observeParents: true,
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    effect: 'slide',
                },
            },
        });

        // About Carousel
        aboutSwiper = new Swiper(".aboutSwiper", {
            slidesPerView: 1,
            spaceBetween: 50,
            loop: true,
            speed: 800,
            effect: 'fade',
            observer: true,
            observeParents: true,
            fadeEffect: { crossFade: true },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
        });
    }
}

// Inject CSS dinamis untuk Swiper Skills
(function(){
    var css = `
    .skillsSwiper { padding-bottom: 2.5rem; }
    .skillsSwiper .swiper-slide { width: 260px !important; }
    @media (min-width: 640px) { .skillsSwiper .swiper-slide { width: 300px !important; } }
    @media (min-width: 1024px) { .skillsSwiper .swiper-slide { width: 340px !important; } }
    .skillsSwiper .swiper-slide .group { border-radius: 1rem; overflow: hidden; }
    .skillsSwiper .swiper-slide { opacity: 0.7; transform-origin: center center; transition: transform 300ms ease, opacity 300ms ease; }
    .skillsSwiper .swiper-slide-active { transform: scale(1.06) translateY(-10px) !important; opacity: 1; z-index: 50; }
    /* Optimasi Mobile: Matikan shadow berat di HP */
    @media (max-width: 768px) {
        .skillsSwiper .swiper-slide-active .group { box-shadow: none !important; }
    }
    `;
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
})();


/* =========================================
   2. SMART LOADING SCREEN LOGIC
   ========================================= */
const loadingScreen = document.getElementById('loading-screen');
const percentageText = document.getElementById('loading-percentage');
const statusText = document.getElementById('loader-status');
const progressBar = document.getElementById('progress-bar');

const loadingStatuses = [
    "> INITIALIZING KERNEL...",
    "> LOADING ASSETS...",
    "> COMPILING SHADERS...",
    "> OPTIMIZING FOR MOBILE...",
    "> DECRYPTING DATA...",
    "> ACCESS GRANTED"
];

let width = 0;
let isPageLoaded = false; // Flag penanda halaman sudah load penuh

// Event saat semua aset (gambar, css, js) benar-benar selesai dimuat
window.addEventListener('load', () => {
    isPageLoaded = true;
    initSwipers(); // Inisialisasi slider di background
    initEmailProtection(); // Inisialisasi email
});

if (loadingScreen && percentageText && progressBar) {
    // Kecepatan loading diperlambat (50ms) agar sempat load aset
    const interval = setInterval(() => {
        
        // Logika Smart Loading:
        // Jika loading bar sudah 99% TAPI halaman belum selesai load (isPageLoaded = false),
        // maka tahan di 99% ("Menunggu...").
        // Jika halaman sudah load, baru gass ke 100%.
        
        if (width >= 99 && !isPageLoaded) {
            // Tahan di 99%
            if(statusText) statusText.innerText = "> WAITING FOR ASSETS...";
            return; 
        }

        if (width >= 100) {
            clearInterval(interval);
            
            // Final Status
            if(statusText) statusText.innerText = "> SYSTEM READY";
            if(percentageText) percentageText.innerText = "100%";
            
            // --- TRIGGER ANIMASI KELUAR ---
            setTimeout(() => {
                loadingScreen.classList.add('loading-finished');
                loadingScreen.classList.add('bg-transparent'); 
                
                // Mulai AOS (Scroll Animation) hanya setelah loading selesai
                // Ini mencegah animasi berjalan saat layar masih hitam
                if (typeof AOS !== 'undefined') {
                    AOS.init({
                        once: true,
                        offset: 50, // Offset lebih kecil di mobile biar cepat muncul
                        duration: 800,
                        easing: 'ease-out-cubic',
                    });
                }
            }, 500); 

            // Hapus elemen dari DOM
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 2000); 

        } else {
            width++;
            progressBar.style.width = width + '%';
            if(percentageText) percentageText.innerText = width + '%';

            // Update status text
            if (width % 15 === 0 && width < 90) {
                 const randIdx = Math.floor(Math.random() * (loadingStatuses.length - 1));
                 if(statusText) statusText.innerText = loadingStatuses[randIdx];
            }
        }
    }, 50); // Diperlambat dari 25ms ke 50ms
}


/* =========================================
   3. MOBILE MENU & NAVIGATION
   ========================================= */
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const overlay = document.getElementById('mobile-menu-overlay');

if (btn && menu && overlay) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        overlay.classList.toggle('show');
        
        const icon = btn.querySelector('i');
        if(menu.classList.contains('hidden')) {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        } else {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        }
    });

    overlay.addEventListener('click', () => {
        menu.classList.add('hidden');
        overlay.classList.remove('show');
        const icon = btn.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
}

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
    });
});

/* =========================================
   4. DYNAMIC NAVBAR SCROLL
   ========================================= */
const header = document.querySelector('header');
// Gunakan requestAnimationFrame untuk performa scroll yang lebih ringan
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScrollY > 50) {
                header.classList.add('shadow-lg');
                header.style.background = 'rgba(9, 9, 16, 0.95)';
                header.style.padding = '10px 0';
            } else {
                header.classList.remove('shadow-lg');
                header.style.background = 'rgba(9, 9, 16, 0.8)';
                header.style.padding = '16px 0'; 
            }
            ticking = false;
        });
        ticking = true;
    }
});

/* =========================================
   5. UTILS (Typewriter & Tilt)
   ========================================= */
// Typewriter - Disable di HP jika perlu, tapi ringan jadi biarkan saja
const typeWriterElement = document.querySelector('.typewriter');

// --- REVISI: Menggunakan LET agar bisa diubah saat translate ---
let words = ["LCD Operator", "Graphic Designer", "Tech Enthusiast", "UI/UX Developer"];

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

// 3D Tilt - MATIKAN DI MOBILE (Performance Heavy)
if (window.innerWidth > 768) {
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
}

// Mouse Glow - MATIKAN DI MOBILE
if (window.innerWidth > 768 && !document.querySelector('.mouse-glow')) {
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

    let mouseX = 0; let mouseY = 0; let glowX = 0; let glowY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; glow.style.opacity = '1'; });
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
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
   WEBGL FLUID CURSOR TRAIL (DESKTOP ONLY)
   ========================================= */
// WebGL sangat berat di HP low-end, disable total untuk mobile demi scroll mulus
const canvas = document.getElementById('cursor-canvas');
const gl = canvas ? canvas.getContext('webgl') : null;

if (gl && window.innerWidth > 1024) { // Hanya aktif di layar besar (>1024px)
    
    let mouse = { x: 0, y: 0 };
    let points = [];
    const maxPoints = 50; 

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const vsSource = `
        attribute vec2 a_position;
        attribute float a_size;
        attribute vec4 a_color;
        varying vec4 v_color;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            gl_PointSize = a_size;
            v_color = a_color;
        }
    `;

    const fsSource = `
        precision mediump float;
        varying vec4 v_color;
        void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            if(length(coord) > 0.5) discard;
            gl_FragColor = v_color;
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const sizeLoc = gl.getAttribLocation(program, "a_size");
    const colorLoc = gl.getAttribLocation(program, "a_color");

    window.addEventListener('mousemove', e => {
        const x = (e.clientX / canvas.width) * 2 - 1;
        const y = -((e.clientY / canvas.height) * 2 - 1); 
        mouse = { x, y };
        points.push({ x: x, y: y, age: 0, r: Math.random(), g: 0.5, b: 1.0 });
    });

    function render() {
        gl.clearColor(0, 0, 0, 0); 
        gl.clear(gl.COLOR_BUFFER_BIT);

        if (points.length > maxPoints) points.shift();
        
        const positions = [];
        const sizes = [];
        const colors = [];

        points.forEach((p) => {
            p.age += 0.02; 
            const life = 1.0 - p.age; 

            if (life > 0) {
                positions.push(p.x, p.y);
                sizes.push(30.0 * life); 
                colors.push(0.5, 0.2, 1.0, life); 
            }
        });

        points = points.filter(p => p.age < 1.0);

        if (positions.length > 0) {
            const posBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionLoc);
            gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

            const sizeBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(sizeLoc);
            gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);

            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(colorLoc);
            gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            
            gl.drawArrays(gl.POINTS, 0, positions.length / 2);
        }
        requestAnimationFrame(render);
    }
    render();
}

/* =========================================
   EMAIL ENCRYPTION LOGIC
   ========================================= */
function initEmailProtection() {
    const emailLink = document.getElementById('email-link');
    const emailText = document.getElementById('email-text');
    
    if (emailLink && emailText) {
        emailLink.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'javascript:void(0)') {
                e.preventDefault();
                const user = this.getAttribute('data-user');
                const domain = this.getAttribute('data-domain');
                const email = `${user}@${domain}`;
                this.setAttribute('href', `mailto:${email}`);
                emailText.innerText = email;
                emailText.classList.remove('truncate'); 
                window.location.href = `mailto:${email}`;
            }
        });
    }
}

/* =========================================
   6. LANGUAGE TRANSLATION LOGIC
   ========================================= */

// 1. Kamus Bahasa (Dictionary)
const translations = {
    id: {
        // Navbar
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Services",
        nav_skills: "Skills",
        nav_exp: "Experience",
        nav_projects: "Projects",
        nav_contact: "Contact",
        btn_talk: "Let's Talk",

        // Hero Section
        widget_projects_label: "Projects Completed",
        widget_projects_val: "15+ Events Succesfull",
        widget_role_label: "Current Role",
        widget_role_val: "LCD Operator",
        widget_exp_label: "Experience",
        widget_exp_val: "2+ Years Active",
        widget_skill_label: "Skill Proficiency",
        hero_badge: "Open for Collaboration",
        hero_greeting: "Hi, I'm",
        hero_desc: "Operator LCD Kreatif & Desainer Grafis yang menciptakan pengalaman visual modern untuk acara dan aset branding digital yang kuat.",
        btn_start: "Mulai Proyek",
        btn_cv: "Unduh CV",

        // About Section
        about_creative_badge: "CREATIVE SIDE",
        about_creative_title: "Visual Creator & <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500\">Event Specialist</span>",
        about_creative_desc: "Di balik layar, saya adalah seorang kreator yang menghidupkan suasana acara. Fokus saya adalah menciptakan pengalaman visual yang imersif melalui desain grafis dan manajemen panggung digital.",
        about_creative_li1: "Spesialis <strong>Desain Grafis & Branding</strong> untuk kebutuhan event.",
        about_creative_li2: "Expert <strong>Operator OBS Studio</strong> untuk live production & visual jockey.",
        
        about_tech_badge: "TECHNICAL SIDE",
        about_tech_title: "Mahasiswa PENS <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400\">Informatics Engineering</span>",
        about_tech_desc: "Sebagai mahasiswa Teknik Informatika di PENS, saya mendalami pengembangan perangkat lunak dan teknologi web. Saya menggabungkan logika pemrograman dengan estetika desain.",
        about_tech_li1: "Berpengalaman dalam <strong>Web Development</strong> (Front-end & UI/UX).",
        about_tech_li2: "Memahami konsep <strong>Database & Backend Logic</strong> untuk aplikasi skala kecil-menengah.",

        // Services Section
        services_title: "Layanan Saya",
        services_subtitle: "Solusi teknis dan kreatif untuk kebutuhan acara dan branding Anda.",
        
        serv_lcd_title: "Operator LCD & OBS",
        serv_lcd_desc: "Manajemen visual acara live yang profesional untuk kelancaran presentasi dan multimedia.",
        serv_lcd_li1: "<i class='bx bx-check text-primary'></i> Manajemen Scene & Transisi OBS",
        serv_lcd_li2: "<i class='bx bx-check text-primary'></i> Playback Video & Presentasi",
        serv_lcd_li3: "<i class='bx bx-check text-primary'></i> Setup Layar LED/Proyektor",

        serv_gd_title: "Graphic Design",
        serv_gd_desc: "Desain visual komunikatif untuk memperkuat branding acara dan organisasi Anda.",
        serv_gd_li1: "<i class='bx bx-check text-pink-400'></i> Social Media Feeds & Story",
        serv_gd_li2: "<i class='bx bx-check text-pink-400'></i> Poster, Banner & Flyer Event",
        serv_gd_li3: "<i class='bx bx-check text-pink-400'></i> Desain Kebutuhan Organisasi (PDD)",

        // Skills Section
        skills_title: "Tools",
        skills_subtitle: "Rekam jejak dalam manajemen event, desain visual, dan kompetisi.",
        badge_expert: "EXPERT",
        badge_intermediate: "INTERMEDIATE",
        badge_advanced: "ADVANCED",

        // Experience Section
        exp_title: "Pengalaman Profesional",
        exp_subtitle: "Rekam jejak dalam manajemen event, desain visual, dan kompetisi.",
        
        exp_itds_role: "Creative Design",
        exp_itds_desc: "Bertanggung jawab penuh atas seluruh desain identitas visual termasuk poster, banner, dan materi promosi digital.",
        
        exp_mbex_role: "Main Operator Visual",
        exp_mbex_desc: "Operator utama dalam acara Minat Bakat Expo 2025 bertugas dalam mengelola transisi visual dan display menggunakan OBS.",
        
        exp_figma_role: "UI/UX Design",
        exp_figma_desc: "Mempelajari semua dasar teori dalam membuat desain UI/UX beserta penerapannya menggunakan figma.",
        
        exp_digiup_role: "Digital Graphic Designer",
        exp_digiup_desc: "Mempelajari semua dasar teori Graphic Design beserta penerapannya menggunakan Photoshop.",
        
        exp_bnsp_role: "Junior Graphic Designer",
        exp_bnsp_desc: "Sertifikasi bersama dengan BNSP setelah menyelesaikan kelas Digital Graphic Designer menggunakan Photoshop.",
        
        exp_gla_role: "Intro to Graphic Design",
        exp_gla_desc: "Mempelajari dasar-dasar Graphic Design beserta penerapannya dalam Photoshop.",

        // Portfolio Section
        port_title: "Dokumentasi & Portofolio",
        port_subtitle: "Arsip proyek, kegiatan, dan sertifikasi.",
        
        port_pmcc_role: "AS JUDGE OF",
        port_pmcc_desc: "Panitia kegiatan turnamen esports resmi PUBG Mobile yang khusus diadakan untuk mahasiswa di berbagai universitas",
        
        port_pekan_role: "AS PDD & OPERATOR OF",
        port_pekan_desc: "Panitia Kegiatan Pekan Komunitas Teknologi dan Olahraga yang diselenggarakan HIMIT PENS berupa pengenalan komunitas yang ada dalam HIMIT PENS kepada MABA angkatan 25",
        
        port_mbex_role: "AS PDD & OPERATOR OF",
        port_mbex_desc: "Kegiatan Expo yang diselenggarakan oleh LMB PENS berupa pengenalan UKM (Unit Kegiatan Mahasiswa) / komunitas yang ada dalam PENS kepada MABA angkatan 25.",
        
        port_lmb_role: "AS PENANGGUNG JAWAB OF",
        port_lmb_desc: "Kegiatan Pelatihan Desain yang diselenggarakan oleh LMB PENS berupa pembelajaran terkait pembuatan desain mulai dari teori hingga penerapannya menggunakan tools canva.",
        
        port_itds_role: "AS PDD OF",
        port_itds_desc: "Kegiatan pengenalan Program Studi IT PENS yang diselenggarakan oleh HIMIT PENS berupa pengenalan terkait mata kuliah dan etika mulai dari teori hingga penerapannya dalam kehidupan perkuliahan.",
        
        port_atfest_role: "AS PDD OF",
        port_atfest_desc: "Kegiatan Expo yang diselenggarakan oleh PENS berupa pengenalan produk mahasiswa IT yang ada dalam PENS kepada khalayak umum.",
        
        port_elta_role: "AS OPERATOR OF",
        port_elta_desc: "Kegiatan Perlombaan yang diselenggarakan oleh LMB PENS berupa perlombaan dalam berbagai bidang dengan berkolaborasi bersama dengan UKM yang ada dalam PENS.",
        
        port_staff_role: "AS STAFF OF",
        port_staff_desc: "Sewaktu Menjadi Staff Muda dalam departemen MEDFO LMB PENS tahun periode 2024 - 2025 kenangan bersama Staff Ahli.",

        // Contact Section
        contact_title: "Siap Kolaborasi?",
        contact_subtitle: "Diskusikan kebutuhan Operator LCD atau Desain Grafis untuk sukseskan acara Anda.",
        contact_email_label: "Email Me",
        contact_linkedin_label: "Connect",
        footer_loc: "Surabaya, Indonesia",

        // Typewriter Words (Array khusus)
        typewriter_words: ["LCD Operator", "Graphic Designer", "Tech Enthusiast", "UI/UX Developer"]
    },
    en: {
        // Navbar
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Services",
        nav_skills: "Skills",
        nav_exp: "Experience",
        nav_projects: "Projects",
        nav_contact: "Contact",
        btn_talk: "Let's Talk",

        // Hero Section
        widget_projects_label: "Projects Completed",
        widget_projects_val: "15+ Events Succesfull",
        widget_role_label: "Current Role",
        widget_role_val: "LCD Operator",
        widget_exp_label: "Experience",
        widget_exp_val: "2+ Years Active",
        widget_skill_label: "Skill Proficiency",
        hero_badge: "Open for Collaboration",
        hero_greeting: "Hi, I'm",
        hero_desc: "Creative LCD Operator & Graphic Designer crafting modern visual experiences for events and robust digital branding assets.",
        btn_start: "Start a Project",
        btn_cv: "Download CV",

        // About Section
        about_creative_badge: "CREATIVE SIDE",
        about_creative_title: "Visual Creator & <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500\">Event Specialist</span>",
        about_creative_desc: "Behind the scenes, I am a creator who brings event atmospheres to life. My focus is on creating immersive visual experiences through graphic design and digital stage management.",
        about_creative_li1: "Specialist in <strong>Graphic Design & Branding</strong> for event needs.",
        about_creative_li2: "Expert <strong>OBS Studio Operator</strong> for live production & visual jockey.",
        
        about_tech_badge: "TECHNICAL SIDE",
        about_tech_title: "PENS Student <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400\">Informatics Engineering</span>",
        about_tech_desc: "As an Informatics Engineering student at PENS, I delve into software development and web technology. I combine programming logic with design aesthetics.",
        about_tech_li1: "Experienced in <strong>Web Development</strong> (Front-end & UI/UX).",
        about_tech_li2: "Understanding <strong>Database & Backend Logic</strong> concepts for small-to-medium scale apps.",

        // Services Section
        services_title: "My Services",
        services_subtitle: "Technical and creative solutions for your event and branding needs.",
        
        serv_lcd_title: "LCD & OBS Operator",
        serv_lcd_desc: "Professional live event visual management for seamless presentations and multimedia.",
        serv_lcd_li1: "<i class='bx bx-check text-primary'></i> OBS Scene & Transition Management",
        serv_lcd_li2: "<i class='bx bx-check text-primary'></i> Video Playback & Presentation",
        serv_lcd_li3: "<i class='bx bx-check text-primary'></i> LED/Projector Screen Setup",

        serv_gd_title: "Graphic Design",
        serv_gd_desc: "Communicative visual design to strengthen your event and organization branding.",
        serv_gd_li1: "<i class='bx bx-check text-pink-400'></i> Social Media Feeds & Story",
        serv_gd_li2: "<i class='bx bx-check text-pink-400'></i> Event Posters, Banners & Flyers",
        serv_gd_li3: "<i class='bx bx-check text-pink-400'></i> Organizational Design Needs (PDD)",

        // Skills Section
        skills_title: "Tools",
        skills_subtitle: "Track record in event management, visual design, and competitions.",
        badge_expert: "EXPERT",
        badge_intermediate: "INTERMEDIATE",
        badge_advanced: "ADVANCED",

        // Experience Section
        exp_title: "Professional Experience",
        exp_subtitle: "Track record in event management, visual design, and competitions.",
        
        exp_itds_role: "Creative Design",
        exp_itds_desc: "Fully responsible for all visual identity designs including posters, banners, and digital promotional materials.",
        
        exp_mbex_role: "Main Visual Operator",
        exp_mbex_desc: "Main operator in the Minat Bakat Expo 2025 event, tasked with managing visual transitions and displays using OBS.",
        
        exp_figma_role: "UI/UX Design",
        exp_figma_desc: "Learned all basic theories in creating UI/UX designs along with their application using Figma.",
        
        exp_digiup_role: "Digital Graphic Designer",
        exp_digiup_desc: "Learned all basic theories of Graphic Design along with their application using Photoshop.",
        
        exp_bnsp_role: "Junior Graphic Designer",
        exp_bnsp_desc: "Certification with BNSP after completing the Digital Graphic Designer class using Photoshop.",
        
        exp_gla_role: "Intro to Graphic Design",
        exp_gla_desc: "Learned the basics of Graphic Design along with their application in Photoshop.",

        // Portfolio Section
        port_title: "Documentation & Portfolio",
        port_subtitle: "Archive of projects, activities, and certifications.",
        
        port_pmcc_role: "AS JUDGE OF",
        port_pmcc_desc: "Committee for the official PUBG Mobile esports tournament specifically held for students in various universities",
        
        port_pekan_role: "AS PDD & OPERATOR OF",
        port_pekan_desc: "Committee for the Technology and Sports Community Week organized by HIMIT PENS involving the introduction of communities within HIMIT PENS to batch 25 freshmen",
        
        port_mbex_role: "AS PDD & OPERATOR OF",
        port_mbex_desc: "Expo activity organized by LMB PENS involving the introduction of UKM (Student Activity Units) / communities within PENS to batch 25 freshmen.",
        
        port_lmb_role: "AS PERSON IN CHARGE OF",
        port_lmb_desc: "Design Training activity organized by LMB PENS involving learning related to design creation from theory to application using Canva tools.",
        
        port_itds_role: "AS PDD OF",
        port_itds_desc: "Introduction activity for the IT PENS Study Program organized by HIMIT PENS involving introduction related to courses and ethics from theory to application in college life.",
        
        port_atfest_role: "AS PDD OF",
        port_atfest_desc: "Expo activity organized by PENS involving the introduction of IT student products within PENS to the general public.",
        
        port_elta_role: "AS OPERATOR OF",
        port_elta_desc: "Competition activity organized by LMB PENS involving competitions in various fields in collaboration with UKMs within PENS.",
        
        port_staff_role: "AS STAFF OF",
        port_staff_desc: "During my time as Junior Staff in the MEDFO department of LMB PENS for the 2024 - 2025 period, memories with Expert Staff.",

        // Contact Section
        contact_title: "Ready to Collaborate?",
        contact_subtitle: "Discuss your LCD Operator or Graphic Design needs to make your event a success.",
        contact_email_label: "Email Me",
        contact_linkedin_label: "Connect",
        footer_loc: "Surabaya, Indonesia",

        // Typewriter Words
        typewriter_words: ["LCD Operator", "Graphic Designer", "Tech Enthusiast", "UI/UX Developer"]
    }
};

// 2. State Bahasa Saat Ini (Default ID)
let currentLang = 'id'; 

// 3. Fungsi Toggle (Versi Matematika Presisi)
function toggleLanguage() {
    // Switch state
    currentLang = currentLang === 'id' ? 'en' : 'id';
    
    // Update Konten Website
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    // --- LOGIKA ANIMASI PRESISI ---
    const slider = document.getElementById('lang-slider');
    const labelId = document.getElementById('label-id');
    const labelEn = document.getElementById('label-en');

    if (slider && labelId && labelEn) {
        if (currentLang === 'en') {
            // Posisi EN: Geser sejauh 100% dari lebar slidernya sendiri
            // Ini menjamin posisi simetris sempurna tanpa hitungan pixel manual
            slider.style.transform = 'translateX(100%)'; 
            
            // Update Warna Teks
            labelId.classList.remove('text-white');
            labelId.classList.add('text-gray-500');
            
            labelEn.classList.remove('text-gray-500');
            labelEn.classList.add('text-white');
        } else {
            // Posisi ID: Geser balik ke 0
            slider.style.transform = 'translateX(0)';
            
            // Update Warna Teks
            labelEn.classList.remove('text-white');
            labelEn.classList.add('text-gray-500');
            
            labelId.classList.remove('text-gray-500');
            labelId.classList.add('text-white');
        }
    }

    // Update Typewriter
    updateTypewriterLanguage();
}

// 4. Update Typewriter secara Dinamis
function updateTypewriterLanguage() {
    // Ambil kata-kata baru dari kamus
    const newWords = translations[currentLang].typewriter_words;
    
    // Update variabel global 'words'
    if (typeof words !== 'undefined') {
        // Kita timpa array words dengan yang baru
        words.splice(0, words.length, ...newWords);
        
        // Reset index agar ketikan mulai ulang dengan bahasa baru
        wordIndex = 0;
        charIndex = 0;
        isDeleting = false;
        
        // Hapus timeout yang sedang berjalan agar tidak tumpang tindih (opsional, tapi lebih aman dibiarkan loop sendiri)
    }
}