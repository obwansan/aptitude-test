
function result() {
    let result = 25 //number of points
    let questionAmmount = 30 //ammount of questions
    document.querySelector(".score").innerHTML = result
    document.querySelector(".score_per").innerHTML = Math.round(result / questionAmmount * 100)
}

result()