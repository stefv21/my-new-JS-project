


(function() {


let pokemon = 'pokemonList';
console.log(typeof pokemon);




let pokemonlist = [
  { name: 'pikachu', type: 'electric', height: '7'},
  { name: 'charmeleon', type: 'fire', height: '3'},
  { name: 'pidgeot', type: 'normal', height: '6'}
];


pokemonlist.forEach(pokemon => {
    let height = parseFloat(pokemon.height);




    if (height < 4) {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) is small`);
      } else if (height >=5 && height <=6) {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) is average`);
      } else {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) Wow, that's big!`);
      }

    });

})(); 

