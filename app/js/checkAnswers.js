const questionAmount = 30   // amount of questions

/**
 * checks the users answers against api answers
 *
 * @param userAnswers answers provided by user
 *
 * @return Promise - containing the result object ready for the api
 */
async function checkAnswers(userAnswers) {
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
            uid: parseInt(getCookie('uid'), 10),
            answers: userAnswers,
            score: userScore,
            time: parseFloat(getTimeForApi()),
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
 * @param questionAmount total number of questions
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
    const userAnswers= getUserAnswers(questionAmount)

    checkAnswers(userAnswers).then(function(result) {
        let percentResult
        let answered

        if (result.score || result.score === 0) {
            document.querySelector('#question_page').style.display = 'none'
            document.querySelector('#result_page').style.display = 'block'
            percentResult = getPercentResult(result.score, questionAmount)
            answered = getAnswered(userAnswers, questionAmount)
            displayResult(result.score, percentResult, answered)
            handleResponseFromAPI(sendUserResults(result))
        } else {
            let body = document.querySelector('body')
            let html = body.innerHTML
            html += '<p class="error_message text-danger">Please contact admin. Answers cannot be checked at present.</p>'
            body.innerHTML = html
        }
    })
})


/**
 * gets number of answered questions
 *
 * @param userAnswers answers provided by user
 * @param questionAmount total number of questions
 *
 * @return Integer number of answered questions
 */
function getAnswered(userAnswers, questionAmount) {
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
 * @param questionAmount total number of questions
 *
 * @return Integer percentage of user score
 */
function getPercentResult(userScore, questionAmount) {
    return Math.round(userScore / questionAmount * 100)
}

/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 * @param earnedPercentage percentage of total number of right questions
 * @param answeredQuestions total number of questions that have an answer
 */
function displayResult(earnedPoints, earnedPercentage, answeredQuestions) {
    document.querySelector(".score").innerHTML = earnedPoints
    document.querySelector(".answered_questions").innerHTML = answeredQuestions
    document.querySelector(".score_percentage").innerHTML = earnedPercentage
}
