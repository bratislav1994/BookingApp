import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

    IsLoggedIn() : boolean {
        if (localStorage.getItem("user") == null)
        {
            return false;
        }
        
        return true;
    }

}
