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
                editUserHandler()

            } else {
                user_list.innerHTML = "Please contact Admin, user list unavailable"
            }
        })
}

async function postEditedInformation(object){
    let obj = object
    let userUpdateResponse = await fetch("http://localhost:8080/user/edit",
        {
            method: 'post',
            body: jsonToFormData({
                name: obj.name,
                email: obj.email,
                id: obj.id
            })
        }).then(function(data) {
            return data.json()
    })
    return userUpdateResponse.success
}


function editUserHandler() {
    let buttons = document.querySelectorAll('.editButton')
  
    buttons.forEach(function(x) {
        x.addEventListener('click', function(e) {
            let id = e.target.id[e.target.id.length - 1]
            let targetSiblings = e.target.parentNode.childNodes
            let ary = []
            let obj

            ary.push(id)
            targetSiblings.forEach(function(el) {
                if (el.type === 'text') {
                    ary.push(el.value)
                }
            })
            
            obj = {
                id: ary[0],
                name: ary[1],
                email: ary[2]
            }
            console.log(obj)
            postEditedInformation(obj)
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