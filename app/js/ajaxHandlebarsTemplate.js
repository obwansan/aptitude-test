/*
*   takes any template
*   returns as text
 */

async function getTemplateAjax(path) {
    let response = await fetch(
        path,
        {method: 'get'}
    )
    return response.text()
}

