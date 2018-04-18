
/**
 * get the handlebars template and use this to display the scores
 */
function updateScoreTable() {

    let userResults = createUserObject()

    userResults.then(function (value) {
        value = {data: value}
        getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
            fillScoreTable(HBTemplate, value)
        })
    })
}

/**
 * fills handlebars template by passing in object and inserts into the score_list div
 *
 * @param HBTemplate the handlebars template
 * @param ObjFunction the function that creates an object of all fields required in scores page
 */
function fillScoreTable(HBTemplate, ObjToPass) {
    let template = Handlebars.compile(HBTemplate)

    let score_list = document.querySelector(".score_list")
    score_list.innerHTML = ""

    if (ObjToPass) {
        let html = template(ObjToPass)
        score_list.innerHTML += html
    } else {
        score_list.innerHTML = "Please contact Admin, user list unavailable"
    }
}

updateScoreTable()
