import { Component, OnInit, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';

declare var $ : any;
import 'datatables.net';
import 'datatables.net-bs4';
import { FadeInTop } from 'app/shared/animations/fade-in-top.decorator';
import { IProfissional } from 'app/models/profissional.interface';
import { SharedService } from 'app/services/shared.service';
import { ProfissionalPerfilComponent } from '../profissional-perfil/profissional-perfil.component';
import { IProfissionalLista } from 'app/models/profissionalLista.interface';
import { ProfissionalService } from 'app/services/profissional.service';
import { Router } from '@angular/router';


@FadeInTop()

@Component({
  selector: 'app-profissional-lista',
  templateUrl: './profissional-lista.component.html',
  styleUrls: ['./profissional-lista.component.css']
})
export class ProfissionalListaComponent implements OnInit {

  @ViewChild(ProfissionalPerfilComponent) perfil: ProfissionalPerfilComponent;

  atualizaDados = new EventEmitter<string>();
  
  registros: IProfissionalLista[] = [];
  registroEntrada: IProfissionalLista;

  constructor(private router: Router,
    private profissionalService: ProfissionalService,
    private changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedService) { }

  ngOnInit() {


    
    if (localStorage.getItem("regFiltroSelecionado") != undefined){

      var strAuxAval: any = localStorage.getItem("regFiltroSelecionado");
      strAuxAval = JSON.parse(strAuxAval);
      this.registroEntrada = strAuxAval;

      this.listAvaliacaoColaboradorPorGestorUsuario(this.registroEntrada.IDEspecialidade,this.registroEntrada.IDBairro);

   
    }


  }

  listAvaliacaoColaboradorPorGestorUsuario(intIdEspecialidade: number,intIdBairro: number): void{
    this.profissionalService.getProfissionaisPorBairroEspecialidade(intIdEspecialidade,intIdBairro)
        .subscribe(registros => {
          this.registros = registros

         
  
        }, error => this.sharedService.erroNotification6Secounds(error)); 
  }

  onSelectItem(registro: IProfissionalLista) {
   // this.perfil.AbrirPerfil(registro);
   localStorage.setItem("regPerfilSelecionado", JSON.stringify(registro));
   this.router.navigate(['profissional/perfil'])

   

}
}
