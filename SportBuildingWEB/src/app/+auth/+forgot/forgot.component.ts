import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from 'app/services/shared.service';
import { ProfissionalService } from 'app/services/profissional.service';
import { IProfissional } from 'app/models/profissional.interface';
import { IEmailResetSenha } from 'app/models/emailResetSenha.interface';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styles: []
})
export class ForgotComponent implements OnInit {

  form: FormGroup;
  


  emailResetSenha: IEmailResetSenha = <IEmailResetSenha>{};

  constructor(private router: Router,
              private fb: FormBuilder,
              private sharedService: SharedService,
              private usuarioService: ProfissionalService,) { 
 
    this.form = fb.group({
      "userName": ["",  Validators.required],           
      "email": ["", Validators.required],        
    });
  }

  ngOnInit() {
  }

  // redefinirSenha(){

  //   if(this.form.controls["userName"].value ||  this.form.controls["email"].value){
 
  //     this.emailResetSenha.UserName = this.form.controls["userName"].value;
  //     this.emailResetSenha.Email = this.form.controls["email"].value;
  //     this.emailResetSenha.CorpoEmailReset = this.htmlCorpoEmailResetSenha;

  //     this.usuarioService.resetPassword(this.emailResetSenha)
  //                         .subscribe(registro => { 
                            
  //                           this.sharedService.smallBox({
  //                             title: "Sucesso!",
  //                             content: "<i class='fa fa-clock-o'></i> <i>Um E-mail com a sua credencial temporária foi enviado. Verifique sua caixa de entrada!!</i>",
  //                             color: "#659265",
  //                             iconSmall: "fa fa-check fa-2x fadeInRight animated",
  //                             timeout: 8000
  //                           });

  //                           this.router.navigate(['/auth/login']);

  //                       }, error => this.sharedService.erroNotification6Secounds(error));  
    
  //   }else{
  //     this.sharedService.erroNotificationString6Secounds("E-mail ou Usuário Requerido")
  //   }
    
  // }
}
