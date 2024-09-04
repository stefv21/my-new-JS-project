

let pokemon = 'pokemonList';
console.log(typeof pokemon);


let pokemonlist = [
  { name: 'pikachu', type: 'electric', height: '7'},
  { name: 'charmeleon', type: 'fire', height: '3'},
  { name: 'pidgeot', type: 'normal', height: '6'}
];


for (let i=0; i < pokemonlist.length; i++){
    let height = parseFloat (pokemonlist[i].height); 
    let pokemon = pokemonlist[i];

    if (height < 4) {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) is small`);
      } else if (height >=5 && height <=6) {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) is average`);
      } else {
        document.write(`${pokemon.name} (Height: ${pokemon.height}) Wow, that's big!`);
      }
    }

