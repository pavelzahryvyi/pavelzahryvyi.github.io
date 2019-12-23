import {Component} from "./component.js";
import {Item} from "./item.js";
import {Counters} from "./counters.js";

import {getItems} from "./connctions.js";

const counters = new Counters();
const item = new Item();

export class TodoComponent extends Component{
    constructor(){
        super();
        this.anchor = document.createElement('div');
        this.anchor.setAttribute('id', 'app');
    }

    onInit(){}


    render(){
        //console.log('render method in TodoComponent');
        return `
                <div id="header">
                    <h1>Todo</h1>
                    <table id="countersTable">
                        <tr>
                            <td>All notes</td><td id="allNotes">0</td>
                        </tr>
                        <tr>
                            <td>Done</td><td id="doneNotes">0</td>
                        </tr>
                        <tr>
                            <td>In process</td><td id="inProcess">0</td>
                        </tr>
                    </table>
                </div>
                <div class="inputDiv" id="inputBlockDiv">
                    <input type="text" placeholder="Add something...">
                    <button id="addButton">Add</button>
                </div>
                
                <div class="ulWrap">
                    <ul id="mainUl">
                        
                    </ul>
                </div>                
            `;
    }

    startInfo(){
        getItems();
    }

    setupListeners(){ //this.anchor - компонент dashboard
        const input = this.anchor.querySelector("input");
        input.addEventListener('keydown', (event)=>{
            if ((event.code === 'Enter' || event.code === 'NumpadEnter') && event.currentTarget.value !== ''){
                item.setValue = input.value;
                input.value = '';
                counters.notesCounter();
            }
        });
        //Добавление записи, нажимая кнопку
        this.anchor.querySelector('button').addEventListener('click', (event)=>{
            if (input.value !== ''){
                item.setValue = input.value;
                input.value = '';
                counters.notesCounter();
            }
        });
    }
}