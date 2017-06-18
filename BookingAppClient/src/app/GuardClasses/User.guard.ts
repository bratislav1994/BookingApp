import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from "app/local-storage.service";

@Injectable()
export class UserGuard implements CanActivate{
    
    constructor(private authService: LocalStorageService){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.authService.isUser();
    }
}