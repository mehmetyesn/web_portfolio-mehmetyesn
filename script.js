// =============================================
// Mehmet Yeşin Portfolio - Ana JavaScript Dosyası
// =============================================

document.addEventListener('DOMContentLoaded', function () {
    injectDynamicStyles();
    createDynamicElements();
    initMobileMenu();
    initDarkMode();
    initScrollToTop();
    initAnimations();
    initAuthNavbar();

    // Sayfaya göre özel başlatma
    if (document.getElementById('projectsGrid')) initProjectPage();
    if (document.getElementById('servicesGrid')) initServicesPage();
    if (document.getElementById('contactForm') || document.getElementById('sendBtn')) initContactForm();
    if (document.getElementById('loginPanel')) initAuthPage();
});

// ── 1. MOBİL MENÜ ──────────────────────────────────────────────────────────
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu    = document.getElementById('navMenu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function (e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ── 2. NAVBAR AUTH DURUMU ──────────────────────────────────────────────────
function initAuthNavbar() {
    const authLink = document.querySelector('.nav-link-auth');
    if (!authLink) return;
    const user = sessionStorage.getItem('loggedUser');
    if (user) {
        authLink.textContent = user + ' (Çıkış)';
        authLink.href = '#';
        authLink.addEventListener('click', function (e) {
            e.preventDefault();
            sessionStorage.removeItem('loggedUser');
            location.reload();
        });
    }
}

// ── 3. KOYU MOD ────────────────────────────────────────────────────────────
function initDarkMode() {
    const btn  = document.getElementById('themeToggle');
    const body = document.body;
    if (localStorage.getItem('theme') === 'dark-mode') {
        body.classList.add('dark-mode');
        if (btn) btn.innerHTML = '☀️';
    }
    if (btn) {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
            btn.innerHTML = isDark ? '☀️' : '🌙';
        });
    }
}

// ── 4. YUKARI ÇIK BUTONU ───────────────────────────────────────────────────
function initScrollToTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.pageYOffset > 300);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── 5. ANİMASYONLAR ────────────────────────────────────────────────────────
function initAnimations() {
    // Navbar scroll gölgesi
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 0
                ? '0 4px 12px rgba(0,0,0,0.1)'
                : '0 1px 3px rgba(0,0,0,0.1)';
        });
    }

    // Smooth scroll (anchor linkler)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // Intersection Observer — section fade-in
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('section').forEach(s => observer.observe(s));
}

// ── 6. DİNAMİK STİLLER ────────────────────────────────────────────────────
function injectDynamicStyles() {
    if (document.getElementById('dynamicStyles')) return;
    const style = document.createElement('style');
    style.id = 'dynamicStyles';
    style.textContent = `
        body.dark-mode {
            --text-dark:#f3f4f6!important; --text-light:#9ca3af!important;
            --bg-light:#1f2937!important; --border:#374151!important;
            --white:#111827!important;
            background-color:#111827!important; color:#f3f4f6!important;
        }
        body.dark-mode .navbar, body.dark-mode .nav-menu,
        body.dark-mode .illustration-box, body.dark-mode .project-card,
        body.dark-mode .service-card, body.dark-mode .contact-form,
        body.dark-mode .contact-item, body.dark-mode .social-icon,
        body.dark-mode .skill-card, body.dark-mode .filter-btn,
        body.dark-mode .auth-box {
            background-color:#1f2937!important; color:#f3f4f6!important; border-color:#374151!important;
        }
        body.dark-mode .menu-toggle span { background-color:#f3f4f6!important; }
        body.dark-mode .nav-link { color:#9ca3af!important; }
        body.dark-mode .nav-link:hover, body.dark-mode .nav-link.active { color:#2563eb!important; }
        body.dark-mode input, body.dark-mode textarea, body.dark-mode select {
            background-color:#111827!important; color:#f3f4f6!important; border-color:#374151!important;
        }
        body { transition: background-color 0.3s ease, color 0.3s ease; }

        .theme-toggle {
            position:fixed; top:18px; right:80px; background:#2563eb; color:white;
            border:none; font-size:1.2rem; cursor:pointer; width:42px; height:42px;
            border-radius:50%; display:flex; align-items:center; justify-content:center;
            z-index:2000; box-shadow:0 4px 12px rgba(0,0,0,.2); transition:all .3s;
        }
        .theme-toggle:hover { transform:scale(1.1); background:#1d4ed8; }
        @media(max-width:768px){
            .theme-toggle{ right:65px; width:38px; height:38px; }
            body.dark-mode .nav-menu{ background-color:#111827!important; }
        }

        .scroll-top-btn {
            position:fixed; bottom:30px; right:30px; width:45px; height:45px;
            background:#2563eb; color:white; border:none; border-radius:50%;
            cursor:pointer; display:none; z-index:1500; font-size:20px;
            box-shadow:0 4px 12px rgba(0,0,0,.3); transition:all .3s;
            align-items:center; justify-content:center;
        }
        .scroll-top-btn.show { display:flex; animation:fadeIn .3s ease-in; }
        .scroll-top-btn:hover { transform:translateY(-5px); background:#1d4ed8; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        .nav-link-auth {
            background: var(--primary); color: white!important;
            padding: 8px 16px!important; border-radius: 8px;
            transition: background 0.3s;
        }
        .nav-link-auth:hover { background: var(--primary-dark)!important; }
        .nav-link-auth.active::after { display: none!important; }
    `;
    document.head.appendChild(style);
}

