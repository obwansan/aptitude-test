/**
 * fills handlebars template by getting the user data from the api and inserts into the user_list div
 *
 * @param HBTemplate the handlebars template
 */
function fillUserTable(HBTemplate) {
    let template = Handlebars.compile(HBTemplate)

    fetch("http://localhost:8080/user")
        .then(function(result) {
            return result.json()
        })
        .then(function(result) {
            let user_list = document.querySelector(".user_list")
            user_list.innerHTML = ""

            if (result.success) {
                result.data = {data: result.data}

                let html = template(result.data)
                user_list.innerHTML += html

                EditButtonArray = document.querySelectorAll(".editButton")
                console.log(EditButtonArray)

                EditButtonArray.forEach(function (element){
                    element.addEventListener('click',  postStuff)
                })

            } else {
                user_list.innerHTML = "Please contact Admin, user list unavailable"
            }
        })
}

async function postStuff(){
    let userUpdateResponse = await fetch("http://localhost:8080/user/edit",
        {
            method: 'post',
            body: jsonToFormData({'email':'emailme@mikeoram.co.uk', 'name':'Name', 'id':'1'})
        })
    return userUpdateResponse.success
}

/**
 * get the handlebars template and use this to display the users
 */
function updateUserTable() {
    getTemplateAjax('js/templates/userTable.hbs').then(function (HBTemplate) {
        fillUserTable(HBTemplate)
    })
}

updateUserTable()