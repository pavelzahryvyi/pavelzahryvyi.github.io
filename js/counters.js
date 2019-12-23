//singleton pattern

export function Counters() {
    const instance = Counters.instance;

    Counters.prototype.allNotes = 0;
    Counters.prototype.doneNotes = 0;
    Counters.prototype.notDoneNotes = 0;

    Counters.prototype.notesCounter = function () {
        this.allNotes = document.getElementsByTagName('li').length;
        this.doneNotes = document.getElementsByClassName('doneItem').length;
        this.notDoneNote();
    };
    Counters.prototype.notDoneNote = function () {
        this.notDoneNotes = this.allNotes - this.doneNotes;
        this.render();
    };

    Counters.prototype.render = function () {
        document.getElementById('allNotes').innerText = this.allNotes;
        document.getElementById('doneNotes').innerText = this.doneNotes;
        document.getElementById('inProcess').innerText = this.notDoneNotes;
    };

    if(instance) return instance;
    Counters.instance = this;
}