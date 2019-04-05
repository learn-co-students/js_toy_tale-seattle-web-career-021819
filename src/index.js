const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const TOYS_URL = 'http://localhost:3000/toys'

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    let submit = document.querySelector('.submit')
    //let button = document.createElement('button')
    submit.addEventListener('click', (ev) => {
      ev.preventDefault()
      let toyName = document.getElementById('new_name').value
      let toyImage = document.getElementById('new_image').value
      addNewToy(toyName, toyImage)
    })

  } else {
    toyForm.style.display = 'none'
  }
})


fetch(TOYS_URL) //fetch data from the toys url which hosts json data
  .then( res => res.json())
  .then( data => {
    assignToysToCards(data)
  })

const assignToysToCards = (data) => {
  let div = document.getElementById('toy-collection')
    data.forEach(function (toy){

      let card = document.createElement('div')
      card.classList.add('card')
      let name = document.createElement('h2')
      name.textContent = toy.name
      card.appendChild(name)
      let img = document.createElement('img')
      img.classList.add('toy-avatar')
      img.src = toy.image
      card.appendChild(img)
      let like = document.createElement('p')
      like.innerText = `${toy.likes} Likes`
      card.appendChild(like)
      let button = document.createElement('button')
      button.textContent = "Like"
      button.classList.add('like-btn')
      button.addEventListener('click', (ev) => {
        ev.preventDefault()
        toy.likes += 1
        like.innerText = `${toy.likes} Likes`
        addLikes(toy.id, toy.likes)
      })
      card.appendChild(button)

      div.appendChild(card)
  })
}


const addNewToy = (toyName, toyImage) => {


  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name:toyName, image:toyImage, likes:0})
  }

  fetch(TOYS_URL, config)
  .then( resp => resp.json())
  .then( data => {
    let array = []
    array.push(data)
    assignToysToCards(array)
  })
}

const addLikes = (toy_id, toy_likes) => {
  let url = TOYS_URL + '/' + toy_id
  let config = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',
               Accept: "application/json"},
    body: JSON.stringify({likes:toy_likes})
  }

  fetch(url, config)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
}
