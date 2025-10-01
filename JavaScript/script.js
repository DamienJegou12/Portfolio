const container = document.getElementById("projects-container");
let projects = [];

// Génération des projets
function displayProjects(list) {
  container.innerHTML = "";
  list.forEach(project => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-category", project.category);
    card.innerHTML = `
      <img src="${project.img}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
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
    if(rect.top < window.innerHeight - 50) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', reveal);

// Charger les projets depuis JSON
fetch("JSON/projets.json")
  .then(res => res.json())
  .then(data => {
    projects = data;
    displayProjects(projects);
  })
  .catch(err => console.error("Erreur de chargement JSON :", err));

// Filtrage
const buttons = document.querySelectorAll('.filter-btns button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    if(category === 'all') {
      displayProjects(projects);
    } else {
      const filtered = projects.filter(p => p.category === category);
      displayProjects(filtered);
    }
  });
});
