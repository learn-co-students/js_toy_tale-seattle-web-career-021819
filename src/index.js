const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const URL = 'http://localhost:3000/toys'
let addToy = false

fetch(URL)
.then(response => response.json())
.then(json => renderToys(json))


function renderToys(toys){
  
  toys.forEach(toy => {
    renderToy(toy)
  })    
}

function renderToy(toy){
    const collection=document.getElementById('toy-collection')
    let div=document.createElement('div')
    div.classList.add("card")
    let header=document.createElement('h2')
    header.textContent=toy.name
    let pic = document.createElement('img')
    pic.src=toy.image
    pic.classList.add("toy-avatar")
    let p=document.createElement('p')
    p.id=toy.id
    p.textContent=toy.likes + " Likes"

    let button=likeButton(toy)

    div.appendChild(header)
    div.appendChild(pic)
    div.appendChild(p)
    div.appendChild(button)
    collection.appendChild(div)

}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    const submit=document.querySelector('.add-toy-form')
    submit.addEventListener('submit', (ev)=> {
      ev.preventDefault()
      let config={
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "name": ev.target[0].value,
          "image": ev.target[1].value,
          "likes": '0'
        })
      }
      fetch(URL, config)
      .then(response => response.json())
      .then(data => renderToy(data))
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function likeButton(toy){
   let button= document.createElement("button")
    button.classList.add("like-btn")
    button.textContent="Like <3"
    button.addEventListener('click', () => {
      updateLikes(toy.id, toy.likes)       
    })
    return button;
}

function updateLikes(id, likes){
  let config={
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "likes": likes+=1
    })
  }
  let p=document.getElementById(id)
  fetch(URL+'/'+id, config)
  .then(response => response.json())
  .then(data => p.textContent=data.likes+" Likes")  
}
