const numberOfQuestions = 30

/**
 * gets all users score results from api
 *
 * @return Object - containing the score results
 */
async function applyPercent() {
    let scoreObj = await fetch("http://localhost:8080/result", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            return data
        })
    scoreObj.data.forEach(function (element) {
        element.percent = (element.score / numberOfQuestions * 100).toFixed(2)
    })
    return scoreObj.data
}

/**
 * gets all users name and email from API
 *
 * @return Array - containing the user info (Name and Email)
 */
async function getNameAndEmail() {
    let userObj = await fetch("http://localhost:8080/user", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            return data
        })

    let userArray = []
    userObj.data.forEach(function(element) {
        let obj = {}
        let {id, email, name} = element
        obj['id'] = id
        obj['name'] = name
        obj['email'] = email
        userArray.push(obj)
    })
    return userArray
}

/**
 * combines user info into the result object
 *
 * @return Promise - containing the user info and user results
 */
async function createUserObject () {
    let scores = await applyPercent()
    let users = await getNameAndEmail()

    let userDisplayArray = []
    scores.forEach(function(score) {
        users.forEach(function(user) {
            if (score.id === user.id ) {
                let obj = {}

                obj['name'] = user.name
                obj['email'] = user.email
                obj['score'] = score.score
                obj['percentage'] = score.percent
                obj['time'] = score.time

                userDisplayArray.push(obj)
            }
        })
    })

    let userDisplayObj = {data: userDisplayArray}
    userDisplayObj.success = true
    return userDisplayObj
}