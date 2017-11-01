function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)
    let counter = 0;
    fetch("http://localhost:8080/question")
        .then(function (result) {
            return result.json()
        })
        .then(function (result) {
            result.data.forEach(function (userData) {
                let html = template(userData)
                document.querySelector(".questions").innerHTML += html
            })
            counter = result.data.length
        })
        .then(function () {
            putDescription(counter)
        })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})