const questionAmount = 30   // amount of questions

/**
 * checks the users answers against api answers
 *
 * @return Promise - containing the result object ready for the api
 */
async function checkAnswers() {
    let userAnswers = getUserAnswers(questionAmount)
    let userScore = 0
    let answers = await getAnswers()

    if (answers.success) {
        answers = answers.data
        answers.forEach(function (answerItem) {
            if (answerItem.answer == userAnswers[answerItem.id]) {
                userScore++
            }
        })
        let result = {
            uid: getCookie('uid'),
            answers: userAnswers,
            score: userScore,
            time: getTimeForApi()
        }
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
function getUserAnswers(questionAmount) {
    let checkedInputs = document.querySelectorAll('#questions .question .answers input:checked')
    let answers = {}
    for (let i = 1; i <= questionAmount; i++) {
        answers[i] = 'unanswered'
    }
    
    checkedInputs.forEach(function(input) {
        let id = input.name.split("_")[1]
        answers[id] = input.value   
    })
    return answers
}

document.querySelector('#finish').addEventListener('click', function(e) {
    e.preventDefault()
    checkAnswers().then(function(result) {
        if (result.score || result.score === 0) {
            document.querySelector('#question_page').style.display = 'none'
            document.querySelector('#result_page').style.display = 'block'
            let percentResult = getPercentResult(result.score)
            let answered = getAnswered(questionAmount)
            displayResult(result.score, percentResult, answered)
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
 * gets number of answered questions
 *
 * @return Integer number of answered questions
 */
function getAnswered(questionAmount) {
    let userAnswers = getUserAnswers(questionAmount)
    let userAnswersArray = Object.values(userAnswers)
    let unanswered = 0

    userAnswersArray.forEach(function(answerItem) {
            if (answerItem == "unanswered") {
                unanswered++
            }
        })
    return questionAmount - unanswered
}

/**
 * gets percentage of user score
 *
 * @param userScore user score
 *
 * @return Integer percentage of user score
 */
function getPercentResult(userScore) {
    return Math.round(userScore / questionAmount * 100)
}

/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 */
function displayResult(earnedPoints, earnedPercentage, answeredQuestions) {
    document.querySelector(".score").innerHTML = earnedPoints
    document.querySelector(".answered_questions").innerHTML = answeredQuestions
    document.querySelector(".score_percentage").innerHTML = earnedPercentage
}
