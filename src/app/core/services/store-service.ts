import { Injectable } from "@angular/core";
import * as ApplicationSettings from 'application-settings';
import * as localStroage from 'nativescript-localstorage';

import { AuthTerm } from "../enums";

@Injectable({
    providedIn: 'root'
  })

  export class StoreService {
    
    saveToken(data:any){
         let obj = JSON.parse(data);
         ApplicationSettings.setBoolean(AuthTerm.authenticated, true);
         ApplicationSettings.setString(AuthTerm.token,obj.auth_token);
         ApplicationSettings.setString(AuthTerm.userid,obj.id);
    }

    removeToken(){
        ApplicationSettings.setBoolean(AuthTerm.authenticated, false);
        ApplicationSettings.remove(AuthTerm.token);
        ApplicationSettings.remove(AuthTerm.userid);
    }

    getString(key:string):string{
        return  ApplicationSettings.getString(key,'');
    }

    getBoolean(key:string):boolean{
        return  ApplicationSettings.getBoolean(key,false);
    }

    setLocalStore(key:string,data:any){
        localStroage.setItem(key, data)
    }

    getLocalStore(key:string){
        return localStroage.getItem(key)
    }

    removeLocalStore(key:string){
        localStorage.removeItem(key);
    }

    clearLocalStore(){
        localStorage.clear();
    }
 }