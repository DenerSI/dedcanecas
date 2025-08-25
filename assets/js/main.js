document.addEventListener("DOMContentLoaded", () => {
  const pokedex = document.getElementById("pokedex");
  const botao = document.getElementById("carregar-mais");

  let offset = 0;   // Contador de Pokémon já carregados
  const limit = 9; // Quantos carregar por vez

  const coresTipos = {
    normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
    grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
    ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
    rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
    steel: "#B7B7CE", fairy: "#D685AD"
  };

  async function carregarPokemons() {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const data = await res.json();

      for (let pokemon of data.results) {
        // Pega o ID
        const url = new URL(pokemon.url);
        const parts = url.pathname.split("/").filter(Boolean);
        const id = parts[parts.length - 1];

        // Busca detalhes para pegar o tipo
        const detalheRes = await fetch(pokemon.url);
        const detalhe = await detalheRes.json();
        const tipoPrincipal = detalhe.types[0].type.name;

        // Cria card
        const link = document.createElement("a");
        link.href = `detalhes.html?pokemon=${encodeURIComponent(pokemon.name)}`;
        link.title = pokemon.name;
        link.style.backgroundColor = coresTipos[tipoPrincipal] || "#EEE";

        const img = document.createElement("img");
        img.alt = pokemon.name;
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

        link.appendChild(img);
        pokedex.appendChild(link);
      }

      // Atualiza o offset
      offset += limit;
    } catch (err) {
      console.error("Erro ao carregar Pokémon:", err);
    }
  }

  // Carrega os primeiros Pokémon
  carregarPokemons();

  // Adiciona evento ao botão
  botao.addEventListener("click", carregarPokemons);
});