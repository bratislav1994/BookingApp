import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

    IsLoggedIn() : boolean {
        if ( localStorage.getItem("token") != null)
        {
            return true;
        }
        
        return false;
    }

}
