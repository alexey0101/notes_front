import Cookies from 'js-cookie';

export const getNotes = async (answer, quiz_id) =>
  fetch(`http://localhost:3001/api/note`, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": `${Cookies.get('token')}`
    },
  }).then(response => {
    if (response.status >= 400 && response.status < 600) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    return response.json();
  });

export const editNote = async (id, title, content) =>
    fetch(`http://localhost:3001/api/note/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get('token')}`
        },
        body: JSON.stringify({ title, content }),
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return new Promise((resolve, reject) => resolve());
});

export const createNote = async ({title, content}) =>
    fetch(`http://localhost:3001/api/note`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get('token')}`
        },
        body: JSON.stringify({ title, content }),
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return new Promise((resolve, reject) => resolve());
});

export const deleteNote = async (id) =>
    fetch(`http://localhost:3001/api/note/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${Cookies.get('token')}`
        },
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }
        return new Promise((resolve, reject) => resolve());
});


export const signin = async (username, password) =>
    fetch(`http://localhost:3001/api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
}).then(response => {
    if (response.status >= 400 && response.status < 600) {
        throw new Error(`${response.status}: ${response.statusText}`);
    }
    Cookies.set('token', response.headers.get('Authorization'), { expires: 30 });
    return new Promise((resolve, reject) => resolve());
});

export const signup = async (username, password) =>
    fetch(`http://localhost:3001/api/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password }),
}).then(response => {
    if (response.status >= 400 && response.status < 600) {
        return new Promise((resolve, reject) => response.json()
        .then(error => reject(new Error(error.error))));
    }
    return new Promise((resolve, reject) => resolve());
});

export const logout = async () => {
    Cookies.remove('token');
};
