// write your code here
const detailDiv = document.querySelector('#spice-blend-detail')
const ingredientsList = detailDiv.querySelector('.ingredients-list')
const updateForm = document.querySelector('#update-form')
const ingredientForm = document.querySelector('#ingredient-form')

function preloadSpice(){
    fetch('http://localhost:3000/spiceblends/1')
    .then(res => res.json())
    .then(renderSpice)
}

function renderSpice(spice){
    let image = detailDiv.querySelector('img')
    let title = detailDiv.querySelector('.title')

    image.src = spice.image
    title.textContent = spice.title

    spice.ingredients.forEach(ingredient => {
        addIngredient(ingredient.name)
    });
}

function updateTitle(e){
    e.preventDefault()
    let title = e.target.title.value
    fetch('http://localhost:3000/spiceblends/1',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title})
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
    addIngredient(name)

        e.target.reset()

}


updateForm.addEventListener('submit', updateTitle)
ingredientForm.addEventListener('submit', getIngredient)








preloadSpice()