
import {ModuleWithProviders} from "@angular/core"
import {Routes, RouterModule} from "@angular/router";


export const routes:Routes = [
  {
    path: 'login',
    loadChildren: './+login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './+register/register.module#RegisterModule'
  },
   {
     path: 'registerCondominio',
     loadChildren: './+registerCondominio/registerCondominio.module#RegisterCondominioModule'
   },
  {
    path: 'forgot-password',
    loadChildren: './+forgot/forgot.module#ForgotModule'
  },
  {
    path: 'locked',
    loadChildren: './+locked/locked.module#LockedModule'
  },
  {
    path: 'alteraSenha',
    loadChildren: './+alteraSenha/alteraSenha.module#AlteraSenhaModule'
  },
  {
    path: 'novoCadastro',
    loadChildren: 'app/Custom/profissional/profissional.module#ProfissionalModule',
  },

];

export const routing = RouterModule.forChild(routes);
