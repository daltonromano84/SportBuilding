
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { IProfissional } from '../models/profissional.interface';
import { IEmailResetSenha } from 'app/models/emailResetSenha.interface';
import { IProfissionalLista } from 'app/models/profissionalLista.interface';
import { IPedidoAula } from 'app/models/pedidoAula.interface';

@Injectable()
export class PedidoAulaService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/PedidoAula/";

    

   //get
   getAll(): Observable<IPedidoAula[]>{
     return this.http.get(this.url)
     .map(data => <IPedidoAula[]>data.json())
     .catch(this.sharedService.handleErrorObservable);
   }

   getByID(intIDColaborador: number): Observable<IPedidoAula[]>{
      return this.http.get(this.url + intIDColaborador)
      .map(data => <IPedidoAula[]>data.json())
      .catch(this.sharedService.handleErrorObservable);
    }

    getAgendaAulasPorIdProfissional(intIdProfisisonal:number): Observable<IPedidoAula[]> {
      return this.http.get(this.url + 'PedidoAulaPorProfissional?IdProfissional='+ intIdProfisisonal)
          .map(data => <IPedidoAula[]>data.json())
          .catch(this.sharedService.handleErrorObservable);
   }
  
 

    //post - incluir
    insert(registro: IPedidoAula) { 
            
      return this.http.post(this.url, registro)        
                     .catch(this.sharedService.handleErrorObservable);                            
    }

    //post - incluir dados api/Colaborador/CriaPerfilTodosColaboradores
    insertPerfilColaborador() {       
      return this.http.post(this.url + `CriaPerfilTodosColaboradores`,'')        
                     .catch(this.sharedService.handleErrorObservable);                            
    }

    //put -- alterar dados api/Colaborador/5   
    update(registro: IProfissional) {
      return this.http.put(this.url + `/${registro.ID}`, registro)       
                    .catch(this.sharedService.handleErrorObservable);   
    }

    //put -- alterar dados api/Colaborador/PutColaboradorAlteraSenha 
    updateSenhaColaborador(registro: IProfissional) {
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


   

}
