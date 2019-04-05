const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOYS_URL = 'http://localhost:3000/toys'



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




function loadToys() {
  fetch(TOYS_URL)
    .then(res => res.json())
    .then(data => {
      data.forEach(function(toy) {
        createCard(toy)
      })
    })
}


function createCard(toy) {
  const toyCollection = document.getElementById('toy-collection')
  let {id, name, image, likes} = toy

  // create Div for card
  div = document.createElement('div')
  div.classList.add('card')
  toyCollection.appendChild(div)

  // add Header2 for name
  h2 = document.createElement('h2')
  h2.innerText = name
  div.appendChild(h2)

  // add Image
  img = document.createElement('img')
  img.src = image
  img.classList.add('toy-avatar')
  div.appendChild(img)

  // add Likes paragraph
  p = document.createElement('p')
  p.innerText = `${likes} Likes`
  p.dataset.likesId = id
  div.appendChild(p)

  // add Like button
  button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = "Like <3"
  button.addEventListener('click', () => {

    // add likes on current page
    likes++
    console.log(likes)
    let p = document.querySelector(`[data-likes-id='${id}']`)
    p.innerText = `${likes} Likes`

    // update server with new number of likes
    let config = {
      method: "PATCH",
      headers: {
         "Content-Type": "application/json",
         Accept: "application/json"},
      body: JSON.stringify({"likes": `${likes}`})
    }

    fetch(TOYS_URL + `/${id}`, config)
  })

  div.appendChild(button)

}



// creating new toys
let submit = document.getElementsByClassName('submit')[0]
let inputs = document.getElementsByClassName('input-text')
submit.addEventListener('click', (ev) => {
  ev.preventDefault();
  let inputName = inputs[0].value
  let inputImg = inputs[1].value
  console.log(inputName)
  newToy(inputName, inputImg)
});

function newToy(inputName, inputImg) {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": `${inputName}`,
        "image": `${inputImg}`,
        "likes": 0
      })
    }
    fetch(TOYS_URL, config)
      .then(res => res.json())
      .then(data => {

        fetch(TOYS_URL + `/${data.id}`)
          .then(res => res.json())
          .then(data => {
            createCard(data)
          })
      })
}



loadToys()
