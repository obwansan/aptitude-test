function fillUserTable() {
    let source = document.querySelector("#handle_bars").innerHTML
    let template = Handlebars.compile(source)

    fetch("http://localhost:8080/user")
        .then(function (result) {
            return result.json()
        })
        .then(function (result) {
            result.data.forEach(function (context) {
                let html = template(context)
                document.querySelector(".user_list").innerHTML = html
            })
        })
}

getTemplateAjax('js/templates/userTable.hbs').then(function(data) {
    document.querySelector("#handle_bars").innerHTML = data
    fillUserTable()
})