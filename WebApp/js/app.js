
function Redirect(url) {
    window.location.href = url;
}

function GetCharacter() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('char');
}

const button_choose_cards = document.getElementById('choose-better-cards')
const button_choose_relics = document.getElementById('choose-better-relics')
const button_clear_cards = document.getElementById('clear-cards')
const button_clear_relics = document.getElementById('clear-relics')
const button_add_card= document.getElementById('add-card')
const button_add_relic= document.getElementById('add-relic')


function TurnOffButtons() {
    button_choose_cards.disabled = true;
    button_choose_relics.disabled = true;
    button_add_card.disabled = true;
    button_add_relic.disabled = true;
}

let initialHTML = {};

document.addEventListener('DOMContentLoaded', function() {
    initialHTML = {
        card1: document.getElementById('card1-container').innerHTML,
        card2: document.getElementById('card2-container').innerHTML,
        card3: document.getElementById('card3-container').innerHTML,
        relic1: document.getElementById('relic1-container').innerHTML,
        relic2: document.getElementById('relic2-container').innerHTML,
        relic3: document.getElementById('relic3-container').innerHTML
    };
});

function clearCards() {
    document.getElementById('card1-container').innerHTML = initialHTML.card1;
    document.getElementById('card2-container').innerHTML = initialHTML.card2;
    document.getElementById('card3-container').innerHTML = initialHTML.card3;
}

function clearRelics(){
    document.getElementById('relic1-container').innerHTML = initialHTML.relic1;
    document.getElementById('relic2-container').innerHTML = initialHTML.relic2;
    document.getElementById('relic3-container').innerHTML = initialHTML.relic3;
}

// function clearCards(){
//     document.getElementById('card1-search').value = '';
//     document.getElementById('card2-search').value = '';
//     document.getElementById('card3-search').value = '';
//     document.getElementById('card1-placeholder').innerHTML = '';
//     document.getElementById('card2-placeholder').innerHTML = '';
//     document.getElementById('card3-placeholder').innerHTML = '';
//     document.getElementById('suggestions-card1').innerHTML = '';
//     document.getElementById('suggestions-card2').innerHTML = '';
//     document.getElementById('suggestions-card3').innerHTML = '';
//     document.getElementById('card1-prediction').textContent = '';
//     document.getElementById('card2-prediction').textContent = '';
//     document.getElementById('card3-prediction').textContent = '';
//     document.getElementById('skip-prediction').textContent = '';
// }

// function clearRelics(){
//     document.getElementById('relic1-search').value = '';
//     document.getElementById('relic2-search').value = '';
//     document.getElementById('relic3-search').value = '';
//     document.getElementById('relic1-placeholder').innerHTML = '';
//     document.getElementById('relic2-placeholder').innerHTML = '';
//     document.getElementById('relic3-placeholder').innerHTML = '';
//     document.getElementById('suggestions-relic1').innerHTML = '';
//     document.getElementById('suggestions-relic2').innerHTML = '';
//     document.getElementById('suggestions-relic3').innerHTML = '';
//     document.getElementById('relic1-prediction').textContent = '';
//     document.getElementById('relic2-prediction').textContent = '';
//     document.getElementById('relic3-prediction').textContent = '';
//     document.getElementById('relic-skip-prediction').textContent = '';
// }

