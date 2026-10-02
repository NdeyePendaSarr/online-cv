/* ============================================================
   main.js — Script commun du site
   Pages : Accueil, À propos, Loisirs, Contact, 404
   Auteur : Ndeye Penda Sarr
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  /* --------------------------------------------------------
     1. Menu burger accessible (bouton + aria-expanded)
     -------------------------------------------------------- */
  const btn = document.querySelector('.menu-toggle');
  const nav = document.getElementById('menu');
  if (btn && nav) {
    const setOpen = open => {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      nav.classList.toggle('open', open);
    };
    btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  }

  /* --------------------------------------------------------
     2. Carrousel galerie avec désactivation des flèches
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
     3. Formulaire AJAX (Formspree)
     -------------------------------------------------------- */
  const contactForm = document.querySelector('form[action*="formspree.io"]');
  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = e.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';

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
          const data = await response.json().catch(() => ({}));
          const detail = (data.errors || []).map(e => e.message).join(' ') || data.error;
          throw new Error(detail || "Le serveur a refusé l'envoi. Réessaie ou écris-moi par email.");
        }
      } catch (err) {
        console.error(err);
        showMessage(err.message || 'Erreur réseau, veuillez réessayer.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
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
      // Ramène le message dans la zone visible (le bouton Soumettre est en bas du formulaire)
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      msg.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
      setTimeout(() => msg.remove(), 10000);
    }
  }
});