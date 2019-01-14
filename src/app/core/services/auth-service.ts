import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import * as ApplicationSettings from 'application-settings';

import { APP_CONFIG } from "~/app/config/app-config.module";
import { AppConfig, UserInfo } from "../model";
import { StoreService } from "./store-service";
import { AuthTerm } from "../enums";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
  
    constructor(private http: HttpClient,
                private store:StoreService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    signIn(user: UserInfo): Observable<any> {
        const url = this.config.apiEndpoint + "api/auth/jwt1";
        console.log(url);
        const headers = new HttpHeaders()
          .set('Content-Type', "application/json")
        const body: string = JSON.stringify(user);
        return this.http.post(url, body, { headers: headers });
    }

    signOut(){
        this.store.removeToken(); 
        this.store.clearLocalStore();
    }

    saveToken(data:any){
        this.store.saveToken(data);       
    }
    
    removeToken(){
        this.store.removeToken();        
    }
    
    tokenGetter() {
        let jsonString = this.store.getString(AuthTerm.token);
        if (jsonString){
            //let authobj = JSON.parse(jsonString);
            let token ="Bearer "+ jsonString;
           // console.log(token);
            return token;
        }
        return "";
    }

    isAuthenticated():boolean{
      return this.store.getBoolean(AuthTerm.authenticated);
    }

    getUserID():string{
        return this.store.getString(AuthTerm.userid);
      }
}