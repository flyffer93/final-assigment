export const isUserInDatabase = async (user) => {
    const USER_URL = "https://ta-noroff-api.herokuapp.com/users?name=" + user;
    const response = await fetch(USER_URL);
    const names = await response.json();
    if(names.length === 0){          
        return false;
    }
    return true;
}

export const addUser = async (name) => {
    await fetch('https://ta-noroff-api.herokuapp.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name 
        })
    })
}

export const addTranslation = async (body) => {
    await fetch('https://ta-noroff-api.herokuapp.com/translations', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const deleteTranslation = async (translation) => {
    translation.status = "inactive";
    const response = await fetch("https://ta-noroff-api.herokuapp.com/translations/" + translation.id, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(translation)
    })
    const data = await response.json()
    return data;
}

export const getUsersMostRecentTranslations = async (user) => {
    const response = await fetch("https://ta-noroff-api.herokuapp.com/translations?_sort=id&_order=desc&_limit=10&status=active&username=" + user)
    const data = await response.json();
    return data;
}