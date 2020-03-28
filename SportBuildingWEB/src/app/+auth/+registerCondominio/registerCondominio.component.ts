import { Component, OnInit, TemplateRef } from '@angular/core';
import {Router} from "@angular/router";


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfissionalService } from 'app/services/profissional.service';
import { IProfissional } from 'app/models/profissional.interface';
import { SharedService } from 'app/services/shared.service';
import { IEspecialidade } from 'app/models/especialidade.interface';
import { IBairro } from 'app/models/bairro.interface';
import { BairroService } from 'app/services/bairro.service';
import { ICondominio } from 'app/models/condominio.interface';
import { CondominioService } from 'app/services/condominio.service';

declare var $ : any;

@Component({
  selector: 'app-registerCondominio',
  templateUrl: './registerCondominio.component.html',
  styles: []
})
export class RegisterCondominioComponent implements OnInit {
 
  private registro: ICondominio = <ICondominio>{};


  bairros:IBairro[] = [];

  
  nome: string;
  email: string;
  userName: string;
  userPassword: string;
  comentario:string;
  form: FormGroup;


  bsModalRef: BsModalRef;
  public termsAgreed = false

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private condominioService:CondominioService,
    private bairroService:BairroService,
    private sharedService: SharedService,
    private modalService: BsModalService) {

      this.form = fb.group({
         "nomeCondominio": ["", Validators.required],
         "email": ["", Validators.required],
         "userPassword": ["", Validators.required],
         "endereco": ["", Validators.required], 
         "bairro": ["", Validators.required], 
         "userName": ["", Validators.required],
         "cnpj":   ["", Validators.required],
         "celular":["", Validators.required],
         "nomeResponsavel": ["", Validators.required],
   
         
                 
      });

    }

    
 
   ngOnInit() {
    this.listBairroAll();
   }


   onSubmit(): void {
    
    //var dataAdmissao: IMyDateModel;
    //var dataDemissao: IMyDateModel;

    this.registro.NomeCondominio = this.form.controls["nomeCondominio"].value;

     this.registro.Email = this.form.controls["email"].value;
     this.registro.UserName = this.form.controls["email"].value; 
     this.registro.Senha = this.form.controls["userPassword"].value;  
     this.registro.Endereco = this.form.controls["endereco"].value; 
     this.registro.IDBairro = this.form.controls["bairro"].value; 
     this.registro.Celular = this.form.controls["celular"].value;
     this.registro.CNPJ = this.form.controls["cnpj"].value;
     this.registro.NomeResponsavel = this.form.controls["nomeResponsavel"].value;

     // atribui codigo de profissional para Role
     this.registro.Roles = "3"
    


 
    
  

    this.condominioService.insert(this.registro)
    .subscribe(response => {
        
      this.router.navigate(['/auth/login'])

      this.form.reset();  
  }, error => this.sharedService.erroNotification6Secounds(error));


   }


 

//   register(event){
//     event.preventDefault();

//     // this.profissionalService.getAll()
//     // .subscribe(response=>{

//     //   console.log(response);
//     // })
  

//   // this.profissionalService.insert(this.registro)
//   // .subscribe(response => {
        
//      // this.router.navigate(['/colaborador']);

//      this.form.reset();  
//  }, error => this.sharedService.erroNotification6Secounds(error));

   



   // this.router.navigate(['/dashboard'])
 // }

  openModal(event, template: TemplateRef<any>) {
    event.preventDefault();
    this.bsModalRef = this.modalService.show(template);
  }

  onTermsAgree(){
    this.termsAgreed = true
    this.bsModalRef.hide()
  }

  onTermsClose(){
    this.bsModalRef.hide()
  }


  listBairroAll(): void{
    this.bairroService.getAll()
         .subscribe(bairros => {this.bairros = bairros
          },error => this.sharedService.erroNotification6Secounds(error));
 }

}
