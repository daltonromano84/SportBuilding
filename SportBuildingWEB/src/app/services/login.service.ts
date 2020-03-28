import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { SharedService } from './shared.service';

@Injectable()
export class LoginService {

    public token: string;
    public validatedUser: any;
    public res: any;
        
  constructor(private http: Http, 
              private sharedService: SharedService) {

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;

    }
    
    //apontando para a WEB API + Controller
    url = this.sharedService.getMyApiUrl() + "Token";
    
     //post - Solicitar Token by Post
    autenticar(strUsuario: string, strPassword: string) {       
        
        let body = 'grant_type=password&userName=' + `${strUsuario}`+ '&password=' + `${strPassword}` ;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.url, body, options)
                        .map((res: Response) => {                            
                            if (res.status == 200) {
                                this.validatedUser = res.json();
                                localStorage.setItem("access_token", this.validatedUser.access_token); 
                                localStorage.setItem("token_type", this.validatedUser.token_type); 
                                localStorage.setItem("expires_in", this.validatedUser.expires_in);   
                                localStorage.setItem("userName", this.validatedUser.userName);   
                                localStorage.setItem("issued", this.validatedUser.issued);   
                                localStorage.setItem("expires", this.validatedUser.expires);
                                localStorage.setItem('tempoSessao', '0');
                                return true;
                            }else{
                                return false;
                            }    
                        })
                        .catch(this.sharedService.handleErrorObservable); 
         
    }
          
}
