document.getElementsByClassName('container_controls')[0].addEventListener('submit', function() {
    var name = document.getElementById('name').value
    var email = document.getElementById('email').value
    JSON.stringify({'name': name, 'email': email})
})