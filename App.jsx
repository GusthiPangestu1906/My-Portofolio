import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ReactTyped from 'react-typed';

// Pastikan Anda memindahkan style.css ke folder src atau sesuaikan path import ini
// import './style.css'; 

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('id'); // 'id' or 'en'
  const [emailRevealed, setEmailRevealed] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Simulate Loading Screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
    // Di sini Anda bisa menambahkan logika i18n yang lebih kompleks jika diperlukan
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleEmailClick = () => {
    const user = "gusthipangestu1906";
    const domain = "gmail.com";
    window.location.href = `mailto:${user}@${domain}`;
    setEmailRevealed(true);
  };

  if (isLoading) {
    return (
      <div id="loading-screen" className="fixed inset-0 bg-[#090910] z-[100] flex flex-col items-center justify-center text-white">
        <div className="scanlines"></div>
        
        {/* Center HUD */}
        <div className="relative mb-12 flex items-center justify-center">
            {/* Outer Rotating Rings */}
            <div className="absolute w-80 h-80 rounded-full border border-gray-800 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-72 h-72 rounded-full border border-t-primary/50 border-r-transparent border-b-primary/50 border-l-transparent animate-[spin_4s_linear_infinite] tech-ring"></div>
            <div className="absolute w-64 h-64 rounded-full border border-t-transparent border-r-primary border-b-transparent border-l-primary animate-[spin_6s_linear_infinite_reverse] opacity-60"></div>
            
            {/* Glow Center */}
            <div className="absolute w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
            
            {/* Glitch Logo */}
            <h1 className="text-5xl md:text-6xl font-black tracking-widest text-white glitch relative z-20" data-text="CELESTIQ">
                CELESTIQ
            </h1>
        </div>

        {/* Terminal Status Text */}
        <div className="w-80 font-mono text-xs text-primary mb-2 flex justify-between uppercase">
            <span id="loader-status">&gt; INITIALIZING KERNEL...</span>
            <span id="loading-percentage">Loading...</span>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-gray-900 rounded-none border border-white/20 relative overflow-hidden">
            <div className="h-full bg-primary animate-[width_2s_ease-in-out_forwards]" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-white antialiased ambient-glow selection:bg-primary selection:text-white bg-dark font-sans">
      
      {/* WEBGL CURSOR CANVAS */}
      {/* Note: Canvas ini memerlukan script WebGL terpisah untuk berfungsi seperti di HTML asli */}
      <canvas id="cursor-canvas" className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60] mix-blend-screen"></canvas>

      {/* Header */}
      <header className="glass-header fixed w-full top-0 z-50 transition-all duration-300 bg-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-black font-bold text-xl group-hover:rotate-45 transition-transform">C</div>
                <span className="text-xl font-bold tracking-tight hover:text-primary transition-colors">Celestiq</span>
            </a>

            <div className="flex items-center gap-4">
                
                {/* Language Toggle */}
                <button onClick={toggleLanguage} className="relative flex items-center justify-between w-24 h-9 p-1 bg-[#0f0f13] border border-white/20 rounded-full cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] group hover:border-primary/50 transition-all duration-300 outline-none select-none">
                    <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-primary rounded-full shadow-[0_0_15px_rgba(135,80,247,0.6)] z-0 transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1) ${lang === 'en' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}></div>
                    <span className={`relative z-10 w-1/2 text-center text-[11px] font-bold font-mono tracking-widest transition-colors duration-300 ${lang === 'id' ? 'text-white' : 'text-gray-500'}`}>ID</span>
                    <span className={`relative z-10 w-1/2 text-center text-[11px] font-bold font-mono tracking-widest transition-colors duration-300 ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</span>
                </button>

                <a href="#contact" className="hidden md:inline-block px-5 py-2 text-sm font-semibold text-primary border border-primary/30 rounded-full hover:bg-primary hover:text-black transition-all">Let's Talk</a>
                
                {/* Menu Button (Hamburger) */}
                <button id="mobile-menu-btn" onClick={toggleMobileMenu} className="md:hidden text-2xl">
                    <i className='bx bx-menu'></i>
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-dark border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl bg-[#090910]">
                <a href="#home" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Home</a>
                <a href="#about" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>About</a>
                <a href="#services" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#skills" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Skills</a>
                <a href="#experience" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Experience</a>
                <a href="#portfolio" className="text-gray-300 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Projects</a>
                <a href="#contact" className="text-primary font-bold" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center pt-20 relative overflow-hidden text-center px-4">
        {/* Background Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Floating Elements (Hidden on mobile) */}
        <div className="hidden lg:block">
            <div className="floating-widget animate-float absolute top-[30%] left-[10%] bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400"><i className='bx bx-check-circle text-xl'></i></div>
                <div className="text-left">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Projects Completed</div>
                    <div className="text-sm font-bold text-white">15+ Events Succesfull</div>
                </div>
            </div>
            {/* Tambahkan widget lain sesuai kebutuhan */}
        </div>

        <div className="max-w-4xl mx-auto z-10 relative" data-aos="fade-up" data-aos-delay="200">
            <div className="inline-block px-4 py-1.5 mb-6 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(135,80,247,0.2)]">
                Open for Collaboration
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span>Hi, I'm</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-white">Gusthi Pangestu</span>
                <br />
                <span className="text-3xl md:text-5xl mt-2 block text-white">
                    <ReactTyped
                        strings={['LCD Operator', 'Graphic Designer', 'Event Specialist']}
                        typeSpeed={50}
                        backSpeed={30}
                        loop
                    />
                </span>
            </h1>
            
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                Creative LCD Operator & Graphic Designer crafting modern visual experiences for events and robust digital branding assets.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <a href="#contact" className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold hover:shadow-[0_0_20px_rgba(135,80,247,0.5)] transition-all flex items-center gap-2">
                    <span>Start a Project</span> <i className='bx bx-right-arrow-alt'></i>
                </a>

                <a href="CV _Gusthi Pangestu1.docx" download className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/5 transition-all flex items-center gap-2">
                   <i className='bx bx-download'></i> <span>Download CV</span>
                </a>
            </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 pt-32">
        <div className="container mx-auto px-6">
            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                slidesPerView={1}
                className="aboutSwiper pb-12"
                data-aos="fade-up" 
                data-aos-delay="100"
            >
                <SwiperSlide>
                    <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-sm">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative order-2 md:order-1">
                                <div className="rounded-2xl overflow-hidden h-80 md:h-96 w-full relative group shadow-[0_0_30px_rgba(135,80,247,0.2)]">
                                    <img src="Gusthi Pangestu (2).JPG" onError={(e) => e.target.src='https://placehold.co/600x800/2a1454/ffffff?text=Creative+Photo'} alt="Creative Gusthi" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-block px-3 py-1 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold mb-4">CREATIVE SIDE</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">Visual Creator & <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">Event Specialist</span></h3>
                                <div className="w-20 h-1 bg-pink-500 mb-6 rounded-full"></div>
                                <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                                    Di balik layar, saya adalah seorang kreator yang menghidupkan suasana acara. Fokus saya adalah menciptakan pengalaman visual yang imersif melalui desain grafis dan manajemen panggung digital.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] text-pink-400"><i className='bx bxs-palette text-xl'></i></div>
                                        <span className="text-gray-300 text-sm md:text-base">Spesialis <strong>Desain Grafis & Branding</strong> untuk kebutuhan event.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] text-pink-400"><i className='bx bxs-camera-movie text-xl'></i></div>
                                        <span className="text-gray-300 text-sm md:text-base">Expert <strong>Operator OBS Studio</strong> untuk live production & visual jockey.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 relative overflow-hidden bg-white/5 backdrop-blur-sm">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative order-2 md:order-1">
                                <div className="rounded-2xl overflow-hidden h-80 md:h-96 w-full relative group shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                    <img src="Gusthi Pangestu (1).JPG" onError={(e) => e.target.src='https://placehold.co/600x800/1e3a8a/ffffff?text=Formal+Photo'} alt="Formal Gusthi" className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold mb-4">TECHNICAL SIDE</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">Mahasiswa PENS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Informatics Engineering</span></h3>
                                <div className="w-20 h-1 bg-blue-500 mb-6 rounded-full"></div>
                                <p className="text-gray-400 leading-relaxed mb-6 text-sm md:text-base">
                                    Sebagai mahasiswa Teknik Informatika di PENS, saya mendalami pengembangan perangkat lunak dan teknologi web. Saya menggabungkan logika pemrograman dengan estetika desain.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] text-blue-400"><i className='bx bx-code-block' ></i></div>
                                        <span className="text-gray-300 text-sm md:text-base">Berpengalaman dalam <strong>Web Development</strong> (Front-end & UI/UX).</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 min-w-[20px] text-blue-400"><i className='bx bxs-data text-xl'></i></div>
                                        <span className="text-gray-300 text-sm md:text-base">Memahami konsep <strong>Database & Backend Logic</strong> untuk aplikasi skala kecil-menengah.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 pt-32 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Layanan Saya</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Solusi teknis dan kreatif untuk kebutuhan acara dan branding Anda.</p>
            </div>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                }}
                className="servicesSwiper pb-12"
                data-aos="fade-up" 
                data-aos-delay="100"
            >
                <SwiperSlide className="h-auto">
                    <div className="glass-card p-8 rounded-3xl hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group cursor-pointer h-full flex flex-col bg-white/5 border border-white/10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-3xl text-primary mb-6 group-hover:scale-110 transition-transform border border-primary/20">
                            <i className='bx bx-desktop'></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">Operator LCD & OBS</h3>
                        <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                            Manajemen visual acara live yang profesional untuk kelancaran presentasi dan multimedia.
                        </p>
                        <ul className="space-y-2 text-gray-400 text-sm mt-auto">
                            <li className="flex items-center gap-2"><i className='bx bx-check text-primary'></i> Manajemen Scene & Transisi OBS</li>
                            <li className="flex items-center gap-2"><i className='bx bx-check text-primary'></i> Playback Video & Presentasi</li>
                            <li className="flex items-center gap-2"><i className='bx bx-check text-primary'></i> Setup Layar LED/Proyektor</li>
                        </ul>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="h-auto">
                    <div className="glass-card p-8 rounded-3xl hover:border-primary/50 hover:bg-white/5 transition-all duration-300 group cursor-pointer h-full flex flex-col bg-white/5 border border-white/10">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-3xl text-pink-400 mb-6 group-hover:scale-110 transition-transform border border-pink-500/20">
                            <i className='bx bx-palette'></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors">Graphic Design</h3>
                        <p className="text-gray-400 leading-relaxed mb-4 flex-grow">
                            Desain visual komunikatif untuk memperkuat branding acara dan organisasi Anda.
                        </p>
                        <ul className="space-y-2 text-gray-400 text-sm mt-auto">
                            <li className="flex items-center gap-2"><i className='bx bx-check text-pink-400'></i> Social Media Feeds & Story</li>
                            <li className="flex items-center gap-2"><i className='bx bx-check text-pink-400'></i> Poster, Banner & Flyer Event</li>
                            <li className="flex items-center gap-2"><i className='bx bx-check text-pink-400'></i> Desain Kebutuhan Organisasi (PDD)</li>
                        </ul>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 pt-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">Tools</h2>
                <p className="text-gray-400">Rekam jejak dalam manajemen event, desain visual, dan kompetisi.</p>
            </div>

            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                spaceBetween={20}
                breakpoints={{
                    320: { slidesPerView: 2 },
                    640: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                className="skillsSwiper !pb-14"
                data-aos="zoom-in-up" 
                data-aos-delay="100"
            >
                {/* Skill Item: OBS */}
                <SwiperSlide className="h-auto px-2">
                    <div className="group relative w-full max-w-[240px] mx-auto">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl opacity-80 group-hover:from-cyan-400 group-hover:to-blue-600 blur transition duration-500"></div>
                        <div className="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-1">
                            <div className="h-24 w-24 mb-6 rounded-full bg-white/10 shadow-[0_0_16px_rgba(255,255,255,0.05)] flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/13/OBS_Studio_logo.png" alt="OBS" className="h-14 w-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-xl text-white mb-3 tracking-wide">OBS Studio</h4>
                            <div className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 group-hover:border-cyan-500/50 group-hover:bg-cyan-900/20 transition-all duration-300">
                                <span className="text-xs font-bold text-gray-300 group-hover:text-cyan-400 tracking-wider">EXPERT</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Skill Item: Photoshop */}
                <SwiperSlide className="h-auto px-2">
                    <div className="group relative w-full max-w-[240px] mx-auto">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl opacity-80 group-hover:from-blue-500 group-hover:to-indigo-600 blur transition duration-500"></div>
                        <div className="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-1">
                            <div className="h-24 w-24 mb-6 rounded-full bg-white/10 shadow-[0_0_16px_rgba(59,130,246,0.04)] flex items-center justify-center group-hover:bg-blue-500/10 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/2101px-Adobe_Photoshop_CC_icon.svg.png" alt="Photoshop" className="h-14 w-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-xl text-white mb-3 tracking-wide">Photoshop</h4>
                            <div className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all duration-300">
                                <span className="text-xs font-bold text-gray-300 group-hover:text-blue-400 tracking-wider">INTERMEDIATE</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Skill Item: Canva */}
                <SwiperSlide className="h-auto px-2">
                    <div className="group relative w-full max-w-[240px] mx-auto">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl opacity-80 group-hover:from-teal-400 group-hover:to-cyan-400 blur transition duration-500"></div>
                        <div className="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-1">
                            <div className="h-24 w-24 mb-6 rounded-full bg-white/10 shadow-[0_0_16px_rgba(45,212,191,0.04)] flex items-center justify-center group-hover:bg-teal-500/10 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                                <img src="https://public.canva.site/logo/media/dfb96cc174513093cd6ed61489ccb750.svg" alt="Canva" className="h-14 w-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-xl text-white mb-3 tracking-wide">Canva</h4>
                            <div className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 group-hover:border-teal-500/50 group-hover:bg-teal-900/20 transition-all duration-300">
                                <span className="text-xs font-bold text-gray-300 group-hover:text-teal-400 tracking-wider">ADVANCED</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Skill Item: Figma */}
                <SwiperSlide className="h-auto px-2">
                    <div className="group relative w-full max-w-[240px] mx-auto">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-600 to-gray-400 rounded-2xl opacity-80 group-hover:from-purple-500 group-hover:to-pink-500 blur transition duration-500"></div>
                        <div className="relative h-full bg-[#121212] border border-white/10 p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:-translate-y-1">
                            <div className="h-24 w-24 mb-6 rounded-full bg-white/10 shadow-[0_0_16px_rgba(168,85,247,0.04)] flex items-center justify-center group-hover:bg-purple-500/10 transition-colors duration-300 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/1365px-Figma-logo.svg.png" alt="Figma" className="h-14 w-14 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
                            </div>
                            <h4 className="font-bold text-xl text-white mb-3 tracking-wide">Figma</h4>
                            <div className="px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 group-hover:border-purple-500/50 group-hover:bg-purple-900/20 transition-all duration-300">
                                <span className="text-xs font-bold text-gray-300 group-hover:text-purple-400 tracking-wider">INTERMEDIATE</span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 pt-32 relative">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-3xl md:text-5xl font-bold mb-4" data-i18n="exp_title">Pengalaman Profesional</h2>
                <p className="text-gray-400" data-i18n="exp_subtitle">Rekam jejak dalam manajemen event, desain visual, dan kompetisi.</p>
            </div>

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={30}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="experienceSwiper pb-12"
                data-aos="fade-up" 
                data-aos-delay="200"
            >
                <SwiperSlide className="h-auto">
                    <div className="glass-card p-8 rounded-3xl cursor-pointer overflow-hidden group hover:-translate-y-2 transition-all duration-300 w-full h-full relative bg-white/5 border border-white/10"
                        onClick={() => window.open('https://drive.google.com/file/d/1y5FKSstmr-1QXDR27IvHFAtXN7EJYMT1/view?usp=sharing', '_blank')}>
                        <div className="absolute top-0 left-0 w-1 h-full bg-pink-500"></div>
                        <div className="mb-4">
                            <span className="text-xs font-extrabold tracking-widest text-pink-400 border border-pink-500/30 px-3 py-1 rounded bg-pink-500/10">EVENT</span>
                            <div className="text-white/40 text-sm mt-2 font-mono">2025</div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">Creative Design</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-300 mb-4 border-b border-white/10 pb-4">
                            <i className='bx bx-palette text-pink-500'></i>ITDS INSIGHT
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8">
                            Bertanggung jawab penuh atas seluruh desain identitas visual termasuk poster, banner, dan materi promosi digital.
                        </p>
                        <div className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-pink-500 group-hover:border-pink-500 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300">
                            <i className='bx bx-right-arrow-alt text-2xl text-gray-500 group-hover:text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300'></i>
                        </div>
                    </div>
                </SwiperSlide>
                {/* Tambahkan slide pengalaman lainnya di sini */}
            </Swiper>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 pt-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto glass-card rounded-3xl md:rounded-[3rem] p-6 md:p-16 text-center border border-white/10 relative overflow-hidden bg-white/5 backdrop-blur-sm" data-aos="zoom-in">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white">Siap Kolaborasi?</h2>
                <p className="text-gray-300 text-base md:text-lg mb-8 md:mb-12">Diskusikan kebutuhan Operator LCD atau Desain Grafis untuk sukseskan acara Anda.</p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
                    <button onClick={handleEmailClick} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 text-left w-full md:w-auto md:min-w-[280px]">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-2xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <i className='bx bxs-envelope'></i>
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm text-gray-400">Email Me</div>
                            <div className="font-bold text-white text-sm md:text-base truncate">
                                {emailRevealed ? "gusthipangestu1906@gmail.com" : "Click to reveal"}
                            </div>
                        </div>
                    </button>

                    <a href="https://linkedin.com/in/gusthipangestu" target="_blank" rel="noreferrer" className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-600/20 hover:border-blue-500 transition-all duration-300 text-left w-full md:w-auto md:min-w-[280px]">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex-shrink-0 flex items-center justify-center text-2xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <i className='bx bxl-linkedin'></i>
                        </div>
                        <div>
                            <div className="text-sm text-gray-400">Connect</div>
                            <div className="font-bold text-white text-sm md:text-base">LinkedIn Profile</div>
                        </div>
                    </a>
                </div>

                <div className="mt-12 md:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm gap-4">
                    <div className="flex items-center gap-2">
                        <i className='bx bxs-map text-primary'></i> <span>Surabaya, Indonesia</span>
                    </div>
                    <div className="text-center md:text-right">© 2025 Gusthi Pangestu. All rights reserved.</div>
                </div>
            </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="floating-chat fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-2xl shadow-lg cursor-pointer z-50 hover:scale-110 transition-transform" onClick={() => window.open('https://gusthipangestu1906.github.io/Portofolio-Card/', '_blank')}>
          <i className='bx bxl-linkedin'></i>
      </div>
    </div>
  );
}

export default App;