import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontEndBase';

  
  constructor(public storage : LocalStorageService, public router :Router) {
   
      if(!this.storage.get('Login')){
           this.router.navigate(['']);
       }
  
  }
}
