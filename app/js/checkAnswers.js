/**
 * checks the users answers against api answers
 *
 * @return Promise - containing the result object ready for the api
 */
async function checkAnswers() {
    let userAnswers = getUserAnswers()
    let userScore = 0
    let answers = await getAnswers()
    if (answers.success) {
        answers = answers.data
        answers.forEach(function (answerItem) {
            if (answerItem.answer == userAnswers[answerItem.id]) {
                userScore++
            }
        })
        let result = {uid: getCookie('uid'), answers: userAnswers, score: userScore, time: getTimeForApi()}
        return result
    }
    return answers
}

/**
 * gets correct answers from api
 *
 * @return Promise - containing the correct answers
 */
async function getAnswers() {
    let data = await fetch("http://localhost:8080/answer", {method: 'get'})
    return data.json()
}

/**
 * gets answers the user provided from the DOM
 *
 * @return Object of users answers
 */
function getUserAnswers() {
    let answers = {}
    document.querySelectorAll('#questions .question .answers input:checked').forEach(function(input) {
        let id = input.name.split("_")[1]
        answers[id] = input.value
    })
    return answers
}

document.querySelector('#finish').addEventListener('click', function(e) {
    e.preventDefault()
    checkAnswers().then(function(result) {
        if (result.score) {   // if successfully retrieved answers
            document.querySelector('#question_page').style.display = 'none'
            document.querySelector('#result_page').style.display = 'block'
            displayResult(result.score)
        } else {
            let body = document.querySelector('body')
            let html = body.innerHTML
            html += '<p class="error_message text-danger">Please contact admin. Answers cannot be checked at present.</p>'
            html += '<p class="error_message text-danger">' + result.message + '</p>'
            body.innerHTML = html
        }
    })
})

/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 */
function displayResult(earnedPoints) {
    const questionAmount = 30   // amount of questions
    document.querySelector(".score").innerHTML = earnedPoints
    document.querySelector(".score_percentage").innerHTML = Math.round(earnedPoints / questionAmount * 100)
}
