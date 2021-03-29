import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonAppModule } from '../../../../common-app.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioRoutingModule } from './Usuario-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    UsuarioRoutingModule,
    CommonAppModule,
    CommonModule
  ],
  providers: []
})
export class UsuariosModule { }