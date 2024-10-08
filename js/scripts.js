// pokemonRepository
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=25';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function showLoadingMessage() {
        let loading = document.querySelector(".loading");
        loading.innerText = "Loading data...";
        loading.classList.add("is-visible");
    }

    function hideLoadingMessage() {
        let loading = document.querySelector(".loading");
        loading.innerText = "";
        loading.classList.remove("is-visible");
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function loadDetails(pokemon) {
        showLoadingMessage();
        return fetch(pokemon.detailsUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            pokemon.image_front = json.sprites.front_default;
            pokemon.image_back = json.sprites.back_default;
            pokemon.height = json.height;
            pokemon.weight = json.weight;
            showModal(pokemon);
            return pokemon;
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon);
    }

    function addEventListener(element, pokemon) {
        element.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function addListItem(pokemon) {
        let elementContainer = document.querySelector(".pokemon-list");
        let elementList = document.createElement('li');
        elementList.classList.add('list-group-item'); // Add list-group-item class

        let elementButton = document.createElement('button');
        elementButton.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-block'); // Add button classes
        elementButton.innerText = pokemon.name;

        addEventListener(elementButton, pokemon);
        elementList.appendChild(elementButton);
        elementContainer.appendChild(elementList);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Show Modal
function showModal(pokemon) {
    let modalTitle = document.querySelector('.modal-title');
    modalTitle.innerText = pokemon.name;

    let modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = '';

    let container = document.createElement('div');
    container.classList.add('container');
    let row1 = document.createElement('div');
    row1.classList.add('row');
    let row2 = document.createElement('div');
    row2.classList.add('row');

    let col1 = document.createElement('div');
    col1.classList.add('col-sm-6', 'text-center');
    let col2 = document.createElement('div');
    col2.classList.add('col-sm-6', 'text-center');
    let col3 = document.createElement('div');
    col3.classList.add('col-sm-6', 'text-center');
    let col4 = document.createElement('div');
    col4.classList.add('col-sm-6', 'text-center');

    let imageFront = document.createElement("img");
    imageFront.setAttribute("src", pokemon.image_front);
    imageFront.setAttribute("alt", "Pokemon front image");
    imageFront.setAttribute("height", "150px");
    imageFront.classList.add('rounded');

    let imageBack = document.createElement("img");
    imageBack.setAttribute("src", pokemon.image_back);
    imageBack.setAttribute("alt", "Pokemon back image");
    imageBack.setAttribute("height", "150px");
    imageBack.classList.add('rounded');

    let heightElement = document.createElement('p');
    heightElement.innerText = "Height: " + pokemon.height;

    let weightElement = document.createElement('p');
    weightElement.innerText = "Weight: " + pokemon.weight + " kg";

    col1.appendChild(imageFront);
    col2.appendChild(imageBack);
    col3.appendChild(heightElement);
    col4.appendChild(weightElement);
    
    row1.appendChild(col1);
    row1.appendChild(col2);
    row2.appendChild(col3);
    row2.appendChild(col4);
    
    container.appendChild(row1);
    container.appendChild(row2);
    modalBody.appendChild(container);

    // Show the modal
    $('#myModal').modal('show');
}
