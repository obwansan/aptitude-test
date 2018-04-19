
//add event listener on submit where id on admin page is id on API

console.log(document.querySelectorAll('edit'))

document.querySelectorAll('#edit').addEventListener('click',  function(e){
    e.preventDefault()
    let userUpdateResponse = fetch("http://localhost:8080/user/edit",
        {
            method: 'post',
            body: {"email":"emailme@mikeoram.co.uk", "name": "Mike Mike Oram", "id":"1"}
        })
    console.log(userUpdateResponse)
    return userUpdateResponse
})


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

// console.log(users)

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

    console.log([uName, uEmail])

    return [uName, uEmail]
}

userDetailsToEdit(0)

//new event listener on submit of details form



//on submit edit form, add edit to API function

//