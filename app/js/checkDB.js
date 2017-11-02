/**
 *  check if the e-mail exist in the DB and return the id of the e-mail we are checking
 *
 * @param userEmail  - The email address we want to check for
 *
 * @return the id of the e-mail we are checking
 * the error messages can be edited before we submit the final version
 */
async function getUser(userEmail) {
    let apiData = await fetch(
        'http://localhost:8080/user?email=' + userEmail,
        {method: 'get'}
    )
    apiData = await apiData.json()
    if (apiData.success) {
        userId = apiData.data.id
    } else {
        document.getElementById("email").insertAdjacentHTML('afterend', '<p>Please provide valid Name and E-mail</p>')
    }
    return userId
}

/**
 *
 * check if the user took the test before
 *
 * @param userId - is the id of the e-mail who is currently checked
 *
 * @return boolean that confirm that the user is taking the test for 1st time
 * the error messages can be edited before we submit the final version
 */
async function checkIfTestIsTaken(userId) {
    let idData = await fetch(
        'http://localhost:8080/result?id=' + userId,
        {method: 'get'}
    )
    idData = await idData.json()
    if (idData.success === false) {
        return true
    } else {
        document.getElementById("email").insertAdjacentHTML('afterend', '<p>The test cannot be done twice</p>')
    }
}

document.querySelector('.container_page').addEventListener('submit', function(e) {
    e.preventDefault()
    let userEmail = document.getElementById("email").value
    getUser(userEmail).then(function(userId) {
        checkIfTestIsTaken(userId)
    })
})