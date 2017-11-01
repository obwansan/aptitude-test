document.querySelector('.container_controls').addEventListener('submit', function(){
    let jsonString = stringifyJSON()
})

/**
 * function to stringify the JSON file
 *
 * @returns JSON object with the input from the HTML name and e-mail field
 */
function stringifyJSON () {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    return alert(JSON.stringify({'name': name, 'email': email}))
}


