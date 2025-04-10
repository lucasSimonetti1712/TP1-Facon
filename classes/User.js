let userId = 1;

class User{
    /**
     * 
     * @param {str} name 
     * @param {str} email 
     * @param {str} password 
     */
    constructor(name,email,password){
        this.id = userId;
        userId++;
        this.name = name;
        this.email=email
        this.password = password;
    }
}

const users = [];
users.push(new User ("Juani", "jteruya@pioix.edu.ar", "123"));
users.push(new User ("Santi", "ssilva@pioix.edu.ar", "456"));
users.push(new User ("Mati", "mmarchesi@pioix.edu.ar", "789"));
console.log(users)