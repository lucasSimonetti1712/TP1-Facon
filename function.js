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
    let email=ui.getEmail()
    let password=ui.getPassword()

    let result = login(email, password)

    if (result>0){
        mostrarNotas()
        ui.changeScreen()
        ui.setUser(users[result - 1].name)
        userId=users[result - 1].id
    }
    else if (result==0){
        alert("La contraseña es incorrecta")
    }
    else{
        alert("El usuario esta mal puesto")
    }
    idlog = result
    mostrarNotas()
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