function LoadCharacterData() {

    const character = GetCharacter();
    const character_data = characters_dict[character];
    document.getElementById('character-name').innerHTML = 'Character:' + character;
    document.getElementById('max-hp').value = character_data.max_hp;
    document.getElementById('entering-hp').value = character_data.max_hp;
    
    const card_list = document.getElementById('card-list');
    const relic_list = document.getElementById('relic-list');

    character_data.initial_cards.forEach(card => {
        const li = document.createElement('li');
        li.textContent = card;
        li.className = 'card-item';

        const button = document.createElement('button');
        button.textContent = 'X';
        button.onclick = () => {
            card_list.removeChild(li);
        };
        const buttonlevel = document.createElement('button');
        buttonlevel.textContent = '↑';
        buttonlevel.onclick = () => {
            li.textContent = card + '+1';
            const button = document.createElement('button');
            button.textContent = 'X';
            button.onclick = () => {
                card_list.removeChild(li);
            };
            li.appendChild(button);
        };

        li.appendChild(button);
        li.appendChild(buttonlevel);
        card_list.appendChild(li);
    });
   
    const li = document.createElement('li');
    li.textContent = character_data.initial_relic;
    li.className = 'relic-item';

    const button = document.createElement('button');
    button.textContent = 'X';
    button.onclick = () => {
        relic_list.removeChild(li);
    };

    li.appendChild(button);
    relic_list.appendChild(li);

    TurnOffButtons();

    return character_data;
}

function CheckAndToggleButtonChoose() {
    let card1 = document.getElementById('card1');
    let card2 = document.getElementById('card2');
    let card3 = document.getElementById('card3');

    let relic1 = document.getElementById('relic1');
    let relic2 = document.getElementById('relic2');
    let relic3 = document.getElementById('relic3');

    if (card1 && card2 && card3) {
        button_choose_cards.disabled = false;
    } else {
        button_choose_cards.disabled = true;
    }

    if (relic1 && relic2 && relic3) {
        button_choose_relics.disabled = false;
    } else {
        button_choose_relics.disabled = true;
    }
}

const observer = new MutationObserver(CheckAndToggleButtonChoose);
const config = { childList: true, subtree: true };
const targetNode = document.body;
observer.observe(targetNode, config);

const cardImages = LoadCharacterData().cards;
// Función para actualizar la imagen de la carta
function updateCardImage(cardposition) {
    const searchInput = document.getElementById(cardposition + "-search");
    const placeholder = document.getElementById(cardposition + "-placeholder");
    const searchKey = searchInput.value.trim();

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

function showSuggestions(position) {
    const searchInput = document.getElementById(position + "-search");
    const suggestionsDiv = document.getElementById("suggestions-" + position);
    const searchKey = searchInput.value.toLowerCase();

    // Limpia las sugerencias previas
    suggestionsDiv.innerHTML = '';

    // Muestra las sugerencias cartas
    if (searchKey) {
        let suggestions = [];
        if (position.includes("card")) {
            suggestions = Object.keys(cardImages).filter(card => card.toLowerCase().includes(searchKey));
        } else {
            suggestions = Object.keys(relicImages).filter(relic => relic.toLowerCase().includes(searchKey));
        }
        suggestions.forEach(suggestion => {
            const suggestionItem = document.createElement('div');
            suggestionItem.classList.add('suggestion-item');
            suggestionItem.innerText = suggestion;
            suggestionItem.onclick = () => selectSuggestion(suggestion, position);
            suggestionsDiv.appendChild(suggestionItem);
        });
    }
}

// Función para manejar la selección de una sugerencia
function selectSuggestion(suggestion, position) {
    const searchInput = document.getElementById(position + "-search");
    searchInput.value = suggestion;
    if (position.includes("card")) {
        updateCardImage(position);
    } else {
        updateRelicImage(position);
    }
    document.getElementById("suggestions-" + position).innerHTML = '';
}


function chooseBetterCards() {
    const maxHP = document.getElementById('max-hp').value;
    const enteringHP = document.getElementById('entering-hp').value;

    const cardItems = document.querySelectorAll('.card-item');
    const cards = []
    cardItems.forEach(item => {
        let textNode = item.firstChild;
        cards.push(textNode.textContent.replace('↑✗', ''));
    });

    const relicItems = document.querySelectorAll('.relic-item');
    const relics = []
    relicItems.forEach(item => {
        let textNode = item.firstChild;
        relics.push(textNode.textContent.replace('↑✗', ''));
    });

    const card1 = document.getElementById('card1').alt;
    const card2 = document.getElementById('card2').alt;
    const card3 = document.getElementById('card3').alt;

    const cardOptions = [
        [...cards, card1],
        [...cards, card2],
        [...cards, card3],
        cards
    ];

    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            character: GetCharacter(),
            max_hp: maxHP,
            entering_hp: enteringHP,
            card_options: cardOptions,
            relics: relics
        })
    })
    .then(response => response.json())
    .then(predictions => {
        document.getElementById('card1-prediction').textContent = predictions[0];
        document.getElementById('card2-prediction').textContent = predictions[1];
        document.getElementById('card3-prediction').textContent = predictions[2];
        document.getElementById('skip-prediction').textContent = `Skip: ${predictions[3]}`;
    })
    .catch(error => console.error('Error:', error));
}

