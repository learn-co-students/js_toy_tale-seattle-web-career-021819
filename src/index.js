const addBtn = document.querySelector('#new-toy-btn')
const likeBtn = document.querySelector('#like-btn')
const createBtn = document.querySelector('.submit')
const toyForm = document.querySelector('.container')
const toyDiv = document.querySelector('#toy-collection')
let addToy = false
const URL = "http://localhost:3000/toys"

fetch(URL)
.then(res => res.json())
.then(data => {
  assignToyToCard(data)
})

function assignToyToCard(data) {
  data.forEach(toy => {
    let div = document.createElement("div")
    div.classList.add("card")

    let h2 = document.createElement("h2")
    h2.textContent = toy.name

    let img = document.createElement("img")
    img.src = toy.image
    img.classList.add("toy-avatar")

    let likesP = document.createElement("p")
    likesP.textContent = toy.likes + " likes"

    let button = document.createElement("button")
    button.classList.add("like-btn")
    button.textContent = "Like <3"
    likeButtonListener(button, toy, likesP)

    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(likesP)
    div.appendChild(button)
    toyDiv.appendChild(div)
  })
}

function createNewToy(newToyName, newToyImg) {
  fetch(URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({name: newToyName, image: newToyImg, likes: 0})
  })
  .then(res => res.json())
  .then(data => {
    let array = []
    array.push(data)
    assignToyToCard(array)
  })
}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    createBtn.addEventListener('click', (ev) => {
      ev.preventDefault()

      const newToyName = document.getElementById('name-input').value
      const newToyImg = document.getElementById('image-input').value

      createNewToy(newToyName, newToyImg)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function likeButtonListener(button, toy, likesP) {
  button.addEventListener( 'click', (ev) => {
    ev.preventDefault()

    toy.likes++

    fetch(URL + "/" + toy.id, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: toy.likes})
    })
    .then(res => res.json())
    .then(data => {
      likesP.textContent = data.likes + " likes"
    })

  })
}


// PATCH http://localhost:3000/toys/:id
// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }
//
// body:
// {
//   "likes": <new number>
// }






// OR HERE!
