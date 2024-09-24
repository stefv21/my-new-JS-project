        let pokemonRepository = (function () {
            let modalContainer = document.querySelector ('#modal-container');
            // Private array to hold Pokémon
            let pokemonList = [];
            let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
            let dialogPromiseReject;
            

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
                    let pokemon = {
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
                loadDetails(pokemon)
                  .then(function () {
                    // Create con
                    showModal(pokemon);
                  })
                  .catch(function (e) {
                    console.error("Failed to load Pokémon details:", e);
                  });
              }
            
            

              function showModal(pokemon) {
                modalContainer.innerHTML = "";
                let modal = document.createElement("div");
                modal.classList.add("modal");
            
                let closeButtonElement = document.createElement("button");
                closeButtonElement.classList.add("modal-close");
                closeButtonElement.innerText = "close";
                closeButtonElement.addEventListener("click", hideModal);
            
                let titleElement = document.createElement("h1");
                titleElement.innerText = pokemon.name;
            
                let contentElement = document.createElement("p");
                contentElement.innerHTML = pokemon.name;
            
                let imageElement = document.createElement('img');
                imageElement.classList.add('modal-img');
                imageElement.style.width = '50%';
                imageElement.setAttribute('src',pokemon.imageUrl)
            
                let heightElement = document.createElement('p');
                heightElement.textContent = `Height: ${pokemon.height}`;
            
                contentElement.appendChild(heightElement);
                contentElement.appendChild(imageElement);
            
                modal.appendChild(closeButtonElement);
                modal.appendChild(titleElement);
                modal.appendChild(contentElement);
                modalContainer.appendChild(modal);
                modalContainer.classList.add("is-visible");
              }

            function hideModal() {
                let modalContainer = document.querySelector('#modal-container');
                modalContainer.classList.remove('is-visible');
            
                if (dialogPromiseReject) {
                dialogPromiseReject();
                dialogPromiseReject = null;
                }
            }
            

                function showDialog(title, text) {
                    showModal(title, text);
                
                    // We have defined modalContainer here
                    let modalContainer = document.querySelector('#modal-container');
                
                    // We want to add a confirm and cancel button to the modal
                    let modal = modalContainer.querySelector('.modal');
                
                    let confirmButton = document.createElement('button');
                    confirmButton.classList.add('modal-confirm');
                    confirmButton.innerText = 'Confirm';
                
                    let cancelButton = document.createElement('button');
                    cancelButton.classList.add('modal-cancel');
                    cancelButton.innerText = 'Cancel';
                
                    modal.appendChild(confirmButton);
                    modal.appendChild(cancelButton);
                
                    // We want to focus the confirmButton so that the user can simply press Enter
                    confirmButton.focus();
                

                    return new Promise ((resolve, reject) => {
                        cancelButton.addEventListener('click', hideModal);
                        confirmButton.addEventListener('click', () => {
                        dialogPromiseReject = null; // Reset this
                        hideModal();
                        resolve();
                        });
                        // This can be used to reject from other functions
                    dialogPromiseReject = reject;
                    });
                    }
                

                document.querySelector('#show-dialog').addEventListener('click', () => {
                    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
                    alert('confirmed!');
                    }, () => {
                    alert('not confirmed');
                    });
                });
            

                window.addEventListener ('keydown', (e) =>{
                    let modalContainer = document.querySelector
                    ('modal-container');
                    if (e.key === 'Escape' &&
                    modalContainer.classList.contains ('is-visible')) {
                    hidemodal();
                    }
                });

                
                modalContainer.addEventListener('click', (e) => {

                    let target =  e.target;
                    if (target === modalContainer){
                        hidemodal();
                    }
                    });


            document.querySelector ('#show-modal').addEventListener
            ('click', ()=> {
                showModal('Modal title', 'This is the modal content!');
            });
            


                function showErrorMessage(input, message) {
                        let container = input.parentElement; // The .input-wrapper
                    
                        // Check and Remove any existing errors
                        let error = container.querySelector('.error-message');
                        if (error) {
                        container.removeChild(error);
                        }
                    
                        // Now add the error if the message isn’t empty
                        if (message) {
                        let error = document.createElement('div');
                        error.classList.add('error-message');
                        error.innerText = message;
                        container.appendChild(error);
                }
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
        })();


