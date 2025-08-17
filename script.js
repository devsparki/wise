/* ===== util ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

/* ===== icons ===== */
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
});

/* ===== smooth scroll ===== */
function scrollToId(id) {
  const el = typeof id === 'string' ? document.querySelector(id) : id;
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
$$('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', e => {
    const id = btn.getAttribute('data-scroll');
    scrollToId(id);
    // close mobile menu if open
    hideMobileMenu();
  });
});

/* ===== mobile menu ===== */
const navMobile = $('#navMobile');
const toggleBtn = $('.nav-toggle');
function showMobileMenu() {
  if (!navMobile) return;
  navMobile.hidden = false;
  toggleBtn.innerHTML = '<i data-lucide="x"></i>';
  window.lucide && window.lucide.createIcons();
}
function hideMobileMenu() {
  if (!navMobile) return;
  navMobile.hidden = true;
  toggleBtn.innerHTML = '<i data-lucide="menu"></i>';
  window.lucide && window.lucide.createIcons();
}
toggleBtn && toggleBtn.addEventListener('click', () => {
  if (navMobile.hidden) showMobileMenu(); else hideMobileMenu();
});
$$('.nav-mobile-link').forEach(b => b.addEventListener('click', hideMobileMenu));

/* ===== reveal on scroll (framer-motion like) ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // optional: unobserve for "once" behavior
      io.unobserve(entry.target);
      // stagger children
      const children = Array.from(entry.target.querySelectorAll(':scope .reveal'));
      children.forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), 80 * i);
      });
    }
  });
}, { threshold: 0.2 });

$$('.reveal').forEach(el => io.observe(el));

/* ===== cookie consent ===== */
const cookieKey = 'wise_cookie_consent_v1';
const cookieBanner = $('#cookie');
function getConsent() {
  return localStorage.getItem(cookieKey);
}
function setConsent(value) {
  localStorage.setItem(cookieKey, value);
}
function showCookie() {
  if (cookieBanner) cookieBanner.hidden = false;
}
function hideCookie() {
  if (cookieBanner) cookieBanner.hidden = true;
}
if (!getConsent()) showCookie();
$$('[data-cookie="accept"]').forEach(b => b.addEventListener('click', () => {
  setConsent('accepted'); hideCookie();
}));
$$('[data-cookie="reject"]').forEach(b => b.addEventListener('click', () => {
  setConsent('rejected'); hideCookie();
}));

/* ===== footer year ===== */
const copy = $('#copyright');
if (copy) {
  const year = new Date().getFullYear();
  copy.textContent = `© ${year} Wise Tech Studio. Todos os direitos reservados.`;
}

/* ===== optional: basic form handler (keeps mailto behavior) ===== */
$('#contactForm')?.addEventListener('submit', (e) => {
  // let the mailto open normally; here we could add basic validation if needed
  // e.preventDefault();
});

/* ===== accessibility niceties ===== */
document.addEventListener('keydown', (e) => {
  // close mobile nav with ESC
  if (e.key === 'Escape' && navMobile && !navMobile.hidden) hideMobileMenu();
});
