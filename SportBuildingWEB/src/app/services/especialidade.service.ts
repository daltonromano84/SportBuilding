
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { IProfissional } from '../models/profissional.interface';
import { IEmailResetSenha } from 'app/models/emailResetSenha.interface';

import { IEspecialidade } from 'app/models/especialidade.interface';

@Injectable()
export class EspecialidadeService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/Especialidade/";

    
   //get
   getAll(): Observable<IEspecialidade[]>{
     return this.http.get(this.url)
     .map(data => <IEspecialidade[]>data.json())
     .catch(this.sharedService.handleErrorObservable);
   }

   getByID(intIDEspecialidade: number): Observable<IEspecialidade[]>{
      return this.http.get(this.url + intIDEspecialidade)
      .map(data => <IEspecialidade[]>data.json())
      .catch(this.sharedService.handleErrorObservable);
    }
  
 


}
