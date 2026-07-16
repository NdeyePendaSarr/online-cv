/* ============================================================
   main.js — Script commun du site
   Pages : Accueil, À propos, Loisirs, Contact
   Auteur : Ndeye Penda Sarr
   ============================================================ */

/* Ferme le menu burger dès que l'utilisateur fait défiler la page */
window.addEventListener('scroll', function () {
  const check = document.getElementById('check');
  if (check && check.checked) check.checked = false;
});

/* Carrousel de la galerie "camps de code" (page Loisirs uniquement).
   querySelectorAll renvoie une liste vide sur les autres pages :
   le code est donc inoffensif partout ailleurs. */
document.querySelectorAll('.camp-gallery-arrow').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const track = btn.closest('.camp-gallery').querySelector('.camp-gallery-track');
    const step = track.clientWidth * 0.7;
    track.scrollBy({
      left: btn.classList.contains('next') ? step : -step,
      behavior: 'smooth'
    });
  });
});
