function getExistingUsers() {
    var http = new XMLHttpRequest()
    http.open('GET', 'http://localhost:8080//user')
    http.addEventListener('load', function() {
        var result=JSON.parse(this.responseText)
        if (result.success === true) {
            // console.log(result.data)
            return result.data
        }
    })
    http.send()
}


