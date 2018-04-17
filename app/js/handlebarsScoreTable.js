/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillScoreTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/result")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            let score_list = document.querySelector(".score_list")
            score_list.innerHTML = ""

            if (result.success) {
                result.data.forEach(function(scoreData) {
                    let html = template(scoreData)
                    score_list.innerHTML += html
                })
            } else {
                score_list.innerHTML = "Please contact Admin, user list unavailable"
            }
        })
}

/**
 * get the handlebars template and use this to display the users
 */
function updateScoreTable() {
    getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
        fillScoreTable(HBTemplate)
    })
}

updateScoreTable()