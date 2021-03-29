import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-localstorage';

@Component({
  selector: 'menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

  constructor( 
    public storage: LocalStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  fazerLogout() {
    this.storage.clear();
    this.router.navigate(['']);
  }

  mostrarMenuResponsivo(menuLateral,menuIcon){
     menuLateral.style.display = 'block';
     menuIcon.style.display = 'none';
  }
  fecharMenuResponsivo(menuLateral,menuIcon){
    if(window.screen.width <= 900){
      menuLateral.style.display = 'none';
      menuIcon.style.display = 'block';
    }
  }
}
