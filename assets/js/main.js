
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
let limit = 24
let offset = 0


    function loadPokemonItems(offset, limmit){

        pokeApi.getPokemons(offset, limmit).then((pokemons = []) => {
            
            //Função 'map' transformadora, transformando nosso result em um item list e concatena-o no HTML antigo com .innerHTML
            pokemonList.innerHTML += pokemons.map((pokemon) =>
                `<li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    <div class="details">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.image}" alt="${pokemon.name}">
                    </div>
                </li>`
            ).join('')
        })
    }

    loadPokemonItems(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    if(offset  >= 137){
        limit = 7
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    
    loadPokemonItems(offset, limit)
})