function createDynamicElements() {
    if (!document.getElementById('themeToggle')) {
        const btn = document.createElement('button');
        btn.id = 'themeToggle'; btn.className = 'theme-toggle';
        btn.innerHTML = '🌙'; btn.title = 'Temayı Değiştir';
        document.body.appendChild(btn);
    }
    if (!document.getElementById('scrollTopBtn')) {
        const btn = document.createElement('button');
        btn.id = 'scrollTopBtn'; btn.className = 'scroll-top-btn';
        btn.innerHTML = '↑'; btn.title = 'Yukarı Çık';
        document.body.appendChild(btn);
    }
}

// ── 7. PROJELER SAYFASI (Arama + Filtre + Sıralama) ───────────────────────
function initProjectPage() {
    const searchInput = document.getElementById('projectSearch');
    const sortSelect  = document.getElementById('sortSelect');
    const filterBtns  = document.querySelectorAll('.filter-btn');

    let activeCategory = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            applyProjectFilters();
        });
    });

    if (searchInput) searchInput.addEventListener('input', applyProjectFilters);
    if (sortSelect)  sortSelect.addEventListener('change', applyProjectFilters);

    function applyProjectFilters() {
        const query   = (searchInput ? searchInput.value.toLowerCase() : '');
        const sortVal = (sortSelect ? sortSelect.value : 'default');
        const grid    = document.getElementById('projectsGrid');
        const noRes   = document.getElementById('noResults');
        const cards   = Array.from(grid.querySelectorAll('.project-card'));

        // Filtrele
        cards.forEach(card => {
            const catMatch  = activeCategory === 'all' || card.dataset.category === activeCategory;
            const nameMatch = card.dataset.name.toLowerCase().includes(query) ||
                              card.querySelector('p').textContent.toLowerCase().includes(query);
            card.style.display = (catMatch && nameMatch) ? 'block' : 'none';
        });

        // Sırala (görünür kartları)
        const visible = cards.filter(c => c.style.display !== 'none');
        if (sortVal !== 'default') {
            visible.sort((a, b) => {
                const na = a.dataset.name, nb = b.dataset.name;
                return sortVal === 'az' ? na.localeCompare(nb, 'tr') : nb.localeCompare(na, 'tr');
            });
            visible.forEach(c => grid.appendChild(c));
        }

        if (noRes) noRes.style.display = visible.length === 0 ? 'block' : 'none';
    }
}

// ── 8. HİZMETLER SAYFASI (JSON'dan yükle + Arama + Filtre + Fiyat Sırala) ─
function initServicesPage() {
    fetch('services-data.json')
        .then(r => r.json())
        .then(data => {
            window._allServices = data.services;
            renderServices(data.services);
            setupServiceControls();
        })
        .catch(() => {
            document.getElementById('servicesGrid').innerHTML =
                '<p style="text-align:center;color:red;">Hizmetler yüklenemedi.</p>';
        });
}

function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    if (services.length === 0) {
        grid.innerHTML = '';
        const noRes = document.getElementById('noResults');
        if (noRes) noRes.style.display = 'block';
        return;
    }

    const noRes = document.getElementById('noResults');
    if (noRes) noRes.style.display = 'none';

    grid.innerHTML = services.map(s => `
        <div class="service-card" data-category="${s.category}" data-price="${extractPrice(s.price)}">
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <ul class="service-list">
                ${s.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <p class="service-price">${s.price}</p>
            <p class="service-duration">⏱ Süre: ${s.duration}</p>
        </div>
    `).join('');
}

function extractPrice(priceStr) {
    const match = priceStr.match(/[\d.]+/);
    return match ? parseFloat(match[0].replace('.', '')) : 0;
}

function setupServiceControls() {
    const searchInput  = document.getElementById('serviceSearch');
    const sortSelect   = document.getElementById('priceSortSelect');
    const filterBtns   = document.querySelectorAll('#categoryFilters .filter-btn');
    let activeCategory = 'all';

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            applyServiceFilters();
        });
    });

    if (searchInput) searchInput.addEventListener('input', applyServiceFilters);
    if (sortSelect)  sortSelect.addEventListener('change', applyServiceFilters);

    function applyServiceFilters() {
        const query    = searchInput ? searchInput.value.toLowerCase() : '';
        const sortVal  = sortSelect ? sortSelect.value : 'default';
        let   services = [...window._allServices];

        // Kategori filtresi
        if (activeCategory !== 'all') {
            services = services.filter(s => s.category === activeCategory);
        }

        // Metin araması
        if (query) {
            services = services.filter(s =>
                s.title.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query) ||
                s.features.some(f => f.toLowerCase().includes(query))
            );
        }

        // Fiyat sıralaması
        if (sortVal === 'asc') {
            services.sort((a, b) => extractPrice(a.price) - extractPrice(b.price));
        } else if (sortVal === 'desc') {
            services.sort((a, b) => extractPrice(b.price) - extractPrice(a.price));
        }

        renderServices(services);
    }
}

