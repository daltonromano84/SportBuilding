
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

@Injectable()
export class ProfissionalService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/Profissional/";

    

   //get
   getAll(): Observable<IProfissional[]>{
     return this.http.get(this.url)
     .map(data => <IProfissional[]>data.json())
     .catch(this.sharedService.handleErrorObservable);
   }

   getByID(intIDColaborador: number): Observable<IProfissional[]>{
      return this.http.get(this.url + intIDColaborador)
      .map(data => <IProfissional[]>data.json())
      .catch(this.sharedService.handleErrorObservable);
    }
  
 

    //post - incluir
    insert(registro: IProfissional) { 
            
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

    getLoginInfo():Observable<IProfissional[]> {
      return this.http.get(this.url + '?strUserName=' + localStorage.getItem("userName"))
                  .map(data => <IProfissional[]>data.json())
                  .catch(this.sharedService.handleErrorObservable);        
                              
    }

    getProfissionalPorUser(strUserName:string):Observable<IProfissional[]> {
      return this.http.get(this.url + '?strUserName=' +strUserName)
                  .map(data => <IProfissional[]>data.json())
                  .catch(this.sharedService.handleErrorObservable);        
                              
    }

    getMediaNotaPorProfissional(intIdProfisisonal:number): Observable<any[]> {
      return this.http.get(this.url + 'MediaNota?IdProfissional='+ intIdProfisisonal)
          .map(data => <any[]>data.json())
          .catch(this.sharedService.handleErrorObservable);
   }

   getProfissionaisPorBairroEspecialidade(intIdEspecialidade: number,intIdBairro: number): Observable<IProfissionalLista[]> {
    return this.http.get(this.url + 'ProfissionaisPorEspecialidadeBairro?IdEspecialidade=' + intIdEspecialidade + '&idBairro=' + intIdBairro)
        .map(data => <IProfissionalLista[]>data.json())
        .catch(this.sharedService.handleErrorObservable);
 }
   

}
