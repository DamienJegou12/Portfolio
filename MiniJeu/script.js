// Fichier script.js

// --- VARIABLES PRINCIPALES ---

let inventaire = {
    ronrons: 0,
    croquettes: 0, 
    jouets: 0,
    dollars: 0
};

let salles = {
    nombre: 1, // Commence avec une salle
    cout: 100 // Coût initial pour acheter une nouvelle salle
};

let gainDollars = 5; // Gain en dollars par jouet vendu

let production = {
    ronronsParSeconde: 0,
    croquettesParSeconde: 0,
    jouetsParSeconde: 0,
    venteJouetsParSeconde: 0
};

let objetsAchetables = {
    arbreLuxe: {
        cout: {
            ronrons: 500,
            croquettes: 200
        },
        production: 10,
        nombre: 0
    }
};


// --- FONCTIONS DE MISE À JOUR ET DE JEU ---

/**
 * Met à jour l'affichage de toutes les ressources à l'écran.
 */
function mettreAJourAffichage() {
    document.getElementById('compteur-ronrons').textContent = Math.floor(inventaire.ronrons);
    document.getElementById('compteur-croquettes').textContent = inventaire.croquettes;
    document.getElementById('compteur-jouets').textContent = inventaire.jouets;
    document.getElementById('compteur-dollars').textContent = inventaire.dollars + " $";
    document.getElementById('ronrons-par-seconde').textContent = production.ronronsParSeconde;
    document.getElementById('croquettes-par-seconde').textContent = 25*production.croquettesParSeconde;
    document.getElementById('jouets-par-seconde').textContent = production.jouetsParSeconde;
    document.getElementById('vente-jouets-par-seconde').textContent = production.venteJouetsParSeconde;
    document.getElementById('nombre-salles').textContent = salles.nombre;
    document.getElementById('cout-salle').textContent = salles.cout + " $";
}

/**
 * Produit des ressources chaque seconde en fonction du taux de production.
 */
function produireRessources() {
    inventaire.ronrons += production.ronronsParSeconde;
    if(inventaire.croquettes >= 55*production.croquettesParSeconde){
        inventaire.ronrons -= 55*production.croquettesParSeconde;
        inventaire.croquettes += 25*production.croquettesParSeconde;
    }
    if(inventaire.croquettes >= 25*production.jouetsParSeconde){
        inventaire.croquettes -= 25*production.jouetsParSeconde;
        inventaire.jouets += production.jouetsParSeconde;
    }
    if(inventaire.jouets >= 10*production.venteJouetsParSeconde){
        inventaire.jouets -= 10*production.venteJouetsParSeconde;
        inventaire.dollars += production.venteJouetsParSeconde * gainDollars;
    }
    mettreAJourAffichage();
}

/**
 * Gère l'achat d'un sac de croquettes.
 */
function acheterCroquettes() {
    let coutRonrons = 50;
    let gainCroquettes = 25;

    // Vérifie si le joueur a assez de ronrons
    if (inventaire.ronrons >= coutRonrons) {
        inventaire.ronrons -= coutRonrons; // Soustrait le coût
        inventaire.croquettes += gainCroquettes; // Ajoute les croquettes
        
        console.log("Achat de croquettes réussi !");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de ronrons pour acheter des croquettes !");
    }
}

/**
 * Gère l'achat de l'arbre à chat de luxe.
 */
