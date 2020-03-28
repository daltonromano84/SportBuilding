import {Component, OnInit, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import { IProfissional } from 'app/models/profissional.interface';
import { SharedService } from 'app/services/shared.service';

declare var $: any;

@Component({
  selector: 'sa-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @HostListener('document:mousemove', ['$event']) 
  onMouseMove() {
     this.tempoSessao = 0
      localStorage.setItem('tempoSessao', '0')
  }

  usuarioLogado: IProfissional = <IProfissional>{};
  tempoSessao: number;

  constructor(private router: Router,
    private sharedService: SharedService) {
  }

  ngOnInit() {
      
       //Valida  o Tempo incrementando o valor a cada 1 minuto, caso chegue a 20 sem atividade será eliminada
       var idleInterval = setInterval(this.ValidaTempo, 60000); // 60000 =  1 minuto
        
        //Se o user estiver sessionado busca demais dados do mesmo
        if (localStorage.getItem("userName") != null){         
          
          var strAux: any = localStorage.getItem("usuarioLogadoDados");
          strAux = JSON.parse(strAux);
          this.usuarioLogado = strAux;
          
        }  else{
          this.router.navigate(['/auth/login']);
        }

  }

  //Função que acrescenta ao contador a cada minuto sem atividade e eliminando a local storage.
ValidaTempo() {

  
  this.tempoSessao = parseInt(localStorage.getItem('tempoSessao'))

  //Acrescenta cada minuto sem atividade
  this.tempoSessao = this.tempoSessao + 1;
  
  localStorage.setItem('tempoSessao', `${this.tempoSessao}`) 

  //Caso o tempo seja maior que 19 minutos ele encerra a sessão 
  if (this.tempoSessao > 19){ 

      //Remove o userName do usuário logado
      localStorage.removeItem('userName'); 
      //Zera o tempo da sessão para iniciar uma nova contagem
      localStorage.setItem('tempoSessao', '0');
      //redireciona para teal de login
      $(window.document.location).attr('href', ['']);
      return false;  
  }

}


  onAlteraSenha() {  
    this.router.navigate(['/auth/alteraSenha']);
   
  }

  searchMobileActive = false;

  toggleSearchMobile(){
    this.searchMobileActive = !this.searchMobileActive;

    $('body').toggleClass('search-mobile', this.searchMobileActive);
  }

  onSubmit() {
    this.router.navigate(['/miscellaneous/search']);

  }
}
