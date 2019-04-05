const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollectionDiv = document.getElementById("toy-collection")

////// Populate page with cards of toys from toy JSON //////

fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(json => {
    json.forEach(toy => {
      makeToys(toy)
    })
  })

function makeToys (toy){
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let button = document.createElement('button')
  div.classList.add("card")
  h2.textContent = toy.name
  img.src = toy.image
  img.classList.add("toy-avatar")
  p.textContent = toy.likes
  button.classList.add("like-btn")
  button.textContent = "Like <3"
  addLike(toy, button, p)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
  toyCollectionDiv.appendChild(div)
}
//////  Add a toy to the page using POST request ////////
function constructFetch(name, image) {
  const headerObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name: name, image: image, likes: 0})
  }
  fetch('http://localhost:3000/toys', headerObj)
    .then(response => response.json())
    .then(json => makeToys(json))
}
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyForm.addEventListener('submit', (ev) => {
      ev.preventDefault()
      let name = document.getElementById("fudge").value
      let image = document.getElementById("fudgeImage").value
      constructFetch(name, image)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
///////// Add likes with an update fetch //////////
function addLike(toy, button, p) {
  button.addEventListener('click', (ev) => {
    toy_likes = toy.likes += 1
    const headerObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: toy_likes})
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, headerObj)
      .then(response => response.json())
      .then(json => {
        p.textContent = json.likes
        console.log(toy.likes)
      })
  })
}
