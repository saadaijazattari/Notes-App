import { addPhoto } from "./cloudinary.js"
import { addData, checkUser, deleteData, getAllData, getData, googleLogin, login, logout, signup, Updatenote } from "./firebase.js"

checkUser()

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if(user){
    userDataArray = await getAllData();
    console.log(userDataArray, "==> DATA FROM FIRESTORE");
    showUserData();
  }
});


/* HTML: <div class="loader"></div> */


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
const noteTitle=document.querySelector('#noteTitle')
const noteDescription=document.querySelector('#noteDescription')

const notImpNoteSec=document.querySelector('#notImpNoteSec')
const impNoteSec=document.querySelector('#impNoteSec')

const updateDescription=document.querySelector('#updateDescription')
const updateTitle=document.querySelector('#updateTitle')
const updateImportant=document.querySelector('#updateImportant')
const updateBtn=document.querySelector('#updateBtn')
const updateImage=document.querySelector('#updateImage')

const noteImage=document.querySelector('#noteImage')
const loader=document.querySelector('#loaderOverlay')



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
    if(!noteTitle.value || !noteDescription.value || !noteImage.files[0]) {
      Toastify({
  text: "❌ Please fill all fields!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "center", // top center to grab attention
  backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)", // red gradient
  stopOnFocus: true
}).showToast();

      return;
    }

// cloudinary code 

loader.style.display = 'flex';

