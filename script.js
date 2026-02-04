import { checkUser, googleLogin, login, logout, signup } from "./firebase.js"

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
  })
}

if(logoutBtn){
  logoutBtn.addEventListener('click',()=>{
    logout()
  })

}

if(googleBtn){
  googleBtn.addEventListener('click',()=>{
    googleLogin()
  })
}
