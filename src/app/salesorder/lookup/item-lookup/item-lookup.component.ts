import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ListViewEventData } from 'nativescript-ui-listview';
import { Color } from 'tns-core-modules/color/color';
import { APIService, UtilService } from '~/app/core/services';
import { NavigationService } from '~/app/core/services/navigation.service';
import { DataTable } from '~/app/core/enums';


@Component({
  selector: 'ns-item-lookup',
  templateUrl: './item-lookup.component.html',
  styleUrls: ['./item-lookup.component.css'],
  moduleId: module.id,
})
export class ItemLookupComponent implements OnInit {

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
    this.getItemMaster();
  }
    // ngAfterViewInit() {
   
  // }
  getItemMaster(){
    this.isRefresh=true;
    let data =this.utilser.getLocalStore(DataTable.masteritem);
    if (data){
      this.items = JSON.parse(data);
      this.tempitems = this.items;
      this.isBusy=false;
    }else {
        this.serv.getItemMaster().subscribe(resp=>{
            this.items = resp;
            this.tempitems =resp;       
            this.utilser.setLocalStore(DataTable.masteritem,JSON.stringify(resp));
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
    this.selectedCode= item.iCode;
    this.selectedItem = item;
    this.utilser.fireEvent(DataTable.masteritem,item);
    this.navigationService.backToPreviousPage();
  }

  onLongPress(item){
    console.log('long press...')
    this.selectedCode= item.iCode;
    this.selectedItem = item;
    this.utilser.fireEvent(DataTable.masteritem,item);
    this.navigationService.backToPreviousPage();
  }
    
  onSearchTap(e){
    const key =this.searchstr;
    console.log(key);
    this.items= this.tempitems.filter(item=>item.iCode.includes(key) ||
                            item.iDesc.includes(key) ||
                            item.iType.includes(key) ||
                            item.iClass.includes(key) ||
                            item.iSubClass.includes(key) ||
                            item.sellingUOM.includes(key)
                    );
   }

  

}
