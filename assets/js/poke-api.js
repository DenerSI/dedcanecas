// poke-api js
const pokeApi = {};

async function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height / 10;
    pokemon.weight = pokeDetail.weight / 10;
    pokemon.abilities = pokeDetail.abilities.map(abilitySlot => abilitySlot.ability.name);
    pokemon.speciesUrl = pokeDetail.species.url;

    let totalStats = 0;
    pokeDetail.stats.forEach(statSlot => {
        switch (statSlot.stat.name) {
            case 'hp':
                pokemon.hp = statSlot.base_stat;
                break;
            case 'attack':
                pokemon.attack = statSlot.base_stat;
                break;
            case 'defense':
                pokemon.defense = statSlot.base_stat;
                break;
            case 'special-attack':
                pokemon.specialAttack = statSlot.base_stat;
                break;
            case 'special-defense':
                pokemon.specialDefense = statSlot.base_stat;
                break;
            case 'speed':
                pokemon.speed = statSlot.base_stat;
                break;
        }
        totalStats += statSlot.base_stat;
    });
    pokemon.totalStats = totalStats;

    try {
        const speciesResponse = await fetch(pokeDetail.species.url);
        const speciesData = await speciesResponse.json();

        if (speciesData.gender_rate === -1) {
            pokemon.gender = 'Genderless';
            pokemon.genderMalePercentage = 0;
            pokemon.genderFemalePercentage = 0;
        } else {
            const femalePercentage = speciesData.gender_rate * 12.5;
            const malePercentage = 100 - femalePercentage;
            pokemon.gender = `Male: ${malePercentage}% | Female: ${femalePercentage}%`;
            pokemon.genderMalePercentage = malePercentage;
            pokemon.genderFemalePercentage = femalePercentage;
        }

        pokemon.eggGroups = speciesData.egg_groups.map(groupSlot => groupSlot.name);
        pokemon.eggCycleHatchCounter = speciesData.hatch_counter;
        pokemon.eggCycle = `${speciesData.hatch_counter}`;

        const englishSpeciesName = speciesData.genera.find(genus => genus.language.name === 'en');
        pokemon.species = englishSpeciesName ? englishSpeciesName.genus.replace(' Pokémon', '') : 'Unknown Species';

    } catch (error) {
        console.error("Error fetching species details:", error);
        pokemon.gender = 'N/A';
        pokemon.eggGroups = ['N/A'];
        pokemon.eggCycle = 'N/A';
        pokemon.species = 'N/A';
    }

    return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
    const response = await fetch(pokemon.url);
    const pokeDetail = await response.json();
    return await convertPokeApiDetailToPokemon(pokeDetail);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};