try {
  const formData = new FormData();
    formData.append('file', noteImage.files[0]);
    formData.append('upload_preset', 'coderSaad');
  
    console.log(formData,"form data");
    
   const imageUrl= await  addPhoto(formData)
   console.log(imageUrl,"image url");
   
  
    
  
  // cloudinary code end
  
  
        
      const now = new Date()
      const date = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`
      const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
      const selectionImportance=getValue()
      console.log(noteTitle.value);
      console.log(noteDescription.value);
      console.log(noteImage);
      
      
       uniqueId=await addData(selectionImportance,noteDescription.value,noteTitle.value,date,time,imageUrl)
      console.log(selectionImportance);
               getData(uniqueId)
  
               
  
         userDataArray=await getAllData()
  
         Toastify({
       text: "✅ note added successfully!",
       duration: 3000,
       close: true,
       gravity: "top",
       position: "right",
       backgroundColor: "linear-gradient(to right, #28a745, #85e085)",
       stopOnFocus: true
     }).showToast();
          showUserData()
  
        
  
  
      noteDescription.value=''
      noteTitle.value=''
  
} catch (error) {
  console.log(error);
  
} finally{
  loader.style.display = 'none';
}




    
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

   let importantnotes=userDataArray.filter((importantnote)=> importantnote.isImportant === 'important' ).map((importantNote)=>{
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
        ${importantNote.noteTitle}
      </h3>

      <!-- Important Badge -->
      <span class="text-xs bg-amber-500 text-white px-2 py-1 rounded-md shadow">
        IMPORTANT
      </span>
    </div>

    <!-- Description -->
    <p class="text-slate-600 text-sm mt-2 leading-relaxed">
      ${importantNote.noteDescription}
    </p>

    <!-- Image (NEW) -->
    ${
      importantNote.noteImageUrl 
      ? `
        <img 
          src="${importantNote.noteImageUrl}" 
          alt="note image"
          class="mt-3 w-full max-h-64 object-cover rounded-lg border border-amber-200 shadow-sm"
        />
      `
      : ""
    }

    <!-- Buttons -->
    <div class="flex justify-end gap-3 mt-4 text-sm">

      <button 
        id="${importantNote.id}" 
        class="updatenoteBtn px-3 py-1 rounded-md bg-blue-50 text-blue-600 
               hover:bg-blue-100 transition"
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop">
        Edit
      </button>

      <button 
        id="${importantNote.id}" 
        class="deletenoteBtn px-3 py-1 rounded-md 
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
          
   ${importantnotes.join('')}
   `


   

   let notImportantnote=userDataArray.filter((notImportantnote)=> notImportantnote.isImportant === 'not important').map((unImportantNote)=>{
    return(
      `
      
      
      <div class="space-y-3 mb-3">

  <!-- Not Important Card -->
  <div 
    class="bg-white border-l-4 border-slate-300 
           p-4 rounded-xl shadow-sm 
           transition hover:shadow-lg hover:scale-[1.01]">

    <!-- Title -->
    <h3 class="font-semibold text-slate-800 text-lg">
      ${unImportantNote.noteTitle}
    </h3>

    <!-- Description -->
    <p class="text-slate-600 text-sm mt-2 leading-relaxed">
      ${unImportantNote.noteDescription}
    </p>

    <!-- Image (NEW) -->
    ${
      unImportantNote.noteImageUrl 
      ? `
        <img 
          src="${unImportantNote.noteImageUrl}" 
          alt="note image"
          class="mt-3 w-full max-h-60 object-cover rounded-lg border"
        />
      `
      : ""
    }

    <!-- Buttons -->
    <div class="flex justify-end gap-3 mt-4 text-sm">

      <button 
        id="${unImportantNote.id}" 
        class="updatenoteBtn px-3 py-1 rounded-md bg-blue-50 text-blue-600 
               hover:bg-blue-100 transition"
        data-bs-toggle="modal" 
        data-bs-target="#staticBackdrop">
        Edit
      </button>

      <button 
        id="${unImportantNote.id}" 
        class="deletenoteBtn px-3 py-1 rounded-md 
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

      ${notImportantnote.join('')}
   `
   




  
}


//  call get all data



// delete notes functionality

const body=document.body

// for delete functionality
body.addEventListener('click',(e)=>{
  if(e.target.classList.contains('deletenoteBtn')){
    console.log(e.target.parentNode.parentNode, 'parent element target element');
    
    console.log(e.target.id, "==> this is id")
    deleteData(e.target.id)
    e.target.parentNode.parentNode.remove()

    Toastify({
  text: "🗑️ note deleted successfully!",
  duration: 3000,
  close: true,
  gravity: "top",
  position: "right",
  backgroundColor: "linear-gradient(to right, #ff4b1f, #ff9068)",
  stopOnFocus: true
}).showToast();



  }
})

let selectednoteDetails;

// show modal data
body.addEventListener('click',(e)=>{
if(e.target.classList.contains('updatenoteBtn')){
  console.log(e.target.parentNode.parentNode, 'parent element target element');

   selectednoteDetails=userDataArray.find(selectednote=>  selectednote.id ===e.target.id)
  console.log(selectednoteDetails);

  updateTitle.value=selectednoteDetails.noteTitle
  updateDescription.value=selectednoteDetails.noteDescription
  updateImportant.value=selectednoteDetails.isImportant
  // updateImage.files=selectednoteDetails.noteImageUrl




// 
  
  

}
})


// update data functionality
updateBtn.addEventListener('click', async () => {

  loader.style.display = 'flex';

  try {
    let updatedImageUrl = selectednoteDetails.noteImageUrl; // default purani image
   
     // agar user ne new image select ki
     if(updateImage.files[0]){
       const formData = new FormData();
       formData.append('file', updateImage.files[0]);
       formData.append('upload_preset', 'coderSaad');
   
       updatedImageUrl = await addPhoto(formData);
     }
   
   
   
     selectednoteDetails.noteTitle = updateTitle.value
     selectednoteDetails.noteDescription = updateDescription.value
     selectednoteDetails.isImportant = updateImportant.value
       selectednoteDetails.noteImageUrl = updatedImageUrl
   
     await Updatenote(
       selectednoteDetails,
       selectednoteDetails.noteTitle,
       selectednoteDetails.noteDescription,
       selectednoteDetails.isImportant,
       selectednoteDetails.noteImageUrl
     )
   
     // Refresh UI
     userDataArray = await getAllData()
     showUserData()
   
       const modalEl = document.getElementById('staticBackdrop')
     const modal = bootstrap.Modal.getInstance(modalEl)
     modal.hide()
   
     Toastify({
       text: "✏️ note updated successfully!",
       duration: 3000,
       close: true,
       gravity: "top",
       position: "right",
       backgroundColor: "linear-gradient(to right, #2193b0, #6dd5ed)",
       stopOnFocus: true
     }).showToast();
    
  } catch (error) {
   console.log(error);
    
  } finally{
    loader.style.display = 'none';
  }


 })











