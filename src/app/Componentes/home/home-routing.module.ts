import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'perfil',
        pathMatch: 'full'
      },
      {
        path: 'perfil',
        loadChildren: () => import('./Componentes/perfil/perfil.module').then(m => m.PerfilModule)
      },
      // {
      //   path: 'configuracoes',
      //   loadChildren: () => import('./pages/editar-usuario/editar-usuario.module').then( m => m.EditarUsuarioPageModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
