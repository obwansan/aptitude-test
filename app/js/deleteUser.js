function deleteUser() {
    //User should be passed in by the click event
    let user = {
        id: 2
    }
    fetch(`http://localhost:8080/user/delete/${user.id}`, {
        method: 'post',
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data.message)
        })
        .catch(function(err) {
            console.log(`Error: ${err}`)
        })
}
//You'll need this for testing. Should .
// setTimeout(() => {deleteUser()},1500)

function deleteUserHanlder() {
    let buttons = document.querySelectorAll('.deleteButton')
    buttons.forEach((x) => {
        x.addEventListener('click', deleteUser)
    })
}
