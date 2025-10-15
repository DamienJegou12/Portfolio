// Fichier script.js

// --- VARIABLES PRINCIPALES ---

let inventaire = {
    ronrons: 0,
    croquettes: 0, // Remis à 0 pour que l'achat soit nécessaire
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
    document.getElementById('croquettes-par-seconde').textContent = production.croquettesParSeconde;
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
        alert("Il vous faut au moins 20 croquettes pour fabriquer un jouet.");
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
        alert("Vous ne pouvez pas avoir une production de croquettes supérieure à " + (50 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
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
        alert("Vous ne pouvez pas avoir une production de jouets supérieure à " + (5 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
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
        alert("Vous ne pouvez pas avoir une production de vente de jouets supérieure à " + (2 * salles.nombre) + " par seconde avec votre nombre de salles actuel. Achetez plus de salles !");
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

// --- NOUVELLES FONCTIONS POUR STOPPER LES PRODUCTIONS ---

/**
 * Stoppe une unité de production de croquettes.
 */
function stopperCroquettesAuto() {
    if (production.croquettesParSeconde > 0) {
        production.croquettesParSeconde -= 1;
        mettreAJourAffichage();
    } else {
        alert("La production de croquettes est déjà à 0 !");
    }
}

/**
 * Stoppe une unité de fabrication de jouets.
 */
function stopperJouetsAuto() {
    if (production.jouetsParSeconde > 0) {
        production.jouetsParSeconde -= 1;
        mettreAJourAffichage();
    } else {
        alert("La fabrication de jouets est déjà à 0 !");
    }
}

/**
 * Stoppe une unité de vente de jouets.
 */
function stopperVenteAuto() {
    if (production.venteJouetsParSeconde > 0) {
        production.venteJouetsParSeconde -= 1;
        mettreAJourAffichage();
    } else {
        alert("La vente de jouets est déjà à 0 !");
    }
}


// --- ÉCOUTEURS D'ÉVÉNEMENTS ---

// Clic sur le bouton principal pour générer des ronrons
document.getElementById('bouton-clic').addEventListener('click', function() {
    inventaire.ronrons++;
    mettreAJourAffichage();
});

// Clics sur les boutons d'actions manuelles
document.getElementById('acheter-croquettes').addEventListener('click', acheterCroquettes);
document.getElementById('fabriquer-jouet').addEventListener('click', fabriquerJouet);
document.getElementById('vendre-jouets').addEventListener('click', vendreJouets);

// Clics sur les boutons d'améliorations
document.getElementById('acheter-salle').addEventListener('click', acheterSalle);
document.getElementById('acheter-arbre-luxe').addEventListener('click', acheterArbreLuxe);
document.getElementById('acheter-croquettes-auto').addEventListener('click', acheterCroquettesAuto);
document.getElementById('fabriquer-jouets-auto').addEventListener('click', fabriquerJouetsAuto);
document.getElementById('vendre-jouets-auto').addEventListener('click', vendreJouetsAuto);

// Clics sur les nouveaux boutons "Stopper"
document.getElementById('stopper-croquettes-auto').addEventListener('click', stopperCroquettesAuto);
document.getElementById('stopper-jouets-auto').addEventListener('click', stopperJouetsAuto);
document.getElementById('stopper-vente-auto').addEventListener('click', stopperVenteAuto);


// --- INITIALISATION DU JEU ---

// Démarrer la production automatique toutes les secondes (1000 ms)
setInterval(produireRessources, 1000);

// Mettre à jour l'affichage une première fois au chargement de la page
window.onload = mettreAJourAffichage;