
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { IProfissional } from '../models/profissional.interface';
import { IEmailResetSenha } from 'app/models/emailResetSenha.interface';
import { IBairro } from 'app/models/bairro.interface';

@Injectable()
export class BairroService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/Bairro/";

    
   //get
   getAll(): Observable<IBairro[]>{
     return this.http.get(this.url)
     .map(data => <IBairro[]>data.json())
     .catch(this.sharedService.handleErrorObservable);
   }

   getByID(intIDBairro: number): Observable<IBairro[]>{
      return this.http.get(this.url + intIDBairro)
      .map(data => <IBairro[]>data.json())
      .catch(this.sharedService.handleErrorObservable);
    }
  
 


}
