let app = {

    init() {
        app.pokemonList();
    },

    pokemonList() {
        fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20").then(app.returnResponse).then(app.getAllPokemon);
    },

    returnResponse(response) {
        return response.json();
    },

    getAllPokemon(response) {
        for(let n = 0 ; n<20 ; n++) {
            let url = response.results[n].url;
            let splitUrl = url.split("/");
            let indexPokemon = splitUrl[6];
            app.getPokemon(indexPokemon);
        } 
    },

    getPokemon(pokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`).then(app.returnResponse).then(app.pokemon);
    },

    pokemon(response) {
        let location = document.querySelector('.pokemon-list_choice-pokemon');
        let create_html_div_pokemon = document.createElement('div');
        create_html_div_pokemon.id = response.id;
        create_html_div_pokemon.classList.add('pokemon');

        let create_html_img_pokemon = document.createElement('img');
        create_html_img_pokemon.src = response.sprites.back_default;

        create_html_div_pokemon.appendChild(create_html_img_pokemon);
        location.appendChild(create_html_div_pokemon);
    },


}

app.init();
