/* ============================================================
   main.js — Script commun du site
   Pages : Accueil, À propos, Loisirs, Contact, 404
   Auteur : Ndeye Penda Sarr
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* --------------------------------------------------------
     1. Chargement dynamique header / footer
     -------------------------------------------------------- */
  loadComponent('header', 'components/header.html');
  loadComponent('footer', 'components/footer.html');

  function loadComponent(selector, url) {
    const element = document.querySelector(selector);
    if (!element) return;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`Erreur ${response.status}`);
        return response.text();
      })
      .then(html => {
        element.outerHTML = html;
        if (selector === 'header') {
          setActiveNavLink();
        }
      })
      .catch(err => {
        console.warn(`Composant ${selector} non chargé :`, err.message);
        if (selector === 'header') {
          const warning = document.createElement('div');
          warning.className = 'header-fallback-warning';
          warning.textContent = '⚠️ Menu de navigation limité (chargement impossible).';
          warning.style.cssText = 'background:#ffcc00;color:#0F056B;text-align:center;padding:0.5rem;font-size:0.9rem;';
          const header = document.querySelector('header');
          header && header.insertAdjacentElement('afterend', warning);
        }
      });
  }

  function setActiveNavLink() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* --------------------------------------------------------
     2. Menu burger
     -------------------------------------------------------- */
  window.addEventListener('scroll', function () {
    const check = document.getElementById('check');
    if (check && check.checked) {
      check.checked = false;
    }
  });

  /* --------------------------------------------------------
     3. Carrousel galerie avec désactivation des flèches
     -------------------------------------------------------- */
  const galleries = document.querySelectorAll('.camp-gallery');
  galleries.forEach(gallery => {
    const track = gallery.querySelector('.camp-gallery-track');
    const prevBtn = gallery.querySelector('.camp-gallery-arrow.prev');
    const nextBtn = gallery.querySelector('.camp-gallery-arrow.next');
    if (!track || !prevBtn || !nextBtn) return;

    const updateArrowState = () => {
      const scrollLeft = track.scrollLeft;
      const maxScrollLeft = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = scrollLeft <= 0;
      nextBtn.disabled = scrollLeft >= maxScrollLeft - 1;
    };

    prevBtn.addEventListener('click', () => {
      const firstPhoto = track.querySelector('.camp-photo');
      if (!firstPhoto) return;
      const itemWidth = firstPhoto.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      track.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      const firstPhoto = track.querySelector('.camp-photo');
      if (!firstPhoto) return;
      const itemWidth = firstPhoto.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 16;
      track.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateArrowState, { passive: true });
    window.addEventListener('resize', updateArrowState);
    updateArrowState();
  });

  /* --------------------------------------------------------
     4. Formulaire AJAX (Formspree)
     -------------------------------------------------------- */
  const contactForm = document.querySelector('form[action*="formspree.io"]');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = e.target;
      const submitBtn = form.querySelector('input[type="submit"]');
      const originalText = submitBtn.value;
      submitBtn.disabled = true;
      submitBtn.value = 'Envoi en cours…';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          form.reset();
          showMessage('Message envoyé avec succès ! Merci.', 'success');
        } else {
          const result = await response.json();
          throw new Error(result.error || 'Erreur serveur.');
        }
      } catch (err) {
        console.error(err);
        showMessage(err.message || 'Erreur réseau, veuillez réessayer.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.value = originalText;
      }
    });

    function showMessage(text, type) {
      const old = document.querySelector('.form-message');
      if (old) old.remove();
      const msg = document.createElement('div');
      msg.className = `form-message form-message-${type}`;
      msg.setAttribute('role', 'alert');
      msg.setAttribute('aria-live', 'assertive');
      msg.textContent = text;
      contactForm.parentNode.insertBefore(msg, contactForm);
      setTimeout(() => msg.remove(), 10000);
    }
  }
});