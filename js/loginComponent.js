import {Component} from "./component.js";
import {login} from "./connctions.js";
import {checkAuth} from "./connctions.js";

export class LoginComponent extends Component{
    constructor(){
        super();
        this.anchor = document.createElement('div');

    }

    startInfo(){

    }

    onInit(){}

    render(){
        return `
                <div class="loginForm">
                        <h1>Login</h1>
                        <input type="text" id="login" name="login" placeholder="Your email"/></br>
                        <input type="password" id="password" name="password" placeholder="Your password" /></br>
                        <sapn class="error">Login/password is incorrect</sapn></br>
                        <button type="submit">Log in</button>
                    </form>
                </div>
            `;
    }

    setupListeners(){
        this.anchor.querySelector('button[type="submit"]').addEventListener('click', (event) =>{
            event.preventDefault();
            document.querySelector('.error').style.display = 'none';
            const email = this.anchor.querySelector('input[name="login"]').value;
            const password = this.anchor.querySelector('input[name="password"]').value;
            login(email, password);
        })
    }
}
