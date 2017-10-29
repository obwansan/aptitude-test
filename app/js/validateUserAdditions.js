function isEmailValid() {
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        var email = document.getElementById("email")
        if (regexEmail.test(email.value)) {
            return true
        } else {
            return false
        }
}

isEmailValid()

function preventDefault() {
    document.getElementsByClassName('container_controls')[0].addEventListener('submit', function (event) {
        if (isEmailValid() !== true) {
            document.getElementById("email").insertAdjacentHTML('afterend', "<span class='title_input'>Please provide valid email</span>")
            event.preventDefault()
            event.returnValue = false
        }
    })
}
preventDefault()


// isEmailValid()
// function doesUserExist(emailToAdd, existingUsers) {
//     var result = false
//     existingUsers.forEach(function (user) {
//         if (user.email === emailToAdd) {
//             result = true
//         }
//     })
//     return result
// }
