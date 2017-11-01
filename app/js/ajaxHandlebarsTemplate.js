/**
 * performs an AJAX request to retrieve existing users that are not deleted.
 *
 * @return  an array of user data
 */
async function getTemplateAjax(path) {
    let response = await fetch(
        path,
        {method: 'get'}
    )
    return response.text()
}

