const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
// YOUR CODE HERE
const BASEURL = "http://localhost:3000/"
const TOYS_URL = `${BASEURL}toys`

const toyBin = document.getElementById('toy-collection');
const addToyForm = document.querySelector('form')
const submitButton = addToyForm.children[5]

function fetchToys(url){
  fetch(url)
    .then(res => res.json())
    .then(json => renderToys(json))
}

function renderToys(data){
  data.forEach(toy => {

    createToyCards(toy)
    addContentToToyCards(toy)
    CreateToyLikesButton(toy)

    toyBin.appendChild(toyCard)
    toyCard.appendChild(toyName)
    toyCard.appendChild(toyImg)
    toyCard.appendChild(toyLikes)
    toyCard.appendChild(toyLikesButton)
})

}

addBtn.addEventListener('click', () => {

  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    submitButton.addEventListener('click', () =>{
      let nameInput = addToyForm.children[1].value
      let imageInput = addToyForm.children[3].value
      fetchNewToy(TOYS_URL, nameInput, imageInput)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function createToyCards(toy){
  toyCard = document.createElement('div')
  toyName = document.createElement('h2')
  toyImg = document.createElement('img')
  toyLikes = document.createElement('p')

  toyCard.classList.add("card")
  toyImg.classList.add("toy-avatar")
  toyLikes.id = 'like' + toy.id
}

function addContentToToyCards(toy){
      toyName.textContent = toy.name
      toyImg.src = toy.image
      toyLikes.textContent = toy.likes
}
function CreateToyLikesButton(toy){
    toyLikesButton = document.createElement('button')
    toyLikesButton.classList.add("like-btn")
    toyLikesButton.textContent = "Like Toy"

    toyLikesButton.addEventListener('click', () => {
      fetch(`${TOYS_URL}/${toy.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": toy.likes++
        })
      })
        .then(res => res.json())
        .then(data => document.getElementById('like'+toy.id).textContent = data.likes)
    })
  }

function fetchNewToy(url, toyName, imageInput){
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(
      {
        "name": toyName,
        "image": imageInput,
        "likes": 0
      }
    )
  })
  fetchToys(TOYS_URL)
}
fetchToys(TOYS_URL)
// OR HERE!
