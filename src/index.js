const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyListSection = document.querySelector('#toy-collection')
const newToyName = document.querySelector('#new-toy-name')
const newToyUrl = document.querySelector('#new-toy-url')
const newToySubmit = document.querySelector('#new-toy-submit')
let addToy = false

// YOUR CODE HERE


//helper to iterate through api restults and create toy cards
function createAllToys(data) {
  data.forEach((toy)=>{
    createToyOnPage(toy)
  })
}
//helper to take fetched toys and add to index page from full API list
function createToyOnPage(toy) {
    let toyDiv = document.createElement('div')
    toyDiv.classList.add('card')
    toyDiv.setAttribute('id',toy.id)
    let toyHeader = document.createElement('h2')
    toyHeader.innerText = toy.name
    let toyImage = document.createElement('img')
    toyImage.classList.add('toy-avatar')
    toyImage.src = toy.image
    let toyLikeCount = document.createElement('p')
    toyLikeCount.id = 'like-num'
    let toyLikeButton = document.createElement('button')
    toyLikeButton.classList.add('like-btn')
    toyLikeButton.innerText = 'Like Me'
    toyLikeCount.innerText = toy.likes

    //OLD ON-LINE EVENT LISTENER
    // toyLikeButton.addEventListener('click',()=>{
    //   addlike(toyDiv.id)
    //   let parentNode = event.target.parentNode
    //   let parentNodeId = parentNode.id
    //   let likeCount = parentNode.querySelector('#like-num').innerText
    //   let newLikeCount = parseInt(likeCount)+1
    //   parentNode.querySelector('#like-num').innerText = newLikeCount
    //   postToyLike(parentNodeId,newLikeCount)
    // })
    toyDiv.appendChild(toyHeader)
    toyDiv.appendChild(toyImage)
    toyDiv.appendChild(toyLikeCount)
    toyDiv.appendChild(toyLikeButton)
    toyListSection.appendChild(toyDiv)

    toyLikeButton.addEventListener('click',()=>{
      addLike(toyDiv.id)
    })
}

//DB FUNCITIONS

//helpfer function for like toys
function addLike(toyId) {
  let parentNode =document.querySelector(`div[id='${toyId}']`)
  let parentNodeId = parentNode.id
  let likeCount = parentNode.querySelector('#like-num').innerText
  let newLikeCount = parseInt(likeCount)+1
  parentNode.querySelector('#like-num').innerText = newLikeCount
  postToyLike(parentNodeId,newLikeCount)
}


//helper function to fetch toys
function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp=> resp.json())
  .then(data=>createAllToys(data))
}

//helper to post request for new toy
function postNewToy(){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'name': `${newToyName.value}`,
      'image': `${newToyUrl.value}`,
      'likes': 0
    })
  })
  .then(resp=>resp.json())
  .then(data=>createToyOnPage(data))
}

//save a like to the database
function postToyLike(toyId,likeNum){
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': `${likeNum}`
    })
  })
  .then(resp=>resp.json())
  .then(data=>data)
}

//EVENT LISTENERS
newToySubmit.addEventListener('click',(event)=>{
  event.preventDefault();
  postNewToy();
})

//event listener to load toys when page loads
window.addEventListener('DOMContentLoaded',() => {
  fetchToys();
})


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


// OR HERE!
