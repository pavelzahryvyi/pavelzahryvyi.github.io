export class Component{
    get dom(){
        this.anchor.innerHTML = this.render();
        this.setupListeners();

        //метод для подгрузки дополнвтельных данных
        this.startInfo();

        return this.anchor;
    }
}