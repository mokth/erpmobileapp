import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { StoreService } from "./store-service";


@Injectable({
    providedIn: 'root'
  }) 
  export class UtilService {
    private selected$: BehaviorSubject<any> = new BehaviorSubject({});
    
    constructor(private store:StoreService) {        
    }

    getBehaviorSubject():BehaviorSubject<any>{
        return this.selected$;
    }

    fireEvent(type:string,item:any){
        this.selected$.next({
            "type":type,
            "data":item
        });
    }

    setLocalStore(key:string,data:any){
       this.store.setLocalStore(key, data)
    }

    getLocalStore(key:string){
        return this.store.getLocalStore(key)
    }
  }