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
    // card_list.forEach(element => {
    //     document.getElementById('card-list').appendChild = '<li>'+element+'<button>X</button></li>';
    // });
}


const cardImages = {
    "Anger": "/Machine_learning/Load_data/Webscrapping/imagenes_cartas/imagenes_Ironclad_Cards/Anger.jpg",
    "Bash": "/Machine_learning/Load_data/Webscrapping/imagenes_cartas/imagenes_Ironclad_Cards/Bash.jpg",
    "Cleave": "/Machine_learning/Load_data/Webscrapping/imagenes_cartas/imagenes_Ironclad_Cards/Cleave.jpg"
    // Añade más cartas según sea necesario
};

// Función para reemplazar el contenido del div con la imagen
function updateCardImage() {
    const searchInput = document.getElementById("card1-search");
    const placeholder = document.getElementById("card1-placeholder");
    const searchKey = searchInput.value.trim();

    // Verifica si la clave existe en el diccionario
    if (cardImages.hasOwnProperty(searchKey)) {
        const imgSrc = cardImages[searchKey];

        // Crea la nueva imagen
        const imgElement = document.createElement("img");
        imgElement.id = "card1-image";
        imgElement.src = imgSrc;
        imgElement.alt = "Card 1";
        imgElement.className = "card-image";

        // Reemplaza el contenido del div
        placeholder.innerHTML = "";
        placeholder.appendChild(imgElement);
    } else {
        // Si la clave no existe, muestra un mensaje de error o deja el div vacío
        placeholder.innerHTML = "No card found.";
    }
}

// Añade un event listener al cuadro de búsqueda para actualizar la imagen al cambiar el texto
document.getElementById("card1-search").addEventListener("input", updateCardImage);
