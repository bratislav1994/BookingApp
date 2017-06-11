import { Component } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LocalStorageService]
})
export class AppComponent {
  title = 'app';

  constructor(private localStorageService : LocalStorageService, private router: Router) { }

  ngOnInit() {
  
    if(this.localStorageService.IsLoggedIn() == true){
      this.router.navigate(['/home']);
      console.log("radi")
    }
    
  }
  // IsLoggedIn() : boolean {

  //   return this.localStorageService.IsLoggedIn();
  // }
}
