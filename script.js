
let hidden = false

function pokemons(){

    let url = `https://pokeapi.co/api/v2/pokemon?limit=151`;
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
    let typeSearch = document.getElementById('typeSearch').value
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
        console.log(datosPokemon);
        let pokemonSearch = document.createElement("div");
        pokemonSearch.classList.add('pokemonContainer')
        let card = document.createElement("div")
        card.classList.add("card")

        // Foto pokemon
        let img = document.createElement("img");
        img.src = datosPokemon.sprites.front_default
        img.width = 150;
        let imgContent = document.createTextNode(`${datosPokemon.sprites.back_default}`);
        img.appendChild(imgContent);
        img.classList.add("img")

        // Nombre Pokemon
        let name = document.createElement("h3");
        let nameContent = document.createTextNode(`${datosPokemon.name}`);
        name.appendChild(nameContent);
        name.classList.add("title")

        //id Pokemon
        let id = document.createElement("p");
        let idContent = document.createTextNode(`Nº${datosPokemon.id}`);
        id.appendChild(idContent);
        id.classList.add("id")

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
        type.classList.add("content")

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
        ability.classList.add("content")

        // Experiencia Base
        let boldExperience = document.createElement('b');
        let experienceText = document.createTextNode('Base Experience: ');
        boldExperience.appendChild(experienceText);


        let experience = document.createElement("p");
        let experienceContent = document.createTextNode(`${datosPokemon.base_experience}`);
        experience.appendChild(boldExperience);
        experience.appendChild(experienceContent);
        experience.classList.add("content")

        let stats = document.createElement('div');
        let stat =[]
        for (let z = 0; z < datosPokemon.stats.length; z++){
            stat.push(
               
           datosPokemon.stats[z].base_stat
            );
            
            console.log(stat);
        }
        let statsContent = document.createTextNode(`Stats: ${stat}`);
        stats.appendChild(statsContent);
        stats.classList.add("id")

        // añadir cada elemento a card
        card.appendChild(name)
        card.appendChild(img)
        card.appendChild(id)
        card.appendChild(type)
        card.appendChild(ability)
        card.appendChild(experience)
        card.appendChild(stats)
        // añdir las card al div
        pokemonSearch.appendChild(card)
        // añdir al div a main con id=container
        search.appendChild(pokemonSearch);

        // Limpiar para nueva busqueda
        let searchContainer = document.getElementById('search');
        searchContainer.innerHTML = '';
        searchContainer.appendChild(pokemonSearch);

    })
    .catch(error =>{
        console.log(error);
    })
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
                let imgContent = document.createTextNode(`${datosPokemon.sprites.back_default}`);
                img.appendChild(imgContent);
                img.classList.add("img")

                // Nombre Pokemon
                let name = document.createElement("h3");
                let nameContent = document.createTextNode(`${datosPokemon.name}`);
                name.appendChild(nameContent);
                name.classList.add("title")

                //id Pokemon
                let id = document.createElement("p");
                let idContent = document.createTextNode(`Nº${datosPokemon.id}`);
                id.appendChild(idContent);
                id.classList.add("id")

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
                type.classList.add("content")

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
                ability.classList.add("content")

                // Experiencia Base
                let boldExperience = document.createElement('b');
                let experienceText = document.createTextNode('Base Experience: ');
                boldExperience.appendChild(experienceText);


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


