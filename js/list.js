export class List{
    constructor(){
        this.list = [];
    }


    set setElement(element){
        this.list.unshift(element);
        this.render()
    }


    render(){
        const ul = document.getElementById('mainUl');
        ul.innerHTML = '';
        this.list.forEach(el => {
            ul.appendChild(el)
        })
    }
}