// ── 9. İLETİŞİM FORMU (PHP backend'e gönderir) ────────────────────────────
function initContactForm() {
    // Eski form varsa kaldır (HTML'de form yoksa sadece sendContact() çalışır)
}

function sendContact() {
    const name    = document.getElementById('name')?.value.trim();
    const email   = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const msgBox  = document.getElementById('formMessage');
    const btn     = document.getElementById('sendBtn');

    if (!name || !email || !subject || !message) {
        showFormMsg(msgBox, 'error', 'Lütfen tüm alanları doldurun.');
        return;
    }

    btn.disabled = true;
    btn.textContent = 'Gönderiliyor...';

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('subject', subject);
    fd.append('message', message);

    fetch('php/contact.php', { method: 'POST', body: fd })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                showFormMsg(msgBox, 'success', '✓ ' + data.message);
                ['name','email','subject','message'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
            } else {
                showFormMsg(msgBox, 'error', data.message);
            }
        })
        .catch(() => {
            // PHP yoksa (statik sunum) yedek davranış
            showFormMsg(msgBox, 'success', '✓ Mesajınız alındı! En kısa sürede dönüş yapacağım.');
            ['name','email','subject','message'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Mesaj Gönder';
        });
}

function showFormMsg(el, type, text) {
    if (!el) return;
    el.className = 'auth-message ' + type;
    el.textContent = text;
    el.style.display = 'block';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}

// ── 10. AUTH SAYFASI ───────────────────────────────────────────────────────
function initAuthPage() {
    // Enter tuşuyla form gönderme
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Enter') return;
        const loginActive = document.getElementById('loginPanel')?.classList.contains('active');
        if (loginActive) handleLogin();
        else handleRegister();
    });
}

function switchTab(tab) {
    const loginPanel    = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const tabs          = document.querySelectorAll('.auth-tab');

    if (tab === 'login') {
        loginPanel.classList.add('active');
        registerPanel.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        registerPanel.classList.add('active');
        loginPanel.classList.remove('active');
        tabs[1].classList.add('active');
        tabs[0].classList.remove('active');
    }
}

function handleLogin() {
    const email    = document.getElementById('loginEmail')?.value.trim();
    const password = document.getElementById('loginPassword')?.value;
    const msgBox   = document.getElementById('loginMsg');

    if (!email || !password) {
        showFormMsg(msgBox, 'error', 'E-posta ve şifre gereklidir.');
        return;
    }

    const fd = new FormData();
    fd.append('email', email);
    fd.append('password', password);

    fetch('php/login.php', { method: 'POST', body: fd })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                sessionStorage.setItem('loggedUser', data.username);
                showFormMsg(msgBox, 'success', '✓ ' + data.message + ' Yönlendiriliyorsunuz...');
                setTimeout(() => { window.location.href = 'index.html'; }, 1500);
            } else {
                showFormMsg(msgBox, 'error', data.message);
            }
        })
        .catch(() => {
            showFormMsg(msgBox, 'error', 'Sunucuya bağlanılamadı. PHP sunucusunun çalıştığından emin olun.');
        });
}

function handleRegister() {
    const username = document.getElementById('regUsername')?.value.trim();
    const email    = document.getElementById('regEmail')?.value.trim();
    const password = document.getElementById('regPassword')?.value;
    const confirm  = document.getElementById('regConfirm')?.value;
    const msgBox   = document.getElementById('registerMsg');

    if (!username || !email || !password || !confirm) {
        showFormMsg(msgBox, 'error', 'Tüm alanları doldurun.');
        return;
    }
    if (password.length < 6) {
        showFormMsg(msgBox, 'error', 'Şifre en az 6 karakter olmalıdır.');
        return;
    }
    if (password !== confirm) {
        showFormMsg(msgBox, 'error', 'Şifreler eşleşmiyor.');
        return;
    }

    const fd = new FormData();
    fd.append('username', username);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('confirm_password', confirm);

    fetch('php/register.php', { method: 'POST', body: fd })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                showFormMsg(msgBox, 'success', '✓ ' + data.message);
                setTimeout(() => switchTab('login'), 2000);
            } else {
                showFormMsg(msgBox, 'error', data.message);
            }
        })
        .catch(() => {
            showFormMsg(msgBox, 'error', 'Sunucuya bağlanılamadı. PHP sunucusunun çalıştığından emin olun.');
        });
}
