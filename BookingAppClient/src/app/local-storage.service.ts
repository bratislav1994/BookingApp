import { Injectable } from '@angular/core';
import { LocalEnum } from "app/localEnum.model";
@Injectable()
export class LocalStorageService {

  constructor() { }

    IsLoggedIn() : boolean {
        if (localStorage.getItem(LocalEnum.User.toString()) == null)
        {
            return false;
        }
        
        return true;
    }

     isAdmin() : boolean {
        if(localStorage.getItem(LocalEnum.Role.toString()) == "Admin"){
            console.log("jeste admin");
            return true
        }

        return false;
    }

    isManager() : boolean {
        if(localStorage.getItem(LocalEnum.Role.toString()) == "Manager"){
            console.log("jeste manager");
            return true
        }

        return false;
    }

    isUser() : boolean {
        if(localStorage.getItem(LocalEnum.Role.toString()) == "AppUser"){
            console.log("jeste AppUser");
            return true
        }

        return false;
    }
}
