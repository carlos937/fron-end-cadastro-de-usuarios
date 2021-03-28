import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PerfilComponent } from './perfil.component';
import { PerfilRoutingModule } from './perfil-routing.module';
import { CommonAppModule } from '../../../../common-app.module';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    PerfilRoutingModule,
    CommonAppModule
  ],
  providers: []
})
export class PerfilModule { }
