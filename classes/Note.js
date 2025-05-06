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

    addModification(UserId,newContent,newTitle,newCategory) {
        this.modifications.push(new Modification(UserId,this.content,this.title,this.category))
        this.content = newContent;
        this.category = newCategory;
        this.title = newTitle;
    }
 
    addUser(idUsuario) {
        let found = false;
        for(let i=0;i<users.length;i++) {
            if(users[i].id == idUsuario) {
                if (!this.users.includes(idUsuario)) {
                    this.users.push(idUsuario);
                    console.log("Usuario agregado", idUsuario);
                } else {
                    console.log("Usuario repetido");
                }
            }
        }
        
        
    }
}

const notes = [];
notes.push(new Note ("Nota 1","Historia","La decada infame fue un gran periodo",1));
notes.push(new Note ("Nota 2","Cine","No me gustan los minions",2));
notes.push(new Note ("Nota 3","Futbol","No se nada del deporte",3));
console.log(notes);

notes[0].modifications.push(new Modification(1, "cont viejo", "titulo viejo","cateogoria vieja" ))