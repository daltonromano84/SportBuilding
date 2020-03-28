
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { Injectable } from '@angular/core';
import { ILogAcesso } from 'app/models/logAcesso.interface';


@Injectable()
export class LogAcessoService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/LogAcesso";
  
     //get
     getAll(): Observable<ILogAcesso[]> {
      return this.http.get(this.url)
          .map(data => <ILogAcesso[]>data.json())
          .catch(this.sharedService.handleErrorObservable);
   }

    //post - incluir
    insert(registro: ILogAcesso) {       
      return this.http.post(this.url, registro)        
                     .catch(this.sharedService.handleErrorObservable);                            
    }

    //put -- alterar dados /api/loqAcesso/1    
    update(registro: ILogAcesso) {
      return this.http.put(this.url + `${registro.ID}`, registro)       
                          .catch(this.sharedService.handleErrorObservable);   
  }

  //delete -- deletar dados /api/loqAcesso/1
  delete(strIDRegistro: string) {
      return this.http.delete(this.url + `${strIDRegistro}`)       
                          .catch(this.sharedService.handleErrorObservable);   
  }

}