function acheterArbreLuxe() {
    let arbre = objetsAchetables.arbreLuxe;
    let cout = arbre.cout;
    if (production.ronronsParSeconde >= 100 * salles.nombre) {
        alert("Vous ne pouvez pas avoir une production de ronrons supérieur à " + (100 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
        return;
    }
    if (inventaire.ronrons >= cout.ronrons && inventaire.croquettes >= cout.croquettes) {
        // Soustraire le coût des ressources
        inventaire.ronrons -= cout.ronrons;
        inventaire.croquettes -= cout.croquettes;

        // Augmenter le nombre d'arbres et la production
        arbre.nombre++;
        production.ronronsParSeconde += arbre.production;

        console.log("Achat réussi ! Vous avez maintenant " + arbre.nombre + " arbres à chat de luxe.");
        mettreAJourAffichage(); // Mettre à jour l'affichage après l'achat
    } else {
        console.log("Ressources insuffisantes pour l'arbre à chat de luxe !");
        alert("Ressources insuffisantes ! Il vous faut 500 ronrons et 200 croquettes.");
    }
}

/**
 * Gère la fabrication d'un jouet.
 */
function fabriquerJouet() {
    let coutCroquettes = 20;

    if (inventaire.croquettes >= coutCroquettes) {
        inventaire.croquettes -= coutCroquettes;
        inventaire.jouets++;

        console.log("Vous avez fabriqué un jouet !");
        mettreAJourAffichage();
    } else {
        console.log("Pas assez de croquettes pour fabriquer un jouet.");
        alert("Il vous faut au moins 10 croquettes pour fabriquer un jouet.");
    }
}

/**
 * Gère l'achat d'une nouvelle salle.
 */
function acheterSalle() {
    if (inventaire.dollars >= salles.cout) {
        inventaire.dollars -= salles.cout; // Soustrait le coût en dollars
        salles.nombre++; // Augmente le nombre de salles
        salles.cout = Math.floor(salles.cout * 1.5); // Augmente le coût pour la prochaine salle
        console.log("Achat de salle réussi ! Vous avez maintenant " + salles.nombre + " salles.");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de dollars pour acheter une nouvelle salle !");
    }
}

/**
 * Gère la vente de jouets.
 */
function vendreJouets() {
    if (inventaire.jouets >= 10) {
        inventaire.jouets-=10;
        inventaire.dollars += gainDollars;
        console.log("Vente de jouet réussie !");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de jouets à vendre !");
    }
}

/**
 * Gère  l'achat automatique de croquettes.
 */
function acheterCroquettesAuto() {
    let coutDollars = 200;
    if (production.croquettesParSeconde >= 50 * salles.nombre){
        alert("Vous ne pouvez pas avoir une production de ronrons supérieur à " + (50 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
        return;
    }
    if (inventaire.dollars >= coutDollars) {
        inventaire.dollars -= coutDollars;
        production.croquettesParSeconde += 1; // Augmente la production de croquettes
        console.log("Achat automatique de croquettes réussi !");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de dollars pour acheter l'achat automatique de croquettes !");
    }
}

/**
 * Gère la fabrication automatique de jouets.
 */
function fabriquerJouetsAuto() {
    let coutDollars = 300;
    if (production.jouetsParSeconde >= 5 * salles.nombre){
        alert("Vous ne pouvez pas avoir une production de jouets supérieur à " + (5 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
        return;
    }
    if (inventaire.dollars >= coutDollars) {
        inventaire.dollars -= coutDollars;
        production.jouetsParSeconde += 1; // Augmente la production de jouets
        console.log("Fabrication automatique de jouets réussi !");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de dollars pour acheter la fabrication automatique de jouets !");
    }
}
/**
 * Gère la vente automatique de jouets.
 */
function vendreJouetsAuto() {
    let coutDollars = 500;
    if (production.venteJouetsParSeconde >= 2 * salles.nombre){
        alert("Vous ne pouvez pas avoir une production de vente de jouets supérieur à " + (2 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
        return;
    }
    if (inventaire.dollars >= coutDollars) {
        inventaire.dollars -= coutDollars;
        production.venteJouetsParSeconde += 1; // Augmente la vente de jouets
        console.log("Vente automatique de jouets réussi !");
        mettreAJourAffichage();
    } else {
        alert("Pas assez de dollars pour acheter la vente automatique de jouets !");
    }
}

// --- ÉCOUTEURS D'ÉVÉNEMENTS --- (partie à compléter dans votre fichier)

// Clic sur le bouton principal pour générer des ronrons
document.getElementById('bouton-clic').addEventListener('click', function() {
    inventaire.ronrons++;
    mettreAJourAffichage();
});

// Clic sur le bouton d'achat de croquettes
document.getElementById('acheter-croquettes').addEventListener('click', acheterCroquettes);

// Clic sur le bouton d'achat de l'arbre
document.getElementById('acheter-arbre-luxe').addEventListener('click', acheterArbreLuxe);

// Clic sur le bouton de fabrication de jouet
document.getElementById('fabriquer-jouet').addEventListener('click', fabriquerJouet);

// NOUVEAUX ÉCOUTEURS À AJOUTER
document.getElementById('vendre-jouets').addEventListener('click', vendreJouets);
document.getElementById('acheter-salle').addEventListener('click', acheterSalle);
document.getElementById('acheter-croquettes-auto').addEventListener('click', acheterCroquettesAuto);
document.getElementById('fabriquer-jouets-auto').addEventListener('click', fabriquerJouetsAuto);
document.getElementById('vendre-jouets-auto').addEventListener('click', vendreJouetsAuto);


// --- INITIALISATION DU JEU ---

// Démarrer la production automatique toutes les secondes (1000 ms)
setInterval(produireRessources, 1000);

// Mettre à jour l'affichage une première fois au chargement de la page
window.onload = mettreAJourAffichage;