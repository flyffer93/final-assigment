export const isUserInDatabase = async (user) => {
    const USER_URL = "https://translaturapp.herokuapp.com/users?name=" + user;
    const response = await fetch(USER_URL);
    const names = await response.json();
    if(names.length === 0){          
        return false;
    }
    return true;
}

export const addUser = async (name) => {
    await fetch('https://translaturapp.herokuapp.com/users', {
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
    await fetch('https://translaturapp.herokuapp.com/translation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

export const deleteTranslation = async (translation) => {
    translation.status = "inactive";
    const response = await fetch("https://translaturapp.herokuapp.com/translation" + translation.id, {
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
    const response = await fetch("https://translaturapp.herokuapp.com/translation?_sort=id&_order=desc&_limit=10&status=active&author=" + user)
    const data = await response.json();
    return data;
}