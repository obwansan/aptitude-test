/**
 * save the JSON object using an AJAX request
 *
 * @param user the JSON object including name and email keys
 *
 * @returns a promise containing the response, which includes the boolean success property
 */
async function saveNewUser(user) {
    formData = jsonToFormData(user) // API does not work with JSON - needs form data

    let apiData = await fetch(
        'http://localhost:8080/user',
        {
            method: 'POST',
            body: formData
        }
    )

    apiData = await apiData.json()
    return apiData
}

/**
 * convert a JSON object into form data suitable for passing to an API built for form data
 *
 * @param jsonInput the JSON object to be converted.
 *
 * @returns a form data object.
 */
function jsonToFormData(jsonInput) {
    let formData = new FormData()

    Object.keys(jsonInput).forEach((key) => {
        formData.append(key, jsonInput[key])
    })

    return formData
}

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
        var errorMessage = "Your email is not valid or already exists: Please provide a correct email"
        document.getElementById("error").innerHTML = errorMessage
    } else {
              document.getElementById("error").innerHTML = ''
              let name = document.getElementById('name').value
              saveNewUser({'name': name, 'email': email}).then(function(response){
                  if (response.success == true) {
                      document.getElementById('name').value = ''
                      document.getElementById('email').value = ''
                  } else {
                      document.getElementById("error").innerHTML = "there's a problem: breathe slowly and try again"
                  }
              })
    }})
})