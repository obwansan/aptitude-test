/**
 * performs an AJAX request to retrieve existing users that are not deleted.
 *
 * @return  an array of user data
 */
function getExistingUsers() {
    var result = []
    var http = new XMLHttpRequest()
    http.open('GET', 'http://localhost:8080/user', true)
    http.addEventListener('load', function() {
        var resultingData=JSON.parse(this.responseText)
        if (resultingData.success === true) {
            var users = resultingData.data
            users.forEach(function(user) {
                if(user.deleted == 0) {
                    result.push(user)
                }
            })
        }
    })
    http.send()
    return result
}