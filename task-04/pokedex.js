const url = "https://pokeapi.co/api/v2/pokemon/";

const spriteGrandElement = document.querySelector(".pokemon-3Dmodel > img");
const dexnumber=document.getElementById(".pokemonname");

const pokemonList = document.querySelector(".pokemon-list");
const shinyButton = document.querySelector(".shiny-button");

window.addEventListener("load", getPokeData(1, 151));



function getPokeData(firstPoke, lastPoke) {
	//must wait a bit before fetching the data for the gen selector animation to work properly
	setTimeout(() => {
		const pokemonData = []; // array to store each Pokemon's data
		const nb_pokemon = lastPoke - firstPoke + 1;

		const promises = [];

		for (let i = firstPoke; i <= lastPoke; i++) {
			const finalUrl = url + i;
			const promise = fetch(finalUrl)
				.then((response) => response.json())
				.then((data) => {
					pokemonData[i - firstPoke] = data;
				});
			promises.push(promise);
		}
		// after all the promises are resolved, we can generate the cards
		Promise.all(promises).then(() => {
			pokemonList.innerHTML = "";
			// if we have fetched all the Pokemon data, generate the cards in the correct order
			pokemonData.forEach((data) => {
				console.log(data);
				generateCard(data, lastPoke);
				betterPokemonCards(pokemonData);	
				
			});
			
			
			// toggleShiny();
		});

	}, 200);
}

function generateCard(data, lastPoke) {
	const dex_number = data.id;
	const name = data.name;
	const stats=data.weight;
	// const flavorText = data.flavor_text_entries[0].flavor_text;
	const spriteGrand = data.sprites.other["official-artwork"].front_default;
	const spriteIcon =
		data.sprites.versions["generation-viii"].icons.front_default;

	pokemonList.innerHTML += ` <li class="pokemon${ ""
	}" data-sprite-grand="${spriteGrand}" name="${name}" hp="${stats}" 	 " 
	data-id="${dex_number}">
  <div>
  <div class="pokemon__sprite">
  <img src="${spriteIcon}" alt="sprite">
  </div>
  <p class="pokemon__num">No. <span class="pokemon__num--field">${dex_number}</span></p>
  </div>
  <p class="pokemon__name">${name}</p>
  <div class="pokeball">
  <img src="images/pokeball.png" alt="pokeball">
  </div>
  </li>
  `;
	spriteGrandElement.src = spriteGrand;
}

function betterPokemonCards(pokemondata) {
	let pokemons = document.querySelectorAll(".pokemon");
  
	pokemons.forEach((pokemon) => {
	  let dex_entry = pokemon.firstElementChild.lastElementChild.lastElementChild;
	  index = dex_entry.innerText;
  
	  pokemon.addEventListener("click", () => {
		pokemons.forEach((pokemon) => {
		  pokemon.classList.remove("pokemon-active");
		});
		pokemon.classList.remove("pokemon-active")
		pokemon.classList.add("pokemon-active");
		 let containerstate=document.querySelector(".container")
		 if(containerstate){
			containerstate.remove();
		 }
  
		// Get the Pokemon data from the array based on its index
		const pokemonData = pokemondata[index - 1];
  
		// Create the container and image elements
		const boxContainer = document.createElement("div");
		boxContainer.classList.add("box-container");
  
		const container = document.createElement("div");
		container.classList.add("container");
		boxContainer.appendChild(container);
  
		const imageElement = document.createElement("img");
		imageElement.src = pokemon.getAttribute("data-sprite-grand");
		container.appendChild(imageElement);
  
		// Create a paragraph element for the species name and add it to the container
		const speciesName = document.createElement("p");
		speciesName.textContent = pokemon.getAttribute("name");
		container.appendChild(speciesName);
  
		// Create a paragraph element for the HP stat and add it to the container
		// const hpStat = document.createElement("p");
		// hpStat.textContent = `HP: ${pokemon.getAttribute("hp")}`;
		// container.appendChild(hpStat);
  

		const flavourtext = document.createElement("p");
		flavourtext.textContent = pokemon.getAttribute("flavour_text");
		container.appendChild(flavourtext);

		// Add the box container to the DOM
		document.body.appendChild(boxContainer);
	  });
	});
  }



