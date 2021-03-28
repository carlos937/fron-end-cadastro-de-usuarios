import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MenuPrincipalComponent } from './Componentes/menu-principal/menu-principal.component';
import { CommonAppModule } from '../../common-app.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonAppModule,
    HomeRoutingModule
  ],
  providers: []
})

export class HomeModule { }
