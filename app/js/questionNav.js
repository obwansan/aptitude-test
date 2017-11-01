selected = document.querySelectorAll(".question div")[0]
selected.classList.add("active")


function next() {

    let currentQuestion = document.querySelector(".active")
    let nextQuestion = currentQuestion.nextElementSibling

    currentQuestion.classList.remove("active")
    nextQuestion.classList.add("active")

}


function prev() {

    let currentQuestion = document.querySelector(".active")
    let prevQuestion = currentQuestion.previousElementSibling

    currentQuestion.classList.remove("active")
    prevQuestion.classList.add("active")
}


document.querySelector(".nextButton").addEventListener("onClick", next)
document.querySelector(".prevButton").addEventListener("onClick", prev)