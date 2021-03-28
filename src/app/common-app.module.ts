import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { HomeComponent } from './Componentes/home/home.component';
import { MenuPrincipalComponent } from './Componentes/home/Componentes/menu-principal/menu-principal.component';
import { CriptografiaRSA } from './security/criptografiaRSA';
import { UsuarioService } from './services/usuario-service.service';
import { Suporte } from './suporte';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxLocalStorageModule } from 'ngx-localstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CadastreSeComponent } from './Componentes/cadastre-se/cadastre-se.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule,
    NgxLocalStorageModule.forRoot(),
    NgxUiLoaderModule,
    ToastrModule.forRoot(), 
    HttpClientModule,
    FormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    RouterModule,
    NgxLocalStorageModule,
    NgxUiLoaderModule,
    ToastrModule,
    HttpClientModule ,
    FormsModule,
  ],
  providers: [
  
  ],
  bootstrap: [AppComponent]
})

export class CommonAppModule { }
