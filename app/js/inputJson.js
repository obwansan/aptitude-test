document.querySelector('.container_controls').addEventListener('submit', function(){
    let jsonString = userDetailsToJsonString()
})

/**
 * function to stringify the JSON file
 *
 * @returns JSON object with the input from the HTML name and e-mail field
 */
function userDetailsToJsonString() {
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    return JSON.stringify({'name': name, 'email': email})
}