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

// ── 8. HİZMETLER SAYFASI (JSON'dan yükle + Arama + Filtre + Fiyat Sırala + Favori + Sepet) ─

// --- localStorage yardımcıları ---
const FAV_KEY  = 'portfolio_favs';
const CART_KEY = 'portfolio_cart';
function getFavs()   { try { return JSON.parse(localStorage.getItem(FAV_KEY))  || []; } catch(e) { return []; } }
function getCart()   { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch(e) { return []; } }
function setFavs(a)  { localStorage.setItem(FAV_KEY,  JSON.stringify(a)); }
function setCart(a)  { localStorage.setItem(CART_KEY, JSON.stringify(a)); }
function isFav(id)   { return getFavs().indexOf(id)  !== -1; }
function inCart(id)  { return getCart().indexOf(id)  !== -1; }
function toggleFav(id)  { const a=getFavs(),i=a.indexOf(id); i===-1?a.push(id):a.splice(i,1); setFavs(a); return i===-1; }
function toggleCart(id) { const a=getCart(),i=a.indexOf(id); i===-1?a.push(id):a.splice(i,1); setCart(a); return i===-1; }

function showPortfolioToast(msg) {
    let t = document.getElementById('portfolioToast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'portfolioToast';
        t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%) translateY(60px);background:#1e293b;color:white;padding:11px 22px;border-radius:8px;font-size:14px;font-weight:500;opacity:0;pointer-events:none;transition:all .3s ease;z-index:9999;white-space:nowrap;';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.transform = 'translateX(-50%) translateY(0)';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(60px)'; }, 2200);
}

function updateServiceBadges() {
    const fc = document.getElementById('svcFavCount');
    const cc = document.getElementById('svcCartCount');
    if (fc) fc.textContent = getFavs().length;
    if (cc) cc.textContent = getCart().length;
}

function initServicesPage() {
    fetch('services-data.json')
        .then(r => r.json())
        .then(data => {
            window._allServices = data.services;
            renderServices(data.services);
            setupServiceControls();
            injectServiceUI();
        })
        .catch(() => {
            document.getElementById('servicesGrid').innerHTML =
                '<p style="text-align:center;color:red;">Hizmetler yüklenemedi.</p>';
        });
}

