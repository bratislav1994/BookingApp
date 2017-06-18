export class AppUser{
    Id: number;
    Username : string;
    IsBanned : boolean;

    constructor (username?: string, isBanned?: boolean) {
        this.Username = username;
        this.IsBanned = isBanned;
    }
}