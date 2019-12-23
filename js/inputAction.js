import {edit} from "./connctions.js";


//класс по работе с интпутом для редакрирования элемента
export class InputAction {


    setupListeners(input){
        //клик ентер по инпуту списка
        input.addEventListener('keydown', (event)=>{
            if ((event.code === 'Enter' || event.code === 'NumpadEnter')){
                console.log('not input click enter');
                const li = input.parentNode;
                const span = li.querySelector('span');
                const text = input.value;
                input.style.display = 'none';
                li.querySelector('.hint').style.display = 'none';
                span.style.display = 'inline';
                span.innerText = text;
                edit(text, li.getAttribute('id'));
            }
        });


        //скрываем, если килик не по этому инпуту
        document.addEventListener('click', (event) => {
            if(input !== event.target && input.parentNode !== event.target){
                const li = input.parentNode;
                const span = li.querySelector('span');
                const text = input.value;
                li.querySelector('.hint').style.display = 'none';
                input.style.display = 'none';
                span.style.display = 'inline';
                span.innerText = text;
            }
        })
    }

}