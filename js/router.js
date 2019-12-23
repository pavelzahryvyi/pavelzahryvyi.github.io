import {routeConfig} from "./routeConfig.js";
import {checkAuth} from "./connctions.js";

export class Router{
    constructor(anchor){
        this.anchor = anchor;

        window.addEventListener('popstate', event => { //подписка на popstate
            this.changeRoute(event.state.route);
        })
    }

    changeRoute(route){ //находим конфиг по ключу
        const conf = routeConfig[route];

        if(!conf) return;

        //пушим data т.е data: {route: 'login'}, или data: {route: 'dashboard'}
        window.history.pushState(conf.data, "", conf.url);

        window.onbeforeunload = function(){
            checkAuth();
        };

        const component = new conf.component(); //создаем компонент

        component.onInit();
        const dom = component.dom;

        if(this.currentDomComponent){
            this.anchor.innerHTML = '';
            this.anchor.appendChild(dom);
        } else{
            this.anchor.appendChild(dom);
        }

        this.currentDomComponent = dom;
    }
}