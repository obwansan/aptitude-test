
let objectX =  {
    "success": true,
    "message": "Successfully retrieved results.",
    "data": [
        {
            "id": "1",
            "answers": "\"{\\\"1\\\":\\\"1\\\", \\\"2\\\":\\\"5\\\"}\"",
            "score": "2",
            "time": "30.00",
            "dateCreated": "2017-07-20 10:41:43"
        },
        {
            "id": "3",
            "answers": "\"{\\\"1\\\":\\\"1\\\", \\\"2\\\":\\\"5\\\"}\"",
            "score": "10",
            "time": "25.00",
            "dateCreated": "2018-04-17 12:08:33"
        }
    ]
}

console.log(objectX)

/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
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
    getTemplateAjax('js/templates/scoreTable.hbs').then(function (HBTemplate) {
        fillScoreTable(HBTemplate, objectX)
    })
}

updateScoreTable()