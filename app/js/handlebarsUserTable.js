/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/user")
        .then(function (result) {
            return result.json()
        })
        .then(function(result) {
            result.data.forEach(function(userData) {
                let html = template(userData)
                document.querySelector(".user_list").innerHTML = html
            })
        })
}

getTemplateAjax('js/templates/userTable.hbs').then(function(HBTemplate) {
    fillUserTable(HBTemplate)
})