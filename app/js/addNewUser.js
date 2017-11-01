/**
 * Save the JSON object using an AJAX request
 *
 * @param user The JSON object including name and email keys
 *
 * @returns A promise containing the response, which includes the boolean success property
 */
async function saveNewUser(user) {
    formData = jsonToFormData(user) // API does not work with JSON - needs form data.

    let apiData = await fetch(
        'http://localhost:8080/user',
        {
            method: 'POST',
            body: formData
        }
    )

    apiData = await apiData.json()
    return apiData
}

/**
 * Convert a JSON object into form data suitable for passing to an API built for form data.
 *
 * @param jsonInput The JSON object to be converted.
 *
 * @returns A form data object.
 */
function jsonToFormData(jsonInput) {
    let formData = new FormData()

    Object.keys(jsonInput).forEach((key) => {
        formData.append(key, jsonInput[key])
    })
    
    return formData
}
