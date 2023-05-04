const types = document.querySelectorAll('.type');
const pokemonContainer = document.querySelector('#pokemon');

types.forEach(type => {
  type.addEventListener('click', () => {
    const typeValue = type.getAttribute('data-type');
    getPokemonByType(typeValue);
  });
});

async function getPokemonByType(type) {
  pokemonContainer.innerHTML = '';
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await response.json();
  data.pokemon.forEach(async pokemon => {
    const response = await fetch(pokemon.pokemon.url);
    const pokemonData = await response.json();
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    const pokemonImg = document.createElement('img');
    pokemonImg.setAttribute('src', pokemonData.sprites.front_default);
    const pokemonName = document.createElement('span');
    pokemonName.textContent = pokemonData.name;
    pokemonDiv.appendChild(pokemonImg);
    pokemonDiv.appendChild(pokemonName);
    pokemonContainer.appendChild(pokemonDiv);
  });
}
