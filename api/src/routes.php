<?php


// Routes

$app->get('/', function ($request, $response, $args) {
    // Render index view
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $this->renderer->render($response, 'index.phtml', $args);
});


$app->post('/user', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $request->getParsedBody();

    if (empty($user['email']) || empty($user['name'])) {
        $data['message'] = 'Invalid parameters, please provide both email and name.';
        $data['data'] = $user;
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "INSERT INTO `user` (`email`, `name`) VALUES (:email, :name);";
        $query = $this->db->prepare($query);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->execute();

        $query = "SELECT * from `user` WHERE `id` = :id";
        $query = $this->db->prepare($query);
        $id = $this->db->lastInsertId();
        $query->bindParam(':id', $id);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'User registered.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/user/edit', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $request->getParsedBody();

    if (empty($user['email']) || empty($user['name']) || empty($user['id'])) {
        $data['message'] = 'Invalid parameters, please provide both email and name.';
        $data['data'] = $user;
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "UPDATE `user` SET `email` = :email, `name` = :name WHERE `id` = :id;";
        $query = $this->db->prepare($query);
        $query->bindParam(':email', $user['email']);
        $query->bindParam(':name', $user['name']);
        $query->bindParam(':id', $user['id']);
        $query->execute();
    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'User updated.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/user', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $email = $request->getQueryParam('email');

    if (empty($email)) {
        try {
            $query = "SELECT `id`, `email`, `name`, `dateCreated`, `isAdmin`, `deleted` from `user` ORDER BY `dateCreated` DESC;";
            $query = $this->db->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
        $data['success'] = true;
        $data['message'] = 'Users found.';

    } else {

        try {
            $query = "SELECT `id`, `email`, `name`, `dateCreated`, `isAdmin` from `user` WHERE `email` = :email AND `deleted` <> 1";
            $query = $this->db->prepare($query);
            $query->bindParam(':email', $email);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }

        $data['message'] = 'User not registered.';
        $data['success'] = false;
        if ($result) {
            $data['message'] = 'User found.';
            $data['success'] = true;
        }
    }

    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);

});

$app->post('/user/delete/{id}', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $user = $args;

    if (!empty($user['id']) && is_numeric($user['id'])) {
        try {
            $query = "UPDATE `user` SET `deleted` = '1' WHERE `id` = :id;";
            $query = $this->db->prepare($query);
            $query->execute(['id' => $user['id']]);
        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }

        $data['success'] = true;
        $data['message'] = 'Successfully deleted user.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data);
    }
});

$app->get('/question', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    try {
        $query = "SELECT `id`, `text`, `option1`, `option2`, `option3`, `option4`, `option5` from `question`";
        $query = $this->db->prepare($query);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved questions.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/answer/{id}', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    if (empty($args['id'])) {
        $data['message'] = 'Missing question ID';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    try {
        $query = "SELECT `answer` from `question` WHERE `id` = :id";
        $query = $this->db->prepare($query);
        $query->bindParam(':id', $args['id']);
        $query->execute();
        $result = $query->fetch(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved answer.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/answer', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    try {
        $query = "SELECT `id`, `answer` from `question`";
        $query = $this->db->prepare($query);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved answers.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->post('/answer', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];
    $postData = $request->getParsedBody();

    if (
        empty($postData['answers']) ||
        empty($postData['uid']) ||
        empty($postData['score']) ||
        empty($postData['time'])
    ) {
        $data['message'] = 'Missing post data, required keys: answers, uid, score, time.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 400);
    }

    $answers = json_encode($postData['answers']);

    try {
        $query = "INSERT INTO `result` (`uid`, `answers`, `score`, `time`) VALUES (:uid, :answers, :score, :time);";
        $query = $this->db->prepare($query);
        $query->bindParam(':uid', $postData['uid']);
        $query->bindParam(':answers', $answers);
        $query->bindParam(':score', $postData['score']);
        $query->bindParam(':time', $postData['time']);
        $query->execute();

    } catch(Exception $e) {
        $data['message'] = $e->getMessage();
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 500);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully saved answers.';
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});

$app->get('/result', function ($request, $response, $args) {
    $data = ['success' => false, 'message' => 'An unexpected error occured.', 'data' => []];

    $uid = $request->getQueryParam('id');

    if (!empty($uid)) {
        try {
            $query = "SELECT `uid` as 'id', `answers`, `score`, `time`, `dateCreated` from `result` WHERE `uid` = :uid;";
            $query = $this->db->prepare($query);
            $query->bindParam(':uid', $uid);
            $query->execute();
            $result = $query->fetch(PDO::FETCH_ASSOC);

        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    } else {
        try {
            $query = "SELECT `uid` as 'id', `answers`, `score`, `time`, `dateCreated` from `result`;";
            $query = $this->db->prepare($query);
            $query->execute();
            $result = $query->fetchAll(PDO::FETCH_ASSOC);
        } catch(Exception $e) {
            $data['message'] = $e->getMessage();
            $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
            return $response->withJson($data, 500);
        }
    }

    if (empty($result)) {
        $data['success'] = false;
        $data['message'] = 'No results found.';
        $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
        return $response->withJson($data, 200);
    }

    $data['success'] = true;
    $data['message'] = 'Successfully retrieved results.';
    $data['data'] = $result;
    $response = $response->withAddedHeader('Access-Control-Allow-Origin', '*');
    return $response->withJson($data);
});
