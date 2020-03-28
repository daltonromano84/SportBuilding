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

declare var $ : any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {
 
  private registro: IProfissional = <IProfissional>{};

  listEspecialidades:IEspecialidade[]=[];
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
    private profissionalService:ProfissionalService,
    private bairroService:BairroService,
    private sharedService: SharedService,
    private modalService: BsModalService) {

      this.form = fb.group({
         "nome": ["", Validators.required],
         "email": ["", Validators.required],
         "endereco": ["", Validators.required], 
         "bairro": ["", Validators.required], 
         "userName": ["", Validators.required],
         "idade":   ["", Validators.required],
         "sexo":["", Validators.required],
         "userPassword": ["", Validators.required], 
         "numeroRegistro": ["", Validators.required],
         "comentario": ["", Validators.required],
         
                 
      });

    }

    
 
   ngOnInit() {
    this.listBairroAll();
   }


   onSubmit(): void {
    
    //var dataAdmissao: IMyDateModel;
    //var dataDemissao: IMyDateModel;

    this.registro.Nome = this.form.controls["nome"].value;

     this.registro.Email = this.form.controls["email"].value;
     this.registro.UserName = this.form.controls["email"].value; 
     this.registro.Senha = this.form.controls["userPassword"].value;  
     this.registro.Endereco = this.form.controls["endereco"].value; 
     this.registro.IDBairro = this.form.controls["bairro"].value; 
     this.registro.Idade = this.form.controls["idade"].value;
     this.registro.Sexo = this.form.controls["sexo"].value;
     this.registro.Idade = this.form.controls["idade"].value;
     this.registro.NumeroRegistro = this.form.controls["numeroRegistro"].value;
     this.registro.Comentario = this.form.controls["comentario"].value;
     // atribui codigo de profissional para Role
     this.registro.Roles = "2"
    


 
      this.registro.ListaEspecialidades =  this.listEspecialidades;
      
    
    // this.registro.Email = this.form.controls["email"].value;
    // this.registro.UserName = this.form.controls["userName"].value; 
    // this.registro.NewPassword = this.form.controls["userPassword"].value;  
   // this.registro.Email = this.form.controls["email"].value; 

    this.profissionalService.insert(this.registro)
    .subscribe(response => {
        
      this.router.navigate(['/auth/login'])

      this.form.reset();  
  }, error => this.sharedService.erroNotification6Secounds(error));


   }

   toggleVisibility(e){

    let getID: IEspecialidade = {ID:e.target.value, Descricao:''};
    this.listEspecialidades.push(getID);
  }
 

  register(event){
    event.preventDefault();

    // this.profissionalService.getAll()
    // .subscribe(response=>{

    //   console.log(response);
    // })
  

   this.profissionalService.insert(this.registro)
   .subscribe(response => {
        
     // this.router.navigate(['/colaborador']);

     this.form.reset();  
 }, error => this.sharedService.erroNotification6Secounds(error));

   



   // this.router.navigate(['/dashboard'])
  }

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
