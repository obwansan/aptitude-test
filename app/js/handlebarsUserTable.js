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
                //turns array of result.data into an object for use by handlebars template
                result.data = {data: result.data}

                let html = template(result.data)
                user_list.innerHTML += html


                deleteUserHanlder()

            } else {
                user_list.innerHTML = "Please contact Admin, user list unavailable"
            }
    })
}

async function postEditedInformation(){
    let foo = {
        name: 'Ben',
        email: 'ben@email.com',
        id: 2,
    }

    let userUpdateResponse = await fetch("http://localhost:8080/user/edit",
        {
            method: 'post',
            body: jsonToFormData({
                name: foo.name,
                email: foo.email,
                id: foo.id
            })
        }).then(function(data) {
            return data.json()
    })
    return userUpdateResponse.success
}

setTimeout(()=> {
    postEditedInformation()
}, 3000)

function editUserHandler() {
    let buttons = document.querySelector('.editButton')
    buttons.forEach((x) => {
        x.addEventListener('click', (e) => {
            console.log(e.target)
        })
    })
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