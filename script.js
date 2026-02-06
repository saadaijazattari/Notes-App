import { addData, checkUser, deleteData, getAllData, getData, googleLogin, login, logout, signup, UpdateTodo } from "./firebase.js"

checkUser()

const signupPassword=document.querySelector('#signupPassword')
const signupEmail=document.querySelector('#signupEmail')
const signupName=document.querySelector('#signupName')
const signupBtn=document.querySelector('#signupBtn')

const loginEmail=document.querySelector('#loginEmail')
const loginPassword=document.querySelector('#loginPassword')
const loginBtn=document.querySelector('#loginBtn')

const logoutBtn=document.querySelector('#logoutBtn')
const googleBtn=document.querySelector('#googleBtn')

const addDataBtn=document.querySelector('#addDataBtn')
const todoTitle=document.querySelector('#todoTitle')
const todoDescription=document.querySelector('#todoDescription')

const notImpNoteSec=document.querySelector('#notImpNoteSec')
const impNoteSec=document.querySelector('#impNoteSec')

const updateDescription=document.querySelector('#updateDescription')
const updateTitle=document.querySelector('#updateTitle')
const updateImportant=document.querySelector('#updateImportant')
const updateBtn=document.querySelector('#updateBtn')



let userDataArray=[]




if(signupBtn){
signupBtn.addEventListener('click',()=> {
  console.log('button is working')
  signup(signupEmail.value,signupPassword.value)
})
}


if(loginBtn){

  loginBtn.addEventListener('click',()=>{
    console.log('login button is working');
      login(loginEmail.value,loginPassword.value)
      Toastify({
  text: "✅ Login successful!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right", // subtle, professional
  backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)", // green gradient
  stopOnFocus: true
}).showToast();

  })
}

if(logoutBtn){
  logoutBtn.addEventListener('click',()=>{
    logout()
    Toastify({
  text: "🛑 Logged out successfully!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right",
  backgroundColor: "linear-gradient(to right, #f7971e, #ffd200)", // orange-yellow gradient
  stopOnFocus: true
}).showToast();

  })

}

if(googleBtn){
  googleBtn.addEventListener('click',()=>{
    googleLogin()
    

  })
}

let uniqueId;


// add data event listener
if(addDataBtn){
  addDataBtn.addEventListener('click',async ()=>{
    if(!todoTitle.value || !todoDescription.value) {
      Toastify({
  text: "❌ Please fill all fields!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "center", // top center to grab attention
  backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)", // red gradient
  stopOnFocus: true
}).showToast();

      return
    }
      
    const now = new Date()
    const date = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    const selectionImportance=getValue()
    console.log(todoTitle.value);
    console.log(todoDescription.value);
    
    
     uniqueId=await addData(selectionImportance,todoDescription.value,todoTitle.value,date,time)
    console.log(selectionImportance);
             getData(uniqueId)

             

       userDataArray=await getAllData()

       Toastify({
     text: "✅ Todo added successfully!",
     duration: 3000,
     close: true,
     gravity: "top",
     position: "right",
     backgroundColor: "linear-gradient(to right, #28a745, #85e085)",
     stopOnFocus: true
   }).showToast();
        showUserData()

      


    todoDescription.value=''
    todoTitle.value=''



    
  })
}

             


function getValue(){
  const importantSelection=document.querySelector('#importantSelection')
  return importantSelection.value;
  

}



