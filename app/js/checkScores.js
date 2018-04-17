/**
 * gets all users score results from api
 *
 * @return Promise - containing the score results
 */
async function getScores() {
    let scoreObj = await fetch("http://localhost:8080/result", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            return data
        })

    let resultsArr = scoreObj.data
    resultsArr.forEach(function (element) {
        element.percent = (element.score / 30 * 100).toFixed(2)
    })
    return resultsArr
}

//this can be removed at a later date...
console.log(getScores())
