const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 12;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

async function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const ListaPokemons = pokemons.map(convertPokemonToLi)
        async function cjs () {
            for (i = 0; i < ListaPokemons.length; i++){
                const button = document.createElement('button')
                button.innerHTML = ListaPokemons[i]
                button.type = 'button'
                button.className = 'pokemonbutton'
                button.addEventListener('click', () => {
                    window.location.href = thispokemon.url
                });
                const parentElement = document.getElementById('pokemonList');
                parentElement.appendChild(button);
            }
        }
        cjs()
        }
    )

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
});
