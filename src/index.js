const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById('toy-collection')
const addToyForm = document.getElementsByClassName('add-toy-form')
const toyURL = 'http://localhost:3000/toys'
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    addToyForm[0].addEventListener('submit', (ev) => {
      ev.preventDefault()
      createToy(console.log(ev))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
function showToys() {
  fetch(toyURL)
  .then(response => response.json())
  .then(toys => {
    toys.map(createCard)
  })
}

function createCard(toy){
  let div = document.createElement('div')
  div.className = "card"
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p id="p${toy.id}">${toy.likes} Likes</p>
  `
  let likeBtn = document.createElement("button")
  likeBtn.textContent = "Like <3"
  likeBtn.className = "like-btn"
  likeBtn.addEventListener('click', () => {
    updateLikes(toy)
    // update the server with incremented likes`
    fetch(toyURL + `/${toy.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify({likes: toy.likes})
    })
    .then(response, console.log(response))
  })
  div.append(likeBtn)
  toyCollection.appendChild(div)
}

function updateLikes(toy){
  let pLikes = document.getElementById(`p${toy.id}`)
  console.log(pLikes)
  toy.likes++
  pLikes.textContent = `${toy.likes} Likes`
  return pLikes
}

function createToy(e) {
  console.log(e)
  let inputs = document.getElementsByClassName('input-text')
  let toyName = inputs[0].value
  let toyImageURL = inputs[1].value

  let data = {
    name: toyName,
    image: toyImageURL,
    likes: 0
  }

  fetch(toyURL, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(data)
  })
  .then(response, response.json())
  .then(toy, (toy) => {
    fetch(`${toyURL}/${toy.id}`)
    .then(response, response.json())
    .then(info, createCard(info))
  })
}

showToys()