function injectServiceUI() {
    // Üst bar rozetleri — filtre section'ının içine ekle
    const filterSection = document.querySelector('.filter-section .container');
    if (filterSection && !document.getElementById('svcBadgeBar')) {
        const bar = document.createElement('div');
        bar.id = 'svcBadgeBar';
        bar.style.cssText = 'display:flex;justify-content:flex-end;gap:10px;margin-bottom:14px;flex-wrap:wrap;';
        bar.innerHTML = `
            <button id="openFavDrawer" style="display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:25px;border:2px solid #f59e0b;background:white;color:#92400e;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;">
                ⭐ Favoriler <span id="svcFavCount" style="background:#f59e0b;color:white;border-radius:50%;min-width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;">0</span>
            </button>
            <button id="openCartDrawer" style="display:flex;align-items:center;gap:7px;padding:8px 16px;border-radius:25px;border:2px solid #2563eb;background:white;color:#2563eb;font-weight:600;font-size:13px;cursor:pointer;transition:all .2s;">
                🛒 Sepet <span id="svcCartCount" style="background:#2563eb;color:white;border-radius:50%;min-width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;">0</span>
            </button>`;
        filterSection.insertBefore(bar, filterSection.firstChild);
    }

    // Drawer overlay
    if (!document.getElementById('svcDrawerOverlay')) {
        const ov = document.createElement('div');
        ov.id = 'svcDrawerOverlay';
        ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:3000;display:none;backdrop-filter:blur(3px);';
        document.body.appendChild(ov);
    }

    // FAVORİLER DRAWER
    if (!document.getElementById('favDrawer')) {
        const d = document.createElement('div');
        d.id = 'favDrawer';
        d.style.cssText = 'position:fixed;top:0;right:-420px;width:360px;max-width:95vw;height:100%;background:white;box-shadow:-6px 0 40px rgba(0,0,0,.15);z-index:3001;display:flex;flex-direction:column;transition:right .35s cubic-bezier(.4,0,.2,1);';
        d.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid #e2e8f0;">
                <h3 style="margin:0;font-size:17px;color:#1e293b;">⭐ Favori Hizmetlerim</h3>
                <button id="closeFavDrawer" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;line-height:1;">✕</button>
            </div>
            <div id="favDrawerBody" style="flex:1;overflow-y:auto;padding:16px;"></div>`;
        document.body.appendChild(d);
    }

    // SEPET DRAWER
    if (!document.getElementById('cartDrawer')) {
        const d = document.createElement('div');
        d.id = 'cartDrawer';
        d.style.cssText = 'position:fixed;top:0;right:-420px;width:360px;max-width:95vw;height:100%;background:white;box-shadow:-6px 0 40px rgba(0,0,0,.15);z-index:3001;display:flex;flex-direction:column;transition:right .35s cubic-bezier(.4,0,.2,1);';
        d.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:20px;border-bottom:1px solid #e2e8f0;">
                <h3 style="margin:0;font-size:17px;color:#1e293b;">🛒 Sepetim</h3>
                <button id="closeCartDrawer" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;line-height:1;">✕</button>
            </div>
            <div id="cartDrawerBody" style="flex:1;overflow-y:auto;padding:16px;"></div>
            <div id="cartDrawerFoot" style="display:none;border-top:1px solid #e2e8f0;padding:18px 20px;">
                <div style="display:flex;justify-content:space-between;font-weight:700;color:#1e293b;margin-bottom:14px;">
                    Toplam <span id="cartTotalLabel" style="color:#2563eb;"></span>
                </div>
                <button id="checkoutBtn" style="width:100%;padding:13px;background:#2563eb;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;transition:all .25s;">🛍️ Satın Al</button>
            </div>`;
        document.body.appendChild(d);
    }

    // ÖDEME MODAL
    if (!document.getElementById('paymentModal')) {
        const m = document.createElement('div');
        m.id = 'paymentModal';
        m.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:4000;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);';
        m.innerHTML = `
            <div style="background:white;border-radius:20px;width:100%;max-width:460px;overflow:hidden;animation:svcModalPop .3s cubic-bezier(.34,1.56,.64,1);">
                <div style="background:linear-gradient(135deg,#2563eb,#0ea5e9);padding:22px 26px;color:white;">
                    <h3 style="margin:0 0 4px;font-size:19px;">💳 Ödeme Bilgileri</h3>
                    <p style="margin:0;font-size:13px;opacity:.85;">Güvenli ödeme ile hizmetlerinizi satın alın</p>
                </div>
                <div style="padding:22px 26px;">
                    <div id="paymentOrderList" style="background:#f8fafc;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:13px;"></div>
                    <div style="margin-bottom:14px;">
                        <label style="display:block;font-size:13px;font-weight:600;color:#1e293b;margin-bottom:6px;">Kart Üzerindeki İsim</label>
                        <input id="payCardName" type="text" placeholder="Ad Soyad" style="width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;">
                    </div>
                    <div style="margin-bottom:14px;">
                        <label style="display:block;font-size:13px;font-weight:600;color:#1e293b;margin-bottom:6px;">Kart Numarası</label>
                        <input id="payCardNumber" type="text" placeholder="0000 0000 0000 0000" maxlength="19" style="width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;">
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px;">
                        <div>
                            <label style="display:block;font-size:13px;font-weight:600;color:#1e293b;margin-bottom:6px;">Son Kullanma</label>
                            <input id="payExpiry" type="text" placeholder="AA/YY" maxlength="5" style="width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;">
                        </div>
                        <div>
                            <label style="display:block;font-size:13px;font-weight:600;color:#1e293b;margin-bottom:6px;">CVV</label>
                            <input id="payCvv" type="text" placeholder="000" maxlength="3" style="width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;">
                        </div>
                    </div>
                </div>
                <div style="padding:0 26px 22px;display:flex;gap:10px;">
                    <button id="cancelPayBtn" style="flex:1;padding:12px;background:white;border:2px solid #e2e8f0;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;color:#64748b;">İptal</button>
                    <button id="confirmPayBtn" style="flex:2;padding:12px;background:#2563eb;color:white;border:none;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">🔒 Ödemeyi Tamamla</button>
                </div>
            </div>`;
        document.body.appendChild(m);
    }

    // BAŞARI EKRANI
    if (!document.getElementById('successScreen')) {
        const s = document.createElement('div');
        s.id = 'successScreen';
        s.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:5000;display:none;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(6px);';
        s.innerHTML = `
            <div style="background:white;border-radius:24px;width:100%;max-width:400px;padding:50px 36px;text-align:center;box-shadow:0 30px 70px rgba(0,0,0,.2);animation:svcModalPop .4s cubic-bezier(.34,1.56,.64,1);">
                <div id="successCheckIcon" style="width:80px;height:80px;background:linear-gradient(135deg,#16a34a,#22c55e);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;margin:0 auto 22px;animation:svcCheckPop .5s .2s cubic-bezier(.34,1.56,.64,1) both;">✓</div>
                <h2 style="font-size:24px;color:#1e293b;margin-bottom:10px;">Hizmetiniz Alındı!</h2>
                <p style="font-size:15px;color:#64748b;line-height:1.6;margin-bottom:22px;">Ödemeniz başarıyla gerçekleşti. En kısa sürede sizinle iletişime geçeceğim.</p>
                <div id="successItemList" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:14px 16px;margin-bottom:26px;font-size:13px;color:#166534;text-align:left;"></div>
                <button id="successCloseBtn" style="width:100%;padding:13px;background:#2563eb;color:white;border:none;border-radius:12px;font-size:15px;font-weight:700;cursor:pointer;">Harika, Teşekkürler! 🎉</button>
            </div>`;
        document.body.appendChild(s);
    }

    // CSS animasyonları
    if (!document.getElementById('svcModalStyles')) {
        const st = document.createElement('style');
        st.id = 'svcModalStyles';
        st.textContent = `
            @keyframes svcModalPop { from{opacity:0;transform:scale(.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
            @keyframes svcCheckPop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
            .svc-fav-btn:hover { transform:scale(1.15) !important; }
            .svc-cart-btn:hover { opacity:.85; }
            #paymentModal input:focus { border-color:#2563eb !important; }
        `;
        document.head.appendChild(st);
    }

    updateServiceBadges();
    bindDrawerEvents();
}

