<?php
// Données dynamiques (projets)
$projects = [
    [
        'title' => 'Portfolio PHP',
        'description' => 'Un portfolio dynamique en PHP et JS.',
        'category' => 'PHP',
        'img' => 'https://via.placeholder.com/400x200'
    ],
    [
        'title' => 'Jeu en JavaScript',
        'description' => 'Un petit jeu interactif.',
        'category' => 'JS',
        'img' => 'https://via.placeholder.com/400x200'
    ],
    [
        'title' => 'Site HTML/CSS',
        'description' => "Un site statique avec animations CSS. pour faire joli et développer mes compétences afin de faire un beau portfolio et d'avoir une bonne note en PPP, car avec un beau portfolio j'aurai plus de chance d'avoir un stage. Et gagner de l'argent pour m'acheter une voiture.",
        'category' => 'HTML/CSS',
        'img' => 'https://via.placeholder.com/400x200'
    ],
    [
        'title' => 'Application Web',
        'description' => 'Application avec back-end PHP.',
        'category' => 'PHP',
        'img' => 'https://via.placeholder.com/400x200'
    ]
];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Portfolio Dynamique</title>
  <style>
    body { font-family: Arial; margin: 0; padding: 0; background: #f9f9f9; }
    header { background: #2c3e50; color: white; padding: 40px; text-align: center; }
    header h1 { margin: 0; }
    section { max-width: 1000px; margin: 40px auto; padding: 20px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .card { background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 20px; opacity: 0; transform: translateY(50px); transition: all 0.5s ease; }
    .card img { width: 100%; border-radius: 8px; margin-bottom: 10px; }
    h2 { border-left: 4px solid #2c3e50; padding-left: 10px; margin-bottom: 20px; }
    .filter-btns { text-align: center; margin-bottom: 20px; }
    .filter-btns button { margin: 0 5px; padding: 8px 16px; cursor: pointer; border: none; border-radius: 4px; background: #2c3e50; color: white; }
    .filter-btns button:hover { background: #34495e; }
    .card.show { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>

<header>
  <h1>Damien JEGOU</h1>
  <p>Développeur - Étudiant en 3e année en BUT informatique</p>
</header>

<section>
  <h2>Mes Projets</h2>

  <div class="filter-btns">
    <button data-category="all">Tous</button>
    <button data-category="PHP">PHP</button>
    <button data-category="JS">JS</button>
    <button data-category="HTML/CSS">HTML/CSS</button>
  </div>

  <div class="grid">
    <?php foreach($projects as $project): ?>
      <div class="card" data-category="<?= $project['category'] ?>">
        <img src="<?= $project['img'] ?>" alt="<?= $project['title'] ?>">
        <h3><?= $project['title'] ?></h3>
        <p><?= $project['description'] ?></p>
      </div>
    <?php endforeach; ?>
  </div>
</section>

<script>
  // Animation au scroll
  const cards = document.querySelectorAll('.card');

  function reveal() {
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if(rect.top < window.innerHeight - 50) {
        card.classList.add('show');
      }
    });
  }

  window.addEventListener('scroll', reveal);
  window.addEventListener('load', reveal);

  // Filtre des projets
  const buttons = document.querySelectorAll('.filter-btns button');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      cards.forEach(card => {
        if(category === 'all' || card.dataset.category === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
      reveal(); // pour ré-animer les cards visibles
    });
  });
</script>

</body>
</html>
