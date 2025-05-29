// Main js
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-pokemon-id="${pokemon.number}">
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
    `;
}

// Helper function to generate a stat row for the modal
function generateStatRow(statName, statValue, maxStatValue) {
    const percentage = (statValue / maxStatValue) * 100;
    const barWidth = Math.min(percentage, 100); // Ensure bar doesn't exceed 100%

    return `
        <div class="stat-row">
            <span class="stat-name">${statName}</span>
            <span class="stat-value">${statValue}</span>
            <div class="stat-bar-background">
                <div class="stat-bar" style="width: ${barWidth}%;"></div>
            </div>
        </div>
    `;
}

// Generates the HTML for the Pokémon detail modal
function generatePokemonDetailModalHtml(pokemon) {
    const malePercentage = pokemon.genderMalePercentage || 0;
    const femalePercentage = pokemon.genderFemalePercentage || 0;
    const maxStatValue = 255; // Standard maximum for individual base stats in Pokémon

    return `
        <div id="pokemonDetailModal" class="modal-overlay ${pokemon.type}">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="modal-close-button" onclick="closePokemonDetailModal()">&larr;</button>
                    <h2 class="modal-name">${pokemon.name}</h2>
                    <span class="modal-number">#${pokemon.number.toString().padStart(3, '0')}</span>
                </div>
                <div class="modal-image-container">
                    <img src="${pokemon.photo}" alt="${pokemon.name}" class="modal-pokemon-image">
                </div>
                <div class="modal-types">
                    ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                </div>
                <div class="modal-tabs">
                    <button class="tab-button active" data-tab="about">About</button>
                    <button class="tab-button" data-tab="base-stats">Base Stats</button>
                    <button class="tab-button" data-tab="evolution">Evolution</button>
                    <button class="tab-button" data-tab="moves">Moves</button>
                </div>
                <div class="modal-info-container">
                    <div class="tab-content active" id="tab-about">
                        <h3>About</h3>
                        <p><strong>Species:</strong> ${pokemon.species}</p>
                        <p><strong>Height:</strong> ${pokemon.height.toFixed(1)} m</p>
                        <p><strong>Weight:</strong> ${pokemon.weight.toFixed(1)} kg</p>
                        <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')).join(', ')}</p>
                        <h4>Breeding</h4>
                        <p><strong>Gender:</strong>
                            ${pokemon.genderMalePercentage > 0 ? `<span class="gender-male">${malePercentage}% Male</span>` : ''}
                            ${pokemon.genderFemalePercentage > 0 ? `<span class="gender-female">${femalePercentage}% Female</span>` : ''}
                            ${pokemon.gender === 'Genderless' ? `<span class="gender-genderless">Genderless</span>` : ''}
                        </p>
                        <p><strong>Egg Groups:</strong> ${pokemon.eggGroups.map(group => group.charAt(0).toUpperCase() + group.slice(1)).join(', ')}</p>
                        <p><strong>Egg Cycle:</strong> ${pokemon.eggCycleHatchCounter} cycles</p>
                    </div>
                    <div class="tab-content" id="tab-base-stats">
                        <h3>Base Stats</h3>
                        ${generateStatRow('HP', pokemon.hp, maxStatValue)}
                        ${generateStatRow('Attack', pokemon.attack, maxStatValue)}
                        ${generateStatRow('Defense', pokemon.defense, maxStatValue)}
                        ${generateStatRow('Sp. Atk', pokemon.specialAttack, maxStatValue)}
                        ${generateStatRow('Sp. Def', pokemon.specialDefense, maxStatValue)}
                        ${generateStatRow('Speed', pokemon.speed, maxStatValue)}
                        <div class="stat-row total-stats">
                            <span class="stat-name">Total</span>
                            <span class="stat-value">${pokemon.totalStats}</span>
                            <div class="stat-bar-background">
                                <div class="stat-bar" style="width: ${Math.min((pokemon.totalStats / (maxStatValue * 6)) * 100, 100)}%;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="tab-content" id="tab-evolution">
                        <h3>Evolution (Not implemented yet)</h3>
                    </div>
                    <div class="tab-content" id="tab-moves">
                        <h3>Moves (Not implemented yet)</h3>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Displays the Pokémon detail modal
function showPokemonDetailModal(pokemon) {
    const modalHtml = generatePokemonDetailModalHtml(pokemon);
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Add event listeners for modal tabs
    const tabButtons = document.querySelectorAll('.modal-tabs .tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Deactivate all tab buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Activate clicked button and corresponding content
            event.target.classList.add('active');
            const tabId = event.target.dataset.tab;
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

// Closes the Pokémon detail modal
function closePokemonDetailModal() {
    const modal = document.getElementById('pokemonDetailModal');
    if (modal) {
        modal.remove();
    }
}

// Loads Pokémon items and attaches click listeners for the modal
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;

        document.querySelectorAll('#pokemonList .pokemon').forEach(liElement => {
            // Attach listener only if not already added
            if (!liElement.dataset.listenerAdded) {
                liElement.addEventListener('click', async () => {
                    const pokemonId = liElement.dataset.pokemonId;
                    // Find the complete Pokémon object from the loaded list
                    const clickedPokemon = pokemons.find(p => p.number == pokemonId);

                    if (clickedPokemon) {
                        showPokemonDetailModal(clickedPokemon);
                    } else {
                        // Fallback: Fetch individual Pokémon details if not found in the current batch
                        const singlePokemonDetail = await pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonId}/` });
                        showPokemonDetailModal(singlePokemonDetail);
                    }
                });
                liElement.dataset.listenerAdded = 'true'; // Mark as listener added
            }
        });
    });
}

// Initial load of Pokémon
loadPokemonItens(offset, limit);

// Event listener for the "Load More" button
loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

// Make closePokemonDetailModal accessible globally for inline HTML onclick
window.closePokemonDetailModal = closePokemonDetailModal;