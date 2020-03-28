import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterCondominioComponent} from "./registerCondominio.component";

const routes: Routes = [{
  path: '',
  component: RegisterCondominioComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegisterCondominioRoutingModule { }
