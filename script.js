let countLimit = 10
let countOffset = 0

let search = document.getElementById('search')
let stats = document.getElementById('stats')

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
        const container = document.getElementById('container');
        card(data)  
    })
    .catch(error =>{
        console.log(error);
    })
}


function buscar() {

    let imput = document.getElementById('input').value;
    // let typeSearch = document.getElementById('typeSearch').value
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
        search = document.getElementById('search')
        stats = document.getElementById('stats')
        let pokemonSearch = document.createElement("div");
        pokemonSearch.classList.add('pokemonContainer');

        let card = cardSearch(datosPokemon);
        pokemonSearch.appendChild(card);
        search.appendChild(pokemonSearch);

        // Crear contenedor para estadísticas
        let statsDiv = document.createElement('div');
        statsDiv.classList.add('pokemonContainer')
        let statsTable = document.createElement('table');
        statsTable.classList.add('pokemontable')
        table(statsTable, datosPokemon);
        statsDiv.appendChild(statsTable);
    
        stats.appendChild(statsDiv);

        // reemplaza el contenido con la nueva busqueda
        search.innerHTML = '';
        search.appendChild(pokemonSearch);

        stats.innerHTML ='';
        stats.appendChild(statsDiv)

    })
    .catch(error =>{
        console.log(error);
    })
}

function deleteSearch() {
    search.innerHTML = '';
    stats.innerHTML ='';
 
}
function card(data){
    let pokemonContainer = document.createElement("div");
    pokemonContainer.classList.add('pokemonContainer')
        for(let i = 0; i < data.results.length; i++){
            // Hago otra peticion por cada uno de los pokemons
            fetch(data.results[i].url)
            .then(res => res.json())
            // devuelve todos los datos de cada pokemon/id
            .then(datosPokemon =>{
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
                let types =[]
                    for (let z = 0; z < datosPokemon.types.length; z++){
                        types.push(datosPokemon.types[z].type.name)
                    }

                let boldType = document.createElement('b');
                boldType.textContent = 'Type: '
                let typeContent = document.createTextNode(`${types.join(', ')}`);
                type.appendChild(boldType)
                type.appendChild(typeContent);
                type.classList.add("content")

                // Habilidades
                let ability = document.createElement("p");
                let abilities =[]
                    for (let z = 0; z < datosPokemon.abilities.length; z++){
                        abilities.push(datosPokemon.abilities[z].ability.name)
                    }

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

            })
        }     
}



function cardSearch(datosPokemon){


            let card = document.createElement("div")
            card.classList.add("pokemonSearch")

            // Foto pokemon
            let img = document.createElement("img");
            img.src = datosPokemon.sprites.front_default
            img.width = 185;
            let imgContent = document.createTextNode(`${datosPokemon.sprites.back_default}`);
            img.appendChild(imgContent);
            img.classList.add("imgSearch")

            // Nombre Pokemon
            let name = document.createElement("h3");
            let nameContent = document.createTextNode(`${datosPokemon.name}`);
            name.appendChild(nameContent);
            name.classList.add("titleSearch")

            //id Pokemon
            let id = document.createElement("p");
            let idContent = document.createTextNode(`Nº${datosPokemon.id}`);
            id.appendChild(idContent);
            id.classList.add("idSearch")

            // Tipo Pokemon
            let type = document.createElement("p");
            let types =[]
                for (let z = 0; z < datosPokemon.types.length; z++){
                    types.push(datosPokemon.types[z].type.name)
                }

            let boldType = document.createElement('b');
            let typeText = document.createTextNode('Type: ');
            boldType.appendChild(typeText);

            let typeContent = document.createTextNode(`${types.join(', ')}`);

            type.appendChild(boldType)
            type.appendChild(typeContent);
            type.classList.add("contentSearch")

            // Habilidades
            let ability = document.createElement("p");
            let abilities =[]
                for (let z = 0; z < datosPokemon.abilities.length; z++){
                    abilities.push(datosPokemon.abilities[z].ability.name)
                }
            let boldAbility = document.createElement('b');
            let abilityText = document.createTextNode('Ability: ');
            boldAbility.appendChild(abilityText);

            let abilityContent = document.createTextNode(`${abilities.join(', ')}`);
            ability.appendChild(boldAbility);
            ability.appendChild(abilityContent);
            ability.classList.add("contentSearch")

            // Experiencia Base
            let boldExperience = document.createElement('b');
            let experienceText = document.createTextNode('Base Experience: ');
            boldExperience.appendChild(experienceText);


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
    return card
}

function table(tableID, datosPokemon){
    // Encabezado
    let titleTable = document.createElement('thead')
    titleTable.textContent = 'Stats'
    titleTable.classList.add('titleTable')
    tableID.appendChild(titleTable)

    let headerRow = tableID.insertRow(0)
    
    let name = document.createElement('th')
    name.textContent = 'Stat Name'
    headerRow.appendChild(name)

    let baseStat = document.createElement('th')
    baseStat.textContent = 'Base Stat'
    headerRow.appendChild(baseStat)

    for(let i = 0; i < datosPokemon.stats.length; i++){
        let row = tableID.insertRow(i + 1)
        let nameCell = row.insertCell(0)
        nameCell.textContent = datosPokemon.stats[i].stat.name
        let baseStatCell = row.insertCell(1)
        baseStatCell.textContent = datosPokemon.stats[i].base_stat
    }
}

