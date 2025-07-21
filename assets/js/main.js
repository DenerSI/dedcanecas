const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-number="${pokemon.number}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
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



pokemonList.addEventListener('click', function(event) {
   
    const li = event.target.closest('li.pokemon')
    if (li) {
        const number = li.getAttribute('data-number');
        const img = li.querySelector('img')
        const photo = img ? img.getAttribute('src') : ''
        const name = li.querySelector('.name') ? li.querySelector('.name').textContent : ''

        fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
            .then(response => response.json())
            .then(data => {
                
                const det = document.createElement('div');
                det.className = 'detalhes'
                det.innerHTML = `
                
               <div>
                        <img src="${photo}" alt="${name}">
                        <h2>${name}</h2>
                        <h2>Número: ${number}</h2>
                        <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
                        <button id="fecharDetalhes">Fechar</button>
                    </div>
             
            `
            
                 document.body.appendChild(det);

                 document.getElementById('fecharDetalhes').onclick = () => det.remove();
                
            })
        }
})