import {Counters} from "./counters.js";
import {deleteItemBack} from "./connctions.js";
import {complate} from "./connctions.js";
import {complateCancel} from "./connctions.js";

const counters = new Counters();

//класс для работы кнопок на элементе
export class Button {
    constructor(){}

    set setListObj(x){
        this.listObject = x;
    }

    //Удаление элемента списка
    deleteItem(itemId){
        console.log('delete item method');
        this.listObject.list = this.listObject.list.filter(el => el.getAttribute('id') !== itemId);
        this.listObject.render();
    }

    setupListeners(el){
        const checkButton = document.getElementById(el.getAttribute('id') + "check");
        const deleteButton = document.getElementById(el.getAttribute('id') + "delete");

        //удаление записи
        deleteButton.addEventListener('click', ()=>{
            this.deleteItem(el.getAttribute('id'));
            deleteItemBack(el.getAttribute('id'));
            counters.notesCounter();
        });

        //отметка сделанной записи
        checkButton.addEventListener('click', ()=>{
            if(el.querySelector('span').style.textDecoration === 'line-through'){ //отменяем
                el.querySelector('span').style.textDecoration = 'none';
                el.removeAttribute('class');
                complateCancel(el.getAttribute('id'));
            }else { //отмечаем, что запись сделана
                el.querySelector('span').style.textDecoration = 'line-through';
                el.setAttribute('class', 'doneItem');
                complate(el.getAttribute('id'));

            }
            counters.notesCounter();
        })
    }
}