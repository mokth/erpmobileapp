import { Subscription, Observable } from 'rxjs';

import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UtilService, APIService } from '../../core/services';
//import { NavigationService } from '~/app/core/services/navigation.service';
//import { SalesOder } from '../../core/model/sales-order';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import { NavigationService } from "../../core/services/navigation.service";
import * as application from 'tns-core-modules/application';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { SalesOder } from '../../core/model';
// import { ListViewEventData } from "nativescript-ui-listview";
// import { registerElement } from "nativescript-angular/element-registry";
// registerElement("pullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@Component({
  selector: 'ns-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css'],
  moduleId: module.id.toString(),
})
export class SalesOrderListComponent implements OnInit, OnDestroy {
 

  orderlist:ObservableArray<SalesOder> =new ObservableArray<SalesOder>();;
  isBusy:boolean=true;
  iconAdd:string;
  iconHome:string;
  sub$:Subscription;
  constructor(private serv:APIService,
              private _changeDetectionRef: ChangeDetectorRef,
              private navigationService: NavigationService) {    
   }

  ngOnInit() {
    this._changeDetectionRef.detectChanges();
    this.iconAdd = String.fromCharCode(0xf055);
    this.iconHome = String.fromCharCode(0xf015);
    
    this.sub$=this.serv.getSalesOrder().subscribe((resp:any)=>{
        resp.forEach((item:SalesOder)=>this.orderlist.push(item));
        this.isBusy=false;
       // console.log(this.orderlist.length);
    });   

    if (application.android) {
      application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
         args.cancel = true;
      });
    }
  }

  public get dataItems(): ObservableArray<SalesOder> {
    return this.orderlist;
}
   
  ngOnDestroy(): void {
     this.sub$.unsubscribe();
  }


  refreshList(args: ListViewEventData) {
    this.isBusy=false;
    const listView = args.object;
    if (this.sub$!=null){
      this.sub$.unsubscribe();
      //console.log('this.sub$.unsubscribe()');
    }    
	  this.sub$=this.serv.getSalesOrder().subscribe((resp:any)=>{
        this.orderlist = new ObservableArray<SalesOder>();
        resp.forEach((item:SalesOder)=>this.orderlist.push(item));
        this.isBusy=false;
        listView.notifyPullToRefreshFinished();
    });   

	}
  
  onItemLoading(args: ListViewEventData){
    if (args.index % 2 === 0) {
       args.view.backgroundColor = new Color("#F4F6F6");      
    }
  }

  onItemTap(item){
    const sono = item.sono+"@"+item.custrel;
    this.navigationService.navigate(['/saleslist/sales',sono],{clearHistory:true});
  }

  OnAddItem(e){
    this.navigationService.navigate(['/saleslist/sales','new'],{clearHistory:true});
  }

  onBack(e){
    console.log('back to saleslist');
     this.navigationService.navigate(['/main'],{clearHistory:true});
     //this.navigationService.back();
  }
}
