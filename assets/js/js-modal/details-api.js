let pokemonInformacoes = {
  imagem: "",
  nome: "",
  altura: "",
  peso: "",
  habilidades: "",
  tipo: "",
};

function buscarInformacoes(nome) {
  const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      pokemonInformacoes.imagem =
        response.sprites.other.dream_world.front_default;
      pokemonInformacoes.nome = nome.charAt(0).toUpperCase() + nome.slice(1);
      pokemonInformacoes.altura = response.height / 10;
      pokemonInformacoes.peso = response.weight / 10;
      pokemonInformacoes.habilidades = response.abilities.map(
        (i) => i.ability.name
      );
      pokemonInformacoes.tipo = response.types[0].type.name;
      console.log(pokemonInformacoes.tipo);
    });

  setTimeout(() => montarModal(), 500);
}
