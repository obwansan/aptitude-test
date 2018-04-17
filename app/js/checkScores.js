const numberOfQuestions = 30

/**
 * gets all users score results from api
 *
 * @return Promise - containing the score results
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
 * gets all users name and email from api
 *
 * @return Promise - containing the user info
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
async function userRenderObject () {
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
    return userDisplayArray
}

// userRenderObject()
