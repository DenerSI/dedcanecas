# Trilha JS Developer - Pokedex

## Introdução

Este projeto é uma Pokedex que exibe informações sobre os Pokémons. Ele utiliza a API do PokeAPI para buscar dados dos Pokémons e exibi-los em uma interface amigável.

## Como adicionar novos recursos

### 1. Adicionar novos Pokémons

Para adicionar novos Pokémons, você pode ajustar o limite e o offset na função `loadPokemonItens` no arquivo `main.js`:

```javascript
// filepath: /c:/Users/glend/onedrive/documentos/projetos/dio/js-developer-pokedex/assets/js/main.js
const limit = 10; // Número de Pokémons carregados por vez
let offset = 0; // Ponto inicial para carregar os Pokémons

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}
```

### 2. Adicionar novos detalhes aos Pokémons

Para adicionar novos detalhes aos Pokémons, você pode modificar a classe `Pokemon` no arquivo `pokemon-model.js` para incluir novas propriedades e ajustar a função `fetchDetails` para buscar esses novos dados:

```javascript
// filepath: /c:/Users/glend/onedrive/documentos/projetos/dio/js-developer-pokedex/assets/js/pokemon-model.js
class Pokemon {
    // ...código existente...
    async fetchDetails() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.number}`);
        const data = await response.json();
        
        // Adicione novas propriedades aqui
        this.name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        this.photo = data.sprites.other['official-artwork'].front_default;
        this.height = data.height;
        this.weight = data.weight;
        this.abilities = data.abilities.map(ability => ability.ability.name);
        this.types = data.types.map(typeSlot => typeSlot.type.name);
        this.type = this.types[0]; // Defina o tipo principal
    }
}
```

### 3. Melhorar o fetch de dados

Para melhorar o fetch de dados, você pode implementar técnicas como cacheamento, tratamento de erros e otimização de desempenho. Aqui estão algumas sugestões:

#### Cacheamento

Você pode armazenar os dados dos Pokémons em cache para evitar múltiplas requisições à API:

```javascript
// filepath: /c:/Users/glend/onedrive/documentos/projetos/dio/js-developer-pokedex/assets/js/poke-api.js
const pokeApi = {};
const pokemonCache = {};

pokeApi.getPokemonDetail = (pokemon) => {
    if (pokemonCache[pokemon.url]) {
        return Promise.resolve(pokemonCache[pokemon.url]);
    }

    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((data) => {
            const pokemonDetail = convertPokeApiDetailToPokemon(data);
            pokemonCache[pokemon.url] = pokemonDetail;
            return pokemonDetail;
        });
};
```

#### Tratamento de erros

Adicione tratamento de erros para lidar com falhas na requisição:

```javascript
// filepath: /c:/Users/glend/onedrive/documentos/projetos/dio/js-developer-pokedex/assets/js/poke-api.js
pokeApi.getPokemonDetail = (pokemon) => {
    if (pokemonCache[pokemon.url]) {
        return Promise.resolve(pokemonCache[pokemon.url]);
    }

    return fetch(pokemon.url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Falha ao buscar detalhes do Pokémon');
            }
            return response.json();
        })
        .then((data) => {
            const pokemonDetail = convertPokeApiDetailToPokemon(data);
            pokemonCache[pokemon.url] = pokemonDetail;
            return pokemonDetail;
        })
        .catch((error) => {
            console.error(error);
            return null;
        });
};
```

#### Otimização de desempenho

Utilize técnicas de otimização de desempenho, como carregamento assíncrono e lazy loading, para melhorar a experiência do usuário.

## Conclusão

Este README fornece uma visão geral de como adicionar novos recursos e melhorar o fetch de dados no projeto Pokedex. Sinta-se à vontade para explorar e personalizar o projeto conforme suas necessidades.
