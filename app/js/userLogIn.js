/**
 * user log in function
 *
 */

document.querySelector('#logInForm').addEventListener('submit', function(e){
    e.preventDefault()
    let email = document.getElementById('email').value
    getUser(email).then(function(user) {
        if (user) {
            redirectUser(user)
        } else {
            let errorMessage = '<div class="alert alert-danger" role="alert">Invalid user. Please try again.</div>'
            let html = document.querySelector('#logInForm').innerHTML
            html = errorMessage + html
            document.querySelector('#logInForm').innerHTML = html
        }
    })
})


