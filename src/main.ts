import './style.css'

import { Client, Databases, ID } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('67b3cc0b003cd9d295d2');

const databases = new Databases(client);

const form = document.querySelector('form')

form.addEventListener('submit', addJob)

function addJob(e){
  e.preventDefault()
 const job = databases.createDocument(
    '67b3ccfc0009f9a6c88c',
    '67b3cd15003d39d3f64a',
    ID.unique(),
    { "company-name": e.target.companyName.value,
      "date-added": e.target.dateAdded.value,
      "role": e.target.role.value,
      "location": e.target.location.value,
      "position-type": e.target.positionType.value,
      "source": e.target.source.value
     }
);
    job.then(function (response) {
      addJobsToDom();
    }, function (error) {
      console.log(error);
    });
  form.reset()
}

async function addJobsToDom() {
  document.querySelector('ul').innerHTML = ""
  let response = await databases.listDocuments(
    "67b3ccfc0009f9a6c88c",
    "67b3cd15003d39d3f64a",
);
// console.log(response.documents[0])
response.documents.forEach((job)=>{
  const li = document.createElement('li')
  li.textContent = `${job['company-name']} ${job['date-added']} ${job['role']} ${job['location']} ${job['position-type']} ${job['source']} coffee chat? ${job['chat']} `
  
  li.id = job.$id
  const deleteBtn = document.createElement('button')

  deleteBtn.textContent = 'h'

  deleteBtn.onclick= () => removeJob(job.$id)
  li.appendChild(deleteBtn)

  const coffeeBtn = document.createElement('button')
  coffeeBtn.textContent = 'coffee'
  coffeeBtn.onclick = () => updateChat(job.$id)

  li.appendChild(coffeeBtn)
  li.appendChild(deleteBtn)

  document.querySelector('ul').appendChild(li)
})

async function removeJob(id){
  const result = await databases.deleteDocument(
    '67b3ccfc0009f9a6c88c', // databaseId
    '67b3cd15003d39d3f64a', // collectionId
    id
   );
   document.getElementById(id)?.remove()// documentId
}
async function updateChat(id) {
  const result = databases.updateDocument(
    '67b3ccfc0009f9a6c88c', // databaseId
    '67b3cd15003d39d3f64a', // collectionId
    id, // documentId
    {'chat': true}, // data (optional)
        // permissions (optional)
  )
  result.then(function() {location.reload()})
}

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
}
addJobsToDom()

// const promise = databases.createDocument(
//     '67b3ccfc0009f9a6c88c',
//     '67b3cd15003d39d3f64a',
//     ID.unique(),
//     { "company-name": "100Devs",
//       "date-added": new Date(),
//       "role": "software engineer",
//       "location": "Philly",
//       "position-type": "full-time",
//       "source": "https://100devs.org"
//      }
// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });

