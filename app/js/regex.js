//function to validate the email address using RegEx
//takes the ID of the e-mail input filed and check if the e-mail content is valid

$('#myForm').on('submit', function () {

    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    var email = document.getElementById("e-mail")

    if (regexEmail.test(email.value)) {
        return true

    } else {
        document.getElementById("e-mail").insertAdjacentHTML('afterend', "<span class='title_input'>Please provide valid email</span>")
        return false
    }
})