function chooseBetterRelics() {
    const maxHP = document.getElementById('max-hp').value;
    const enteringHP = document.getElementById('entering-hp').value;

    const cardItems = document.querySelectorAll('.card-item');
    const cards = []
    cardItems.forEach(item => {
        let textNode = item.firstChild;
        cards.push(textNode.textContent.replace('↑✗', ''));
    });

    const relicItems = document.querySelectorAll('.relic-item');
    const relics = []
    relicItems.forEach(item => {
        let textNode = item.firstChild;
        relics.push(textNode.textContent.replace('↑✗', ''));
    });

    const relic1 = document.getElementById('relic1').alt;
    const relic2 = document.getElementById('relic2').alt;
    const relic3 = document.getElementById('relic3').alt;

    const relicOptions = [
        [...relics, relic1],
        [...relics, relic2],
        [...relics, relic3],
        relics
    ];

    fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            character: GetCharacter(),
            max_hp: maxHP,
            entering_hp: enteringHP,
            relic_options: relicOptions,
            cards: cards
        })
    })
    .then(response => response.json())
    .then(predictions => {
        document.getElementById('relic1-prediction').textContent = predictions[0];
        document.getElementById('relic2-prediction').textContent = predictions[1];
        document.getElementById('relic3-prediction').textContent = predictions[2];
        document.getElementById('relic-skip-prediction').textContent = `Skip: ${predictions[3]}`;
    })
    .catch(error => console.error('Error:', error));
}

// desde aqui son de alejandro
function showSuggestionsList(position) {
    const searchInput = document.getElementById(position + "-search");
    const suggestionsDiv = document.getElementById("suggestions-" + position);
    const searchKey = searchInput.value.toLowerCase();

    // Limpia las sugerencias previas
    suggestionsDiv.innerHTML = '';

    // Muestra las sugerencias cartas
    if (searchKey) {
        let suggestions = [];
        if (position.includes("card")) {
            const suggestions = Object.keys(cardImages).filter(card => card.toLowerCase().includes(searchKey));
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerText = suggestion;
                suggestionItem.onclick = () => selectSuggestionListCard(suggestion, position);
                suggestionsDiv.appendChild(suggestionItem);
            });
        } else {
            suggestions = Object.keys(relicImages).filter(relic => relic.toLowerCase().includes(searchKey));
            suggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.innerText = suggestion;
                suggestionItem.onclick = () => selectSuggestionListRelic(suggestion, position);
                suggestionsDiv.appendChild(suggestionItem);
            });
        }
    }
}

// Función para manejar la selección de una sugerencia en listas
function selectSuggestionListCard(suggestion, position) {
    const searchInput = document.getElementById(position + "-search");
    searchInput.value = suggestion;
    document.getElementById("suggestions-" + position).innerHTML = '';

    const cardSearch = document.getElementById('card0-search').value;
    if (cardImages.hasOwnProperty(cardSearch)) {
        button_add_card.disabled = false;
    } else {
        button_add_card.disabled = true;
    }
}

function eneableButtonAddCard() {
    const searchInput = document.getElementById("card0-search");
    const searchKey = searchInput.value.trim();
    console.log(searchKey);

    if (cardImages.hasOwnProperty(searchKey)) {
        button_add_card.disabled = false;
    } else {
        button_add_card.disabled = true;
    }
}

