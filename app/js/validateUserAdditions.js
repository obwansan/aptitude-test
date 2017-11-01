function isEmailValid(email) {
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (regexEmail.test(email)) {
            return true
        } else {
            return false
        }
}



/**
 *  result is set to false unless the email matches an existing user's email.
 *
 * @param emailToAdd  - The email address we want to check for
 * @param existingUsers - The array of existing users data
 *
 * @returns {boolean} - Does the user already exist
 */
function doesUserExist(emailToAdd, existingUsers) {
    var result = false
    existingUsers.forEach(function(user) {
        console.log(user.email)
        if (user.email === emailToAdd) {
            result = true
        }
    })
    return result
}

document.getElementsByClassName('container_controls')[0].addEventListener('submit', function(event) {
    event.preventDefault()
    event.returnValue = false
    // THIS IS DUMMY DATA
    var existingUsers = [
        {
            "id": "1",
            "email": "emailme@mikeoram.co.uk",
            "name": "Mike",
            "dateCreated": "2017-10-26 13:48:29",
            "isAdmin": "1",
            "deleted": "0"
        }, {
            "id": "2",
            "email": "emailme@mikeTram.co.uk",
            "name": "M2e",
            "dateCreated": "2017-11-26 13:48:29",
            "isAdmin": "1",
            "deleted": "0"
        }
    ]
    var email = document.getElementById("email").value
       if (isEmailValid(email) !== true || doesUserExist(email, existingUsers) === true) {
        document.getElementById("email").insertAdjacentHTML('afterend', "<div class='title_input'>Your email is not valid or already exists: Please provide a correct email</div>")
    }
})
