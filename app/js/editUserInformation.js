
function testFunction() {
    console.log('hello')
    let users = fetch("http://localhost:8080/user", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
}


//create 'details' form
//function that populates current details of specific user

function userFunction() {
    console.log('hello')
    let users = fetch("http://localhost:8080/user?email=emailme@mikeoram.co.uk", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
}

/**
 * combines user info (name and email) and result scores into the a new object
 *
 * @return Object - containing the user info and user results including percentage
 */
async function userDetailsToEdit (uID) {
    let users = await getNameAndEmail()
    let userX = uID
    let uName = users[userX].name
    let uEmail = users[userX].email

    return [uName, uEmail]
}

userDetailsToEdit(0)
