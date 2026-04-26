// Mobil menü toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    

    // Menü linklerine tıklandığında menüyü kapat
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Sayfanın herhangi bir yerine tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Proje filtreleme
    setupProjectFiltering();

    // Form gönderme
    setupFormSubmit();
});

// Proje filtreleme
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif buton güncelle
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Tıklanan butonun onclick'ten kategoriyi al
            const onclickAttr = this.getAttribute('onclick');
            const category = onclickAttr.match(/'([^']+)'/)[1];

            // Projeleri filtrele
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.animation = 'scaleIn 0.5s ease-out';
                    }, 0);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Proje filtreleme fonksiyonu
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Aktif buton güncelle
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Projeleri filtrele
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'scaleIn 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Form gönderme
function setupFormSubmit() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
}

function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Form verilerini konsola yazdır
    console.log('Form Gönderildi:', {
        name: name,
        email: email,
        subject: subject,
        message: message,
        tarih: new Date().toLocaleString('tr-TR')
    });

    // Başarı mesajını göster
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
        
        // 3 saniye sonra gizle
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }

    // Formu temizle
    form.reset();
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animasyonları
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 0) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// Sayfa yüklendiğinde animasyonları başlat
window.addEventListener('load', function() {
    // Skill kartlarına animasyon ekle
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'scaleIn 0.5s ease-out forwards';
        }, index * 100);
    });

    // Proje kartlarına animasyon ekle
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'scaleIn 0.5s ease-out forwards';
        }, index * 100);
    });

    // Hizmet kartlarına animasyon ekle
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'scaleIn 0.5s ease-out forwards';
        }, index * 100);
    });

    // Stat kartlarına animasyon ekle
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'scaleIn 0.5s ease-out forwards';
        }, index * 100);
    });
});

// Intersection Observer ile scroll animasyonları
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Tüm section'ları observe et
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
// Mobil menü toggle ve Diğer Başlatıcılar
document.addEventListener('DOMContentLoaded', function() {
    // Dinamik Stilleri Enjekte Et
    injectDynamicStyles();

    // Dinamik Elementleri Oluştur (Butonlar vb.)
    createDynamicElements();

    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Menü linklerine tıklandığında menüyü kapat
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Sayfanın herhangi bir yerine tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        if (navMenu && menuToggle && navMenu.classList.contains('active')) {
            const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInsideNav) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });

    // Proje filtreleme
    setupProjectFiltering();

    // Form gönderme
    setupFormSubmit();

    // Koyu/Açık Mod Başlatma
    initDarkMode();

    // Yukarı Çık Butonu Başlatma
    initScrollToTop();
});

// Tüm CSS stillerini JS üzerinden ekle
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Koyu Mod Renk Değişkenleri */
        body.dark-mode {
            --text-dark: #f3f4f6 !important;
            --text-light: #9ca3af !important;
            --bg-light: #1f2937 !important;
            --border: #374151 !important;
            --white: #111827 !important;
            background-color: #111827 !important;
            color: #f3f4f6 !important;
        }

        body.dark-mode .navbar, 
        body.dark-mode .nav-menu,
        body.dark-mode .illustration-box,
        body.dark-mode .project-card,
        body.dark-mode .service-card,
        body.dark-mode .contact-form,
        body.dark-mode .contact-item,
        body.dark-mode .social-icon {
            background-color: #1f2937 !important;
            color: #f3f4f6 !important;
            border-color: #374151 !important;
        }

        body.dark-mode .nav-link,
        body.dark-mode .hero-description,
        body.dark-mode .project-info p,
        body.dark-mode .service-card p,
        body.dark-mode .contact-item-text p,
        body.dark-mode .footer-section p {
            color: #9ca3af !important;
        }

        body.dark-mode input,
        body.dark-mode textarea {
            background-color: #111827 !important;
            color: #f3f4f6 !important;
            border-color: #374151 !important;
        }

        /* Tema Değiştirme Butonu */
        .theme-toggle {
            position: fixed;
            top: 20px;
            right: 80px;
            background: #2563eb;
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .theme-toggle { right: 70px; top: 15px; width: 40px; height: 40px; }
        }

        .theme-toggle:hover { transform: scale(1.1); }

        /* Yukarı Çık Butonu */
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 45px;
            height: 45px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            z-index: 1000;
            font-size: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            align-items: center;
            justify-content: center;
        }

        .scroll-top-btn.show { display: flex; animation: fadeIn 0.3s ease-in; }
        .scroll-top-btn:hover { transform: translateY(-5px); background-color: #1d4ed8; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        /* Smooth Transition for Body */
        body { transition: background-color 0.3s ease, color 0.3s ease !important; }
    `;
    document.head.appendChild(style);
}

// Gerekli HTML elementlerini JS ile oluştur
function createDynamicElements() {
    // Tema Butonu
    if (!document.getElementById('themeToggle')) {
        const themeBtn = document.createElement('button');
        themeBtn.id = 'themeToggle';
        themeBtn.className = 'theme-toggle';
        themeBtn.innerHTML = '🌙';
        themeBtn.title = 'Temayı Değiştir';
        document.body.appendChild(themeBtn);
    }

    // Yukarı Çık Butonu
    if (!document.getElementById('scrollTopBtn')) {
        const scrollBtn = document.createElement('button');
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.innerHTML = '↑';
        scrollBtn.title = 'Yukarı Çık';
        document.body.appendChild(scrollBtn);
    }
}

// Koyu/Açık Mod Fonksiyonu
function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-mode') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark-mode');
                themeToggle.innerHTML = '☀️';
            } else {
                localStorage.setItem('theme', 'light-mode');
                themeToggle.innerHTML = '🌙';
            }
        });
    }
}

// Yukarı Çık Butonu Fonksiyonu
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Proje filtreleme
function setupProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const onclickAttr = this.getAttribute('onclick');
            const category = onclickAttr ? onclickAttr.match(/'([^']+)'/)[1] : 'all';

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.animation = 'scaleIn 0.5s ease-out';
                    }, 0);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Form gönderme
function setupFormSubmit() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                setTimeout(() => { successMessage.style.display = 'none'; }, 3000);
            }
            event.target.reset();
        });
    }
}

// Sayfa yüklendiğinde animasyonları başlat
window.addEventListener('load', function() {
    const selectors = ['.skill-card', '.project-card', '.service-card', '.stat-item'];
    selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'scaleIn 0.5s ease-out forwards';
            }, index * 100);
        });
    });
});

