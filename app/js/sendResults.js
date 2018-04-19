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

