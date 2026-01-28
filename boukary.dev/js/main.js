/*
   Main JavaScript - Boukary DIALLO Portfolio
   */

document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initSmoothScroll();
});

/*
   Theme Toggle
   */
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');
  const body = document.body;

  const savedTheme = localStorage.getItem('pref-theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark');
    updateThemeIcons(true);
  }

  function toggleTheme() {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    localStorage.setItem('pref-theme', isDark ? 'dark' : 'light');
    updateThemeIcons(isDark);
  }

  function updateThemeIcons(isDark) {
    const sunIcons = document.querySelectorAll('.icon-sun');
    const moonIcons = document.querySelectorAll('.icon-moon');

    sunIcons.forEach(icon => icon.classList.toggle('hidden', !isDark));
    moonIcons.forEach(icon => icon.classList.toggle('hidden', isDark));
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('pref-theme')) {
      body.classList.toggle('dark', e.matches);
      updateThemeIcons(e.matches);
    }
  });
}

/* 
   Mobile Menu
*/
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = mobileMenu?.querySelectorAll('a');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const isOpen = mobileMenu.classList.contains('open');

      const icon = menuButton.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
      }
    });

    menuLinks?.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const icon = menuButton.querySelector('i');
        if (icon) icon.className = 'fas fa-bars text-xl';
      });
    });
  }
}

/* 
   Header Scroll
*/
function initHeaderScroll() {
  const header = document.getElementById('header');

  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
}

/*
   Scroll Reveal
*/
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;

    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  }

  checkReveal();
  window.addEventListener('scroll', checkReveal);
}

/*
   Smooth Scroll
*/
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });
}
