export class UserRegistration{
    Username : string;
    Password : string;
    Role : string;
    Email: string;
    ConfirmPassword: string;
    isBanned: boolean;

    constructor (username: string, 
                 password: string, 
                 role : string, 
                 email: string, 
                 confPassword: string, isBanned: boolean) {
        this.Username = username;
        this.Password = password;
        this.Role = role;
        this.Email = email;
        this.ConfirmPassword = confPassword;
        this.isBanned = false;
    }
}