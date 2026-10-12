// Key de stockage dans le LocalStorage
const STORAGE_KEY = "catalogue_jeux_v4";

// Données par défaut si le LocalStorage est vide (configurées au 12/10/2026)
const catalogueInitial = [
  {
    id: "jeu_1",
    titre: "Minecraft",
    studio: "Mojang Studios",
    annee: 2011,
    prix: 29.99,
    dateAjout: new Date(2026, 9, 12).toISOString() // 9 = Octobre (les mois commencent à 0 en JS)
  },
  {
    id: "jeu_2",
    titre: "Zelda: Ocarina of Time",
    studio: "Nintendo",
    annee: 1998,
    prix: 9.99,
    dateAjout: new Date(2026, 9, 12).toISOString()
  }
];

// État global de l'application
let catalogue = [];

// ==========================================
// 1. PERSISTANCE ET SÉRIALISATION
// ==========================================

const chargerCatalogue = () => {
  const donneesStockees = localStorage.getItem(STORAGE_KEY);
  if (donneesStockees) {
    try {
      catalogue = JSON.parse(donneesStockees);
    } catch (e) {
      console.error("Erreur lors de la lecture du LocalStorage", e);
      catalogue = [...catalogueInitial];
    }
  } else {
    catalogue = [...catalogueInitial];
    sauvegarderCatalogue();
  }
};

const sauvegarderCatalogue = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogue));
};

// ==========================================
// 2. FONCTIONS AVANCÉES & CALCULS
// ==========================================

const mettreAJourStatistiques = (collection) => {
  const totalTitres = collection.length;

  if (totalTitres === 0) {
    document.querySelector("#stat-total").textContent = "0";
    document.querySelector("#stat-valeur").textContent = "0.00 €";
    document.querySelector("#stat-moyen").textContent = "0.00 €";
    document.querySelector("#stat-min-max").textContent = "Max: 0€ | Min: 0€";
    return;
  }

  const valeurTotale = collection.reduce((acc, jeu) => acc + jeu.prix, 0);
  const prixMoyen = valeurTotale / totalTitres;

  const tousLesPrix = collection.map((jeu) => jeu.prix);
  const prixMax = Math.max(...tousLesPrix);
  const prixMin = Math.min(...tousLesPrix);

  document.querySelector("#stat-total").textContent = totalTitres;
  document.querySelector("#stat-valeur").textContent = `${valeurTotale.toFixed(2)} €`;
  document.querySelector("#stat-moyen").textContent = `${prixMoyen.toFixed(2)} €`;
  document.querySelector("#stat-min-max").textContent = `Max: ${prixMax.toFixed(2)}€ | Min: ${prixMin.toFixed(2)}€`;
};

const formaterDateISO = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};

const determinerGeneration = (annee) => {
  if (annee < 2000) return "Rétro";
  if (annee <= 2015) return "Âge d'or";
  return "Moderne";
};

// ==========================================
// 3. AFFICHAGE ET TRANSFORMATION DYNAMIQUE
// ==========================================

const afficherCatalogue = (collection) => {
  const conteneurListe = document.querySelector("#liste-jeux");
  if (!conteneurListe) return;
  
  conteneurListe.innerHTML = "";

  if (collection.length === 0) {
    conteneurListe.innerHTML = `<p class="text-center py-8" style="grid-column: 1 / -1; color: #fff; font-style: italic;">Aucun jeu ne correspond à la recherche.</p>`;
    return;
  }

  const cartesHTML = collection.map((jeu) => {
    const generation = determinerGeneration(jeu.annee);
    const dateFormatee = formaterDateISO(jeu.dateAjout);

    return `
      <article class="product-card">
        <div class="product-info">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
            <span class="product-id">${generation}</span>
            <span style="font-size: 0.75rem; color: #7f8c8d;">Ajouté le ${dateFormatee}</span>
          </div>
          <h2>${jeu.titre}</h2>
          <p class="description" style="margin-top: 0.5rem;">Studio : ${jeu.studio} (${jeu.annee})</p>
          <div class="product-meta">
            <span class="price">${jeu.prix.toFixed(2)} €</span>
            <button 
              onclick="supprimerJeu('${jeu.id}')" 
              class="buy-btn" 
              title="Supprimer" 
              aria-label="Supprimer ${jeu.titre}"
            >
              Supprimer
            </button>
          </div>
        </div>
      </article>
    `;
  });

  conteneurListe.innerHTML = cartesHTML.join("");
};

const filtrerEtAfficherCatalogue = () => {
  const rechercheInput = document.querySelector("#recherche-texte");
  const generationSelect = document.querySelector("#filtre-generation");
  
  const texteRecherche = rechercheInput ? rechercheInput.value.toLowerCase().trim() : "";
  const filtreGeneration = generationSelect ? generationSelect.value : "tous";

  const resultatsFiltres = catalogue.filter((jeu) => {
    const correspondTexte =
      jeu.titre.toLowerCase().includes(texteRecherche) ||
      jeu.studio.toLowerCase().includes(texteRecherche);

    const genJeu = determinerGeneration(jeu.annee);
    const correspondGen =
      filtreGeneration === "tous" || genJeu === filtreGeneration;

    return correspondTexte && correspondGen;
  });

  afficherCatalogue(resultatsFiltres);
  mettreAJourStatistiques(resultatsFiltres);
};

// ==========================================
// 4. ACTIONS ET ÉVÉNEMENTS
// ==========================================

const ajouterJeu = (event) => {
  event.preventDefault();

  const champTitre = document.querySelector("#champ-titre");
  const champStudio = document.querySelector("#champ-studio");
  const champAnnee = document.querySelector("#champ-annee");
  const champPrix = document.querySelector("#champ-prix");

  const titre = champTitre.value.trim();
  const studio = champStudio.value.trim();
  const annee = parseInt(champAnnee.value, 10);
  const prix = parseFloat(champPrix.value);

  if (!titre || !studio || isNaN(annee) || isNaN(prix) || annee <= 0 || prix < 0) {
    alert("Veuillez saisir des informations valides.");
    return;
  }

  const nouveauJeu = {
    id: `jeu_${Date.now()}`,
    titre: titre,
    studio: studio,
    annee: annee,
    prix: prix,
    dateAjout: new Date().toISOString() // Utilise l'heure exacte de création
  };

  catalogue = [...catalogue, nouveauJeu];

  sauvegarderCatalogue();
  filtrerEtAfficherCatalogue();

  document.querySelector("#formulaire-jeu").reset();
};

const supprimerJeu = (idASupprimer) => {
  catalogue = catalogue.filter((jeu) => jeu.id !== idASupprimer);
  sauvegarderCatalogue();
  filtrerEtAfficherCatalogue();
};

const reinitialiserDonnees = () => {
  if (confirm("Voulez-vous réinitialiser le catalogue par défaut ?")) {
    localStorage.removeItem(STORAGE_KEY);
    chargerCatalogue();
    filtrerEtAfficherCatalogue();
  }
};

const verifierSaisieTitre = (champ) => {
  if (champ.value.trim().length > 0 && champ.value.trim().length < 2) {
    champ.style.borderColor = "#e23241";
  } else {
    champ.style.borderColor = "#ccc";
  }
};

// ==========================================
// 5. INITIALISATION
// ==========================================
const initialiserApp = () => {
  chargerCatalogue();
  filtrerEtAfficherCatalogue();
};

document.addEventListener("DOMContentLoaded", initialiserApp);
