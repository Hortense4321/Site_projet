// champs formulaire
const form = document.querySelector('form');
const typeInPut = document.querySelector('#prod-type');
const nomInPut = document.querySelector('#prod-title');
const descriptionInPut = document.querySelector('#prod-desc');
const prixInPut = document.querySelector('#prod-price');

// zones de carte
const typeZone = document.querySelector('#type');
const nomZone = document.querySelector('#nom');
const descriptionZone = document.querySelector('#desc');
const prixZone = document.querySelector('#price');


// fonction d'affichage des données
function modifierCarte2(event){
    event.preventDefault();

    if (idInPut === idZone) {
        nomZone.textContent = nomInPut.value;
        typeZone.textContent = typeInPut.value;
        descriptionZone.textContent = descriptionInPut.value;
        prixZone.textContent = Number(prixInPut.value).toFixed(2);
    }
};

function modifierCarte(event) {
    event.preventDefault();

    // 1. On récupère toutes les cartes de la boutique
    const toutesLesCartes = document.querySelectorAll('.product-card');
    
    // On prépare une variable pour stocker la carte trouvée
    let carteTrouvee = null;

    // 2. On cible les zones modifiables de la carte qu'on vient de trouver
    const nomZone = carteTrouvee.querySelector('h2');
    const typeZone = carteTrouvee.querySelector('.description');
    const descriptionZone = carteTrouvee.querySelector('.description');
    const prixZone = carteTrouvee.querySelector('.price');

    // 3. On modifie l'information UNIQUEMENT si la case du formulaire n'est pas vide
    if (nomInPut.value.trim() !== "") {
        nomZone.textContent = nomInPut.value;
    }
    if (typeInPut.value.trim() !== "") {
        nomZone.textContent = typeInPut.value;
    }
    if (descriptionInPut.value.trim() !== "") {
        descriptionZone.textContent = descriptionInPut.value;
    }

    if (prixInPut.value.trim() !== "") {
        prixZone.textContent = Number(prixInPut.value).toFixed(2) + " €";
    }

    // Optionnel : vide le formulaire après validation
    event.target.reset();
}
