//Objeto que vai representar nossa Poke-API
const pokeApi = {}

function convertPokemonApiDetailToPokemonModel(pokeDetail) {
    const pokemon = new Pokemon()
    
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.type = type
    pokemon.types = types

    pokemon.image = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

// Transformamos a lista de resutlts em uma nova lista de json, com o detalhamento da 'url'
pokeApi.getPokemonDetail = (pokemon) => {

    return fetch(pokemon.url)
    .then(response => response.json())
    .then((convertPokemonApiDetailToPokemonModel))
}

// arrow funcition => uma forma mais simples de escrever uma function, otimizando o código e deixando=o mais limpo
pokeApi.getPokemons = (offset = 0, limit = 24) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}` // '?' Parâmetro de consulta; Query string na qual pode-se passar parâmetros para consultar, filtrar ou autenticar
   
    return fetch(url) // Recebemos do servidor a promisse
        .then((response) => response.json()) // Convertemos para json
        .then((jsonBody) => jsonBody.results) // Extraimos a lista que esta dentro do json
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Chama função para converter o 'results'
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => (pokemonsDetails))
}