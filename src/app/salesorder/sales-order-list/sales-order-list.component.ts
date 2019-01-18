import { Component, OnInit } from '@angular/core';
import { UtilService, APIService } from '~/app/core/services';
import { NavigationService } from '~/app/core/services/navigation.service';
import { SalesOder } from '../../core/model/sales-order';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';


@Component({
  selector: 'ns-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css'],
  moduleId: module.id,
})
export class SalesOrderListComponent implements OnInit {

  orderlist:any;
  isBusy:boolean=true;
  iconAdd:string;
  iconHome:string;
  constructor(private serv:APIService,
              private utilser:UtilService,
              private navigationService: NavigationService) {
   }

  ngOnInit() {
    this.iconAdd = String.fromCharCode(0xf055);
    this.iconHome = String.fromCharCode(0xf015);
    
    this.serv.getSalesOrder().subscribe(resp=>{
      this.orderlist = resp;     
      this.isBusy=false;
    });   
  }
  
  onItemLoading(args: ListViewEventData){
    if (args.index % 2 === 0) {
       args.view.backgroundColor = new Color("#F4F6F6");      
    }
  }

  onItemTap(item){
    const sono = item.sono+"@"+item.custrel;
    this.navigationService.navigate(['/sales',sono],{clearHistory:true});
  }

  OnAddItem(){
    this.navigationService.navigate(['/sales'],{clearHistory:true});
  }

  onBack(e){
    console.log('back to saleslist');
     this.navigationService.navigate(['/main'],{clearHistory:true});
     //this.navigationService.back();
  }
}
