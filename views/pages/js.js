
function showFileDialog(){
    document.getElementById('myFile').click();
}
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}
  

function setBgImage(){
    let file = document.getElementById('myFile').files[0];
    let span = document.getElementById('bg-span');
    getBase64(file).then(
      data => span.style.backgroundImage = 'url(' +data + ')'
    );
}


function showMonumentAddForm(){
  let form = document.getElementsByClassName('monument-form')[0];
  let plusSpan = document.getElementById('monument-plus');
  plusSpan.classList.toggle('hidespan');
  form.style.transform = 'translateY(0%)';
}

function showModal(event){
    event.preventDefault();
   let monument = {
     id: event.currentTarget.id,
     name: event.currentTarget.getAttribute("data-name"),
     location: event.currentTarget.getAttribute("data-location"),
     description: event.currentTarget.getAttribute("data-description"),
     img: event.currentTarget.getAttribute("data-img"),
     price: event.currentTarget.getAttribute("data-price"),
     copy: event.currentTarget.getAttribute("data-copy")
   }
   document.getElementById('monument-edit-form').setAttribute('action', '/monuments/edit/'+monument.id);
   document.getElementById('m-name').value = monument.name;
   document.getElementById('m-location').value = monument.location;
   document.getElementById('m-description').value = monument.description;
   document.getElementById('m-price').value = monument.price;
   document.getElementById('m-copy').value = monument.copy;
    let backDrop = document.getElementById('backDrop');
    backDrop.style.display = 'flex';
}
function closeModal(event){
 
    let backDrop = document.getElementById('backDrop');
  backDrop.style.display = 'none';
  
  
}