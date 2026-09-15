// champs formulaire
const form = document.querySelector('form');
const idInPut = document.querySelector('#prod-id');
const nomInPut = document.querySelector('#prod-title');
const descriptionInPut = document.querySelector('#prod-desc');
const prixInPut = document.querySelector('#prod-price');

// zones de carte
const idZone = document.querySelector('#id')
const nomZone = document.querySelector('#nom');
const descriptionZone = document.querySelector('#desc');
const prixZone = document.querySelector('#price');


// fonction d'affichage des données
function modifierCarte2(event){
    event.preventDefault();

    if (idInPut === idZone) {
        idZone.textContent = idInPut.value;
        nomZone.textContent = nomInPut.value;
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

    // 2. On cherche la carte qui contient le bon numéro d'ID affiché
    toutesLesCartes.forEach(carte => {
        const idZoneHtml = carte.querySelector('.product-id');
        
        // Si la zone existe et que son texte contient le numéro tapé dans le formulaire
        if (idZoneHtml && idZoneHtml.textContent.includes(idInPut.value)) {
            carteTrouvee = carte;
        }
    });

    // Si aucun objet ne correspond au numéro tapé
    if (!carteTrouvee) {
        alert("Aucun objet trouvé avec ce numéro d'ID.");
        return;
    }

    // 3. On cible les zones modifiables de la carte qu'on vient de trouver
    const nomZone = carteTrouvee.querySelector('h2');
    const descriptionZone = carteTrouvee.querySelector('.description');
    const prixZone = carteTrouvee.querySelector('.price');

    // 4. On modifie l'information UNIQUEMENT si la case du formulaire n'est pas vide
    if (nomInPut.value.trim() !== "") {
        nomZone.textContent = nomInPut.value;
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
