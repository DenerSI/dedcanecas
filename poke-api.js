// Objeto que agrupa os métodos relacionados à API de Pokémons
const pokeApi = {};

/**
 * Converte os detalhes retornados pela API para uma instância da classe Pokemon.
 *
 * @param {Object} pokeDetail - Dados detalhados do Pokémon (retorno da API).
 * @returns {Pokemon} Instância com as propriedades mapeadas.
 */
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  // Mapeia os tipos e utiliza o primeiro como o tipo principal
  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  pokemon.types = types;
  pokemon.type = types[0];

  // Define a foto a partir do sprite da API
  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

/**
 * Busca os detalhes de um Pokémon a partir de sua URL e retorna uma instância de Pokemon.
 *
 * @param {Object} pokemon - Objeto que deve conter a propriedade 'url'.
 * @returns {Promise<Pokemon|undefined>} Uma Promise que resolve para um objeto Pokemon ou undefined em caso de erro.
 */
pokeApi.getPokemonDetail = async (pokemon) => {
  if (!pokemon.url) {
    console.error('Invalid Pokemon URL');
    return;
  }

  try {
    const response = await fetch(pokemon.url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const pokeDetail = await response.json();
    return convertPokeApiDetailToPokemon(pokeDetail);
  } catch (error) {
    console.error('Error fetching Pokemon detail:', error.message);
    console.error('Pokemon URL:', pokemon.url);
  }
};

console.log('Pokemons retornados:', pokemonsDetails);


/**
 * Busca uma lista de Pokémons a partir de um offset e um limite e retorna seus detalhes.
 *
 * @param {number} [offset=0] - Posição inicial para a consulta.
 * @param {number} [limit=5] - Quantidade de Pokémons a buscar.
 * @returns {Promise<Array<Pokemon>|undefined>} Uma Promise que resolve para um array de instâncias de Pokemon ou undefined em caso de erro.
 */
pokeApi.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonBody = await response.json();
    const pokemons = jsonBody.results;

    // Cria um array de Promises para buscar os detalhes de cada Pokémon
    const detailRequests = pokemons.map(pokeApi.getPokemonDetail);
    const pokemonsDetails = await Promise.all(detailRequests);
    return pokemonsDetails;
  } catch (error) {
    console.error('Error fetching Pokemons:', error);
  }
};
