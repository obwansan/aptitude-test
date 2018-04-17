
let usersWithResults = userRenderObject()

const Bob = usersWithResults.then(function (value) {
    console.log(value)
    return value
})


/**
 * fills handlebars template by passing in object and inserts into the score_list div
 *
 * @param HBTemplate the handlebars template
 * @param ObjFunction the function that creates an object of all fields required in scores page
 */
function fillScoreTable(HBTemplate, ObjFunction) {
    let template = Handlebars.compile(HBTemplate)

            let score_list = document.querySelector(".score_list")
            score_list.innerHTML = ""

            if (ObjFunction.success) {
                ObjFunction.data.forEach(function(scoreData) {
                    let html = template(scoreData)
                    score_list.innerHTML += html
                })
            } else {
                score_list.innerHTML = "Please contact Admin, user list unavailable"
            }
}

/**
 * get the handlebars template and use this to display the scores
 */
function updateScoreTable() {
    console.log(Bob)
    getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
        fillScoreTable(HBTemplate, Bob)
    })
}

updateScoreTable()