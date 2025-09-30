// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  // Close on link click (mobile)
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
} else {
  // Fallback
  revealEls.forEach((el) => el.classList.add('visible'));
}

// Portfolio modals
const backdrop = document.querySelector('.modal-backdrop');
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal || !backdrop) return;
  backdrop.classList.add('open');
  modal.removeAttribute('hidden');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  if (!backdrop) return;
  const openModalEl = backdrop.querySelector('.modal:not([hidden])');
  if (openModalEl) {
    openModalEl.setAttribute('hidden', '');
    openModalEl.setAttribute('aria-hidden', 'true');
  }
  backdrop.classList.remove('open');
  document.body.style.overflow = '';
}
if (backdrop) {
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal-target]');
  if (trigger) {
    e.preventDefault();
    const id = trigger.getAttribute('data-modal-target');
    openModal(id);
  }
  if (e.target.closest('.modal .close')) {
    e.preventDefault();
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// FAQ accordion (used on blog page)
const accordions = document.querySelectorAll('.accordion');
accordions.forEach((acc) => {
  const header = acc.querySelector('.accordion-header');
  const body = acc.querySelector('.accordion-body');
  if (!header || !body) return;
  header.addEventListener('click', () => {
    const isOpen = acc.classList.toggle('open');
    header.setAttribute('aria-expanded', String(isOpen));
    body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
  });
});

// Lazy-load helper: ensure all <img> have loading="lazy"
document.querySelectorAll('img:not([loading])').forEach((img) => {
  img.setAttribute('loading', 'lazy');
});

// Homepage transparent header scroll handler
(function(){
  const body = document.body;
  if (!body.classList.contains('home')) return;
  function updateScrollState(){
    if (window.scrollY > 10) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('load', updateScrollState);
  document.addEventListener('DOMContentLoaded', updateScrollState);
})();
// ========== POPUP PORTFOLIO ==========
// Données des projets
const projectData = {
  mcdo: {
      title: "McDonald's",
      subtitle: "Campagne Marketing",
      wallImage: "images/portfolio/mcdo-wall.png",
      logoImage: "images/portfolio/mcdo.jpg",
      tasks: [
          {
              title: "Refonte identité visuelle",
              description: "Création d'une nouvelle charte graphique moderne et impactante pour renforcer l'image de marque et attirer une clientèle plus large."
          },
          {
              title: "Stratégie digitale",
              description: "Développement d'une stratégie de communication multi-canaux incluant réseaux sociaux, publicité en ligne et marketing d'influence."
          }
      ]
  },
  transitio: {
      title: "Transitio",
      subtitle: "Site Web",
      wallImage: "images/portfolio/transitio-wall.png",
      logoImage: "images/portfolio/transitio.png",
      tasks: [
          {
              title: "Développement web",
              description: "Site responsive avec technologies modernes HTML5, CSS3, JavaScript pour une performance optimale sur tous les appareils."
          },
          {
              title: "UX/UI Design",
              description: "Interface intuitive optimisée pour l'expérience utilisateur avec un design moderne et une navigation fluide."
          }
      ]
  },
  conciergerie: {
      title: "Conciergerie",
      subtitle: "Application Web",
      wallImage: "images/portfolio/conciergerie-wall.png",
      logoImage: "images/portfolio/conciergerie.png",
      tasks: [
          {
              title: "Application web",
              description: "Plateforme de gestion des services avec interface intuitive permettant aux clients de suivre leurs demandes en temps réel."
          },
          {
              title: "Système de réservation",
              description: "Tableau de bord administrateur complet et système de réservation en ligne avec notifications automatiques."
          }
      ]
  },
  brebis: {
      title: "Brebis",
      subtitle: "Identité Visuelle",
      wallImage: "images/portfolio/brebis-wall.png",
      logoImage: "images/portfolio/brebis.png",
      tasks: [
          {
              title: "Création logo",
              description: "Design d'un logo moderne et élégant reflétant les valeurs authentiques de la marque avec une approche minimaliste."
          },
          {
              title: "Charte graphique",
              description: "Univers visuel cohérent incluant palette de couleurs, typographies et supports de communication print et digital."
          }
      ]
  },
  robbie: {
      title: "Robbie Lens",
      subtitle: "Portfolio Photographe",
      wallImage: "images/portfolio/web-designer-wall.png",
      logoImage: "images/portfolio/robbie-lens.png",
      tasks: [
          {
              title: "Site portfolio",
              description: "Développement d'un site vitrine élégant mettant en valeur le travail artistique avec des transitions fluides et un design épuré."
          },
          {
              title: "Galerie interactive",
              description: "Interface responsive avec galerie photo optimisée pour les performances, le référencement et l'expérience mobile."
          }
      ]
  },
  "CV-Designer": {
      title: "Web Designer",
      subtitle: "CV Interactif",
      wallImage: "images/portfolio/web-designer-wall.png",
      logoImage: "images/portfolio/web-designer.png",
      tasks: [
          {
              title: "CV interactif",
              description: "Création d'un CV numérique moderne et interactif avec animations CSS et JavaScript pour une présentation dynamique des compétences."
          },
          {
              title: "Design responsive",
              description: "Interface adaptative pour tous les supports et appareils avec une attention particulière à l'accessibilité et à l'ergonomie."
          }
      ]
  }
};

// Fonction pour ouvrir le popup
function openPopup(projectId) {
  const popup = document.getElementById('projectPopup');
  const popupBody = document.getElementById('popup-body');
  const project = projectData[projectId];

  if (project) {
      popupBody.innerHTML = `
          <div class="popup-header" style="background-image: url('${project.wallImage}')">
              <h1>${project.title}</h1>
              <img src="${project.logoImage}" alt="${project.title}" class="popup-logo">
          </div>
          <div class="popup-body">
              <div class="popup-content-left">
                  <h2>${project.subtitle}</h2>
                  <p>Découvrez les réalisations de ce projet et les solutions que nous avons apportées.</p>
              </div>
              <div class="popup-content-right">
                  <ul>
                      ${project.tasks.map(task => `
                          <li>
                              <strong>${task.title}</strong>
                              ${task.description}
                          </li>
                      `).join('')}
                  </ul>
              </div>
          </div>
      `;
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
  }
}

// Fonction pour fermer le popup
function closePopup() {
  const popup = document.getElementById('projectPopup');
  popup.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners pour fermer le popup
document.addEventListener('DOMContentLoaded', function() {
  // Fermer le popup en cliquant sur l'overlay
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('popup-overlay')) {
          closePopup();
      }
  });

  // Fermer le popup avec la touche Escape
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
          closePopup();
      }
  });
});