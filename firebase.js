// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider ,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";



const firebaseConfig = {
  apiKey: "AIzaSyCG-6DAa5uPEbtjfMu2TaIFwfuOgCgZ-0E",
  authDomain: "notes-app-a9388.firebaseapp.com",
  projectId: "notes-app-a9388",
  storageBucket: "notes-app-a9388.firebasestorage.app",
  messagingSenderId: "649205042534",
  appId: "1:649205042534:web:d68d5d738c6637b8f48ca7",
  measurementId: "G-VVP928DCF9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const errorMsg=document.querySelector('#errorMsg')


// check function for user login
export function checkUser() {
  onAuthStateChanged(auth, (user) => {

    const currentPage = window.location.pathname;

    if (user) {
      // user logged in → home
      if (!currentPage.includes('home.html')) {
        window.location.href = './home.html'
      }
    } else {
      // user not logged in
      if (
        !currentPage.includes('index.html') &&
        !currentPage.includes('signup.html')
      ) {
        window.location.href = './index.html'
      }
    }

  });
}


// logout function
export function logout(){

signOut(auth).then(() => {
  console.log('logout successfully');
  window.location.href="./index.html"
  
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
}


// signup function
export function signup(email,password){
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    location.href='./index.html'
    console.log(user);

    
  })
  .catch((error) => {
    errorBox.classList.remove('hidden')
    const errorCode = error.code;
    const errorMessage = error.message;
    if(errorMessage == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
      errorMsg.innerText = ` Password should contain atleast 8 characters long `
    }
    else if (errorMessage == 'Firebase: Error (auth/email-already-in-use).'){
      errorMsg.innerText = ` email already in use `
    }
    console.log(errorMessage);
    
    // ..
  });
}


// login function
export function login(email, password){

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    window.location.href='./home.html'
    console.log(user," ==> user loged in");
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
}


// continue with google function
export function googleLogin(){

signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    console.log('login successfully with google');
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}






// Initialize Firebase
