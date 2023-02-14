
function host(endpoint) {
    return `https://api.backendless.com/FB38D3C0-7528-71E2-FFF2-13A51197F200/77301AAB-E9D5-49B2-90D0-C067C8118AA3${endpoint}`;
};



const endpoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout',
    'get-movies': '/data/movies'
};

async function registerUser(username, password) {
    return await (await fetch(host(endpoints['register']), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();
};

async function loginUser(username, password) {
    let result = await (await fetch(host(endpoints['login']), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userInfo', JSON.stringify({ userToken: result['user-token'], userName: result.username, uid: result.ownerId }));

    return result;
};

async function logoutUser() {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));
    let result = await fetch(host(endpoints['logout']), {
        headers: {
            'user-token': userToken
        }
    });
    localStorage.removeItem('userInfo');
    return result;
};

async function getAllMovies() {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies']), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
    })).json();
};

async function getMovie(objectId) {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies'] + `/${objectId}`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
    })).json();
};

async function deleteMovie(objectId) {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies'] + `/${objectId}`), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
    })).json();
};




async function addMovie(title, description, imageUrl) {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies']), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        },
        body: JSON.stringify({
            title, description, imageUrl, likeds: null
        })
    })).json();
}

async function editMovie(objectId, title, description, imageUrl) {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies'] + `/${objectId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        },
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })).json();
};

async function likedMovie(objectId) {
    const { userToken, userName } = JSON.parse(localStorage.getItem('userInfo'));
    let newLiked = [];

    const { likeds } = await getMovie(objectId);

    if (likeds === null) {
        newLiked.push(userName);
    } else {
        newLiked = likeds;
        newLiked.push(userName);
    }

    return await (await fetch(host(endpoints['get-movies'] + `/${objectId}`), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        },
        body: JSON.stringify({
            likeds: newLiked
        })
    })).json();

};

async function searchMovie(searchName) {
    const { userToken } = JSON.parse(localStorage.getItem('userInfo'));

    return await (await fetch(host(endpoints['get-movies'] + `?where=title%20%3D%20%27${searchName}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': userToken
        }
    })).json();
};

export { loginUser, registerUser, addMovie, deleteMovie, searchMovie, likedMovie, editMovie, getAllMovies, logoutUser, getMovie };
