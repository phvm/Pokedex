const poke_container = document.getElementById('poke-container');
const pokemon_count = 151;
const colors = {
    fire: '#FF9F5B',
    grass: '#9FFC71',
	electric: '#FFE066',
	water: '#84A9FF',
	ground: '#F9D675',
	rock: '#EACA4B',
	fairy: '#FF65D5',
	poison: '#CE52CE',
	bug: '#CEE02C',
	dragon: '#AB38F7',
	psychic: '#FC6F99',
	flying: '#BCA5FF',
	fighting: '#F23A30',
	normal: '#CECE96',
    ghost: '#8E70C1',
    steel: '#C9C9E5',
    ice: '#ABF2F2',
    dark: '#91725E'
};

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    for(let i = 1; i<= pokemon_count; i++){
        getPokemon(i);
    }
};

const getPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
};

const createPokemonCard = (pokemon) =>{
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];
    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}" loading="lazy">
    </div>
    <div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">Type: <span>${type}</span> </small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
};

fetchPokemons();