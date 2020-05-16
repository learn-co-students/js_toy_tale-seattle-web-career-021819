const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const TOY_URL = "http://localhost:3000/toys"
const toyDiv = document.getElementById('toy-collection');

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const addForm = document.querySelector('.add-toy-form')
    addForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      addToyApi(ev.target[0].value, ev.target[1].value);
    })
  } else {
    toyForm.style.display = 'none'
  }
})

// Fetch Toys from API
const fetchToys = () => {
  fetch(TOY_URL)
  .then(resp => resp.json())
  .then(data => {
    toyIterator(data);
  })
}

// Iterate through each toy
const toyIterator = (data) => {
  for (const toy of data) {
    const newCard = createCard(toy);
    toyDiv.appendChild(newCard);
  }
}

// Create single card
const createCard = (toy) => {

  // Building out <div>
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  // <h2>
  const h2 = document.createElement('h2');
  h2.innerText = toy.name;
  // <img>
  const img = document.createElement('img');
  img.src = toy.image;
  img.classList.add('toy-avatar');
  // <p>
  const pTag = document.createElement('p');
  pTag.innerText = toy.likes + ' Likes ';
  pTag.setAttribute('id', toy.id)
  // <button>
  const likeButton = document.createElement('button');
  likeButton.classList.add('like-btn');
  likeButton.innerText = "Like <3";
  likeButton.addEventListener('click', () => {
    addLikes(toy);
  });

  // Append all to <div>
  newCard.appendChild(h2);
  newCard.appendChild(img);
  newCard.appendChild(pTag);
  newCard.appendChild(likeButton);

  return newCard;
}

// Send new toy POST Request to API
const addToyApi = (name, url) => {
  fetch(TOY_URL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(data => createCard(data))
}

// Add likes with PATCH Request
const addLikes = (toy) => {
  fetch(`${TOY_URL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({"likes": toy.likes+=1})
  })
  .then(resp => resp.json())
  .then(data => refreshLikes(data))
}

// Refresh likes on page
const refreshLikes = (toy) => {
  const likes = document.getElementById(toy.id);
  likes.innerText = toy.likes + ' Likes '
}

// RUN THE SCRIPT!
fetchToys();
