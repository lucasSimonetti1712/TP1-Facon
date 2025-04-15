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
        ui.changeScreen()
        ui.setUser(users[result - 1].name)
        userId=users[result - 1].id
        console.log(userId)
    }
    else if (result==0){
        alert("La contraseña es incorrecta")
    }
    else{
        alert("El usuario esta mal puesto")
    }
    idlog = result
}


function registrar(email,user,password){
    let result = login(email,password)
    if (result>=0){
        alert("Ya existe un usuario con este correo")
    } else{
        users.push(new User(user,email,password))
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
    userId=users[result - 1].id
    console.log(userId)
    for(let i=1;i<notes.length;i++){
        nota=notes[i - 1].users
        console.log(nota)
    }
}