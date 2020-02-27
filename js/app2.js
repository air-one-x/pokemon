let app2 = {

    nbPokemonChoice :0, // permet de choisir un deuxième pokemon si nb>0
    pokemon:"", //permet également de choisir un deuxième pokemon
    pokemonBoard:[],
    

    init() {
        app2.hoverPokemon();
        app2.pokemonCondition();
    },

    hoverPokemon() {
        setTimeout(function(){
            let pokemon = document.querySelectorAll('img');
            pokemon.forEach(element =>{
                app2.pokemonChoice(element);
                app2.selectedPokemon(element);
                app2.blurPokemon(element);
                app2.pokemonCondition(element);
            })
        },1000)
    },

    pokemonChoice(element) {     
        element.addEventListener('mouseover', app2.seePokemon);
    },

    seePokemon(event) { 
        app2.pokemonCondition();
        let pokemon = event.target;
        let firstChoice = document.querySelector(`.img-${app2.pokemon}-pokemon`);
        firstChoice.style.backgroundImage = `url(${pokemon.src})`;
        firstChoice.style.backgroundSize="200px";
        firstChoice.style.backgroundPosition="center";
        firstChoice.style.backgroundRepeat="no-repeat";
        app2.setStats();
    },

    setStats(){
        app2.pokemonCondition();
        let stat = {
            power : Math.trunc(Math.random()*100),
            life : Math.trunc(Math.random()*100),
            endurance : Math.trunc(Math.random()*100),
            size : Math.trunc(Math.random()*5)
        };

        let life = document.querySelector(`.${app2.pokemon}-pokemon-life`)
        let power = document.querySelector(`.${app2.pokemon}-pokemon-power`)
        let size = document.querySelector(`.${app2.pokemon}-pokemon-size`)
        let endurance = document.querySelector(`.${app2.pokemon}-pokemon-endurance`);

        life.textContent = "Vie: "+stat.life;
        power.textContent ="Force: "+ stat.power;
        size.textContent = "Taille: "+stat.size;
        endurance.textContent="Endurance: "+stat.endurance;
    },

    selectedPokemon(element) {
        element.addEventListener('click', app2.getPokemon);
    },

    blurPokemon(element) {
        element.addEventListener('mouseout', app2.hiddenPokemon);
    },

    hiddenPokemon(event) {
        app2.pokemonCondition();
        let choice = document.querySelector(`.img-${app2.pokemon}-pokemon`);
        let life = document.querySelector(`.${app2.pokemon}-pokemon-life`)
        let power = document.querySelector(`.${app2.pokemon}-pokemon-power`)
        let size = document.querySelector(`.${app2.pokemon}-pokemon-size`)
        let endurance = document.querySelector(`.${app2.pokemon}-pokemon-endurance`);

        life.textContent = "";
        power.textContent ="";
        size.textContent = "";
        endurance.textContent="";
        choice.style.backgroundImage="";

    },

    getPokemon(event) {        
        app2.nbPokemonChoice++;
        let pokemon = event.target;
        let firstChoice = document.querySelector(`.img-${app2.pokemon}-pokemon`);
        firstChoice.style.backgroundImage = `url(${pokemon.src})`;
        firstChoice.style.backgroundSize="200px";
        firstChoice.style.backgroundPosition="center";
        firstChoice.style.backgroundRepeat="no-repeat";
        app2.pokemonBoard.push(pokemon.src);
        if(app2.nbPokemonChoice==2){
            pokemon.removeEventListener('mouseout',app2.hiddenPokemon);       
            app2.pokemonModal();    
        }
    },

    pokemonCondition(element) {
        if(app2.nbPokemonChoice==0) {
            app2.pokemon="first"
        } else if(app2.nbPokemonChoice==1){
            app2.pokemon="second";  
        }
    },

    pokemonModal() {
        if(app2.nbPokemonChoice==2) {
            app2.pokemonFight();
        }
    },

    pokemonFight() {
        let audio = new Audio('docs/pokemon.mp3');
        audio.play();
        let pageEnd = document.querySelector('.modalEnd');
        let body = document.querySelector('body');
        body.classList.add('modal-open');

        let modalShow = document.createElement('div');
        modalShow.classList.add('modal-backdrop');
        modalShow.classList.add('fade');
        modalShow.classList.add('show');
        pageEnd.appendChild(modalShow);

        let modal = document.querySelector('.modal');
        modal.classList.add('show');
        modal.style.display = 'block';

        let firstImgPokemon = document.createElement('img');
        firstImgPokemon.src = app2.pokemonBoard[0];
        let firstPosition = document.querySelector('.fight-pokemon-1');
        firstPosition.appendChild(firstImgPokemon);

        let secondImgPokemon = document.createElement('img');
        secondImgPokemon.src = app2.pokemonBoard[1];
        let secondPosition = document.querySelector('.fight-pokemon-2');
        secondPosition.appendChild(secondImgPokemon);

        let finish = document.querySelector('button');
        finish.addEventListener('click',app2.finishGame);

    },

    finishGame() {
        document.location.reload(true);
    }

 



    
}

app2.init();
