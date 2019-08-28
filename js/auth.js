auth.onAuthStateChanged(user =>{
    if(user){
      //console.log('winning')
    }
    else{
        document.getElementById('addSongButton').disabled =true
       
    }
})

const signupForm = document.querySelector('#signup-form')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm['signup-email'].value
    const password = signupForm['signup-password'].value

    // auth.setPersistance(firebase.auth.Auth.Persistance.LOCAL).then(function(){
    //     auth.createUserWithEmailAndPassword(email, password).then(cred => {
    //         const modal = document.querySelector('#modal-signup')
    //         M.Modal.getInstance(modal).close()
    //         signupForm.reset()
    //     })

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