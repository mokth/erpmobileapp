import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {debounceTime,distinctUntilChanged,switchMap } from 'rxjs/operators';

import { AuthService } from './auth-service';
import { APP_CONFIG } from '../../config/app-config.module';
import { AppConfig, DailyInput, DailyWorkOrder, 
         RefCode, CustProfileLight, ItemMaster, 
         SalesOder, GRNPOInfo, GRNPOItem, QtyBalance,
         GRNReceive, CycleCountItem,ProdDef,ProdDefDetail } 
         from '../model';
import { SQLService } from './sql-service';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  private _apiEndpoint:string;
  private _erpEndpoint:string;

  constructor(private http: HttpClient,
              private auth:AuthService,
              private sqlser:SQLService,
              @Inject(APP_CONFIG) private config: AppConfig) {
      //default endpoints;
      this._apiEndpoint= this.config.apiEndpoint;
      this._erpEndpoint= this.config.erpEndpoint;	                
      sqlser.getSettingPromise()
      .then(rows => { 
        if (rows) {
          this._apiEndpoint= rows[1];
          this._erpEndpoint= rows[2];				
          console.log("setting from database....")
        }
      })	             
  }

  getAuthHeader():HttpHeaders{
    let headers = new HttpHeaders()
     .set('Authorization', this.auth.tokenGetter());
     return headers
  }

  getERPURL():string{
    return this._erpEndpoint;//this.config.erpEndpoint;
  }

  getAPIURL():string{
    return this._apiEndpoint;// this.config.apiEndpoint;
  }

  getCustomer(): Observable<CustProfileLight> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/customer/"+userid;
    return this.http.get<CustProfileLight>(url,{headers:this.getAuthHeader()});
  }

  getItemMaster(): Observable<ItemMaster> {
    const url = this.getAPIURL() + "api/itemmaster";
    return this.http.get<ItemMaster>(url,{headers:this.getAuthHeader()});
  }

  searchitem(item: Observable<string>) {
    
    return item.pipe(
               debounceTime(400),
               distinctUntilChanged(),
               switchMap(term=>this.searchItemEntries(term))
               );
  }

  searchItemEntries(term) {
    // if(term==""){
    //   return null;
    // }
    let queryUrl: string = '?item='+term;
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/itemmaster/search"+queryUrl;
    console.log(url);
    return this.http.get<ItemMaster>(url,{headers:this.getAuthHeader()});
  }

  
  getItemBalance(icode:string): Observable<QtyBalance> {
    const url = this.getAPIURL() + "api/itemmaster/balance/"+icode;
    return this.http.get<QtyBalance>(url,{headers:this.getAuthHeader()});
  }

  // getProdDef(): Observable<ProdDef> {
  //   const url = this.getAPIURL() + "api/itemmaster/proddef";
  //   return this.http.get<ProdDef>(url,{headers:this.getAuthHeader()});
  // }

  getProdDefDetail(prodcode:string): Observable<ProdDefDetail> {
    const url = this.getAPIURL() + "api/proddef/prddefdetail/"+prodcode;
    return this.http.get<ProdDefDetail>(url,{headers:this.getAuthHeader()});
  }

  getProdDefination(prodcode:string): Observable<any> {
    const url = this.getAPIURL() + "api/proddef/defination/"+prodcode;
    return this.http.get<any>(url,{headers:this.getAuthHeader()});
  }

  searchPrdDef(item: Observable<string>) {
    
    return item.pipe(
               debounceTime(400),
               distinctUntilChanged(),
               switchMap(term=>this.searchProdDefEntries(term))
               );
  }

  searchProdDefEntries(term) {
    let queryUrl: string = '?prodcode='+term;
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/proddef/prddefsearch"+queryUrl;
    console.log(url);
    return this.http.get<ProdDef>(url,{headers:this.getAuthHeader()});
  }

  getSalesOrder(): Observable<SalesOder> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/salesorder/"+userid;
    return this.http.get<SalesOder>(url,{headers:this.getAuthHeader()});
  }

  getSalesOrderByKey(key:string): Observable<SalesOder> {
    let encodedkey = encodeURI(key);
    const url = this.getAPIURL() + "api/salesorder/order/"+encodedkey;
    return this.http.get<SalesOder>(url,{headers:this.getAuthHeader()});
  }
  
  postSaleOrder(order:SalesOder):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(order);
    const url = this.getAPIURL() + "api/salesorder/save/";
    return this.http.post(url, body, { headers: headers });
  }

  getDailyWorkOrders(): Observable<DailyWorkOrder> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/dailyprod";
    return this.http.get<DailyWorkOrder>(url,{headers:this.getAuthHeader()});
  }

  getProdRefCodes(): Observable<RefCode> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/dailyprod/refcode";
    return this.http.get<RefCode>(url,{headers:this.getAuthHeader()});
  }

  postDailyInput(daily:DailyInput):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(daily);
    const url = this.getAPIURL() + "api/dailyprod/create";
    return this.http.post(url, body, { headers: headers });
  }

  getGRNPOlist(): Observable<GRNPOInfo> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() + "api/grn/po";
    return this.http.get<GRNPOInfo>(url,{headers:this.getAuthHeader()});
  }

  getPOItems(pono:string,porel:string): Observable< GRNPOItem> {
    const userid =this.auth.getUserID();
    const url = this.getAPIURL() 
                + "api/grn/poitem?pono="+pono+"&porel="+porel;
    console.log(url);
    return this.http.get< GRNPOItem>(url,{headers:this.getAuthHeader()});
  }

  postGRNReceipt(grnrec:GRNReceive):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(grnrec);
    const url = this.getAPIURL() + "api/grn/receipt";
    return this.http.post(url, body, { headers: headers });
  }

  postIsCycleCountValid(item:CycleCountItem):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(item);
    const url = this.getAPIURL() + "api/cyclecount/check";
    return this.http.post(url, body, { headers: headers });
  }

  postIsCycleCountValidEx(item:CycleCountItem):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(item);
    const url = this.getAPIURL() + "api/cyclecount/check2";
    return this.http.post(url, body, { headers: headers });
  }

  putCycleCountItem(item:CycleCountItem):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(item);
    const url = this.getAPIURL() + "api/cyclecount/update";
    return this.http.put(url, body, { headers: headers });
  }

  putCycleCountItemEx(item:CycleCountItem):Observable<any>{
    let headers = new HttpHeaders()
    .set('Content-Type',"application/json")
    .set('Authorization', this.auth.tokenGetter());
    let body: string = JSON.stringify(item);
    const url = this.getAPIURL() + "api/cyclecount/update2";
    return this.http.put(url, body, { headers: headers });
  }
}
