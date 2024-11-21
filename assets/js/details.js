const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");
const pokemonDetails = document.getElementById("pokemonDetails");

async function fetchPokemonDetails(id) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Preencher os detalhes do Pokémon
        pokemonDetails.innerHTML = `
            <img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}">
            <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
            <div class="about">
                <p><strong>Type(s):</strong> ${data.types.map(type => type.type.name).join(", ")}</p>
                <p><strong>Height:</strong> ${(data.height / 10).toFixed(1)} m</p>
                <p><strong>Weight:</strong> ${(data.weight / 10).toFixed(1)} kg</p>
            </div>
        `;
    } catch (error) {
        console.error("Erro ao buscar os detalhes do Pokémon:", error);
        pokemonDetails.innerHTML = "<p>Erro ao carregar os detalhes do Pokémon.</p>";
    }
}

// Buscar os detalhes do Pokémon ao carregar a página
fetchPokemonDetails(pokemonId);
