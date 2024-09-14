const pokemonRepository = (function () {
    // Private array to hold Pokémon
    let pokemonList = [
        { name: 'pikachu', type: 'electric', height: '7' },
        { name: 'charmeleon', type: 'fire', height: '3' },
        { name: 'pidgeot', type: 'normal', height: '6' }
    ];

    // Function to get all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon
    function add(pokemon) {
        if (pokemon && pokemon.name && pokemon.type && pokemon.height) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid Pokémon item');
        }
    }

    // Function to display Pokémon information
    function displayPokemonInfo() {
        pokemonList.forEach(pokemon => {
            let height = parseFloat(pokemon.height); // Convert height to a number

            // Categorize Pokémon based on height and display result
            if (height < 4) {
                document.write(`${pokemon.name} (Height: ${pokemon.height}) is small<br>`);
            } else if (height >= 5 && height <= 6) {
                document.write(`${pokemon.name} (Height: ${pokemon.height}) is average<br>`);
            } else {
                document.write(`${pokemon.name} (Height: ${pokemon.height}) Wow, that's big!<br>`);
            }

        });
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemonList");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild (button)
        pokemonList.appendChild(listpokemon);
        button.addEventListener('click', function () {
            console.log(pokemon);
        });
    }
    
        function showDetails(pokemon) {
            console.log(pokemon);
        }
        return {
            getAll: getAll,
            add: add,
            displayPokemonInfo: displayPokemonInfo,
            addListItem: addListItem,
            showDetails: showDetails
        };
    })();


 //Use the public method to get all Pokémon and iterate over them

pokemonRepository.getAll().forEach (function(pokemon){
pokemonRepository.addListItem(pokemon);
});

