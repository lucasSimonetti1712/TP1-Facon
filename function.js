let idlog = 0
function login(email, password) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == email) {
            if (users[i].password == password) {
                return users[i].id
            }
            else {
                return 0
            }
        }

    }
    return -1
}
//CODIGO AREGLADO
function ingresar() {
    let email = ui.getEmail()
    let password = ui.getPassword()

    let result = login(email, password)
    if (result > 0) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email) {
                idlog = result
                ui.changeScreen()
                ui.setUser(users[i].name)
                userId = users[i].id
                mostrarNotas()
            }
        }
    }
    else if (result == 0) {
        ui.showModal("La contraseña es incorrecta", "Intente nuevamente")
    }
    else {
        ui.showModal("El usuario está mal puesto", "Intente nuevamente")

    }
}

//CODIGO AREGLADO
function registrar(email, user, password) {
    let result = login(email, password)
    if (result >= 0) {
        return -1
    } else {
        users.push(new User(user, email, password))
        return users.length
    }
}

function crearUsuario() {
    let email = ui.getEmail()
    let user = ui.getUser()
    let password = ui.getPassword()
    if (email == "" || user == "" || password == "") {
        ui.showModal("Campos incompletos", "Por favor, complete todos los campos obligatorios")
    } else {
        let result = registrar(email, user, password)
        if (result == -1) {
            ui.showModal("Usuario ya registrado", "Por favor, ingrse un correo que no esté registrado en un usuario existente")
        } else {
            ingresar()
        }
    }
}
//CODIGO AREGLADO
function mostrarNotas() {
    let userId = idlog
    ui.clearAllNotes()
    ui.clearSelect()
    for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < notes[i].users.length; j++) {
            if (notes[i].users[j] == userId) {
                ui.createNote(notes[i].id, notes[i].title, notes[i].content, notes[i].category)
                ui.addNoteToSelect(notes[i].id, notes[i].title)
            }
        }
        
    }
}

function cerrarsesion() {
    if (confirm("¿Estas seguro que queres cerrar sesion?")) {
        idlog = 0
        ui.changeScreen()
        ui.clearLoginInputs()
    }
}

function crearnota(title, category, content) {
    if (title == "" || category == "" || content == "") {
        return -1
    } else {
        notes.push(new Note(title, category, content, idlog));
        let ultimo = notes.length
        return notes[ultimo - 1].id
    }
}

function agregarnota() {
    let title = ui.getNoteTitle()
    let category = ui.getNoteContent()
    let content = ui.getNoteCategory()
    let idNota = crearnota(title, category, content);
    if (idNota > -1) {
        ui.createNote(idNota, title, category, content)
        ui.addNoteToSelect(idNota, title)
        ui.showModal("Nota creada con exito", "Puede ver su nota al final de la página")
    } else {
        ui.showModal("Problema al crear la nota", "Por favor, revise y corriga los datos de la nota")
    }
}

function vernota() {
    idnota = ui.getSelectedNote()
    for (let i = 0; i < notes.length; i++) {
        if (idnota == notes[i].id) {
            console.log(notes[i])
        }
    }
}

function verModificacionesNota() {
    idnota = ui.getSelectedNote()
    for (let i = 0; i < notes.length; i++) {
        if (idnota == notes[i].id) {
            console.log(notes[i].modifications)
        }
    }
}

//CODIGO AREGLADO
function modificarnota(id, content, title, category) {
    if (title == "" || category == "" || content == "") {
        return -1
    } else {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id && notes[i].users.includes(idlog)) {
                notes[i].addModification(idlog, content, title, category)
                return notes[i].id
            }
        }
        return -1
    }
}

//CODIGO AREGLADO
function editNote(id) {
    let noteTitle = ui.getNoteTitle()
    let noteContent = ui.getNoteContent()
    let noteCategory = ui.getNoteCategory()
    let result = modificarnota(id, noteContent, noteTitle, noteCategory)
    if (result > 0) {
        mostrarNotas()
        ui.showModal("Nota modificada", "La nota fue actualizada correctamente")
    } else {
        ui.showModal("No se pudo moficar la nota", "Por favor, complete los campos con la informacion correcta")
    }
}

function borrarNota(id) {
    for (let i = 0; i < notes.length; i++) {
        if (id === notes[i].id) {
            notes.splice(i, 1)
            return true
        }
    }
    return false;

}

function eraseNote(id) {
    if (borrarNota(id)) {
        ui.removeNote(id)
        ui.showModal("Exito", "Se ha borrado correctamente la nota")
    } else {
        ui.showModal("Error", "No se ha podido borrar la nota")
    }

}

function buscarContenido() {
    let coincidencias = false;
    let contenido = ui.getSearchContent()
    if (contenido.length >= 4) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].content.includes(contenido)) {
                coincidencias = true;
                console.log(notes[i])
            }
        }
        if (!coincidencias)
            console.log("No hay coincidencias")
    } else {
        console.log("Ingrese mas de 4 caracteres")
    }
}


function agregarUsuario(id) {
    let idAgregar = parseInt(document.getElementById("newUserId").value);
    let rta = false;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id == idAgregar) {
                    idUsuario = users[j].id;
                    rta = notes[i].addUser(idUsuario);
                }
            }
        }
    }
    if (rta) {
        ui.showModal("Éxito", "Usuario agregado a la nota");
    } else {
        ui.showModal("Error", "Usuario no existe o está repetido");
    }
}


function borrarUsuario(id) {
    let idBorrar = parseInt(document.getElementById("deleteUserId").value);
    let rta = false;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            for (let j = 0; j < users.length; j++) {
                if (users[j].id == idBorrar) {
                    idUsuario = users[j].id;
                    rta = notes[i].deleteUser(idUsuario);
                }
            }
        }
    }
    if (rta) {
        ui.showModal("Éxito", "Usuario borrado de la nota");
    } else {
        ui.showModal("Error", "Usuario no existe o está repetido");
    }
}