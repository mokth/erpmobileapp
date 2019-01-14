import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import { APIService, UtilService } from '~/app/core/services';
import { NavigationService } from '~/app/core/services/navigation.service';
import { DataTable } from '~/app/core/enums';


@Component({
  selector: 'ns-customer-lookup',
  templateUrl: './customer-lookup.component.html',
  styleUrls: ['./customer-lookup.component.css'],
  moduleId: module.id,
})
export class CustomerLookupComponent implements OnInit  {
  
  iconval:string;
  search:string;
  searchstr:string;
  items:any;
  tempitems:any;
  selectedCode:string;
  selectedItem:any;
  isRefresh:boolean=false;
  isBusy:boolean=true;
  
  constructor(private serv:APIService,
              private utilser:UtilService,
              private navigationService: NavigationService) {
     }

  ngOnInit() {
    this.iconval = String.fromCharCode(0xe986);
    this.getCustomerList();
  }
    // ngAfterViewInit() {
   
  // }
  getCustomerList(){
    this.isRefresh=true;
    let data =this.utilser.getLocalStore(DataTable.customer);
    if (data){
      this.items = JSON.parse(data);
      this.tempitems = this.items;
      this.isBusy=false;
    }else {
      this.serv.getCustomer().subscribe(resp=>{
        this.items = resp;
        this.tempitems =resp;       
        this.utilser.setLocalStore(DataTable.customer,JSON.stringify(resp));
        this.isBusy=false;
      });           
    }  
    
  }
  
   onItemLoading(args: ListViewEventData){
    this.isRefresh=false;
    if (args.index % 2 === 0) {
       args.view.backgroundColor = new Color("#b3ecff");      
    }
 }

 onItemTap(item){
    //console.log(item);
    this.selectedCode= item.custCode;
    this.selectedItem = item;
    this.utilser.fireEvent(DataTable.customer,item);
    this.navigationService.backToPreviousPage();
  }

  onLongPress(item){
    console.log('long press...')
    this.selectedCode= item.custCode;
    this.selectedItem = item;
    this.utilser.fireEvent(DataTable.customer,item);
    this.navigationService.backToPreviousPage();
  }
    
  onSearchTap(e){
    const key =this.searchstr;
    console.log(key);
    this.items= this.tempitems.filter(item=>item.custCode.includes(key) ||
                            item.custName.includes(key) ||
                            item.address1.includes(key) ||
                            item.address2.includes(key) ||
                            item.address3.includes(key) ||
                            item.address4.includes(key) ||
                            item.city.includes(key) ||
                            item.state.includes(key) ||
                            item.postalCode.includes(key) ||
                            item.tel.includes(key) ||
                            item.fax.includes(key) ||
                            item.contactPerson.includes(key)
                    );
  }

  
}
