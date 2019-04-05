const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const TOY_URL = "http://localhost:3000/toys"
const form = document.querySelector('.add-toy-form')
let addToy = false

// YOUR CODE HERE

fetch(TOY_URL)
  .then(response => response.json())
  .then(data => {renderToys(data)});

function renderToys(toys) {
  toys.forEach(toy => {
    createToy(toy)
  })
}

function createToy(toy) {
  let toyCollection = document.getElementById('toy-collection');
  let div = document.createElement('div');
  let img = document.createElement('img');
  let p = document.createElement('p');
  let name = toy.name
  let imageURL = toy.image
  let likes = toy.likes
  let id = toy.id
  //adding classes to html
  div.classList.add('card');
  img.classList.add('toy-avatar');
  p.id = id
  //adding content to html
  img.src = imageURL;
  p.innerText = `${likes} Likes`;
  div.innerHTML = `<h2> ${name} </h2>`;
  //building the html cards
  toyCollection.appendChild(div);
  div.appendChild(img);
  div.appendChild(p);

  //button stuff
  let button = document.createElement('button');
  button.classList.add('like-btn');
  button.textContent = "Like <3";
  button.addEventListener('click', () =>{
    console.log("hello");
    likes = parseInt(likes) + 1;
    likeToy(id, likes);
  })
  div.appendChild(button);
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})


form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  let newName = ev.target[0].value
  let newUrl = ev.target[1].value
  let config = {
    method: 'POST',
    headers:
{
  "Content-Type": "application/json",
  Accept: "application/json"
},
  body: JSON.stringify({"name": newName, "image": newUrl, "likes": 0})
  }
  fetch (TOY_URL, config)
    .then(response => response.json())
    .then(data => {createToy(data)});
})

//adding likes
function likeToy(id, likes) {
  let p = document.getElementById(id)
  fetch(`http://localhost:3000/toys/${id}`, addLikes(likes))
    .then(response => response.json())
    .then(data => p.innerText = data.likes + " Likes"); //issues with rendering only ONE toy on forEach
}

function addLikes(likes){
  let config ={
    method: 'PATCH',
    headers: {"Content-Type": "application/json", Accept: "application/json"},
    body: JSON.stringify({"likes": likes})
  }
  return config
}
