import {Component, OnInit} from '@angular/core';
import {LoginInfoComponent} from "../../user/login-info/login-info.component";
import { IProfissional } from 'app/models/profissional.interface';
import { EventEmitter } from 'events';
import { ProfissionalService } from 'app/services/profissional.service';
import { SharedService } from 'app/services/shared.service';
import { find } from 'rxjs/operators';

@Component({

  selector: 'sa-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  usuarioLogado: IProfissional[] = []; 

  mostrarMenuProfissional: boolean = false;
  mostrarMenuGestor: boolean = false;
  mostrarMenuOuvidoria:boolean = false;

  constructor(private usuarioService: ProfissionalService,
              private sharedService: SharedService,) {
  }

  ngOnInit() {
    this.getUsuarioLogado();
  }

  getUsuarioLogado(): void {
    
    //Se o user estiver sessionado busca demais dados do mesmo
    if (localStorage.getItem("userName") != null){      
      this.usuarioService.getLoginInfo()
        .subscribe(registros => {
           //Verifica perfil do usuário para acesso ao menu
           registros[0].Roles.indexOf('Profissional') != -1 ? this.mostrarMenuProfissional = true : this.mostrarMenuProfissional = false
           registros[0].Roles.indexOf('Gestor') != -1 ?  this.mostrarMenuGestor = true : this.mostrarMenuGestor = false
           registros[0].Roles.indexOf("Ouvidoria")!=-1? this.mostrarMenuOuvidoria = true: this.mostrarMenuOuvidoria = false
           
        }, error => this.sharedService.erroNotification6Secounds(error));    
    }
    
  }
}