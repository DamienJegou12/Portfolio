// Fichier script.js

// --- VARIABLES PRINCIPALES ---

let inventaire = {
    ronrons: 0,
    croquettes: 0, // Remis à 0 pour que l'achat soit nécessaire
    jouets: 0
};

let production = {
    ronronsParSeconde: 0
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
    document.getElementById('ronrons-par-seconde').textContent = production.ronronsParSeconde;
}

/**
 * Produit des ressources chaque seconde en fonction du taux de production.
 */
function produireRessources() {
    inventaire.ronrons += production.ronronsParSeconde;
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
    let coutCroquettes = 10;

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


// --- ÉCOUTEURS D'ÉVÉNEMENTS ---

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


// --- INITIALISATION DU JEU ---

// Démarrer la production automatique toutes les secondes (1000 ms)
setInterval(produireRessources, 1000);

// Mettre à jour l'affichage une première fois au chargement de la page
window.onload = mettreAJourAffichage;