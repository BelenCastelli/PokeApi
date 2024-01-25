toastr.options.preventDuplicates = true;

let countLimit = 10
let countOffset = 0

const container = document.getElementById('container');
let searchContainer = document.getElementById('searchContainer')
let search = document.getElementById('search')
let stats = document.getElementById('stats')
let description = document.getElementById('description')

let url = `https://pokeapi.co/api/v2/pokemon/?offset=${countOffset}&limit=${countLimit}`;

function pokemonsOnload(){
    pokemons(url)
}

function morePokemons(){
    countOffset += 10
    url = `https://pokeapi.co/api/v2/pokemon/?offset=${countOffset}&limit=${countLimit}`;
    pokemons(url)
}


function pokemons(url){
    let param = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'GET'
    };

    fetch(url,param)
    .then(data =>data.json())
    .then(data =>{
        let pokemonContainer = document.createElement("div");
        pokemonContainer.classList.add('pokemonContainer')
            for(let i = 0; i < data.results.length; i++){
                // Hago otra peticion por cada uno de los pokemons
                fetch(data.results[i].url)
                .then(res => res.json())
                // devuelve todos los datos de cada pokemon/id
                .then(datosPokemon =>card(datosPokemon, pokemonContainer))
                .catch(error =>{
                    console.log(error);
                    toastr.error(`${error}`, '¡ERROR!',
                                {closeButton:true, positionClass: 'toast-top-center',
                                })
                })
            }
    })
    .catch(error =>{
        console.log(error);
    })
}

function buscar() {

    let imput = document.getElementById('input').value;
    let url = `https://pokeapi.co/api/v2/pokemon/${imput}`;
    let param = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'GET'
    };

    fetch(url,param)
    .then(data => data.json())
    .then(datosPokemon => {
        cardSearch(datosPokemon);
        table(datosPokemon);
    })
    let urlLocation = `https://pokeapi.co/api/v2/pokemon/${imput}/encounters`
    fetch(urlLocation, param)
    .then(data => data.json())
    .then(data => {enviroment(data)})
    .catch(error =>{
        console.log(error);
        toastr.error('Pokemon does not exist', '¡ERROR!',
                    {closeButton:true, positionClass: 'toast-top-center',
                })
    })
}

function deleteSearch() {
search.innerHTML = '';
locationArea.innerHTML = '';
stats.innerHTML = '';

}

function typeSearch(){

}


function card(datosPokemon, pokemonContainer){

    let card = document.createElement("div")
    card.classList.add("card")

    // Foto pokemon
    let img = document.createElement("img");
    img.src = datosPokemon.sprites.front_default
    img.width = 150;
    img.textContent = datosPokemon.sprites.back_default;
    img.classList.add("img")

    // Nombre Pokemon
    let name = document.createElement("h3");
    name.textContent = datosPokemon.name;
    name.classList.add("title")

    //id Pokemon
    let id = document.createElement("p");
    id.textContent = `Nº${datosPokemon.id}`;
    id.classList.add("id")

    // Tipo Pokemon
    let type = document.createElement("p");
    let types = datosPokemon.types.map(type => type.type.name);

    let boldType = document.createElement('b');
    boldType.textContent = 'Type: '
    let typeContent = document.createTextNode(`${types.join(', ')}`);
    type.appendChild(boldType)
    type.appendChild(typeContent);
    type.classList.add("content")

    // Habilidades
    let ability = document.createElement("p");
    let abilities = datosPokemon.abilities.map(ability => ability.ability.name);

    let boldAbility = document.createElement('b');
    boldAbility.textContent = 'Ability: '
    let abilityContent = document.createTextNode(`${abilities.join(', ')}`);
    ability.appendChild(boldAbility);
    ability.appendChild(abilityContent);
    ability.classList.add("content")

    // Experiencia Base
    let boldExperience = document.createElement('b');
    boldExperience.textContent ='Base Experience: '

    let experience = document.createElement("p");
    let experienceContent = document.createTextNode(`${datosPokemon.base_experience}`);
    experience.appendChild(boldExperience);
    experience.appendChild(experienceContent);
    experience.classList.add("content")

    // añadir cada elemento a card
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(id)
    card.appendChild(type)
    card.appendChild(ability)
    card.appendChild(experience)

    // añdir las card al div
    pokemonContainer.appendChild(card)
    // añdir al div a main con id=container
    container.appendChild(pokemonContainer); 
}



