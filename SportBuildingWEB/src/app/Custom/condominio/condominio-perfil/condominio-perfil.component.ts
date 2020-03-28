import { Component, OnInit } from '@angular/core';
import { ICondominio } from 'app/models/condominio.interface';
import { SharedService } from 'app/services/shared.service';
import { CondominioService } from 'app/services/condominio.service';
import { BairroService } from 'app/services/bairro.service';
import { IBairro } from 'app/models/bairro.interface';
import { EspecialidadeService } from 'app/services/especialidade.service';
import { IEspecialidade } from 'app/models/especialidade.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { IProfissionalLista } from 'app/models/profissionalLista.interface';
import { ViewChild, ElementRef} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-condominio-perfil',
  templateUrl: './condominio-perfil.component.html',
  styleUrls: ['./condominio-perfil.component.css']
})
export class CondominioPerfilComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  

  registros: ICondominio[] = [];

  private registroFiltro: IProfissionalLista = <IProfissionalLista>{};
  bairros:IBairro[] = [];
  especialidades:IEspecialidade[]=[];
  form: FormGroup;
 

  constructor( private sharedService:SharedService ,
              private router: Router, 
              private fb: FormBuilder, 
                private condominioService:CondominioService,
                private bairroService:BairroService,
                private especialidadeService:EspecialidadeService ) {

                  this.form = fb.group({
                    "bairro": ["", Validators.required],
                    "especialidade": ["", Validators.required],
                     
                 });

                 }

  ngOnInit() {

    this.listBairroAll();
    this.listEspecialidadesAll();
   this.ListDadosCondominio(localStorage.getItem("userName"));
  
   
  }

  onSubmit(): void {

    $('.modal').modal('hide')
    
    //var dataAdmissao: IMyDateModel;
    //var dataDemissao: IMyDateModel;

    this.registroFiltro.IDBairro = this.form.controls["bairro"].value;
    this.registroFiltro.IDEspecialidade = this.form.controls["especialidade"].value;

   
    localStorage.setItem("regFiltroSelecionado", JSON.stringify(this.registroFiltro));
    this.router.navigate(['profissional/listProfissional'])
        

  

      this.form.reset();  



   }

  ListDadosCondominio(strUserName: string): void {
    this.condominioService.getCondominioPorUser(strUserName)
         .subscribe(registros => {
          this.registros = registros
         }, error => this.sharedService.erroNotification6Secounds(error));
               
}  

listBairroAll(): void{
  this.bairroService.getAll()
       .subscribe(bairros => {this.bairros = bairros
        },error => this.sharedService.erroNotification6Secounds(error));
}


listEspecialidadesAll(): void{
  this.especialidadeService.getAll()
       .subscribe(especialidades => {this.especialidades = especialidades
        },error => this.sharedService.erroNotification6Secounds(error));
}


}
