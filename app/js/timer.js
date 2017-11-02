/**
 *  sets a 30 minute timer for taking the test
 */

//30 minute time limit
let timeLimit = 1799

function timer() {
    let minutes = Math.floor(timeLimit / 60);
    let seconds = Math.floor(timeLimit - minutes * 60);

    document.querySelector("#timer").innerHTML = minutes + "m " + seconds + "s ";
    timeLimit--
    if (timeLimit < 0){
        clearInterval(interval)
    }
}

let interval = setInterval(timer, 1000)