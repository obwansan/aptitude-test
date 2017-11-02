/**
 * checks the users answers against api answers
 *
 * @return Promise - containing the result object ready for the api
 *
 */
async function checkAnswers() {
    var userAnswers = getUserAnswers()
    var score = 0
    let answers = await getAnswers()
    answers = answers.data
    answers.forEach(function (answer) {
        if (answer.answer == userAnswers[answer.id]) {
            score++
        }
    })
    let result = {uid:getCookie('uid'), answers:userAnswers, score:score, time: getTimeForApi()}
    return result
}

/**
 * gets correct answers from api
 *
 * @return Promise - containing the correct answers
 *
 */
async function getAnswers() {
    let data = await fetch("http://localhost:8080/answer")
    return data.json()
}

/**
 * gets the value of a given cookie by name
 *
 * @param String name the name of the cookie
 *
 * @return String the value of the cookie
 *
 */
function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

/**
 * gets answers the user provided from the DOM
 *
 * @return Object of users answers
 *
 */
function getUserAnswers() {
    let answers = {}
    document.querySelectorAll('#questions .question .answers input:checked').forEach(function (input) {
        let id = input.name.split("_")[1]
        answers[id] = input.value
    })
    return answers
}

document.querySelector('#finish').addEventListener('click', function(e) {
    e.preventDefault()
    checkAnswers().then(function(results) {
        console.log(results)
    })
})

