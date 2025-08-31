
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.animatedPhoto = pokeDetail.sprites.versions['generation-v']['black-white'].animated?.front_default || pokeDetail.sprites.front_default
    
    pokemon.height = pokeDetail.height / 10
    pokemon.weight = pokeDetail.weight / 10
    
    pokemon.stats = pokeDetail.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
    }))
    
    pokemon.abilities = pokeDetail.abilities.map(ability => ({
        name: ability.ability.name,
        isHidden: ability.is_hidden
    }))

    return pokemon
}

pokeApi.getPokemonDetail = async (pokemon) => {
    try {
        const cached = cacheManager.getPokemonDetail(pokemon.id || pokemon.url.split('/').slice(-2)[0])
        if (cached) return cached

        const response = await fetch(pokemon.url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const pokeDetail = await response.json()
        const pokemonData = convertPokeApiDetailToPokemon(pokeDetail)
        
        cacheManager.setPokemonDetail(pokemonData.number, pokemonData)
        return pokemonData
    } catch (error) {
        console.error('Erro ao buscar detalhes do Pokémon:', error)
        throw error
    }
}

pokeApi.getPokemons = async (offset = 0, limit = 20) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const jsonBody = await response.json()
        const pokemons = jsonBody.results
        
        const pokemonDetails = await Promise.all(
            pokemons.map(pokeApi.getPokemonDetail)
        )
        
        return pokemonDetails
    } catch (error) {
        console.error('Erro ao buscar lista de Pokémon:', error)
        throw error
    }
}

pokeApi.getPokemonSpecies = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
        
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const speciesData = await response.json()
        
        const portugueseEntry = speciesData.flavor_text_entries.find(
            entry => entry.language.name === 'pt'
        )
        
        return portugueseEntry ? portugueseEntry.flavor_text : speciesData.flavor_text_entries[0]?.flavor_text || ''
    } catch (error) {
        console.error('Erro ao buscar espécie do Pokémon:', error)
        return ''
    }
}
