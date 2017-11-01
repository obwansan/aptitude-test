
var distance = 1799

function timer() {
    var minutes = Math.floor(distance / 60);
    var seconds = Math.floor(distance - minutes * 60);

    document.querySelector(".timer").innerHTML = minutes + "m " + seconds + "s ";
    distance--
    if (distance < 0){
        clearInterval(interval)
    }
}


var interval = setInterval(timer, 1000)