import {Router} from "./router.js";

const router = new Router(document.body); //инициализируем dom

//прослушка на наш window
window.addEventListener('changeRoute', (event) => {
    router.changeRoute(event.detail.route);
});

//диспатчим ивент, что бы при запуске появилась страница login
window.dispatchEvent(new CustomEvent('changeRoute', { detail: { route: 'login'}}));