let IS_USER_LOGIN = false;

auth.onAuthStateChanged(user =>{
    if (user) {
        console.clear();
        console.info('IS_USER_LOGIN')
      IS_USER_LOGIN = true;
    }
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
})

const loginForm = document.querySelector('#login-form')
loginForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const email = loginForm['login-email'].value
    const password = loginForm['login-password'].value

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        const modal = document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close()
        loginForm.reset()
        location.reload()

    })
})