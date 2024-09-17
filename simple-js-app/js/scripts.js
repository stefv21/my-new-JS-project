const pokemonRepository = (function () {
    // Private array to hold Pokémon
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
      

    // Function to get all Pokémon
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon
    function add(pokemon) {
        if (pokemon && pokemon.name) {
            pokemonList.push(pokemon);
        } else {
            console.error('Invalid Pokémon item');
        }
    }

    
    function displayPokemonInfo() {
        pokemonList.forEach(pokemon => {
            let height = parseFloat(pokemon.height); // Convert height to a number

            
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
            showDetails(pokemon);
        });
    }
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
         json.results.forEach (function (item) {
            var pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
      }
    
    function loadDetails (pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url). then (function (response) {
            return response.json();
        }).then (function (details){
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types; 
        }).catch (function (e) {
            console.error (e);
        });
    }


        function showDetails(pokemon) {
            loadDetails (pokemon).then (function(){
            console.log(`Name: ${pokemon.name}`);
            console.log(`Height: ${pokemon.height}`);
            console.log(`Types: ${pokemon.types}`);
            console.log(`Image URL: ${pokemon.imageUrl}`);;
            }).catch(function (e) {
                console.error('Failed to load Pokémon details:', e);
            
       });
    }

        return {
            getAll: getAll,
            add: add,
            displayPokemonInfo: displayPokemonInfo,
            addListItem: addListItem,
            showDetails: showDetails,
            loadList:loadList,
            loadDetails: loadDetails
        };
    })();


 //Use the public method to get all Pokémon and iterate over them

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach (function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
});




