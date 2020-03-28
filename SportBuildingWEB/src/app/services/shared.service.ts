import { Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationService } from 'app/shared/utils/notification.service';
import { IMyDpOptions } from 'mydatepicker';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { WINDOW } from './windowProvider.service';

//import { DatePipe } from '@angular/common';

declare var $ : any;

@Injectable()
export class SharedService {

    constructor (
        private notificationService: NotificationService,
        @Inject(WINDOW) private window: Window) {}

    getMyApiUrl(){

      if (this.window.location.hostname.indexOf("localhost") >= 0){ //Desenv
        return 'sportapi/';
      }else{
        if (this.window.location.hostname.indexOf("maquina07") >= 0){//Homolog
          return 'http://maquina07:8080/';
        }else{                                                      //Prod
          return 'http://maquinaProducao/';
        }       
      }
    }


    handleErrorObservable(error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.message || error);
    }
    
    //Formata data para salvar na base
    formatDate(date: any) {
      let dataTratada = "";
      if (date != null && date != ""){
        let stringToSplit = date;
        let x = stringToSplit.split("/");
        let day = x[0];
        let month = x[1];
        let year = x[2];
        let hAux: any;
        let hour = "";
        
        //Quando vem com a hora
        if (year.indexOf(":") > 0){
          hAux = x[2].split(" ");
          hour = hAux[1].trim();
          year = hAux[0].trim();
        }
        
        if (year.length == 4){
          dataTratada = year.trim() +"/"+ month.trim() +"/"+ day.trim() + " " + hour.trim();
        }else{
          dataTratada = date;
        }        

      }
        
       return dataTratada//new Date(dataTratada).toISOString();
    }
    //Formata data para exibir em tela
    // transform(value: string) {
    //     var datePipe = new DatePipe("en-US");
    //      value = datePipe.transform(value, 'dd/MM/yyyy');
    //      return value;
    //  }
    
     erroNotification6Secounds(error){
        var objErro: any;
        objErro = error.json();
    
        this.notificationService.bigBox({      
          title: " Tratamento de erros",
          content: objErro.ExceptionMessage || objErro.error_description || objErro.Message || "Erro - Este erro já está sendo analisado pela equipe de TI. Tente novamente em alguns minutos",      
          color: "#C46A69",
          icon: "fa fa-warning shake animated",
          number: "1",
          timeout: 6000
        });
      }

      erroNotificationString6Secounds(error){
        
        this.notificationService.bigBox({      
          title: "GLPI - Tratamento de erros",
          content: error,
          color: "#C46A69",
          icon: "fa fa-warning shake animated",
          number: "1",
          timeout: 6000
        });
      }


      smartMessageBox(data, cb?) {
        $.SmartMessageBox(data, cb)
      }

      smallBox(data, cb?) {
        $.smallBox(data, cb)
      }
    
      bigBox(data, cb?) {
        $.bigBox(data, cb)
      }
      
      getDataHoraAtual():string {

        var logData: Date = new Date();
        var strRetorno: string;

        strRetorno = logData.getFullYear() + "/" 
                            + (logData.getMonth()+1) + "/" 
                            + logData.getDate() + " "
                            + logData.getHours() + ":"
                            + logData.getMinutes() + ":"
                            + logData.getSeconds()
        
        return strRetorno;

      }

      public getMyDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        disableUntil: {year: +new Date().getFullYear(), month: +new Date().getMonth()+1, day: +new Date().getDate() },
        disableSince: {year: +new Date().getFullYear()+1, month: +new Date().getMonth()+1, day: +new Date().getDate() },
        dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
        monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' },
        todayBtnTxt: 'Hoje',
        sunHighlight: true
      };

      conditionalValidator(condition: (() => boolean), validator: ValidatorFn): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
          if (! condition()) {
            return null;
          }
          return validator(control);
        }
      }
      
      
}