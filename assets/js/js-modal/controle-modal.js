const modal = document.getElementById("modal_details");
const modalHeader = document.querySelector(".modal_details__header");
const modalImage = document.getElementById("modal_details__image");
const modalName = document.getElementById("modal_details__name");
const modalAltura = document.getElementById("modal_details__height");
const modalWeight = document.getElementById("modal_details__weight");
const modalHabilidades = document.getElementById("modal_details__habilidades");

const fade = document.getElementById("fade");
const botaoFecharModalDetails = document.getElementById(
  "botaoFecharModalDetails"
);

modalName.innerText = "Carregando...";

modalAltura.innerText = "Carregando...";

modalWeight.innerText = "Carregando...";

modalHabilidades.innerText = "Carregando...";

botaoFecharModalDetails.addEventListener("click", fecharModalDetails);
fade.addEventListener("click", fecharModalDetails);

setTimeout(() => {
  const itensLista = document.querySelectorAll("li.pokemon span.name");

  itensLista.forEach((itemLista) => {
    itemLista.addEventListener("click", abrirModalDetails);
  });
}, 2000);

function abrirModalDetails(e) {
  modal.classList.remove("hidden");
  fade.classList.remove("hidden");

  const nome = e.target.innerText.toLowerCase();
  buscarInformacoes(nome);
}

function fecharModalDetails() {
  modal.classList.add("hidden");
  fade.classList.add("hidden");

  modalHeader.classList.remove(pokemonInformacoes.tipo);

  modalImage.setAttribute("src", "");
  modalImage.setAttribute("alt", "");

  modalName.innerText = "Carregando...";

  modalAltura.innerText = "Carregando...";

  modalWeight.innerText = "Carregando...";

  modalHabilidades.innerText = "Carregando...";
}

function montarModal() {
  modalHeader.classList.add(pokemonInformacoes.tipo);

  modalImage.setAttribute("src", pokemonInformacoes.imagem);
  modalImage.setAttribute("alt", pokemonInformacoes.nome);

  modalName.innerText = pokemonInformacoes.nome;

  if (pokemonInformacoes.altura < 1)
    modalAltura.innerText = `${pokemonInformacoes.altura} cm`;
  else modalAltura.innerText = `${pokemonInformacoes.altura} m`;

  modalWeight.innerText = `${pokemonInformacoes.peso} kg`;

  modalHabilidades.innerText = pokemonInformacoes.habilidades.join(", ");
}
