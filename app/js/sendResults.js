
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


handleResponseFromAPI(response)


