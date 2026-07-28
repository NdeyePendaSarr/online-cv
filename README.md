# 💼 Mon Site De CV — NPS

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

> **Challenge personnel (2024)** : reproduire fidèlement mon CV conçu sur Canva… en HTML et CSS purs, sans framework ni bibliothèque.

🔗 **Démo en ligne :** https://ndeyependasarr.github.io/Mon_Site_De_CvNPS/

## 🎯 L'histoire du projet

En 2024, j'ai d'abord conçu mon CV sur **Canva**. En le regardant, je me suis lancé un défi : *serais-je capable de le reproduire à l'identique en HTML/CSS ?*

Une fois la reproduction terminée, l'idée a grandi : ajouter une page « À propos », une galerie de mes participations à des événements tech, un formulaire de contact fonctionnel… et le CV est devenu un **site multi-pages complet**, codé entièrement à la main.

> 📌 Le contenu du CV est volontairement **figé à 2024**, fidèle à la version Canva d'origine (téléchargeable en PDF via le QR code du site). Ce projet est une démonstration de fondamentaux HTML/CSS, pas un CV vivant.

## 🛠️ Stack technique

- **HTML5 sémantique** — `header`, `nav`, `main`, `section`, `footer`, attributs ARIA
- **CSS3 pur** — variables CSS (`:root`), Flexbox, Grid, `clamp()`, media queries, pseudo-éléments
- **JavaScript vanilla** — minimal et ciblé (menu mobile, carrousel)
- **Formspree** — formulaire de contact fonctionnel sans backend
- **GitHub Pages** — hébergement et déploiement

## ✨ Points techniques notables

- 📐 **Timeline CSS robuste** : ligne et points générés en pseudo-éléments positionnés relativement à chaque entrée — le contenu peut changer, l'alignement tient.
- 🍔 **Menu burger en pur CSS** (checkbox hack), fermeture au scroll en JS.
- 🖼️ **Carrousel horizontal** avec `scroll-snap`, flèches de navigation et défilement tactile natif.
- ♿ **Accessibilité** : lien d'évitement, `:focus-visible`, `prefers-reduced-motion`, `aria-label`, textes alternatifs descriptifs.
- ⚡ **Performance** : images compressées, `loading="lazy"`, dimensions déclarées (`width`/`height`) contre le layout shift, `preconnect` sur les fonts.
- 📱 **Responsive** : 4 points de rupture, du mobile 360px au grand écran.
- 🔗 **Partage social** : balises Open Graph et Twitter Card avec URLs absolues.

## 📂 Structure

```
online-cv/
├── index.html          # Accueil — le CV reproduit depuis Canva
├── propos.html         # Présentation, projets, témoignages
├── loisir.html         # Loisirs + galerie AGCCI 4 (carrousel)
├── contact.html        # Formulaire de contact (Formspree)
├── 404.html             # Page d'erreur personnalisée
├── Fichiers_Css/
│   └── style.css       # Feuille de style unique, organisée par page
├── js/
│   └── main.js          # Script commun (menu, carrousel)
├── Images/               # Ressources optimisées
├── NPS-Cv-Pro.pdf       # Le CV Canva original
└── LICENSE
```

## 🚀 Lancer en local

Aucune dépendance, aucun build :

```bash
git clone https://github.com/NdeyePendaSarr/online-cv.git
cd online-cv
# Ouvrir index.html dans un navigateur, ou :
python -m http.server 8000
```

## 📄 Licence

Ce projet est sous licence MIT — voir le fichier [LICENSE](./LICENSE) pour plus de détails. Le contenu personnel (CV, textes, images) reste ma propriété ; c'est le code qui est librement réutilisable.

## 👩🏾‍💻 Autrice

**Ndeye Penda Sarr** — Développeuse Web Full-Stack, Dakar 🇸🇳

- GitHub : [@NdeyePendaSarr](https://github.com/NdeyePendaSarr/)
- GitLab : [@NPS_Geek](https://gitlab.com/NPS_Geek)
- LinkedIn : [ndeye-penda-sarr](https://www.linkedin.com/in/ndeye-penda-sarr-493150318/)

---

© 2024 – 2026 Ndeye Penda Sarr
