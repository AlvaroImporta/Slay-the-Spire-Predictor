function Redirect(url) {
    window.location.href = url;
}

function GetCharacter() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('char');
}

function LoadCharacterData() {
    const character = GetCharacter();
    const character_data = characters_dict[character];
    document.getElementById('character-name').innerHTML = `Character: ${character}`;
    document.getElementById('max-hp').value = character_data.max_hp;
    document.getElementById('entering-hp').value = character_data.max_hp;

    console.log(character_data.initial_cards);
    return character_data;
}

//

const cardImages = LoadCharacterData().cards;
// Función para actualizar la imagen de la carta
function updateCardImage(cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    const placeholder = document.getElementById(cardposition + "-placeholder");
    const searchKey = searchInput.value.trim();
    console.log(searchKey);

    // Verifica si la carta existe en el diccionario de cartas
    if (cardImages.hasOwnProperty(searchKey)) {
        const imgSrc = cardImages[searchKey];

        // Crea la nueva imagen
        const imgElement = document.createElement("img");
        imgElement.id = cardposition;
        imgElement.src = imgSrc;
        imgElement.alt = searchKey;
        imgElement.className = "card-image";

        // Reemplaza el contenido del div
        placeholder.innerHTML = "";
        placeholder.appendChild(imgElement);
    } else {
        // Si la clave no existe, muestra un mensaje de error o deja el div vacío
        placeholder.innerHTML = "No card found.";
    }
}

const relicImages = relics_dict;
// Función para actualizar la imagen de la carta
function updateRelicImage(relposition) {
    const searchInput = document.getElementById(relposition + "-search");
    const placeholder = document.getElementById(relposition + "-placeholder");
    const searchKey = searchInput.value.trim();
    console.log(searchKey);

    // Verifica si la reliquia existe en el diccionario de cartas
    if (relicImages.hasOwnProperty(searchKey)) {
        const imgSrc = relicImages[searchKey];

        // Crea la nueva imagen
        const imgElement = document.createElement("img");
        imgElement.id = relposition;
        imgElement.src = imgSrc;
        imgElement.alt = searchKey;
        imgElement.className = "relic-image";

        // Reemplaza el contenido del div
        placeholder.innerHTML = "";
        placeholder.appendChild(imgElement);
    } else {
        // Si la clave no existe, muestra un mensaje de error o deja el div vacío
        placeholder.innerHTML = "No relic found.";
    }
}

//

// Función para mostrar sugerencias
function showSuggestions(cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    const suggestionsDiv = document.getElementById("suggestions-" + cardposition);
    const searchKey = searchInput.value.toLowerCase();

    // Limpia las sugerencias previas
    suggestionsDiv.innerHTML = '';

    // Muestra las sugerencias
    if (searchKey) {
        const suggestions = Object.keys(cardImages).filter(card => card.toLowerCase().includes(searchKey));
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = suggestion;
            suggestionItem.onclick = () => selectSuggestion(suggestion, cardposition);
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

// Función para manejar la selección de una sugerencia
function selectSuggestion(suggestion, cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    searchInput.value = suggestion;
    updateCardImage(cardposition);
    document.getElementById("suggestions-" + cardposition).innerHTML = '';
}


// Función para mostrar sugerencias
function showSuggestions(cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    const suggestionsDiv = document.getElementById("suggestions-" + cardposition);
    const searchKey = searchInput.value.toLowerCase();

    // Limpia las sugerencias previas
    suggestionsDiv.innerHTML = '';

    // Muestra las sugerencias cartas
    if (searchKey) {
        let suggestions = [];
        if (cardposition.includes("card")) {
            suggestions = Object.keys(cardImages).filter(card => card.toLowerCase().includes(searchKey));
        } else {
            suggestions = Object.keys(relicImages).filter(relic => relic.toLowerCase().includes(searchKey));
        }
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = suggestion;
            suggestionItem.onclick = () => selectSuggestion(suggestion, cardposition);
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

// Función para manejar la selección de una sugerencia
function selectSuggestion(suggestion, cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    searchInput.value = suggestion;
    if (cardposition.includes("card")) {
        updateCardImage(cardposition);
    } else {
        updateRelicImage(cardposition);
    }
    document.getElementById("suggestions-" + cardposition).innerHTML = '';
}




