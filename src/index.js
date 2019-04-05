const BASE_URL = "http://localhost:3000/toys"
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
const toyCollection = document.getElementById('toy-collection')
let addToy = false

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
      newToyForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        addNewToy(ev.target[0].value , ev.target[1].value )
      })
  } else {
    toyForm.style.display = 'none'
  }
})

function getToys() {
  fetch(BASE_URL)
    .then(res => res.json())
    .then(toys => {renderToys(toys)
  })
}

function renderToys(toys) {
  toys.forEach(toy => {
    toyCollection.appendChild(createToy(toy))
  })
}

function addNewToy(n, i) {
  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": n,
      "image": i,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then(toy => {toyCollection.appendChild(createToy(toy))
  })
}

function addLike(toy) {
  fetch(BASE_URL + '/' + toy.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes + 1
    })
  })
    .then(res => res.json())
    .then(toy => { renderNewLikes(toy)
  })
}

function renderNewLikes(toy) {
  p = document.getElementById(toy.id)
  console.log(toy.likes)
  p.textContent = toy.likes + ' Likes'
}

function createToy(toy) {
  card = document.createElement('div')
  card.classList.add('card')

  h2 = document.createElement('h2')
  h2.textContent = toy.name
  img = document.createElement('img')
  img.classList.add('toy-avatar')
  img.src = toy.image
  p = document.createElement('h2')
  p.setAttribute('id', toy.id)
  p.textContent = toy.likes + ' Likes'
  button = document.createElement('button')
  button.classList.add('like-btn')
  button.textContent = 'Like <3'
  button.addEventListener('click', () => {
    addLike(toy)
  })


  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)

  return card
}

getToys()
