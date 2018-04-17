/**
 * gets all users score results from api
 *
 * @return Promise - containing the score results
 */
async function getScores() {
    fetch("http://localhost:8080/result", {method: 'get'})
        .then(function (data) {
            return data.json()
        })
        .then(function (data) {
            console.log(data);
            return data;
        })
}

getScores();


//