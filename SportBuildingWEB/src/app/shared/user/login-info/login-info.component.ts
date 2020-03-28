import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {LayoutService} from "../../layout/layout.service";
import { ProfissionalService } from 'app/services/profissional.service';
import { SharedService } from 'app/services/shared.service';

import { IProfissional } from 'app/models/profissional.interface';

@Component({

  selector: 'sa-login-info',
  templateUrl: './login-info.component.html',
})
export class LoginInfoComponent implements OnInit {

  usuarioLogado: IProfissional[] = [];

  constructor(private layoutService: LayoutService,       
              private usuarioService: ProfissionalService,
              private sharedService: SharedService,) {
  }

  ngOnInit() {
    // this.getUsuarioLogado();    

  }

  getUsuarioLogado(): void {

    //Se o user estiver sessionado busca demais dados do mesmo
    if (localStorage.getItem("userName") != null){      
      this.usuarioService.getLoginInfo()
        .subscribe(registro => {
            //Seta variavel utilizada para apresentar no log info do header do site
            this.usuarioLogado = registro              
        }, error => this.sharedService.erroNotification6Secounds(error));    

    }

  let objDadoUser: any;
  if (localStorage.getItem("usuarioLogadoDados") != null){
    objDadoUser = localStorage.getItem("usuarioLogadoDados");
    var objDadoUserAux = JSON.parse(objDadoUser);

   // this.strUsuarioLogadoNome = objDadoUserAux.Nome;
    
  }
  
  }

  toggleShortcut() {
    this.layoutService.onShortcutToggle()
  }

}
