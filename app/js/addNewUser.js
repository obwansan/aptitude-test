/**
 * saves the stringified JSON object using an AJAX request
 *
 * @param user The stringified JSON object
 *
 * @returns {boolean} Was the user successfully saved?
 */
function saveNewUser(user) {
    var result = false
    var http = new XMLHttpRequest()
    http.open('POST', 'http://localhost:8080/user', true)

    http.addEventListener('load', function () {
        var resultingData = JSON.parse(this.responseText)
        result = resultingData.success
    })

    http.send(user)
    return result
}