function sendUserResults(userResults) {
   let userResultsForm = jsonToFormData(userResults)

    let resultsResponse = fetch("http://localhost:8080/answer", {
        method: 'post',
        body: userResultsForm
    })
    .then(function(response) {
            return response.json()
        })
    .then(function(data) {
            console.log(data.message)
            return data
        })
    .catch(function(err) {
            console.log(`Looks like there was an error: ${err}`)
    })

    return resultsResponse
}


/**
 * assigning user message depending on API response Object
 *
 * @return string - either success message or warning message
 */
async function handleResponseFromAPI (response) {
    let messageToTestTaker = ""

    await response.then(function(data)  {
        if (data.success) {
            messageToTestTaker = 'Your results have been successfully logged'
        } else {
            messageToTestTaker = 'Error sending your results: Do not close browser! Contact Mike on 07812222222'
        }
    })
    document.querySelector('body').innerHTML += '<p class="error_message text-danger">' + messageToTestTaker +'</p>'
}


// testObjSuccess = {
//     "success": true,
//     "message": "Successfully saved answers.",
//     "data": []
// }
//
//
// testObjFail = {
//     "success": false,
//     "message": "Missing post data, required keys: answers, uid, score, time.",
//     "data": []
// }
//
// let response = testObjFail


