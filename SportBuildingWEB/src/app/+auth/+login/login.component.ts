import { LogAcessoService } from './../../services/logAcesso.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {Response} from '@angular/http';

import { LoginService } from '../../services/login.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SharedService } from '../../services/shared.service';
import { ProfissionalService } from 'app/services/profissional.service';
import { ILogAcesso } from 'app/models/logAcesso.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
 
  userLogin: string;
  userPassword: string;
  form: FormGroup;
  private logAcesso: ILogAcesso = <ILogAcesso>{}

  constructor(private router: Router,
                private loginService: LoginService,
                private fb: FormBuilder,
                private sharedService: SharedService,
                private usuarioService: ProfissionalService,
                private logacessoService: LogAcessoService
    ) { 

      this.form = fb.group({
        "userLogin": ["", Validators.required],
        "userPassword": ["", Validators.required],        
      });

    }

  ngOnInit() {

  }

  login(event){
    event.preventDefault();
    
    this.loginService.autenticar(this.userLogin, this.userPassword)
                      .subscribe((res: Response) => { 
                        let strPageRedirectPerfil: string = '/dashboard';
                        
                        if (res){
                          localStorage.setItem('userPassword', this.userPassword); 
                              //Recebe os dados do usuário logado
                              this.usuarioService.getLoginInfo()
                              .subscribe(registro => {
                                  //Seta demais informalçies do usuário na session    
                                  localStorage.setItem("usuarioLogadoDados", JSON.stringify(registro[0])); 
                                  localStorage.setItem("usuarioNome", JSON.stringify(registro[0].Nome)); 
                                  localStorage.setItem("idProfissional", JSON.stringify(registro[0].ID));  
                                  localStorage.setItem("idCondominio", JSON.stringify(registro[0].IDCondominio));
                                  localStorage.setItem("role", JSON.stringify(registro[0].Roles)); 
                                  this.logAcesso.IDUsuario = registro[0].ID
                                 // this.logacessoService.insert(this.logAcesso).subscribe(response => {var logado = response});
                                  if (registro.length > 0){

                                    if (registro[0].Roles.indexOf("Profissional") >= 0) {
                                      strPageRedirectPerfil = '/profissional/perfil'
                                    }else{
                                      if (registro[0].Roles.indexOf("Condomino") >= 0) {
                                        strPageRedirectPerfil = '/condominio/perfil'
                                      }else{
                                        strPageRedirectPerfil = '/dashboard'
                                      }
                                        
                                    }

                                    //Se usuário primeiro acesso redireciona para tela de alteração de senha  
                                    registro[0].DeveTrocarSenha == true ? this.router.navigate(['/auth/alteraSenha']) : this.router.navigate([strPageRedirectPerfil]);                              
                                  }else{
                                    //redirect to login
                                    this.router.navigate(['/auth/login'])
                              }                                    
                            }, error => this.sharedService.erroNotification6Secounds(error));  

                        }else{
                          this.sharedService.erroNotification6Secounds("Usuário ou senha inválidos")
                        } 

                    }, error => this.sharedService.erroNotification6Secounds(error));
  }

}




