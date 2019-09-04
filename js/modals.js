
// sets the user status after a state change
let userStatus = false
auth.onAuthStateChanged(user => {
  if (user) { userStatus = true }
})
document.addEventListener('DOMContentLoaded', function () {
  let modals = document.querySelectorAll('.modal')
  M.Modal.init(modals)
})

const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signupForm['signup-email'].value
  const password = signupForm['signup-password'].value
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup')
    M.Modal.getInstance(modal).close()
    signupForm.reset()
  })
})

const logout = document.querySelector('#logout')
logout.addEventListener('click', e => {
  e.preventDefault()
  auth.signOut()
  location.reload()
})

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm['login-email'].value
  const password = loginForm['login-password'].value

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-login')
    M.Modal.getInstance(modal).close()
    loginForm.reset()
  })
})

const lyrics = document.querySelector('#lyrics-modal')
logout.addEventListener('click', e => {
  e.preventDefault()
  M.Modal.getInstance(modal).close()
})
