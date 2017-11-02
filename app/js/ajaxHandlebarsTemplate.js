/**
 * asynchronously fetches handlebars templates
 *
 * @param url of the template in use
 * @returns html handlebars template as text
 */
async function getTemplateAjax(path) {
    let response = await fetch(
        path,
        {method: 'get'}
    )
    return response.text()
}