function sendUserResults(userResults) {
   let userResultsForm = jsonToFormData(userResults)
    fetch("http://localhost:8080/answer", {
        method: 'post',
        body: userResultsForm
    })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data.message)
        })
        .catch(function(err) {
            console.log(`Looks like there was an error: ${err}`)
        })
}

function sendUserResults() {
    let user = {
        id: 2
    }
    console.log(user)
    // let userResultsForm = jsonToFormData(userResults)
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
setTimeout(() => { sendUserResults()}, 1500)