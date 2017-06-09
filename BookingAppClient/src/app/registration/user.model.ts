export class User{
    Username : string;
    Password : string;
    Role : string;
    Email: string;
    ConfirmPassword: string;

    constructor (username: string, 
                 password: string, 
                 role : string, 
                 email: string, 
                 confPassword: string) {
        this.Username = username;
        this.Password = password;
        this.Role = role;
        this.Email = email;
        this.ConfirmPassword = confPassword;
    }
}