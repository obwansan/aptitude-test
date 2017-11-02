/**
 *  check if the e-mail exist in the DB and return the id of the e-mail we are checking
 *
 * @param userEmail  - The email address we want to check for
 *
 * @return a promise with the user object requested
 */
async function getUser(userEmail) {
    let apiData = await fetch(
        'http://localhost:8080/user?email=' + userEmail,
        {method: 'get'}
    )
    apiData = await apiData.json()
    return apiData
}

/**
 *
 * check if the user took the test before
 *
 * @param userId - is the id of the e-mail who is currently checked
 *
 * @return Promise containing data on whether the test has been taken before
 */
async function checkIfTestIsTaken(userId) {
    let idData = await fetch(
        'http://localhost:8080/result?id=' + userId,
        {method: 'get'}
    )
    idData = await idData.json()
    return idData
}

document.querySelector('#logInForm').addEventListener('submit', function(e) {
    e.preventDefault()
    let email = document.getElementById('email')

    getUser(email.value).then(function(user) {
        if(user.success && user.data.id) {
            checkIfTestIsTaken(user.data.id).then(function(idData) {
                if (idData.success) {
                    userEmail.insertAdjacentHTML('afterend', '<p>The test cannot be done twice</p>')
                } else {
                    redirectUser(user.data.id)
                }
            })
        } else {
            email.insertAdjacentHTML('afterend', '<p>Please provide valid name and email</p>')
        }
    })
})