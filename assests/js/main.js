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

