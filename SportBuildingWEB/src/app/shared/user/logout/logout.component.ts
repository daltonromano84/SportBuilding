import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";

declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
<div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
        <span> <a routerlink="/auth/login" title="Sair" data-action="userLogout"
                  data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i
          class="fa fa-sign-out"></i></a> </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService) { }

  showPopup(){
    this.notificationService.smartMessageBox({
      title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> De Saída <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : "Desta forma você aumenta ainda mais sua segurança após a saída, ao invés de simplesmenta fechar o navegador",
      buttons : '[Não][Sim]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Sim") {
        this.logout()
      }
    });
  }

  logout(){

      //Limpa Session local referente as credenciais de acesso 
      localStorage.clear();

      this.router.navigate(['/auth/login'])
  }

  ngOnInit() {

  }



}
