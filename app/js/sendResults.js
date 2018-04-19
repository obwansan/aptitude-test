
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
            console.log(data)
            console.log(data.message)
        })
        .catch(function(err) {
            console.log(`Looks like there was an error: ${err}`)
        })
}


/**
 * assigning user message depending on API response Object
 *
 * @return string - either success message or warning message
 */
function handleResponseFromAPI (response) {
    let messageToTestTaker = ""

    if(response.success) {
        messageToTestTaker = 'Your results have been successfully logged'
    } else {
        messageToTestTaker = 'Error sending your results: Do not close browser! Contact Mike on 07812222222'
    }
    return messageToTestTaker
}


testObjSuccess = {
    "success": true,
    "message": "Successfully saved answers.",
    "data": []
}


testObjFail = {
    "success": false,
    "message": "Missing post data, required keys: answers, uid, score, time.",
    "data": []
}

let response = testObjFail


