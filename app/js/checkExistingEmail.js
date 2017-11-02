/**
 *  result is set to false unless the email matches an existing user's email
 *
 * @param emailToAdd  - The email address we want to check for
 * @param existingUsers - The array of existing users data
 *
 * @returns {boolean} - Does the user already exist
 */
function doesUserExist(emailToAdd, existingUsers) {
    var result = false
     existingUsers.forEach(function (user) {
         if (user.email === emailToAdd) {
             result = true
         }
     })
    return result
}

async function getUser(email) {
    let user = false
    let apiData = await fetch(
        'http://localhost:8080/user?email=' + email,
        {method: 'get'}
    )
    apiData = await apiData.json()
    if (apiData.success) {
        user = apiData.data
    }
    return user
}

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
