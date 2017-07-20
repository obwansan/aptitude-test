# Aptitude test REST API

### Server

Clone this Repo
cd into the api/public folder
Run: `php -S localhost:8080`
Install the database.sql file in /api/db into your vagrant box


### Routes

**/user**

POST - Create new user
`{'email':'example@email.com', 'name':'Fred Smith'}`
Returns user object

GET - Find registered user
Send users email as a GET parameter using the key of `email`
Returns user object

**/question**

GET - Get all questions an options
No request data
Returns all questions and question options

**/answer**

GET - Get answers to all questions
No request data
Returns all question answers with question ID and correct option number

POST - Save question answers
`{'uid':'1', 'answers': {'1': '4', '2': '3'}, 'score':'24', 'time':'29.55'}`
Returns success/fail state

**/answer/{qid}**

GET - Get the answer for a specific question
No request data, question ID included in URL
Returns correct option number

