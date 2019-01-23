import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '../../config/app-config.module';
import { AppConfig } from '../model/app-config.model';

import { CustProfileLight, ItemMaster, SalesOder } from '../model';
import { AuthService } from './auth-service';
import { DailyWorkOrder } from '../model/dailly-work-order';
import { DailyInput } from '../model/daily-input';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient,
              private auth:AuthService,
              @Inject(APP_CONFIG) private config: AppConfig) {

  }

  getAuthHeader():HttpHeaders{
    let headers = new HttpHeaders()
     .set('Authorization', this.auth.tokenGetter());
     return headers
  }

  getCustomer(): Observable<CustProfileLight> {
    const userid =this.auth.getUserID();
    const url = this.config.apiEndpoint + "api/customer/"+userid;
    return this.http.get<CustProfileLight>(url,{headers:this.getAuthHeader()});
  }

  getItemMaster(): Observable<ItemMaster> {
    const url = this.config.apiEndpoint + "api/itemmaster";
    return this.http.get<ItemMaster>(url,{headers:this.getAuthHeader()});
  }

  getSalesOrder(): Observable<SalesOder> {
    const userid =this.auth.getUserID();
    const url = this.config.apiEndpoint + "api/salesorder/"+userid;
    return this.http.get<SalesOder>(url,{headers:this.getAuthHeader()});
  }

  getSalesOrderByKey(key:string): Observable<SalesOder> {
    let encodedkey = encodeURI(key);
    const url = this.config.apiEndpoint + "api/salesorder/order/"+encodedkey;
    return this.http.get<SalesOder>(url,{headers:this.getAuthHeader()});
  }
  
  postSaleOrder(order:SalesOder):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(order);
    const url = this.config.apiEndpoint + "api/salesorder/save/";
    return this.http.post(url, body, { headers: headers });
  }

  getDailyWorkOrders(): Observable<DailyWorkOrder> {
    const userid =this.auth.getUserID();
    const url = this.config.apiEndpoint + "api/dailyprod";
    return this.http.get<DailyWorkOrder>(url,{headers:this.getAuthHeader()});
  }

  postDailyInput(daily:DailyInput):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(daily);
    const url = this.config.apiEndpoint + "api/dailyprod/create";
    return this.http.post(url, body, { headers: headers });
  }
}
