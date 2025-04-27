let idlog=0
function login(email,password){
    for (let i=0;i<users.length; i++){
        if (users[i].email==email){
            if (users[i].password==password){
                return users[i].id
            }
            else{
                return 0
            }
        }

    }
    return -1
  }

function ingresar(){
    let email = ui.getEmail()
    let password = ui.getPassword()

    let result = login(email, password)

    if (result > 0){
        idlog = result
        ui.changeScreen()
        ui.setUser(users[result - 1].name)
        userId = users[result - 1].id
        mostrarNotas()
    }
    else if (result == 0){
        alert("La contraseña es incorrecta")
    }
    else {
        alert("El usuario está mal puesto")
    }
}


function registrar(email,user,password){
    let result = login(email,password)
    if (result>=0){
        alert("Ya existe un usuario con este correo")
    } else{
        users.push(new User(user,email,password))
        ingresar()
    }
}

function crearUsuario(){
    console.log("Hola")
    let email=ui.getEmail()
    let user=ui.getUser()
    let password=ui.getPassword()

    let result = registrar(email,user,password)

}

function mostrarNotas(){
    let userId=users[idlog - 1].id
    for(let i=0;i<notes.length;i++){
        if(notes[i].users.includes(userId)){
            console.log(notes[i])
            ui.createNote(notes[i].id,notes[i].title,notes[i].content,notes[i].category)
            ui.clearSelect()
            ui.addNoteToSelect(notes[i].id,notes[i].title)
        }

    }
}

function cerrarsesion(){
    if(confirm("¿Estas seguro que queres cerrar sesion?")){
        idlog=0 
        ui.changeScreen()
        ui.clearLoginInputs()
    }
}

function crearnota(title, category, content) {
    if (title=="" || category == "" || content == ""){
        return -1      
    } else {
        notes.push(new Note (title,category,content,idlog));
        let ultimo=notes.length
        return notes[ultimo-1].id
    }
}

function agregarnota(){
    let title=ui.getNoteTitle()
    let category=ui.getNoteContent()
    let content=ui.getNoteCategory()
    let idNota = crearnota(title, category, content);
    if (idNota>-1) {
        ui.createNote(idNota,title,category,content)
        ui.addNoteToSelect(idNota,title)
        alert ("La nota fue creada correctamente")
    }else{
        alert ("Hubo un problema al crear la nota")
    }
}

function vernota(){ 
    idnota=ui.getSelectedNote() 
    console.log(notes[idnota-1])
}

function modificarnota(title,category,content,id){
    console.log(idlog)
    for(let i=0;i<notes.length;i++){
        if(notes[i].users.includes(idlog)){
            notes[i].addModification(userId,title,category,content)
            return notes[i].id
        }else if(title=="" || category == "" || content == ""){
            return -1 
        }else{
    }}
}

function editNote(idlog){
    let noteTitle = ui.getNoteTitle()
    let noteContent = ui.getNoteContent()
    let noteCategory = ui.getNoteCategory()
    let result=modificarnota(noteTitle,noteCategory,noteContent)
    if (result>0){
        ui.clearAllNotes();
        mostrarNotas()
        alert("Ya se ha modificado")
    }else{
        alert("No se pudo moficar")
    }
}

function eraseNote(id){
    ui.removeNote(id);
    for(let i=0;i<notes.length; i++){
        if(id==notes[i].id){
            notes.splice(i,1)
            ui.clearAllNotes();
            mostrarNotas();
            alert("Se ha borrado la nota");
        }
    }
    
}

