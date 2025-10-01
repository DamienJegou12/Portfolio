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

    card.innerHTML = `
      <img src="${skill.img}" alt="${skill.name}">
      <h4>${skill.name}</h4>
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

// === FILTRAGE DES COMPÉTENCES ===
/*const skillButtons = document.querySelectorAll('.filter-skills button');

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
});*/
