import { Component, OnInit } from '@angular/core';
import { IPedidoAula } from 'app/models/pedidoAula.interface';
import { IProfissionalLista } from 'app/models/profissionalLista.interface';
import { IProfissional } from 'app/models/profissional.interface';
import { ProfissionalService } from 'app/services/profissional.service';
import { SharedService } from 'app/services/shared.service';
import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PedidoAulaService } from 'app/services/pedidoAula.service';

@Component({
  selector: 'app-pedido-aula',
  templateUrl: './pedido-aula.component.html',
  styleUrls: ['./pedido-aula.component.css']
})
export class PedidoAulaComponent implements OnInit {


  private dadosAgendamento: IPedidoAula = <IPedidoAula>{};

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
};

public model: any = { date: { year: 2020, month: 3, day: 11} };

  registroEntrada: IProfissional;



  registros:IProfissional[]=[];

  strNomeCondominio:string;
  intIDCondominio:number;
  intIDProfissional:number;
  dtAgendamento:string;

  form: FormGroup;

  constructor(private profissionalService:ProfissionalService,
              private fb: FormBuilder,
              private pedidoAula:PedidoAulaService,
              private sharedService:SharedService ) {

                this.form = fb.group({ 
                  "data":  [""],                 
                  //"idEquipe": ["", Validators.required],                  
                  "horario": [""],                                   
                 
              
               
                });


               }

  ngOnInit() {


    if (localStorage.getItem("regPerfilAgendarSelecionado") != undefined){

      var strAuxAval: any = localStorage.getItem("regPerfilAgendarSelecionado");
      strAuxAval = JSON.parse(strAuxAval);
      this.registroEntrada = strAuxAval;

      this.registroEntrada.IDCondominio =  +localStorage.getItem("idCondominio");

      this.strNomeCondominio =  localStorage.getItem("usuarioNome");

      

      this.ListDadosProfissional(this.registroEntrada.UserName)


    }

  

  }


  onSubmit(): void {

      
    //var dataAdmissao: IMyDateModel;
    //var dataDemissao: IMyDateModel;

 

    this.dadosAgendamento.IDCondominio = +localStorage.getItem("idCondominio");
    this.dadosAgendamento.IDProfissional = this.intIDProfissional;
    //this.dadosAgendamento.Data = this.form.controls["data"].value;
    this.dadosAgendamento.Hora = this.form.controls["horario"].value;

    

    this.pedidoAula.insert(this.dadosAgendamento)
    .subscribe(response => 
      { console.log(response) // Data which is returned by call
                  
     // document.getElementById('closeModal').click();
     // this.atualizaLista.emit('complete');
      //this.router.navigate(['/colaborador']);
      
      this.sharedService.smartMessageBox({
        title: "Confirmação",
        content: "<i class='fa fa-clock-o'></i> <i>Agendamento enviado com sucesso!! </i>  <p> Aguarde que : <b>"+ this.registros[0].Nome +"</b> irá entrar em contato!</p>",
        color: "green",
        buttons: '[OK]',
        iconSmall: "fa fa-check fa-2x fadeInRight animated",
        timeout: 4000
      });

      this.form.reset();  
  }, error => this.sharedService.erroNotification6Secounds(error));
   
 

      this.form.reset();  



   }

  ListDadosProfissional(strUserName: string): void {
    this.profissionalService.getProfissionalPorUser(strUserName)
         .subscribe(registros => {
          this.registros = registros
          this.intIDProfissional = this.registros[0].ID;
         }, error => this.sharedService.erroNotification6Secounds(error));
               
}  

}
