import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/services/shared.service';
import { ProfissionalService } from 'app/services/profissional.service';
import { IProfissional } from 'app/models/profissional.interface';
import { IProfissionalLista } from 'app/models/profissionalLista.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profissional-perfil',
  templateUrl: './profissional-perfil.component.html',
  styleUrls: ['./profissional-perfil.component.css']
})
export class ProfissionalPerfilComponent implements OnInit {

  registros: IProfissional[] = [];

  registroEntrada: IProfissionalLista;
  intNota:number = 0;
  strSexo:string = "";
  isAgenda:boolean=false;

  constructor( private router: Router,
    private sharedService:SharedService ,
                private profissionalService:ProfissionalService ) { }

  ngOnInit() {

    if (localStorage.getItem("regPerfilSelecionado") != undefined){

      var strAuxAval: any = localStorage.getItem("regPerfilSelecionado");
      strAuxAval = JSON.parse(strAuxAval);
      this.registroEntrada = strAuxAval;

      this.ListDadosProfissional(this.registroEntrada.UserName);

      this.MediaNota(this.registroEntrada.IDProfissional);

      this.isAgenda=false;
    }
    else{

      this.ListDadosProfissional(localStorage.getItem("userName"));

      this.MediaNota(+localStorage.getItem("idProfissional"));

      this.isAgenda=true;

    }

  
   
  }

  ListDadosProfissional(strUserName: string): void {
    this.profissionalService.getProfissionalPorUser(strUserName)
         .subscribe(registros => {
          this.registros = registros;
          this.strSexo = this.registros[0].Sexo;

         }, error => this.sharedService.erroNotification6Secounds(error));
               
}  

MediaNota(intIdProfissional: number): void {
  this.profissionalService.getMediaNotaPorProfissional(intIdProfissional)
       .subscribe(registros => {
        this.intNota = registros[0].MediaNota
        //console.log(this.intNota);
       }, error => this.sharedService.erroNotification6Secounds(error));
      }


      AbrirPerfil(registros:IProfissionalLista){

        this.ListDadosProfissional(registros.UserName);
        
      }


      onAgendar(registro: IProfissionalLista) {
        // this.perfil.AbrirPerfil(registro);
        localStorage.setItem("regPerfilAgendarSelecionado", JSON.stringify(registro));
        this.router.navigate(['aulaPedido/agendar'])

}

onVerAgenda(registro: IProfissionalLista) {
  // this.perfil.AbrirPerfil(registro);
  localStorage.setItem("regIDProfissional", JSON.stringify(registro.ID)); 
  this.router.navigate(['profissional/agenda'])

}

}
