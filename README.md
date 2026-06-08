# Mehmet Yeşin — Kişisel Portfolyo Sitesi

Ahi Evran Üniversitesi Bilgisayar Programcılığı bölümü Web Programlama dersi final projesi.

---

## 🚀 Özellikler

- **Responsive Tasarım** — Mobil, tablet ve masaüstü cihazlara uyumlu
- **Koyu / Açık Mod** — Tema değiştirme, tarayıcıda hatırlanır
- **Proje Filtreleme & Arama** — Kategoriye göre filtre + isim araması + A→Z sıralama
- **Hizmetler (JSON'dan Dinamik)** — `services-data.json` okunarak kartlar oluşturulur; fiyat sıralaması ve arama desteği
- **İletişim Formu** — PHP ile MySQL'e mesaj kaydeder
- **Kullanıcı Kayıt / Giriş** — PHP + MySQL, bcrypt şifre hash
- **Veritabanı İşlemleri** — Mesaj ekleme, listeleme, silme, güncelleme (okundu)
- **Yukarı Çık Butonu** — Scroll-to-top animasyonlu

---

## 🛠 Kullanılan Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | PHP 8+ |
| Veritabanı | MySQL |
| Versiyon Kontrolü | Git / GitHub |

---

## 📁 Dosya Yapısı

```
portfolio/
├── index.html          # Ana sayfa
├── about.html          # Hakkında
├── projects.html       # Projeler (arama + filtre + sıralama)
├── services.html       # Hizmetler (JSON'dan dinamik)
├── contact.html        # İletişim formu
├── auth.html           # Giriş / Kayıt
├── styles.css          # Tüm sitede ortak stiller
├── script.js           # Tüm JavaScript (temizlenmiş, tek DOMContentLoaded)
├── favicon.svg         # Site ikonu
├── services-data.json  # Hizmet verileri (JSON)
├── php/
│   ├── config.php      # Veritabanı bağlantısı
│   ├── register.php    # Kullanıcı kayıt API
│   ├── login.php       # Kullanıcı giriş API
│   ├── contact.php     # İletişim mesajı kaydet API
│   └── messages.php    # Mesaj listele / sil / güncelle API
└── sql/
    └── database.sql    # Veritabanı şeması ve örnek veriler
```

---

## ⚙️ Kurulum

### Gereksinimler
- PHP 8.0+
- MySQL 5.7+ veya MariaDB 10+
- Yerel sunucu: XAMPP, WAMP, Laragon veya benzeri

### Adımlar

1. Bu repoyu klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/portfolio.git
   ```

2. Klasörü sunucunuzun web dizinine taşıyın:
   - XAMPP: `C:/xampp/htdocs/portfolio`
   - WAMP: `C:/wamp/www/portfolio`

3. Veritabanını oluşturun:
   - phpMyAdmin'i açın
   - `sql/database.sql` dosyasını içe aktarın (Import)

4. `php/config.php` dosyasını açıp veritabanı bilgilerinizi girin:
   ```php
   define('DB_USER', 'root');   // MySQL kullanıcı adınız
   define('DB_PASS', '');       // MySQL şifreniz
   ```

5. Tarayıcıda açın:
   ```
   http://localhost/portfolio/
   ```

---

## 📋 Ödev Gereksinimleri Karşılama

| Madde | Durum |
|-------|-------|
| Kullanıcı Deneyimi — Arama kutusu | ✅ Projeler ve Hizmetler sayfasında |
| Kullanıcı Deneyimi — Kategori filtreleme | ✅ Her ikisinde de |
| Kullanıcı Deneyimi — İsim/fiyat sıralama | ✅ Her ikisinde de |
| API/Dinamik Veri — JSON'dan veri okuma | ✅ services-data.json → Hizmetler kartları |
| Veritabanı — Kullanıcı kayıt | ✅ register.php |
| Veritabanı — Kullanıcı giriş | ✅ login.php |
| Veritabanı — Veri ekleme | ✅ contact.php (mesaj kaydı) |
| Veritabanı — Veri listeleme | ✅ messages.php |
| Veritabanı — Silme / Güncelleme | ✅ messages.php (DELETE + PUT) |
| Kırık linkler düzeltildi | ✅ |
| Kod tekrarları azaltıldı | ✅ Tek DOMContentLoaded |
| Favicon | ✅ favicon.svg |
| README.md | ✅ Bu dosya |

---

## 👤 Geliştirici

**Mehmet Yeşin**
- Ahi Evran Üniversitesi, Bilgisayar Programcılığı
- E-posta: yesin.mehmet@ogr.ahievran.edu.tr
- Tel: +90 543 711 45 88

---

*© 2025 Mehmet Yeşin. Tüm hakları saklıdır.*
