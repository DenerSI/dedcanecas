const params = new URLSearchParams(location.search);
const number = params.get('number');

const pokemonDetailContainer = document.getElementById('pokemonDetail');

if (!number) {
    pokemonDetailContainer.innerHTML = '<p>Pokémon não especificado.</p>';
} else {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => renderDetail(data))
        .catch(() => {
            pokemonDetailContainer.innerHTML = '<p>Erro ao carregar os dados.</p>';
        })
}

function renderDetail(data) {
    const name = data.name;
    const id = data.id;
    const types = data.types.map(t => t.type.name);
    const img = data.sprites.other?.dream_world?.front_default || data.sprites.front_default || '';
    const abilities = data.abilities.map(a => a.ability.name);
    const height = data.height;
    const weight = data.weight;
    const stats = data.stats.map(s => ({ name: s.stat.name, value: s.base_stat }));

    const html = `
        <div class="pokemon-detail-card ${types[0]}">
            <img src="${img}" alt="${name}">
            <h2 style="text-transform:capitalize">${name} <small>#${id}</small></h2>

            <div class="types">
                ${types.map(t => `<span class="type ${t}">${t}</span>`).join('')}
            </div>

            <div style="margin-top:1rem;">
                <strong>Altura:</strong> ${height} &nbsp; <strong>Peso:</strong> ${weight}
            </div>

            <div style="margin-top:1rem;">
                <strong>Habilidades:</strong> ${abilities.join(', ')}
            </div>

            <div style="margin-top:1rem;text-align:left;max-width:320px;margin-left:auto;margin-right:auto;">
                <strong>Stats:</strong>
                <ul>
                    ${stats.map(s => `<li>${s.name}: ${s.value}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    pokemonDetailContainer.innerHTML = html;
}
