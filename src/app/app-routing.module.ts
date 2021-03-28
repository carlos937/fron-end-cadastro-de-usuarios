import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastreSeComponent } from './Componentes/cadastre-se/cadastre-se.component';
import { LoginComponent } from './Componentes/login/login.component';

const routes: Routes = [ 
{
  path: '',
  component : LoginComponent,
  pathMatch: 'full'
}
,
{
  path: 'home',
  loadChildren: () => import('./Componentes/home/home-routing.module').then(m => m.HomeRoutingModule)
}
,
{
  path: 'cadastrese',
  component : CadastreSeComponent,
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
