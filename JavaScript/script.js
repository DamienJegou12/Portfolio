const container = document.getElementById("projects-container");
let projects = [];

// Génération des projets
function displayProjects(list) {
  container.innerHTML = "";
  list.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-category", project.category);

    // Génération des liens s'ils existent
    let linksHTML = "";
    if (project.links) {
      for (const [label, url] of Object.entries(project.links)) {
        linksHTML += `<a href="${url}" target="_blank" class="project-link">${label}</a> `;
      }
    }

    card.innerHTML = `
      <img src="${project.img}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="links">${linksHTML}</div>
    `;
    container.appendChild(card);
  });
  reveal(); // appliquer animation
}

// Animation au scroll
function reveal() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', reveal);

// Charger les projets depuis JSON
fetch("JSON/projets.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    return res.json();
  })
  .then(data => {
    projects = data;
    displayProjects(projects);
  })
  .catch(err => {
    console.error("Erreur de chargement JSON :", err);
    container.innerHTML = `<p style="color:red">Impossible de charger les projets. Vérifie le chemin ou la syntaxe du JSON.</p>`;
  });

// Filtrage
const buttons = document.querySelectorAll('.filter-btns button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if (category === 'all') {
      displayProjects(projects);
    } else {
      const filtered = projects.filter(p => p.category === category);
      displayProjects(filtered);
    }
  });
});

const skillsContainer = document.getElementById("skills-container");
let skills = [];

// Affichage des compétences
function displaySkills(list) {
  skillsContainer.innerHTML = "";
  list.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");
    card.setAttribute("data-category", skill.category);

    // Vérifie si la compétence possède un score
    let scoreHTML = "";
    if (skill.score) {
      scoreHTML = `<p class="skill-score"><strong>Score :</strong> ${skill.score}</p>`;
    }

    // Vérifie si la compétence possède un lien
    let linkHTML = "";
    if (skill.link) {
      // L'attribut target="_blank" permet d'ouvrir le lien dans un nouvel onglet
      linkHTML = `<a href="${skill.link}" target="_blank" class="skill-link" style="display: block; margin-top: 10px; color: blue; text-decoration: underline;">Voir l'attestation</a>`;
    }

    card.innerHTML = `
      <img src="${skill.img}" alt="${skill.name}">
      <h4>${skill.name}</h4>
      ${scoreHTML}
      ${linkHTML}
    `;
    skillsContainer.appendChild(card);
  });
  revealSkills();
}

// Animation au scroll pour skills
function revealSkills() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealSkills);

// Charger les compétences depuis JSON
fetch("JSON/skills.json")
  .then(res => res.json())
  .then(data => {
    skills = data;
    displaySkills(skills);
  })
  .catch(err => console.error("Erreur de chargement skills.json :", err));

// Filtrage des compétences
const skillButtons = document.querySelectorAll('.filter-skills button');
skillButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if (category === 'all') {
      displaySkills(skills);
    } else {
      const filtered = skills.filter(s => s.category === category);
      displaySkills(filtered);
    }
  });
});

const internshipsContainer = document.getElementById("internships-container");
let internships = [];

// Affichage des stages
function displayInternships(list) {
  internshipsContainer.innerHTML = "";
  list.forEach(stage => {
    const card = document.createElement("div");
    card.classList.add("internship-card");
    card.setAttribute("data-year", stage.year);

    // Générer liste technologies
    let techList = "";
    if (stage.technologies) {
      techList = stage.technologies.map(t => `<span class="tech">${t}</span>`).join(" ");
    }

    card.innerHTML = `
      <h3>${stage.company}</h3>
      <h4>${stage.subject}</h4>
      <p><strong>Période :</strong> ${stage.startDate} → ${stage.endDate}</p>
      <p>${stage.text}</p>
      <p><strong>Technologies :</strong> ${techList}</p>
    `;

    internshipsContainer.appendChild(card);
  });
  revealInternships();
}

// Animation au scroll
function revealInternships() {
  const cards = document.querySelectorAll('.internship-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealInternships);

// Charger les stages depuis JSON
fetch("JSON/stages.json")
  .then(res => res.json())
  .then(data => {
    internships = data;
    displayInternships(internships);
  })
  .catch(err => console.error("Erreur de chargement internships.json :", err));

// Filtrage par année
const internshipButtons = document.querySelectorAll('.filter-internships button');

internshipButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const year = btn.dataset.year;
    if (year === 'all') {
      displayInternships(internships);
    } else {
      const filtered = internships.filter(i => i.year === year);
      displayInternships(filtered);
    }
  });
});

