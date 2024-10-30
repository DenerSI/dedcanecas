const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}" data-name="${pokemon.name}" data-types="${pokemon.types.join(',')}" data-photo="${pokemon.photo}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function moreInfoPokemon(pokemonData) {
    // Criando o HTML do modal
    const modalHTML = `
        <div id="modal" class="modal">
            <div class="modal-content">
                <span id="closeModalButton" class="close">&times;</span>
                <h2>${pokemonData.name}</h2>
                <p>Número: #${pokemonData.number}</p>
                <p>Tipos: ${pokemonData.types}</p>
                <img src="${pokemonData.photo}" alt="${pokemonData.name}">
            </div>
        </div>
    `;

    // Adicionando o modal ao DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Selecionando o modal e o botão de fechar
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('closeModalButton');

    // Exibindo o modal
    modal.style.display = "block";

    // Evento para fechar o modal ao clicar no "X"
    closeModalButton.addEventListener('click', () => {
        modal.remove();
    });

    // Evento para fechar o modal ao clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

function addClickEventToItems() {
    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach((item) => {
        item.addEventListener('click', () => {
            const pokemonData = {
                number: item.getAttribute('data-number'),
                name: item.getAttribute('data-name'),
                types: item.getAttribute('data-types'),
                photo: item.getAttribute('data-photo')
            };
            moreInfoPokemon(pokemonData);
        });
    });
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
        addClickEventToItems();
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
