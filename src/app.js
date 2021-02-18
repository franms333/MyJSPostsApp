import {http} from './http';
import {ui} from './ui';

//OBTENER POST CON DOMLOAD
document.addEventListener('DOMContentLoaded', getPosts);
//LISTENER PARA AÑADIR POST
document.querySelector('.post-submit').addEventListener('click', submitPost);
//LISTENER PARA DELETE
document.querySelector('#posts').addEventListener('click', deletePost);
//LISTENER PARA EDIT STATE
document.querySelector('#posts').addEventListener('click', enableEdit);
//LISTENER PARA CANCEL EDIT
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts(){
  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(error => console.log(error));
}

function submitPost(){
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }
  //VALIDAR INPUT
  if(title === '' || body === ''){
    ui.showAlert('Please fill in all fields', 'alert alert-danger')
  }else{
    //CHEQUEAR POR ID
    if(id === ''){
      if(body === 'Ruffles de Queso are underrated'){
        alert('Indeed');
        http.post('http://localhost:3000/posts', data)
      .then(data => {
        
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      
      })
      .catch(error => console.log(data));
      } else {
        //CREAR UN POST
      http.post('http://localhost:3000/posts', data)
      .then(data => {
        
        ui.showAlert('Post Added', 'alert alert-success');
        ui.clearFields();
        getPosts();
      
      })
      .catch(error => console.log(data));
      }
    }else{
      //UPDATE POST
      http.put(`http://localhost:3000/posts/${id}`, data)
    .then(data => {
      
      ui.showAlert('Post Updated', 'alert alert-success');
      ui.changeFormState('add');
      getPosts();
    
    })
    .catch(error => console.log(data));
    }
   
  
  
  }
    
}
function deletePost(e){
  e.preventDefault();
  if(e.target.parentElement.classList.contains('delete')){
    const id = e.target.parentElement.dataset.id; //TOMARÁ EL ID DEL ELEMENTO TOMADO
    if(confirm('Are you sure?')){
      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data => {
        ui.showAlert('Post removed', 'alert alert-success');
        getPosts();
      })
      .catch(error => console.log(error));
    }
  }
}

//ENABLE EDIT STATE
function enableEdit(e){
  if(e.target.parentElement.classList.contains('edit')){
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    //LLENAR EL FORM CON EL POST ACTUAL
    ui.fillForm(data);
  }
  e.preventDefault();
}

//CANCEL EDIT STATE
function cancelEdit(e){
if(e.target.classList.contains('post-cancel')){
  ui.changeFormState('add');
}
e.preventDefault();
}