function bindDrawerEvents() {
    const overlay      = document.getElementById('svcDrawerOverlay');
    const openFavBtn   = document.getElementById('openFavDrawer');
    const closeFavBtn  = document.getElementById('closeFavDrawer');
    const openCartBtn  = document.getElementById('openCartDrawer');
    const closeCartBtn = document.getElementById('closeCartDrawer');
    const checkoutBtn  = document.getElementById('checkoutBtn');
    const cancelPayBtn = document.getElementById('cancelPayBtn');
    const confirmPayBtn= document.getElementById('confirmPayBtn');
    const successClose = document.getElementById('successCloseBtn');

    function openDrawer(id) {
        document.getElementById(id).style.right = '0';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeAllDrawers() {
        document.getElementById('favDrawer').style.right  = '-420px';
        document.getElementById('cartDrawer').style.right = '-420px';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (openFavBtn)   openFavBtn.addEventListener('click',  () => { renderFavDrawer();  openDrawer('favDrawer');  });
    if (closeFavBtn)  closeFavBtn.addEventListener('click',  closeAllDrawers);
    if (openCartBtn)  openCartBtn.addEventListener('click', () => { renderCartDrawer(); openDrawer('cartDrawer'); });
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeAllDrawers);
    if (overlay)      overlay.addEventListener('click', closeAllDrawers);

    // Sepet → Ödeme modal
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        const cartIds = getCart();
        if (!cartIds.length) return;
        closeAllDrawers();

        // Sipariş listesini modal'a yaz
        const ol = document.getElementById('paymentOrderList');
        ol.innerHTML = cartIds.map(id => {
            const s = (window._allServices||[]).find(x => x.id === id);
            return s ? `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px dashed #e2e8f0;">${s.icon} <span>${s.title}</span> <span style="margin-left:auto;color:#2563eb;font-weight:700;">${s.price}</span></div>` : '';
        }).join('');

        // Kart numarası formatlama
        const cn = document.getElementById('payCardNumber');
        cn.oninput = () => {
            let v = cn.value.replace(/\D/g,'').substring(0,16);
            cn.value = v.replace(/(.{4})/g,'$1 ').trim();
        };
        const ex = document.getElementById('payExpiry');
        ex.oninput = () => {
            let v = ex.value.replace(/\D/g,'');
            if (v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2,4);
            ex.value = v;
        };

        document.getElementById('paymentModal').style.display = 'flex';
    });

    // İptal
    if (cancelPayBtn) cancelPayBtn.addEventListener('click', () => {
        document.getElementById('paymentModal').style.display = 'none';
    });

    // Ödemeyi tamamla
    if (confirmPayBtn) confirmPayBtn.addEventListener('click', () => {
        const name = document.getElementById('payCardName').value.trim();
        const num  = document.getElementById('payCardNumber').value.replace(/\s/g,'');
        const exp  = document.getElementById('payExpiry').value.trim();
        const cvv  = document.getElementById('payCvv').value.trim();

        if (!name || num.length < 16 || exp.length < 5 || cvv.length < 3) {
            showPortfolioToast('⚠️ Lütfen tüm kart bilgilerini eksiksiz girin.');
            return;
        }

        // Yükleniyor efekti
        confirmPayBtn.textContent = '⏳ İşleniyor...';
        confirmPayBtn.style.opacity = '.7';
        confirmPayBtn.style.pointerEvents = 'none';

        setTimeout(() => {
            // Modal kapat
            document.getElementById('paymentModal').style.display = 'none';
            confirmPayBtn.textContent = '🔒 Ödemeyi Tamamla';
            confirmPayBtn.style.opacity = '1';
            confirmPayBtn.style.pointerEvents = '';

            // Başarı ekranı — satın alınan hizmetleri listele
            const cartIds = getCart();
            const list = document.getElementById('successItemList');
            list.innerHTML = cartIds.map(id => {
                const s = (window._allServices||[]).find(x => x.id === id);
                return s ? `<div style="display:flex;align-items:center;gap:8px;padding:4px 0;">${s.icon} ${s.title}</div>` : '';
            }).join('');

            // Sepeti temizle + kartları güncelle
            setCart([]);
            updateServiceBadges();
            document.querySelectorAll('.svc-cart-btn').forEach(btn => {
                btn.style.background = '#2563eb';
                btn.textContent = '🛒 Sepete Ekle';
                btn.dataset.inCart = 'false';
            });

            // Formu sıfırla
            ['payCardName','payCardNumber','payExpiry','payCvv'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });

            document.getElementById('successScreen').style.display = 'flex';
        }, 1800);
    });

    // Başarı ekranını kapat
    if (successClose) successClose.addEventListener('click', () => {
        document.getElementById('successScreen').style.display = 'none';
    });
}

function renderFavDrawer() {
    const body   = document.getElementById('favDrawerBody');
    if (!body) return;
    const favIds = getFavs();
    if (!favIds.length) {
        body.innerHTML = '<div style="text-align:center;padding:50px 20px;color:#94a3b8;"><div style="font-size:40px;margin-bottom:12px;">☆</div>Henüz favori eklemediniz.<br>Kartlardaki ⭐ ikonuna tıklayın.</div>';
        return;
    }
    body.innerHTML = '';
    favIds.forEach(id => {
        const s = (window._allServices||[]).find(x => x.id === id);
        if (!s) return;
        const item = document.createElement('div');
        item.style.cssText = 'display:flex;align-items:center;gap:13px;padding:13px;border:1px solid #f1f5f9;border-radius:11px;margin-bottom:9px;background:#fafafa;';
        item.innerHTML = `
            <span style="font-size:28px;flex-shrink:0;">${s.icon}</span>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:14px;color:#1e293b;">${s.title}</div>
                <div style="font-size:12px;color:#2563eb;font-weight:600;">${s.price}</div>
            </div>
            <button data-rm-fav="${s.id}" style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:16px;flex-shrink:0;">✕</button>`;
        item.querySelector('[data-rm-fav]').addEventListener('click', () => {
            toggleFav(s.id);
            const card = document.querySelector(`.service-card[data-id="${s.id}"] .svc-fav-btn`);
            if (card) { card.textContent = '☆'; card.style.borderColor = ''; card.style.background = 'white'; }
            updateServiceBadges();
            renderFavDrawer();
            showPortfolioToast('Favorilerden çıkarıldı');
        });
        body.appendChild(item);
    });
}

