import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProfissionalService } from 'app/services/profissional.service';
import { SharedService } from 'app/services/shared.service';
import { PedidoAulaService } from 'app/services/pedidoAula.service';
import { IPedidoAula } from 'app/models/pedidoAula.interface';

@Component({
  selector: 'app-profissional-agenda',
  templateUrl: './profissional-agenda.component.html',
  styleUrls: ['./profissional-agenda.component.css']
})
export class ProfissionalAgendaComponent implements OnInit {

  registros: IPedidoAula[] = [];
 // registroEntrada: IProfissionalLista;

  constructor(private router: Router,
    private profissionalService: ProfissionalService,
    private pedidoAulaService: PedidoAulaService,    
    private changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedService) { }

  ngOnInit() {

   if(localStorage.getItem("regIDProfissional")!= undefined){

    this.listAgendaPorProfissional(+localStorage.getItem("regIDProfissional"))
   }
  }


  
  listAgendaPorProfissional(intIdProfissional: number): void{
    this.pedidoAulaService.getAgendaAulasPorIdProfissional(intIdProfissional)
        .subscribe(registros => {
          this.registros = registros

         
  
        }, error => this.sharedService.erroNotification6Secounds(error)); 
  }

}
