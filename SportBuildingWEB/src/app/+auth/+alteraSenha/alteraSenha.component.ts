import { IProfissional } from './../../models/profissional.interface';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../services/shared.service';
import { ProfissionalService } from 'app/services/profissional.service';

@Component({
  selector: 'app-alteraSenha',
  templateUrl: './alteraSenha.component.html'
})
export class AlteraSenhaComponent implements OnInit {

  registro: IProfissional = <IProfissional>{};
  usuarioLogadoDados: IProfissional = <IProfissional>{};

  userLogin: string = localStorage.getItem("userName");
  userPassword: string = localStorage.getItem("userPassword")
  
  usuarioLogado: IProfissional[] = [];
  
  form: FormGroup;

  constructor(private router: Router,
                private fb: FormBuilder,
                private sharedService: SharedService,
                private usuarioService: ProfissionalService,
    ) { 

      this.form = fb.group({
        "userLogin": [""],           
        "userOldPassword": ["", Validators.required],        
        "userNewPassword": ["", Validators.required],        
        "userConfirmPassword": ["", Validators.required],        
      });

    }

  ngOnInit() {
   
    if(localStorage.getItem("userName") == null) this.router.navigate(['/auth/login'])

    var strAux: any = localStorage.getItem("usuarioLogadoDados");
    strAux = JSON.parse(strAux);
    this.usuarioLogadoDados = strAux;

  }

  updateSenhaColaborador(){

    //Valida alteração de senha
   if(this.userPassword != this.form.controls["userOldPassword"].value ) return this.sharedService.erroNotificationString6Secounds("Senha atual incorreta")
   if(this.form.controls["userOldPassword"].value == this.form.controls["userNewPassword"].value) return this.sharedService.erroNotificationString6Secounds("Nova senha deve ser difirente da atual")
   if(this.form.controls["userNewPassword"].value != this.form.controls["userConfirmPassword"].value) return this.sharedService.erroNotificationString6Secounds("As senhas digitadas não conferem")
  
   //Prepara objeto para alteração
    this.registro.UserName = this.userLogin;
    this.registro.DeveTrocarSenha = false;
    this.registro.OldPassword = this.form.controls["userOldPassword"].value;
    this.registro.Senha = this.form.controls["userNewPassword"].value;
    this.registro.ConfirmPassword = this.form.controls["userConfirmPassword"].value;

    let strPageRedirectPerfil: string = '/dashboard';

  //  Altera senha do colaborador
    this.usuarioService.updateSenhaColaborador(this.registro)
        .subscribe(registro => {
          //Se o retorno for nulo redireciona para tela de Dashboard

          if (this.usuarioLogadoDados.Roles.indexOf("Administrador") >= 0) {
            strPageRedirectPerfil = '/dashboardRH'
          }else{
            if (this.usuarioLogadoDados.Roles.indexOf("Gestor") >= 0) {
              strPageRedirectPerfil = '/dashboardGestor'
            }else{
              strPageRedirectPerfil = '/dashboardColaborador'
            }
              
          }
          
          registro[0] == undefined ? this.router.navigate([strPageRedirectPerfil]) : this.router.navigate(['/auth/login']);        
    }, error => this.sharedService.erroNotification6Secounds(error));  
  }
   
}


