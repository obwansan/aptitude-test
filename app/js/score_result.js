/**
 * showing and calculating result in points and percents
 *
 * @param earnedPoints total amount of right questions
 */
function result(earnedPoints) {
    let result = earnedPoints //number of points
    let questionAmmount = 30 //ammount of questions
    document.querySelector(".score").innerHTML = result
    document.querySelector(".score_per").innerHTML = Math.round(result / questionAmmount * 100)
}

result()