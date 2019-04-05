const URL = "http://localhost:3000/"
const addBtn = document.querySelector('#new-toy-btn')
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

const toyForm = document.querySelector('.container')
let addToy = false

const toys = document.getElementById('toy-collection')
const toyActualForm = document.querySelector('.add-toy-form')
toyActualForm.addEventListener('submit', ev => {
  ev.preventDefault()
  createToy(ev.target[0].value, ev.target[1].value)
})

/////////////////////////////////////////////////////////////////////////////////

function fetchToys() {
  fetch(URL + 'toys')
    .then(res => res.json())
    .then(data => renderToys(data))
}

function createToy(name, image) {
  fetch(URL + 'toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then(data => toys.appendChild(renderToy(data)))
}


function likeToy(toy) {
  fetch(URL + 'toys' + '/' + toy.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes += 1
    })
  })
    .then(res => res.json())
    .then(toy => {
      const p = document.getElementById('likes' + toy.id)
      p.textContent = toy.likes + ' likes'
    })
}

function renderToys(data) {
  data.forEach(toy => {
    toys.appendChild(renderToy(toy))
  })
}

/*
<div class="card">
  <h2>Woody</h2>
  <img src=toy_image_url class="toy-avatar" />
  <p>4 Likes </p>
  <button class="like-btn">Like <3</button>
</div>
*/

function renderToy(toy) {
  toyCard = renderElem('div', 'card')
  toyCard.id = 'card' + toy.id
  toyName = renderElem('h2', '', toy.name)
  toyImg = renderElem('img', 'toy-avatar')
  toyImg.src = toy.image
  toyLikes = renderElem('p', '', toy.likes + ' likes')
  toyLikes.id = 'likes' + toy.id
  toyButton = renderElem('button', 'like-btn', 'Like <3', {
    type: 'click',
    func: () => {
      likeToy(toy)
    }
  })

  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImg)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyButton)

  return toyCard
}

function renderElem(type, className, textContent, event) {
  const elem = document.createElement(type)
  if (textContent) elem.textContent = textContent
  if (className) elem.classList.add(className)
  if (event) elem.addEventListener(event.type, event.func)
  return elem
}

fetchToys() 