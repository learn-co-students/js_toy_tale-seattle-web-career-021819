const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.getElementById('toy-collection')
const newToyForm = document.querySelector(".add-toy-form")
const toyUrl = 'http://localhost:3000/toys'

// YOUR CODE HERE

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
 //Create a Toy Card
const createToyCard = toy => {
  div = document.createElement('div')
  div.classList.add('card')
  div.hasAttribute('data-id')
  div.setAttribute('data-id', toy.id)
  h2 = document.createElement('h2')
  h2.innerText = toy.name
  img = document.createElement('img')
  img.classList.add("toy-avatar")
  img.src = toy.image
  p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = `Like <3`


  toyCollection.appendChild(div)
  div.appendChild(h2)
  div.appendChild(img)
  div.appendChild(p)
  div.appendChild(button)
}

const createToyCollection = (json) => {
  json.forEach(function(toy){
    createToyCard(toy)
  });
};

fetch('http://localhost:3000/toys').then(response => response.json()).then(json => createToyCollection(json))


newToyForm.addEventListener("submit", createNewToy)

 function createNewToy(ev){
   ev.preventDefault()

   let toyName = newToyForm.querySelector('[name]').value
   let toyImage = newToyForm.querySelector('[name]').value
   let newToyData = {name: toyName, image: toyImage, likes: 0}

   fetch(toyUrl, {
     method: 'POST',
     body: JSON.stringify(newToyData),
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     }
   })
   createToyCard(newToyData)
 }

 document.body.addEventListener('click', increaseLikes)

 function increaseLikes(ev){
   ev.preventDefault();
   if (ev.target.className === 'like-btn'){
     let id = ev.target.parentElement.dataset.id
     let like = ev.target.previousElementSibling
     let likeCount = parseInt(ev.target.previousElementSibling.innerText);
     like.innerText = `${++likeCount} likes`;

     fetch(`${toyUrl}/${id}`, {
       method: 'PATCH',
       body: JSON.stringify({likes: likeCount}),
       header: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       }
     })
   }
 }
     // let likes = ev.
     // fetch(toyUrl, {
     //   method: 'PATCH'
     // })
   // }
// OR HERE!