function renderCartDrawer() {
    const body = document.getElementById('cartDrawerBody');
    const foot = document.getElementById('cartDrawerFoot');
    const totEl= document.getElementById('cartTotalLabel');
    if (!body) return;
    const cartIds = getCart();
    if (!cartIds.length) {
        body.innerHTML = '<div style="text-align:center;padding:50px 20px;color:#94a3b8;"><div style="font-size:40px;margin-bottom:12px;">🛒</div>Sepetiniz boş.<br>"Sepete Ekle" butonunu kullanın.</div>';
        if (foot) foot.style.display = 'none';
        return;
    }
    body.innerHTML = '';
    cartIds.forEach(id => {
        const s = (window._allServices||[]).find(x => x.id === id);
        if (!s) return;
        const item = document.createElement('div');
        item.style.cssText = 'display:flex;align-items:center;gap:13px;padding:13px;border:1px solid #f1f5f9;border-radius:11px;margin-bottom:9px;background:#fafafa;';
        item.innerHTML = `
            <span style="font-size:28px;flex-shrink:0;">${s.icon}</span>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:700;font-size:14px;color:#1e293b;">${s.title}</div>
                <div style="font-size:12px;color:#2563eb;font-weight:600;">${s.price}</div>
            </div>
            <button data-rm-cart="${s.id}" style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:16px;flex-shrink:0;">✕</button>`;
        item.querySelector('[data-rm-cart]').addEventListener('click', () => {
            toggleCart(s.id);
            const btn = document.querySelector(`.service-card[data-id="${s.id}"] .svc-cart-btn`);
            if (btn) { btn.style.background = '#2563eb'; btn.textContent = '🛒 Sepete Ekle'; btn.dataset.inCart = 'false'; }
            updateServiceBadges();
            renderCartDrawer();
            showPortfolioToast('Sepetten çıkarıldı');
        });
        body.appendChild(item);
    });
    if (foot) foot.style.display = 'block';
    if (totEl) totEl.textContent = cartIds.length + ' hizmet';
}

function renderServices(services) {
    const grid = document.getElementById('servicesGrid');
    if (!grid) return;

    const noRes = document.getElementById('noResults');

    if (services.length === 0) {
        grid.innerHTML = '';
        if (noRes) noRes.style.display = 'block';
        return;
    }
    if (noRes) noRes.style.display = 'none';

    grid.innerHTML = '';
    services.forEach(s => {
        const faved  = isFav(s.id);
        const carded = inCart(s.id);
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.category = s.category;
        card.dataset.price    = extractPrice(s.price);
        card.dataset.id       = s.id;
        card.style.position   = 'relative';

        card.innerHTML = `
            <button class="svc-fav-btn" title="${faved?'Favorilerden çıkar':'Favorilere ekle'}"
                style="position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;
                border:2px solid ${faved?'#f59e0b':'#e2e8f0'};background:${faved?'#fffbeb':'white'};
                font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;
                transition:all .2s;z-index:1;">${faved?'⭐':'☆'}</button>
            <div class="service-icon">${s.icon}</div>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <ul class="service-list">${s.features.map(f=>`<li>${f}</li>`).join('')}</ul>
            <p class="service-price">${s.price}</p>
            <p class="service-duration">⏱ Süre: ${s.duration}</p>
            <button class="svc-cart-btn" data-in-cart="${carded}"
                style="margin-top:14px;width:100%;padding:10px;background:${carded?'#16a34a':'#2563eb'};
                color:white;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;
                transition:all .25s;display:flex;align-items:center;justify-content:center;gap:6px;">
                ${carded?'✓ Sepette':'🛒 Sepete Ekle'}</button>`;

        // Favori butonu
        card.querySelector('.svc-fav-btn').addEventListener('click', function() {
            const added = toggleFav(s.id);
            this.textContent   = added ? '⭐' : '☆';
            this.style.borderColor = added ? '#f59e0b' : '';
            this.style.background  = added ? '#fffbeb' : 'white';
            this.title = added ? 'Favorilerden çıkar' : 'Favorilere ekle';
            showPortfolioToast(added ? '⭐ Favorilere eklendi!' : 'Favorilerden çıkarıldı');
            updateServiceBadges();
            const fd = document.getElementById('favDrawer');
            if (fd && fd.style.right === '0px') renderFavDrawer();
        });

        // Sepet butonu
        card.querySelector('.svc-cart-btn').addEventListener('click', function() {
            const added = toggleCart(s.id);
            this.style.background = added ? '#16a34a' : '#2563eb';
            this.textContent      = added ? '✓ Sepette' : '🛒 Sepete Ekle';
            this.dataset.inCart   = added ? 'true' : 'false';
            showPortfolioToast(added ? '🛒 Sepete eklendi!' : 'Sepetten çıkarıldı');
            updateServiceBadges();
            const cd = document.getElementById('cartDrawer');
            if (cd && cd.style.right === '0px') renderCartDrawer();
        });

        grid.appendChild(card);
    });
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
