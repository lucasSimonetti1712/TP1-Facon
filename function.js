let idlog=0
function login(email,password){
    for (let i=0;i<users.length; i++){
        if (users[i].email==email){
            if (users[i].password==password){
                idlog=users[i].id
                return idlog
            }
            else{
                idlog = 0
                return idlog
            }
        }
        else{
            idlog= -1
            return idlog
        }
    }
  }

function ingresar(){
    let email=ui.getEmail()
    let password=ui.getPassword()

    let result = login(email, password)

    if (result>0){
        ui.changeScreen()
        ui.setUser(email)
    }
    else if (result==0){
        alert("La contraseña es incorrecta")
    }
    else{
        alert("El usuario esta mal puesto")
    }
}


