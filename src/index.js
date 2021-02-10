// write your code here
const detailDiv = document.querySelector('#spice-blend-detail')
const ingredientsList = detailDiv.querySelector('.ingredients-list')
const updateForm = document.querySelector('#update-form')
const ingredientForm = document.querySelector('#ingredient-form')
const imageContainer = document.querySelector("#spice-images")

function preloadSpices(){
    fetch('http://localhost:3000/spiceblends/')
    .then(res => res.json())
    .then(spices => {
        spices.forEach( spice => {
            renderSpiceImage(spice)
        })
        loadSpice(spices[0].id)
    })

    
}

function renderSpiceImage(spice){
    let image = document.createElement('img')
    image.src = spice.image
    image.alt = spice.title
    image.dataset.id = spice.id

    imageContainer.append(image)

}
function loadSpice(id){
    fetch(`http://localhost:3000/spiceblends/${id}`)
    .then(res => res.json())
    .then(renderSpice)
}

function renderSpice({id, image, title, ingredients}){
    let divimage = detailDiv.querySelector('img')
    let divtitle = detailDiv.querySelector('.title')

    divimage.src = image
    divtitle.textContent = title

    ingredientsList.innerHTML = ""
    ingredients.forEach(ingredient => {
        addIngredient(ingredient.name)
    });

    updateForm.dataset.id = id
    ingredientForm.dataset.id = id
}

function updateTitle(e){
    e.preventDefault()
    let title = e.target.title.value
    let id = e.target.dataset.id
    fetch(`http://localhost:3000/spiceblends/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title})
    })

    detailDiv.querySelector('.title').textContent = title

    e.target.reset()
}

function addIngredient(name){
    let li = document.createElement('li')
        li.textContent = name
        ingredientsList.append(li)
}

function getIngredient(e){
    e.preventDefault()
    let name = e.target.name.value
    let spiceblendId = parseInt(e.target.dataset.id)
    addIngredient(name)
    updateIngredient({spiceblendId, name})

    e.target.reset()
}

function updateIngredient(newIngredient){
    fetch('http://localhost:3000/ingredients',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newIngredient)
    })
}

function handleClick(e){
    let id = e.target.dataset.id
    loadSpice(id)
}


updateForm.addEventListener('submit', updateTitle)
ingredientForm.addEventListener('submit', getIngredient)
imageContainer.addEventListener('click', handleClick)







preloadSpices()