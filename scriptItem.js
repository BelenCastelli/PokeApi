toastr.options.preventDuplicates = true;
let container = document.getElementById('container');
let searchContainer = document.getElementById('searchContainer')
let search = document.getElementById('search')

let countLimit = 10
let countOffset = 0

let url = `https://pokeapi.co/api/v2/item/?offset=${countOffset}&limit=${countLimit}`;

function itemsOnload(){
    items(url)
}

function moreItems(){
    countOffset += 10
    url = `https://pokeapi.co/api/v2/item/?offset=${countOffset}&limit=${countLimit}`;
    items(url)
}


function items(url){
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
        console.log(data);
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
    let url = `https://pokeapi.co/api/v2/item/${imput}`;
    let param = {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        method: 'GET'
    };

    fetch(url,param)
    .then(data => data.json())
    .then(data => {
        cardSearch(data);
    })
    .catch(error =>{
        console.log(error);
        toastr.error('Item does not exist', '¡ERROR!',
                    {closeButton:true, positionClass: 'toast-top-center',
                })
    })
}

function card(data, itemContainer){
    let card = modelCard(data)
    // añdir las card al div
    itemContainer.appendChild(card)
    // añdir al div a main con id=container
    container.appendChild(itemContainer); 
}

function cardSearch(data){
    let itemSearch = document.createElement("div");
    itemSearch.classList.add('pokemonContainer');
    let card = modelCard(data)
    itemSearch.appendChild(card);
    search.appendChild(itemSearch);

    search.innerHTML = '';
    search.appendChild(itemSearch);
}

function deleteSearch() {
    search.innerHTML = '';
    }

function modelCard(data){
    
    let card = document.createElement("div")
    card.classList.add("card")
    
    // Foto 
    let img = document.createElement("img");
    img.src = data.sprites.default
    img.width = 80;
    img.textContent = data.sprites.default;
    img.classList.add("img")
    
    // Nombre 
    let name = document.createElement("h3");
    name.textContent = data.name;
    name.classList.add("title")
    
    //id 
    let id = document.createElement("p");
    id.textContent = `Nº${data.id}`;
    id.classList.add("id")
    
    // cost
    
    let cost = document.createElement("p");
    cost.textContent = data.cost
    cost.classList.add("cost")
    // category
    
    let category = document.createElement("p");
    category.textContent = data.category.name
    category.classList.add("category")
    
    // attributes
    
    let attribute = document.createElement('p')
    let attributes = data.attributes.map(attribute => attribute.name)
    attribute.textContent = attributes.join(', ')
    attribute.classList.add('attribute')
    
    // effects
    let effect = document.createElement('p');
    let effects = data.effect_entries.map(effect => effect. short_effect)
    effect.textContent = effects.join(', ')
    effect.classList.add('effect')
    
    // añadir cada elemento a card
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(id)
    card.appendChild(effect)
    card.appendChild(cost)
    card.appendChild(category)
    card.appendChild(attribute)
   
    return card
    
}

