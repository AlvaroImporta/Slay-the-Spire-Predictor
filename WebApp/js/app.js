
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

    return character_data;
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

function clearCards() {
    document.getElementById('card1-search').value = '';
    document.getElementById('card1-image').src = '';
    document.getElementById('card1-prediction').textContent = '';
    
    document.getElementById('card2-search').value = '';
    document.getElementById('card2-image').src = '';
    document.getElementById('card2-prediction').textContent = '';
    
    document.getElementById('card3-search').value = '';
    document.getElementById('card3-image').src = '';
    document.getElementById('card3-prediction').textContent = '';

    document.getElementById('skip-prediction').textContent = '';
}


function clearRelics() {
    document.getElementById('relic1-search').value = '';
    document.getElementById('relic1-image').src = '';
    document.getElementById('relic1-prediction').textContent = '';
    
    document.getElementById('relic2-search').value = '';
    document.getElementById('relic2-image').src = '';
    document.getElementById('relic2-prediction').textContent = '';
    
    document.getElementById('relic3-search').value = '';
    document.getElementById('relic3-image').src = '';
    document.getElementById('relic3-prediction').textContent = '';

    document.getElementById('relic-skip-prediction').textContent = '';
}