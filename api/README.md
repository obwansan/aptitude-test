# Aptitude test REST API

### Server

- Clone this Repo
- cd into the api/public folder
- Run: `php -S localhost:8080`
- Install the aptitude-test.sql file from /api/db into your vagrant box database

### Composer
- from the api file run composer update
- generate a new token from the url provided

### Routes
- for local development use localhost:8080/whatYouRequire as your ajax URL

**/user**

POST
- Create new user.
- `{'email':'example@email.com', 'name':'Fred Smith'}`
- Returns user object.

GET 
- Get all registered users, including deleted ones.
- No request data
- Returns array of user objects.

GET
- Find specific registered user.
- Send users email as a GET parameter using the key of `email`.
- Returns user object.


**/user/delete/{userID}**
POST
- Deletes a user.
- Send user id in the url like: /user/delete/{id}
- Returns result of user deletion.


**/user/edit**

POST
- Update a user.
- `{'email':'example@email.com', 'name':'Fred Smith', 'id':'1'}` - all required
- Returns result of user update.

**/question**

GET
- Get all questions an options.
- No request data.
- Returns all questions and question options.

**/answer**

GET
- Get answers to all questions.
- No request data.
- Returns all question answers with question ID and correct option number.

POST
- Save question answers.
- `{'uid':'1', 'answers': {'1': '4', '2': '3'}, 'score':'24', 'time':'29.55'}`.
- Returns success/fail state.

**/answer/{qid}**

GET
- Get the answer for a specific question.
- No request data, question ID included in URL.
- Returns correct option number.

**/result**

GET 
- Get all users results
- No request data
- Returns array of result objects.

GET
- Find specific users results.
- Send users id as a GET parameter using the key of `id`.
- Returns users result object.
