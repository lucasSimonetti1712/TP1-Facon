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
        ui.showModal("La contraseña es incorrecta", "Intente nuevamente")
    }
    else {
        ui.showModal("El usuario está mal puesto", "Intente nuevamente")

    }
}


function registrar(email,user,password){
    let result = login(email,password)
    if (result>=0){
        ui.showModal("Usuario ya registrado", "Por favor, ingrse un correo que no esté registrado en un usuario existente")
    } else{
        users.push(new User(user,email,password))
        ingresar()
    }
}

function crearUsuario(){
    let email=ui.getEmail()
    let user=ui.getUser()
    let password=ui.getPassword()
    if(email=="" || user == "" || password == ""){
        ui.showModal("Campos incompletos", "Por favor, complete todos los campos obligatorios")
    }else{
        let result = registrar(email,user,password)
    }
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
        ui.showModal ("Nota creada con exito", "Puede ver su nota al final de la página")
    }else{
        ui.showModal ("Problema al crear la nota", "Por favor, revise y corriga los datos de la nota")
    }
}

function vernota(){ 
    idnota=ui.getSelectedNote() 
    for(let i=0;i<notes.length; i++){
        if(idnota==notes[i].id){
            console.log(notes[i])
        }
    }
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
        ui.showModal("Nota modificada", "La nota fue actualizada correctamente")
    }else{
        ui.showModal("No se pudo moficar la nota", "Por favor, complete los campos con la informacion correcta")
    }
}

function eraseNote(id){
    ui.removeNote(id);
    for(let i=0;i<notes.length; i++){
        if(id==notes[i].id){
            notes.splice(i,1)
            ui.clearAllNotes();
            mostrarNotas();
            ui.showModal("Nota borrada", "La nota se ha borrado con exito");
        }
    }
    
}

