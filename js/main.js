/* ============================================
   KAZA DECOR — Main JavaScript
   Language switcher, scroll effects, animations
   ============================================ */

const translations = window.i18n;
const contactPhone = '+14074130641';

// --- LANGUAGE SWITCHER ---
let currentLang = localStorage.getItem('kaza-lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kaza-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-href]').forEach(el => {
    const key = el.getAttribute('data-i18n-href');
    if (translations[lang] && translations[lang][key]) {
      el.href = translations[lang][key];
    }
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    if (translations[lang] && translations[lang][key]) {
      el.alt = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  updateContactLinks(lang);
}

function updateContactLinks(lang) {
  const whatsappButton = document.getElementById('contactWhatsapp');
  const smsButton = document.getElementById('contactSms');
  const whatsappText = translations[lang]?.['cta.whatsappText'];
  const smsBody = translations[lang]?.['cta.sms.body'];

  if (whatsappButton && whatsappText) {
    whatsappButton.href = `https://wa.me/${contactPhone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappText)}`;
  }

  if (smsButton && smsBody) {
    smsButton.href = `sms:${contactPhone}?&body=${encodeURIComponent(smsBody)}`;
  }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// --- NAVBAR SCROLL ---
const navbar = document.getElementById('navbar');
const hero = document.getElementById('hero');

function handleScroll() {
  const pastHero = window.scrollY > hero.offsetHeight - 80;
  navbar.classList.toggle('scrolled', pastHero);
}

window.addEventListener('scroll', handleScroll, { passive: true });

// --- MOBILE MENU ---
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// --- SCROLL ANIMATIONS ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll(
  '.service-card, .process-step, .about-text, .about-image, .story-text, .story-images, .cta-content'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// --- INIT ---
handleScroll();
setLanguage(currentLang);