//  for show user data
async function showUserData(){

  if(userDataArray.length === 0) {
      impNoteSec.innerHTML = `<p class="text-red-500 text-center">No Notes Yet</p>`;
      notImpNoteSec.innerHTML = `<p class="text-gray-500 text-center">No Notes Yet</p>`;
      return; // stop further rendering
  }

  if (!impNoteSec || !notImpNoteSec) {
    return;
}


  

  console.log(userDataArray, "FULL DATA");

   let importantTodos=userDataArray.filter((importantTodo)=> importantTodo.isImportant === 'important' ).map((importantNote)=>{
    return(
      
          `
          <div class="space-y-3 mb-3">

  <!-- Important Card -->
  <div 
    class="bg-gradient-to-r from-amber-50 to-yellow-50 
           border-l-4 border-amber-500 
           p-4 rounded-xl shadow-sm 
           transition hover:shadow-lg hover:scale-[1.01]">

    <!-- Title + Badge -->
    <div class="flex items-center justify-between">
      <h3 class="font-semibold text-slate-800 text-lg">
        ${importantNote.todoTitle}
      </h3>

      <!-- Important Badge -->
      <span class="text-xs bg-amber-500 text-white px-2 py-1 rounded-md shadow">
        IMPORTANT
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-600 text-sm mt-2 leading-relaxed">
      ${importantNote.todoDescription}
    </p>

    <!-- Buttons -->
    <div class="flex justify-end gap-3 mt-4 text-sm">

      <button 
      id="${importantNote.id}" 
        class="updateTodoBtn px-3 py-1 rounded-md bg-blue-50 text-blue-600 
               hover:bg-blue-100 transition"
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop">
        Edit
      </button>

      <button 
        id="${importantNote.id}" 
        class="deleteTodoBtn px-3 py-1 rounded-md 
               bg-red-50 text-red-500 hover:bg-red-100 transition">
        Delete
      </button>

    </div>

  </div>

</div>
`
            )
          })
          impNoteSec.innerHTML=`
          
   ${importantTodos.join('')}
   `


   

   let notImportantTodo=userDataArray.filter((notImportantTodo)=> notImportantTodo.isImportant === 'not important').map((unImportantNote)=>{
    return(
      `
      
      
      <div class="space-y-3 mb-3">

  <!-- Not Important Card -->
  <div 
    class="bg-slate-50 border border-slate-200 
           p-4 rounded-xl shadow-sm 
           transition hover:shadow-md">

    <!-- Title + Badge -->
    <div class="flex items-center justify-between">
      <h3 class="font-medium text-slate-700">
        ${unImportantNote.todoTitle}
      </h3>

      <!-- Not Important Badge -->
      <span class="text-xs bg-slate-300 text-slate-700 px-2 py-1 rounded-md">
        NOT IMPORTANT
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-500 text-sm mt-2">
      ${unImportantNote.todoDescription}
    </p>

    <!-- Buttons -->
    <div class="flex justify-end gap-3 mt-4 text-sm">

      <button 
      id="${unImportantNote.id}" 
        class="updateTodoBtn px-3 py-1 rounded-md bg-blue-50 text-blue-600 
               hover:bg-blue-100 transition"
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop">
        Edit
      </button>

      <button 
        id="${unImportantNote.id}" 
        class="deleteTodoBtn px-3 py-1 rounded-md 
               bg-red-50 text-red-500 hover:bg-red-100 transition">
        Delete
      </button>

    </div>

  </div>

</div>

`
            )
          })
          
          notImpNoteSec.innerHTML=`

      ${notImportantTodo.join('')}
   `
   




  
}


//  call get all data
window.addEventListener('DOMContentLoaded', async () => {
  userDataArray = await getAllData()
  console.log(userDataArray, "==> DATA FROM FIRESTORE")
  showUserData()
})


// delete notes functionality

const body=document.body

// for delete functionality
body.addEventListener('click',(e)=>{
  if(e.target.classList.contains('deleteTodoBtn')){
    console.log(e.target.parentNode.parentNode, 'parent element target element');
    
    console.log(e.target.id, "==> this is id")
    deleteData(e.target.id)
    e.target.parentNode.parentNode.remove()

    Toastify({
  text: "🗑️ Todo deleted successfully!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right",
  backgroundColor: "linear-gradient(to right, #ff4b1f, #ff9068)",
  stopOnFocus: true
}).showToast();



  }
})

let selectedTodoDetails;

// show modal data
body.addEventListener('click',(e)=>{
if(e.target.classList.contains('updateTodoBtn')){
  console.log(e.target.parentNode.parentNode, 'parent element target element');

   selectedTodoDetails=userDataArray.find(selectedTodo=>  selectedTodo.id ===e.target.id)
  console.log(selectedTodoDetails);

  updateTitle.value=selectedTodoDetails.todoTitle
  updateDescription.value=selectedTodoDetails.todoDescription
  updateImportant.value=selectedTodoDetails.isImportant



// 
  
  

}
})


// update data functionality
updateBtn.addEventListener('click', async () => {
  selectedTodoDetails.todoTitle = updateTitle.value
  selectedTodoDetails.todoDescription = updateDescription.value
  selectedTodoDetails.isImportant = updateImportant.value

  await UpdateTodo(
    selectedTodoDetails,
    selectedTodoDetails.todoTitle,
    selectedTodoDetails.todoDescription,
    selectedTodoDetails.isImportant
  )

  // Refresh UI
  userDataArray = await getAllData()
  showUserData()

    const modalEl = document.getElementById('staticBackdrop')
  const modal = bootstrap.Modal.getInstance(modalEl)
  modal.hide()

  Toastify({
    text: "✏️ Todo updated successfully!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #2193b0, #6dd5ed)",
    stopOnFocus: true
  }).showToast();
})