// Función para añadir una carta a la lista
function addCardToList() {
    const cardList = document.getElementById('card-list');
    const cardSearch = document.getElementById('card0-search').value;

    // Crear un nuevo elemento de lista para la carta
    const li = document.createElement('li');
    li.textContent = cardSearch;
    li.className = 'card-item';

    // Crear el botón para eliminar la carta
    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.className = "delete";
    removeButton.onclick = () => {
        cardList.removeChild(li);
    };

    // Crear el botón para subir el nivel de la carta
    const levelUpButton = document.createElement('button');
    levelUpButton.textContent = '↑';
    levelUpButton.className = "upgrade";
    levelUpButton.onclick = () => {
        li.textContent = cardSearch + '+1';
        const button = document.createElement('button');
        button.textContent = 'X';
        button.className = "delete";
        button.onclick = () => {
            cardList.removeChild(li);
        };
        li.appendChild(button);
    };

    // Añadir los botones al elemento de lista
    li.appendChild(removeButton);
    li.appendChild(levelUpButton);

    // Añadir el nuevo elemento de lista a la lista de cartas
    cardList.appendChild(li);
    document.getElementById('card0-search').value = ""
    button_add_card.disabled = true;
    document.getElementById('suggestions-card0').innerHTML = '';

}


// Función para manejar la selección de una sugerencia en listas
function selectSuggestionListRelic(suggestion, position) {
    const searchInput = document.getElementById(position + "-search");
    searchInput.value = suggestion;
    document.getElementById("suggestions-" + position).innerHTML = '';

    const relicList = document.getElementById('relic-list');
    const searchKey = searchInput.value.trim();
    // Obtén todos los elementos LI dentro del UL
    const elementosLi = relicList.getElementsByTagName('li');

    // Convierte el HTMLCollection a un Array
    const listaArray = Array.from(elementosLi);

    // Extrae el texto limpio de cada elemento <li> (sin el contenido del botón)
    const listaTextos = listaArray.map(li => {
        // Extrae el texto del elemento <li> y elimina cualquier texto de botones u otros elementos
        return li.childNodes[0].textContent.trim();
    });

    if (relicImages.hasOwnProperty(searchKey) && !listaTextos.includes(searchKey)) {
        button_add_relic.disabled = false;
    } else {
        button_add_relic.disabled = true;
    }
}

function eneableButtonAddRelic() {
    const searchInput = document.getElementById("relic0-search");
    const relicList = document.getElementById('relic-list');
    const searchKey = searchInput.value.trim();

    // Obtén todos los elementos LI dentro del UL
    const elementosLi = relicList.getElementsByTagName('li');

    // Convierte el HTMLCollection a un Array
    const listaArray = Array.from(elementosLi);

    // Extrae el texto limpio de cada elemento <li> (sin el contenido del botón)
    const listaTextos = listaArray.map(li => {
        // Extrae el texto del elemento <li> y elimina cualquier texto de botones u otros elementos
        return li.childNodes[0].textContent.trim();
    });

    if (relicImages.hasOwnProperty(searchKey) && !listaTextos.includes(searchKey)) {
        button_add_relic.disabled = false;
    } else {
        button_add_relic.disabled = true;
    }
}

// Función para añadir una carta a la lista
function addRelicToList() {
    const relicList = document.getElementById('relic-list');
    const relicSearch = document.getElementById('relic0-search').value;

    // Crear un nuevo elemento de lista para la carta
    const li = document.createElement('li');
    li.textContent = relicSearch;
    li.className = 'relic-item';

    const button = document.createElement('button');
    button.textContent = 'X';
    button.className = "delete";
    button.onclick = () => {
        relicList.removeChild(li);
    };

    // Añadir los botones al elemento de lista
    li.appendChild(button);

    // Añadir el nuevo elemento de lista a la lista de cartas
    relicList.appendChild(li);
    document.getElementById('relic0-search').value = ""
    button_add_relic.disabled = true;
    document.getElementById('suggestions-relic0').innerHTML = '';

}