function cardSearch(datosPokemon){

    let pokemonSearch = document.createElement("div");
    pokemonSearch.classList.add('pokemonContainer');
    let card = document.createElement("div")
    card.classList.add("pokemonSearch")

    // Foto pokemon
    let img = document.createElement("img");
    img.src = datosPokemon.sprites.front_default
    img.width = 185;
    img.textContent = (`${datosPokemon.sprites.back_default}`);
    img.classList.add("imgSearch")

    // Nombre Pokemon
    let name = document.createElement("h3");
    name.textContent = (`${datosPokemon.name}`);
    name.classList.add("titleSearch")

    //id Pokemon
    let id = document.createElement("p");
    id.textContent = (`Nº${datosPokemon.id}`);
    id.classList.add("idSearch")

    // Tipo Pokemon
    let type = document.createElement("p");
    let types = datosPokemon.types.map(type => type.type.name);

    let boldType = document.createElement('b');
    let typeText = document.createTextNode('Type: ');
    boldType.appendChild(typeText);

    let typeContent = document.createTextNode(`${types.join(', ')}`);

    type.appendChild(boldType)
    type.appendChild(typeContent);
    type.classList.add("contentSearch")

    // Habilidades
    let ability = document.createElement("p");
    let abilities = datosPokemon.abilities.map(ability => ability.ability.name);
    let boldAbility = document.createElement('b');
    let abilityText = document.createTextNode('Ability: ');
    boldAbility.appendChild(abilityText);

    let abilityContent = document.createTextNode(`${abilities.join(', ')}`);
    ability.appendChild(boldAbility);
    ability.appendChild(abilityContent);
    ability.classList.add("contentSearch")

    // Experiencia Base
    let boldExperience = document.createElement('b');
    boldExperience.textContent ='Base Experience: '

    let experience = document.createElement("p");
    let experienceContent = document.createTextNode(`${datosPokemon.base_experience}`);
    experience.appendChild(boldExperience);
    experience.appendChild(experienceContent);
    experience.classList.add("contentSearch")

    // añadir cada elemento a card
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(id)
    card.appendChild(type)
    card.appendChild(ability)
    card.appendChild(experience)

    pokemonSearch.appendChild(card);
    search.appendChild(pokemonSearch);

    search.innerHTML = '';
    search.appendChild(pokemonSearch);

}

function table(datosPokemon){
    let statsDiv = document.createElement('div');
    statsDiv.classList.add('location')
    let statsTable = document.createElement('table');
    statsTable.classList.add('pokemontable')

    
    let headerRow = statsTable.insertRow(0)
    
    let name = document.createElement('th')
    name.textContent = 'Stat Name'
    headerRow.appendChild(name)

    let baseStat = document.createElement('th')
    baseStat.textContent = 'Base Stat'
    headerRow.appendChild(baseStat)

    for(let i = 0; i < datosPokemon.stats.length; i++){
        let row = statsTable.insertRow(i + 1)
        let nameCell = row.insertCell(0)
        nameCell.textContent = datosPokemon.stats[i].stat.name
        let baseStatCell = row.insertCell(1)
        baseStatCell.textContent = datosPokemon.stats[i].base_stat
    }

    statsDiv.appendChild(statsTable);
    stats.appendChild(statsDiv);

    
    stats.innerHTML ='';
    stats.appendChild(statsDiv)

}

function enviroment(data){
    let locationArea = document.getElementById('locationArea')
    let dataFilter = data.map((data, index) => index+1 + ': ' + data.location_area.name)
    dataFilter = dataFilter.map(element => element.replace(/-/g, ' '));
    console.log(dataFilter);

    let enviroment = document.createElement('div')
    enviroment.classList.add('location')

    let bold = document.createElement('b');
    bold.textContent = 'Location Area: ';
    enviroment.appendChild(bold);

    if(dataFilter.length > 0 && dataFilter.length < 10){

        enviroment.innerHTML += `${dataFilter.join(', ')}<br>`;
    } else if (dataFilter.length > 10){
        dataFilter = dataFilter.filter((data, index) => index < 10)
        enviroment.innerHTML += `${dataFilter.join(', ')}, etc..<br>`;

    } else {
        enviroment.innerHTML += 'There are no location areas'
    }

    locationArea.appendChild(enviroment)
  

    locationArea.innerHTML = ''
    locationArea.appendChild(enviroment);

}
