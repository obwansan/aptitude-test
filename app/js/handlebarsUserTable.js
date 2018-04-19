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

                EditButtonArray = document.querySelectorAll(".editButton")
                console.log(EditButtonArray)

                EditButtonArray.forEach(function (element){
                    element.addEventListener('click',  function(){
                        let updatedUserInformationObject = {
                            name: "",
                            email: "",
                            id: ""
                        }
                        console.log(updatedUserInformationObject)
                        postEditedInformation(updatedUserInformationObject)
                    })
                })

            } else {
                user_list.innerHTML = "Please contact Admin, user list unavailable"
            }
        })
}

async function postEditedInformation(updatedUserInformationObject){

    let newName = document.getElementById("userDetails").value
    console.log(newName)

    updatedUserInformationObject.name = document.getElementById("userDetails").value

    let userUpdateResponse = await fetch("http://localhost:8080/user/edit",
        {
            method: 'post',
            body: jsonToFormData({
                name: "",
                email: "",
                id: ""
            })
        }).then(function(data) {
            return data.json()
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