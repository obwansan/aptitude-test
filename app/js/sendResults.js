

// /**
//  * gets all users name and email from API
//  *
//  * @return Array - containing the user info (Name and Email)
//  */
// async function submitToAPI() {
//     let responseObj = await fetch("http://localhost:8080/answer", {
//         method: 'post',
//         data: {'uid':'1', 'answers': {'1': '4', '2': '3'}, 'score':'24', 'time':'29.55'}
//         })
//         .then(function (data) {
//             return data.json()
//         })
//
//     let booleanResponse = responseObj.success
//     return booleanResponse
// }


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


