
import { NgModule } from '@angular/core';
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";



export const routes:Routes = [

  // {
  //   path:'core!',
  //   component: ProfissionalListaComponent    
  // },
  // {
  //   path: 'cadastro',
  //   component: ProfissionalCadastroComponent,
  //   data: {pageTitle: 'Novo Cadastro'}
  // }


      
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondominioRoutingModule { }