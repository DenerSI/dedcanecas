function isLegendary(number) {
    return [144, 145, 146, 150, 151].includes(number)
}

function convertPokemonToLi(pokemon) {
    const legendaryClass = isLegendary(pokemon.number) ? "legendary" : ""

    return `
        <li class="pokemon ${pokemon.type} ${legendaryClass}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name} ${isLegendary(pokemon.number) ? "🌟" : ""}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="stats">
                <p><strong>HP:</strong> ${pokemon.stats.hp}</p>
                <p><strong>Ataque:</strong> ${pokemon.stats.attack}</p>
                <p><strong>Defesa:</strong> ${pokemon.stats.defense}</p>
                <p><strong>Sp. Atk:</strong> ${pokemon.stats.specialAttack}</p>
                <p><strong>Sp. Def:</strong> ${pokemon.stats.specialDefense}</p>
                <p><strong>Velocidade:</strong> ${pokemon.stats.speed}</p>
            </div>
        </li>
    `
}


const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('')
    })
}

loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItems(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItems(offset, limit)
    }
})
