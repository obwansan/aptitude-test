function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/user")
        .then(function (result) {
            return result.json()
        })
        .then(function (result) {
            result.data.forEach(function (userData) {
                console.log(userData)
                let html = template(userData)
                console.log(html)
                document.querySelector(".user_list").innerHTML = html
            })
        })
}

getTemplateAjax('js/templates/userTable.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})