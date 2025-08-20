const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(pokeDetail => {
      const pokemon = convertPokeApiDetailToPokemon(pokeDetail);

      const section = document.querySelector(".pokemon");
      section.classList.add(pokemon.type); // <-- Aqui adiciona a classe do tipo

      document.getElementById("pokemon-name").textContent = pokemon.name;
      document.getElementById("pokemon-image").src = pokemon.photo;
      document.getElementById("pokemon-number").textContent = `#${pokemon.number}`;
      document.getElementById("pokemon-types").textContent = pokemon.types.join(", ");
      
      const aboutSection = document.createElement("div");
      aboutSection.classList.add("info-block");
      aboutSection.innerHTML = `
        <p><strong>Altura:</strong> ${pokeDetail.height / 10} m</p>
        <p><strong>Peso:</strong> ${pokeDetail.weight / 10} kg</p>
        <p><strong>Habilidades:</strong> ${pokeDetail.abilities.map(a => a.ability.name).join(", ")}</p>
        <p><strong>Espécie:</strong> ${pokeDetail.species.name}</p>
      `;
        section.appendChild(aboutSection);
    })
    .catch(error => {
      console.error("Erro ao buscar detalhes do Pokémon:", error);
      document.getElementById("pokemon-name").textContent = "Pokémon não encontrado";
    });
} else {
  document.getElementById("pokemon-name").textContent = "ID não informado";
}

