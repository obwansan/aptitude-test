function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/question")
        .then(function (result) {
            return result.json()
        })
        .then(function (result) {
            result.data.forEach(function (userData) {
                console.log(userData)
                let html = template(userData)
                console.log(html)
                document.querySelector("body").innerHTML += html
            })
        })
}

getTemplateAjax('js/templates/questions.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})