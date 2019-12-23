import {LoginComponent} from "./loginComponent.js";
import {TodoComponent} from "./todoComponent.js";

export const routeConfig = {
    'login': {
        data: {route: 'login'},
        url: 'login',
        component: LoginComponent,
    },
    'todo': {
        data: {route: ''},
        url: 'todo',
        component: TodoComponent,
    }
};