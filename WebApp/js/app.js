
function Redirect(url) {
    window.location.href = url;
}

function GetCharacter(character) {
    const character =  window.location.search = `?char=${character}`;
}


document.getElementById('character-name').textContent = `Character: Ironclad`;
document.getElementById('max-hp').textContent = character.max_hp;
document.getElementById('entering-hp').textContent = 54; // Assuming initial entering combat HP is always 54

const cardList = document.getElementById('card-list');
const relicList = document.getElementById('relic-list');

character.initial_cards.forEach(card => {
    addCardToList(card);
});

addRelicToList(character.initial_relic);

function addCard() {
    const cardName = document.getElementById('card-search').value;
    if (character.cards[cardName]) {
        addCardToList(cardName);
        document.getElementById('card-search').value = '';
    } else {
        alert('Card not found');
    }
}

function addCardToList(card) {
    const cardItem = document.createElement('div');
    cardItem.className = 'card-item';
    cardItem.textContent = card;

    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = '↑';
    upgradeButton.onclick = () => upgradeCard(cardItem);

    const removeButton = document.createElement('button');
    removeButton.textContent = '✗';
    removeButton.onclick = () => removeCard(cardItem);

    cardItem.appendChild(upgradeButton);
    cardItem.appendChild(removeButton);

    cardList.appendChild(cardItem);
}

function upgradeCard(cardItem) {
    cardItem.textContent += '+1';
}

function removeCard(cardItem) {
    cardList.removeChild(cardItem);
}

function addRelic() {
    const relicName = document.getElementById('relic-search').value;
    if (relics_dict[relicName]) {
        addRelicToList(relicName);
        document.getElementById('relic-search').value = '';
    } else {
        alert('Relic not found');
    }
}

function addRelicToList(relic) {
    const relicItem = document.createElement('div');
    relicItem.className = 'relic-item';
    relicItem.textContent = relic;

    const removeButton = document.createElement('button');
    removeButton.textContent = '✗';
    removeButton.onclick = () => removeRelic(relicItem);

    relicItem.appendChild(removeButton);

    relicList.appendChild(relicItem);
}

function removeRelic(relicItem) {
    relicList.removeChild(relicItem);
}

function chooseBetterCards() {
    const maxHP = document.getElementById('max-hp').textContent;
    const enteringHP = document.getElementById('entering-hp').textContent;

    const cardItems = document.querySelectorAll('.card-item');
    const cards = Array.from(cardItems).map(item => item.textContent.replace('↑✗', ''));

    const card1 = document.getElementById('card1-search').value;
    const card2 = document.getElementById('card2-search').value;
    const card3 = document.getElementById('card3-search').value;

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
            max_hp: maxHP,
            entering_hp: enteringHP,
            card_options: cardOptions,
            relics: character.initial_relic
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

function clearCards() {
    document.getElementById('card1-search').value = '';
    document.getElementById('card1-image').src = '';
    document.getElementById('card1-prediction').textContent = '0.0';
    
    document.getElementById('card2-search').value = '';
    document.getElementById('card2-image').src = '';
    document.getElementById('card2-prediction').textContent = '0.0';
    
    document.getElementById('card3-search').value = '';
    document.getElementById('card3-image').src = '';
    document.getElementById('card3-prediction').textContent = '0.0';

    document.getElementById('skip-prediction').textContent = 'Skip: 0.0';
}

function chooseBetterRelics() {
    // Similar to chooseBetterCards but for relics
}

function clearRelics() {
    document.getElementById('relic1-search').value = '';
    document.getElementById('relic1-image').src = '';
    document.getElementById('relic1-prediction').textContent = '0.0';
    
    document.getElementById('relic2-search').value = '';
    document.getElementById('relic2-image').src = '';
    document.getElementById('relic2-prediction').textContent = '0.0';
    
    document.getElementById('relic3-search').value = '';
    document.getElementById('relic3-image').src = '';
    document.getElementById('relic3-prediction').textContent = '0.0';

    document.getElementById('relic-skip-prediction').textContent = 'Skip: 0.0';
}

function goBack() {
    window.location.href = 'character_selection.html';
}