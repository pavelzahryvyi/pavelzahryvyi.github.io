import {Component} from "./component.js";
import {List} from "./list.js";
import {Button} from "./button.js";
import {InputAction} from './inputAction.js';
import {createItem} from "./connctions.js";
import {getItems} from "./connctions.js";

const buttonObj = new Button();
const listObj = new List();
const action = new InputAction();


export class Item{

    set setValue(value){
        createItem(value);
    }

    setItemsFromBack(items){
        listObj.list = [];
        items.forEach(item => {
            this.itemText = item.text;
            this.itemId = item['_id'];
            this.complated = item.completed;
            this.renderFromBack();
        });
    }

    renderFromBack(){
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.setAttribute('class', 'elementText');
        span.innerText = this.itemText;
        if(this.complated === true){
            li.setAttribute("class", "doneItem");
            span.style.textDecoration = 'line-through'
        }
        li.appendChild(span);

        const hintSpan = document.createElement('span');
        hintSpan.innerText = 'press enter to finish editing';
        hintSpan.setAttribute('class', 'hint');
        li.appendChild(hintSpan);

        li.setAttribute('id', this.itemId);
        li.appendChild(this.addBlockButtons(li));
        this.addInputToItem(li);
        this.setupListeners(li);


        listObj.setElement = li;
        buttonObj.setupListeners(li);
        buttonObj.setListObj = listObj;
    };


    addInputToItem(el){
        let content = el.querySelector('span').innerText;
        const editInput = document.createElement('input');
        editInput.setAttribute('class', 'hint');
        editInput.style.display = 'none';
        editInput.setAttribute('class', 'editInput');
        editInput.setAttribute('id', `${el.getAttribute('id')}editInput`);
        editInput.value = content;
        action.setupListeners(editInput);
        el.appendChild(editInput);
    }

    //Добавление кнопок по управлению списком
    addBlockButtons(el){
        const editButton = document.createElement('button');
        editButton.setAttribute('id', el.getAttribute('id')+"check");
        editButton.setAttribute('class', 'editButton controlButton');

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', el.getAttribute('id')+"delete");
        deleteButton.setAttribute('class', 'deleteButton controlButton');

        const divButton = document.createElement('div');
        divButton.setAttribute('class', 'blockButtons');
        divButton.appendChild(editButton);
        divButton.appendChild(deleteButton);

        return divButton;
    };

    //Отрисовка элемента списка


    setupListeners(li){
        const span = li.querySelector('span');

        /*span.addEventListener('mouseup', (event)=>{
            console.log('span listener');
            console.log(span);
            span.innerText = '';
            console.log('span.innerText = \'\'');
            li.querySelector('input').style.display = 'inline';
            console.log('input inline');
            li.querySelector('input').focus();
        });*/

        //клик на елемент списка
        li.addEventListener('click', (event)=>{
            // console.log('li listener');
            // console.log(li.querySelector('span'));
            li.querySelector('span').innerText = '';
            //li.querySelector('span').style.display = 'none';
            li.querySelector('.hint').style.display = 'inline';
            li.querySelector('input').style.display = 'inline';
            li.querySelector('input').focus();
        });

        //наводим на элемент списка
        li.addEventListener('mouseover', (event)=>{
            const buttons = li.querySelector('div');
            buttons.style.display = 'block';
        });

        //отводим в элемента
        li.addEventListener('mouseout', (event)=>{
            const buttons = li.querySelector('div');
            buttons.style.display = 'none';
        });
    };
}