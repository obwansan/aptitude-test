/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 */
function result(earnedPoints) {
    let result = earnedPoints //number of points
    let questionAmount = 30 //ammount of questions
    document.querySelector(".score").innerHTML = result
    document.querySelector(".score_percentage").innerHTML = Math.round(result / questionAmount * 100)
}

result(23)