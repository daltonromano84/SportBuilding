
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { IEmailResetSenha } from 'app/models/emailResetSenha.interface';
import { ICondominio } from 'app/models/condominio.interface';

@Injectable()
export class CondominioService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/Condominio/";

    

   //get
   getAll(): Observable<ICondominio[]>{
     return this.http.get(this.url)
     .map(data => <ICondominio[]>data.json())
     .catch(this.sharedService.handleErrorObservable);
   }

   getByID(intIDCondominio: number): Observable<ICondominio[]>{
      return this.http.get(this.url + intIDCondominio)
      .map(data => <ICondominio[]>data.json())
      .catch(this.sharedService.handleErrorObservable);
    }
  
 

    //post - incluir
    insert(registro: ICondominio) { 
            
      return this.http.post(this.url, registro)        
                     .catch(this.sharedService.handleErrorObservable);                            
    }

    //post - incluir dados api/Colaborador/CriaPerfilTodosColaboradores
    insertPerfilColaborador() {       
      return this.http.post(this.url + `CriaPerfilTodosColaboradores`,'')        
                     .catch(this.sharedService.handleErrorObservable);                            
    }

    //put -- alterar dados api/Colaborador/5   
    update(registro: ICondominio) {
      return this.http.put(this.url + `/${registro.ID}`, registro)       
                    .catch(this.sharedService.handleErrorObservable);   
    }

    //put -- alterar dados api/Colaborador/PutColaboradorAlteraSenha 
    updateSenhaColaborador(registro: ICondominio) {
      return this.http.put(this.url + `PutColaboradorAlteraSenha`, registro)       
                    .catch(this.sharedService.handleErrorObservable);   
    }

    //put --resetar senha api /Colaborador/PutColaboradorRedefinirSenha?strUserName={strUserName}&strEmail={strEmail}
    resetPassword(registro: IEmailResetSenha){
      return this.http.put(this.url + 'PutColaboradorRedefinirSenha', registro)       
                      .catch(this.sharedService.handleErrorObservable);
    }
    
     //delete -- deletar dados /api/usuario/1
     delete(strIDRegistro: string) {
      return this.http.delete(this.url + `/${strIDRegistro}`)       
                       .catch(this.sharedService.handleErrorObservable); 

     }

    getLoginInfo():Observable<ICondominio[]> {
      return this.http.get(this.url + '?strUserName=' + localStorage.getItem("userName"))
                  .map(data => <ICondominio[]>data.json())
                  .catch(this.sharedService.handleErrorObservable);        
                              
    }

    getCondominioPorUser(strUserName:string):Observable<ICondominio[]> {
      return this.http.get(this.url + '?strUserName=' +strUserName)
                  .map(data => <ICondominio[]>data.json())
                  .catch(this.sharedService.handleErrorObservable);        
                              
    }

    

}
