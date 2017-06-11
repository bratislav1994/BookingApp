import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

    IsLoggedIn() : boolean {
        if (localStorage.getItem("Role") == null)
        {
            return false;
        }
        
        return true;
    }

     isAdmin() : boolean {
        if(localStorage.getItem("Role") == "Admin"){
            console.log("jeste admin");
            return true
        }

        return false;
    }

    isManager() : boolean {
        if(localStorage.getItem("Role") == "Manager"){
            console.log("jeste manager");
            return true
        }

        return false;
    }

    isUser() : boolean {
        if(localStorage.getItem("Role") == "AppUser"){
            console.log("jeste AppUser");
            return true
        }

        return false;
    }
}
