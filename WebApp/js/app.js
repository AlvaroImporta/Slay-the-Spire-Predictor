
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

function clearCards(){
    document.getElementById('card1-search').value = '';
    document.getElementById('card2-search').value = '';
    document.getElementById('card3-search').value = '';
    document.getElementById('card1-placeholder').innerHTML = '';
    document.getElementById('card2-placeholder').innerHTML = '';
    document.getElementById('card3-placeholder').innerHTML = '';
    document.getElementById('suggestions-card1').innerHTML = '';
    document.getElementById('suggestions-card2').innerHTML = '';
    document.getElementById('suggestions-card3').innerHTML = '';
    document.getElementById('card1-prediction').textContent = '';
    document.getElementById('card2-prediction').textContent = '';
    document.getElementById('card3-prediction').textContent = '';
    document.getElementById('skip-prediction').textContent = '';
}

function clearRelics(){
    document.getElementById('relic1-search').value = '';
    document.getElementById('relic2-search').value = '';
    document.getElementById('relic3-search').value = '';
    document.getElementById('relic1-placeholder').innerHTML = '';
    document.getElementById('relic2-placeholder').innerHTML = '';
    document.getElementById('relic3-placeholder').innerHTML = '';
    document.getElementById('suggestions-relic1').innerHTML = '';
    document.getElementById('suggestions-relic2').innerHTML = '';
    document.getElementById('suggestions-relic3').innerHTML = '';
    document.getElementById('relic1-prediction').textContent = '';
    document.getElementById('relic2-prediction').textContent = '';
    document.getElementById('relic3-prediction').textContent = '';
    document.getElementById('relic-skip-prediction').textContent = '';
}

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

        li.appendChild(buttonlevel);
        li.appendChild(button);
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

    fetch('/predict', {
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
    .then(data => {
        document.getElementById('card1-prediction').textContent = data[0];
        document.getElementById('card2-prediction').textContent = data[1];
        document.getElementById('card3-prediction').textContent = data[2];
        document.getElementById('skip-prediction').textContent = `Skip: ${data[3]}`;
    })
    .catch(error => console.error('Error:', error));
}
