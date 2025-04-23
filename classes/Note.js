let noteId = 1;

class Note{
    /**
     * 
     * @param {str} title 
     * @param {str} category 
     * @param {str} content 
     * @param {int} userId 
     * @param {str} modifications 
     */
    constructor(title,category,content,userId){
        this.id = noteId;
        noteId++;
        this.title = title;
        this.category=category;
        this.content = content;
        this.users = [userId];
        this.modifications = [];
    }

    addModification(userId) {
        let modifify= new Modification(
            userId,
            this.content,
            this.title,
            this.category
        );
        this.modifications.push(modify);
    }
}

const notes = [];
notes.push(new Note ("Nota 1","Historia","La decada infame fue un gran periodo",1));
notes.push(new Note ("Nota 2","Cine","No me gustan los minions",2));
notes.push(new Note ("Nota 3","Futbol","No se nada del deporte",3));
console.log(notes);

notes[0].modifications.push(new Modification(1, "cont viejo", "titulo viejo","cateogoria vieja" ))