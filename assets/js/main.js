// =============================================
// MAIN.JS – Portfolio Alexandre Guiblain 2025
// Version finale : tout-en-un, optimisé, pro
// =============================================

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. AOS – Animations au scroll (meilleure config)
  AOS.init({
    duration: 1000,
    easing: 'ease-out-quart',
    once: true,
    offset: 120,
    delay: 100
  });

  // 2. Menu actif au scroll (optimisé + robuste)
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Au chargement de la page

  // 3. Filtrage des projets avec Isotope (seulement si la section existe)
  const projectGrid = document.querySelector('.project-grid');
  if (projectGrid && typeof Isotope !== 'undefined') {
    const iso = new Isotope(projectGrid, {
      itemSelector: '.col-lg-4',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s',
      percentPosition: true
    });

    document.querySelectorAll('.project-filters li').forEach(btn => {
      btn.addEventListener('click', function () {
        // Mise à jour visuelle du filtre actif
        document.querySelectorAll('.project-filters li').forEach(b => b.classList.remove('filter-active'));
        this.classList.add('filter-active');

        // Application du filtre
        const filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
      });
    });
  }

  // 4. Effet typing hero (ultra fluide + compatible espaces)
  const heroText = document.querySelector('.loader-text');
  if (heroText) {
    const originalText = heroText.textContent.trim();
    heroText.innerHTML = '';

    originalText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.animation = `typing 0.8s ease forwards ${index * 0.05}s`;
      heroText.appendChild(span);
    });
  }

  // 5. Smooth scroll pour tous les liens internes (sauf filtres Isotope)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Empêche le smooth scroll sur les filtres Isotope
      if (this.closest('.project-filters')) return;

      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 90,
            behavior: 'smooth'
          });

          // Met à jour l'URL sans recharger
          history.pushState(null, null, href);
        }
      }
    });
  });

  // 6. Back to top – apparition douce après 600px
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Accessibilité : focus visible au clavier
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-tabbing');
    }
  });
});

// Animation typing (doit être en dehors du DOMContentLoaded si utilisé dans style.animation)
const style = document.createElement('style');
style.textContent = `
  @keyframes typing {
    from { opacity: 0; transform: translateY(15px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .back-to-top {
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s ease;
    transform: translateY(20px);
  }
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .user-tabbing :focus-visible {
    outline: 3px solid var(--accent) !important;
    outline-offset: 4px;
  }
`;
document.head.appendChild(style);


// ===========================================
  // 8. MENU MOBILE (Toggle)
  // ===========================================
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  const icon = mobileNavToggle.querySelector('i');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      // On ajoute/enlève la classe qui fait apparaître le menu
      sidebar.classList.toggle('mobile-nav-active');
      
      // On change l'icône : Barres <-> Croix
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    });
  }

  // Bonus : Fermer le menu quand on clique sur un lien (UX)
  const navLinksMobile = document.querySelectorAll('.nav-menu a');
  navLinksMobile.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('mobile-nav-active')) {
            sidebar.classList.remove('mobile-nav-active');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });
  });


// ===========================================
// EFFET MACHINE À ÉCRIRE PRO
// ===========================================
const typedTextSpan = document.getElementById("typed-text");
const phrases = ["Développeur", "Passionné par le Dev", "Étudiant BTS SIO", "Futur Développeur SLAM"];
const typingSpeed = 100;
const erasingSpeed = 50;
const newPhraseDelay = 2000; // Pause avant d'effacer
let phraseIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < phrases[phraseIndex].length) {
    typedTextSpan.textContent += phrases[phraseIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingSpeed);
  } else {
    setTimeout(erase, newPhraseDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingSpeed);
  } else {
    phraseIndex++;
    if (phraseIndex >= phrases.length) phraseIndex = 0;
    setTimeout(type, typingSpeed + 1100);
  }
}

// Lancement au chargement
document.addEventListener("DOMContentLoaded", function() {
  if (phrases.length) setTimeout(type, newPhraseDelay);
});