const container = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
    const getPokemonIdFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    };

    const pokemonNumber = getPokemonIdFromUrl();
    console.log(pokemonNumber)
    if (pokemonNumber) {
            pokeApi.getPokemonById(pokemonNumber).then((pokeDetail) => {
            const pokemonDetail =
        `<div class="content-card ${pokeDetail.type}" >
            <div class="upper-icons">
                <a href="./index.html">
                    <i class="bi bi-arrow-left-short" style="font-size: 2rem"></i>
                </a>
                <i class="bi bi-heart" style="font-size: 1.3rem"></i>
            </div>
            <div class="poke-details-name">${pokeDetail.name}</div>
            <div class="poke-details-number">#${pokeDetail.number}</div>
                <ol class="poke-details-types">
                 ${pokeDetail.types.map((type) => ` <li class="poke-detail-type ${type}">${type}</li>`).join("")}
                </ol>
                 <img class="poke-img" src="${pokeDetail.photo}" alt=${pokeDetail.name}>
            <div class="content-card-details">
                <div class="header-card">
                    <ul>
                        <a href="#">
                            <li>About</li>
                        </a>
                        <a href="#">
                            <li>Base Stats</li>
                        </a>
                        <a href="#">
                            <li>Evolution</li>
                        </a>
                        <a href="#">
                            <li>Moves</li>
                        </a>
                    </ul>
                </div>
                <div class="poke-details">
                    <div class=poke-details-line>
                        <p>Species:<p>
                        <p>${pokeDetail.species}</p>
                    </div>
                    <div class=poke-details-line>
                        <p>Weight:</p>
                        <p>${pokeDetail.weight}</p>
                    </div>
                    <div class=poke-details-line>
                        <p>Height:</p>
                        <p>${pokeDetail.height}</p>
                    </div>
                    <div class=poke-details-line>
                        <p>Abilities:</p>
                        <p>${pokeDetail.ability}</p>
                    </div>
                </div>
            </div>
        </div>`;
            container.innerHTML = pokemonDetail
        })
    }})


