// get Element
const groceryForm = document.querySelector(".form-ontainer");
const groceryAlert = document.querySelector(".alert");
const groceryInput  = document.querySelector("#grocery");
const btnSubmit =  document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList =document.querySelector(".grocery-list");
const btnClear = document.querySelector(".clear-btn");
//edit options
let editElement ;
let editFlag = false;
let editID ="";

//Event Listenner 
btnSubmit.addEventListener("click" , addItem);
btnClear.addEventListener("click" , clearList);
window.addEventListener("DOMContentLoaded" , loadList)
// functions         
function addItem(e){
    e.preventDefault();
    const value =  groceryInput.value;
    const id = new Date().getTime().toString();
    if( value && !editFlag){
 const element = document.createElement("article");
 element.classList.add("grocery-item");
 const attr = document.createAttribute("data-id");
 attr.value = id;
 element.setAttributeNode(attr);
 element.innerHTML =`<p class="title">${value}</p>
 <div class="btn-container">
   <!-- edit btn -->
   <button type="button" class="edit-btn">
     <i class="fas fa-edit"></i>
   </button>
   <!-- delete btn -->
   <button type="button" class="delete-btn">
     <i class="fas fa-trash"></i>
   </button>
 </div>`;
 console.log(element);
 const editBtn = element.querySelector(".edit-btn");
 const deleteBtn = element.querySelector(".delete-btn");
editBtn.addEventListener("click" , editItem);
deleteBtn.addEventListener("click" , deleteItem);
groceryList.appendChild(element);
 alert("item added to list" , "success");
groceryContainer.classList.add("show-container");
addToLocalStorage(id , value);
setBackToDefault();
    }
   else if (value && editFlag){
    alert("item edited" ,"success");
    editElement.innerHTML = value;
    editFromLocalStorage(editID ,value);
    setBackToDefault();
   }
   else{
    alert("value is  empety" , "danger");
   }

}                  
// Alert
function alert(text , color){
    groceryAlert.textContent = text;
    groceryAlert.classList.add(`alert-${color}`);
    setTimeout(function(){
        groceryAlert.textContent ="";
        groceryAlert.classList.remove(`alert-${color}`);
    },2000)
}                      
function setBackToDefault(){
    btnSubmit.textContent = "Submit";
    editFlag = false;
    editID = "";
    groceryInput.value = "";
}                                    
function clearList(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function(item){
            groceryList.removeChild(item);
        });
        groceryContainer.classList.remove("show-container");
        alert("list has been clear" ,"success");    
    }
    localStorage.removeItem("list");
  
}
    // edit Item

function editItem(e){
    const element  = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    editFlag = true;
    editID = element.dataset.id
    groceryInput.value  = editElement.innerHTML;
    btnSubmit.textContent = "Edit";
}
function deleteItem(e){ 
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    groceryList.removeChild(element);
    alert("item deleted form list" , "success");
    if(groceryList.children.length == 0){
        groceryContainer.classList.remove("show-container");
    }
    removeFromLocalStorage(id);
}
//LocalStorage
// getLocalStorage
function getLocalStorage(){
    return  localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}
// add to localStorage
function addToLocalStorage(id , value){
    const grocery = {id , value}
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
}    

// edit localStorage
function editFromLocalStorage(id , value){
    let items = getLocalStorage();
   items = items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id){
    let items = getLocalStorage();
 items = items.filter(function(item){
        if(item.id !== id){
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
// load from localStorage
function loadList(){
    
    let items = getLocalStorage();
    if(items.length > 0){
        items.forEach(function(item){
            createList(item.id ,item.value)
        })
        groceryContainer.classList.add("show-container");
    }

}
function createList(id , value){
    const element = document.createElement("article");
    element.classList.add("grocery-item");
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML =`<p class="title">${value}</p>
    <div class="btn-container">
      <!-- edit btn -->
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <!-- delete btn -->
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");
   editBtn.addEventListener("click" , editItem);
   deleteBtn.addEventListener("click" , deleteItem);
   groceryList.appendChild(element);
}