
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
    card_list.innerHTML = '';

    character_data.initial_cards.forEach(card => {
        const li = document.createElement('li');
        li.textContent = card;

        const button = document.createElement('button');
        button.textContent = 'X';
        button.onclick = () => {
            card_list.removeChild(li);
        };

        li.appendChild(button);
        card_list.appendChild(li);
    });
    // card_list.forEach(element => {
    //     document.getElementById('card-list').appendChild = '<li>'+element+'<button>X</button></li>';
    // });
       
    
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