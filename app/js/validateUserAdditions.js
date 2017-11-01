/**
 * performs an AJAX request to retrieve existing users that are not deleted.
 *
 * @return  an array of user data
 */
async function getExistingUsers() {
    let result = []
    let apiData = await fetch(
        'http://localhost:8080/user',
        {method: 'get'}
    )
    apiData = await apiData.json()

    let users = apiData.data
    users.forEach(function(user) {
        if(user.deleted == 0) {
            result.push(user)
        }
    })
    return result
}

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
function userExists(emailToAdd, existingUsers) {
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
    var email = document.getElementById("email").value
    getExistingUsers().then(function(existingUsers) {

          if (isEmailValid(email) !== true || userExists(email, existingUsers) === true) {
        var errorMessage = "<div id='error' class='title_input'>Your email is not valid or already exists: Please provide a correct email</div>"

        //ternary conditional saying if the error message exists to do nothing, and if it doesn't, to add the error message
        document.getElementById('error') ? console.log('try again') : document.getElementById("email").insertAdjacentHTML('afterend', errorMessage)
    } else {

        //replace console.log with ajax add user function and clear form
        console.log('it works!')
    }})
})