import {Item} from "./item.js";
const item = new Item();

import {Counters} from "./counters.js";
const counters = new Counters();

export function login(email, password) {
    fetch('https://todo-app-back.herokuapp.com/login', {
        method: 'POST',
        body:
            JSON.stringify({
                email: email,
                password: password,
            }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).catch(error =>{
        console.log("problems");
    }).then(res =>
        res.json()
    )
    .then(res => {
        localStorage.setItem('token', res.token);
        checkAuth();
    });
}

export function checkAuth() {
    fetch('https://todo-app-back.herokuapp.com/me', {
        method: 'GET',
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        }
    }).then(res =>
        res.json()
    )
    .then(res => {
        if (res.token === localStorage.getItem('token')){
            console.log('success auth');
            window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'todo'}}));
        }else {
            document.querySelector('.error').style.display = 'inline';
            //window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login'}}));
        }
    });
}

export function createItem(text) {
    fetch('https://todo-app-back.herokuapp.com/todos', {
        method: 'POST',
        body:
            JSON.stringify({
                text: `${text}`,
            }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    .then(res =>
        res.json()
    )
    .then(res => {
            getItems()
    });
}

export function getItems() {
    fetch('https://todo-app-back.herokuapp.com/todos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
    .then(res =>
        res.json()
    )
    .then(res => {
        item.setItemsFromBack(res);
        counters.notesCounter();
    });
}

export function deleteItemBack(id) {
    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
}

export function edit(text, id) {
    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
        method: 'PUT',
        body:
            JSON.stringify({
                text: text
            }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
}
export function complate(id) {
    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
        method: 'PUT',
        body:
            JSON.stringify({
                completed: true,
            }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
}
export function complateCancel(id) {
    fetch(`https://todo-app-back.herokuapp.com/todos/${id}`, {
        method: 'PUT',
        body:
            JSON.stringify({
                completed: false,
            }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        }
    })
}