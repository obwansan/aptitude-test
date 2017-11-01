/**
 *  validates email using regex code
 *
 * @param email - the email address we want to check for
 *
 * @returns {boolean} - is the email valid
 */
function isEmailValid(email) {
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (regexEmail.test(email)) {
            return true
        } else {
            return false
        }
}

/**
 *  returns true if email to add is identical to an existing user
 *
 * @param emailToAdd  - The email address we want to check for
 * @param existingUsers - The array of existing users data
 *
 * @returns {boolean} - Does the user already exist
 */
function UserExist(emailToAdd, existingUsers) {
    var result = false
    existingUsers.forEach(function(user) {
            if (user.email === emailToAdd) {
            result = true
        }
    })
    return result
}

document.querySelector('.container_controls').addEventListener('submit', function(event) {
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
        var errorMessage = "<div id='error' class='title_input'>Your email is not valid or already exists: Please provide a correct email</div>"

        //ternary conditional saying if the error message exists to do nothing, and if it doesn't, to add the error message
        document.getElementById('error') ? console.log('try again') : document.getElementById("email").insertAdjacentHTML('afterend', errorMessage)
    } else {
        //replace console.log with ajax add user function and clear form
        console.log('it works!')
    }
})