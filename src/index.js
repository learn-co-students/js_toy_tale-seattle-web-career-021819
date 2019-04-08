const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addToyForm = document.querySelector('.add-toy-form')
let addToy = false
const TOYURL = "http://localhost:3000/toys";

// YOUR CODE HERE
document.addEventListener('DOMContentLoaded', init)


function init(){
  console.log('DOM loaded')
  renderToyRequest().then(data => {
  data.forEach(toy => {renderToy(toy)})
})
}

function renderToyRequest(){
  return fetch(TOYURL).then(resp => resp.json())
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    addToyForm.addEventListener('submit', createToy)
  } else {
    toyForm.style.display = 'none'
  }
})



function createToy(e) {
  e.preventDefault();
  let inputs = document.querySelectorAll(".input-text");
  let name = inputs[0].value
  let image = inputs[1].value

  let info = {
    name: name,
    image: image,
    likes: 0
  }

  // renderToy(info)

  fetch(TOYURL, {
    method: "POST",
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify(info)
  }).then(res => res.json()).then(renderToy)

}


function renderToy(toy){
  let mainDiv = document.getElementById('toy-collection');

  let toyDiv = document.createElement('div');
  toyDiv.classList.add("card");
  toyDiv.id = toy.id

  let header = document.createElement('h2');
  header.textContent = toy.name;

  let img = document.createElement('img');
  img.src = toy.image;
  img.classList.add("toy-avatar");

  let likes = document.createElement('p');
  likes.textContent = toy.likes + " kids like me";
  likes.classList.add = ("like-count");

  let button = document.createElement('button')
  button.classList.add("like-btn");
  button.textContent = "Like <3";
  button.addEventListener( 'click', (e) => {
    e.preventDefault()
    toy.likes++
    increaseLikes(toy, likes);
  })

  toyDiv.appendChild(button);
  toyDiv.appendChild(likes);
  toyDiv.appendChild(img);
  toyDiv.appendChild(header);
  mainDiv.appendChild(toyDiv);
  }

  function increaseLikes(toy, likes) {
      fetch(TOYURL + "/" + toy.id, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({likes: toy.likes})
      }).then(res => res.json()).then(data => {
        likes.textContent = data.likes + " likes"
      })
  }
