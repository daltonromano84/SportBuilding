
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService} from './shared.service';
import { IEmail } from '../models/email.interface';

@Injectable()
export class EmailService {

  constructor(private http: Http,
   private sharedService: SharedService){}

   //apontando para WEB API + Controller
   url = this.sharedService.getMyApiUrl() + "api/Email/";

    //post - Envio basico
    enviaEmail(registro: IEmail) {       
      return this.http.post(this.url, registro)        
                     .catch(this.sharedService.handleErrorObservable);                            
    }
}
