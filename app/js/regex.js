//function to validate the email address using RegEx
//takes the ID of the e-mail input filed and check if the e-mail content is valid

document.getElementById('container_page').addEventListener('submit', function (event) {
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    var email = document.getElementById("e-mail")
    if (regexEmail.test(email.value)) {
        return true
    } else {
        document.getElementById("e-mail").insertAdjacentHTML('afterend', "<span class='title_input'>Please provide valid email</span>")
        event.preventDefault()
        event.returnValue = false
        return false
    }
})