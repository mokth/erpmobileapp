import { Component, OnInit, OnDestroy } from '@angular/core';
import * as ModalPicker from 'nativescript-modal-datetimepicker';
import { ListViewEventData } from 'nativescript-ui-listview';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { SnackBar } from "nativescript-snackbar";
import { Color } from 'tns-core-modules/color/color';
import {BarcodeScanner} from 'nativescript-barcodescanner';

import { itemCode } from './item-code';
import { NavigationService } from '~/app/core/services/navigation.service';
import { UtilService, APIService } from '~/app/core/services';
import { CustProfileLight } from '../../../../platforms/android/app/src/main/assets/app/app/core/model/customer';
import { ItemMaster } from '../../../../platforms/android/app/src/main/assets/app/app/core/model/item-master';
import { SalesOder, SOItem } from '~/app/core/model';
import { ActivatedRoute } from '@angular/router';
import { DataTable } from '~/app/core/enums';

@Component({
  selector: 'ns-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrls: ['./sales-order.component.css'],
  moduleId: module.id,
})
export class SalesOrderComponent implements OnInit,OnDestroy {
  customer:CustProfileLight;
  itemMaster:ItemMaster;
  order:SalesOder;
  soitem:SOItem;
  sodate:any;
  fd_icode:string="";
  fd_qty:number=0;
  fd_price:number=0.00;

  items:SOItem[];

  iconSpin:string;
  iconAdd:string;
  iconRemove:string;
  iconCalender:string;
  iconEdit:string;
  iconQR:string;

  selectedCust$:BehaviorSubject<any>;
  custSubscription: Subscription;

  ttlQty:number;
  ttlAmt:number;

  isControlEnable:boolean=true;
  isEditMode:boolean;
  editedItem:SOItem;
  editmode:string="New";
  _sono:string;
  _sorel:string;

  private _dataItems: ObservableArray<itemCode>;

   constructor( private navigationService: NavigationService,
                private utilserv:UtilService,
                private activatedRoute: ActivatedRoute,
                private serv:APIService,
                private barcodeScanner: BarcodeScanner   ) {
      this.order = new SalesOder();
      this.order.items =[];  
      this.soitem = new SOItem();    
      this.items=[];            
   }

  ngOnInit() {
    this.ttlAmt=0;
    this.ttlQty=0;
    this.setIConCode();    
    this.activatedRoute.params.subscribe(params => {
      const sono = params['sono'];
      if (sono) {
         console.log('param '+sono);
         let keys= (sono+"").split('@');
         if (keys.length==2){
             this._sono=keys[0];
             this._sorel=keys[1];
             this.editmode="Edit";
             this.isControlEnable=false;
             this.loadSalesOrder();
         }
      }
    });
    
    this.selectedCust$=this.utilserv.getBehaviorSubject();
    this.custSubscription= this.selectedCust$.subscribe(resp=>{
        if (resp.type==DataTable.customer){
            this.order.custname= resp.data.custName;
            this.customer= resp.data;
        }else if (resp.type==DataTable.masteritem){
            //this.itemcode= resp.data.iCode;
            this.itemMaster= resp.data;
            this.setItemDetail();
        }
    });
  }
  
  onItemLoading(args: ListViewEventData){
    if (args.index % 2 === 0) {
       args.view.backgroundColor = new Color("#F4F6F6");      
    }
  }

  loadSalesOrder(){
    this.serv.getSalesOrderByKey(this._sono+'@'+this._sorel)
        .subscribe(resp=>{
          if (resp){
             this.order = resp;
             this.items = this.order.items;
          }
        });
  }

  setIConCode(){
    this.iconSpin = String.fromCharCode(0xf150);
    this.iconAdd = String.fromCharCode(0xf055);
    this.iconRemove = String.fromCharCode(0xf057);
    this.iconCalender= String.fromCharCode(0xf133);
    this.iconEdit= String.fromCharCode(0xf14b);
    this.iconQR= String.fromCharCode(0xf029);
    
  }

  setItemDetail(){
    this.fd_icode= this.itemMaster.iCode;
    this.fd_price= this.itemMaster.sellingPrice;    
  }

  ngOnDestroy() {
    this.custSubscription.unsubscribe();
  }

  get dataItems(): ObservableArray<itemCode> {
    this._dataItems = new ObservableArray(this.items);
    return this._dataItems;
 }
   
  pickDate() {
    const picker = new ModalPicker.ModalDatetimepicker();
    picker.pickDate({
      theme: 'dark',
      //maxDate: new Date(),
      is24HourView: false
    }).then((result) => {
      console.log(result);
      this.order.sodate = this.getSoDate(result);
    }).catch((error) => {
      console.log('Error: ' + error);
    });
  }

  getSoDate(result:any){
    return new Date(result['year'],result['month']-1,result['day']);    
  }

  OnCustomerTap(){
     this.navigationService.navigate(['/lookcust']);
  }

  onItemTap(e){
    this.navigationService.navigate(['/lookitem']);
  }

  onScannerTap(e){
    this.barcodeScanner.hasCameraPermission().then(resp=>{
          if (resp){
              this.onScan() ;
          }else {
            (new SnackBar()).simple("Require Camera Permission....");
          }  
        },(error)=>{
          console.log(error); 
        }
      );          
  }

  

  getItemLineNo():number{
    let lineno:number=1;
    if (this.items.length>0){  
       let maxLine = this.items.reduce((x,y)=>(x.line > y.line)?x:y);
       lineno = (maxLine.line *1) + 1;
    }
    return lineno;
  }

  getNewItem():SOItem{
      let soitem = new SOItem();
      let lineno = this.getItemLineNo();
      soitem.line = lineno;
      soitem.idec = this.itemMaster.iDesc;
      soitem.icode= this.fd_icode;
      soitem.price = this.fd_price;
      soitem.idec = soitem.line+" "+ this.itemMaster.iDesc;
      soitem.uom = this.itemMaster.sellingUOM;
      soitem.packsize = this.itemMaster.stdPackSize;
      soitem.qty = this.fd_qty;
      soitem.amount =  soitem.qty * soitem.price;
   return soitem;
  }
  
  setEditItem(){
    this.editedItem.price =  this.fd_price;
    this.editedItem.qty = this.fd_qty;
    this.editedItem.amount =  this.editedItem.qty * this.editedItem.price;
  }

  OnAddItem(){
      if (!this.validateItem())
        return;
      
      let soitem:SOItem;
      if (this.isEditMode){
         this.setEditItem();
         soitem = this.editedItem;
      }else {
         soitem = this.getNewItem();
         this.items.push(soitem);
      }

      this.ttlQty = (this.ttlQty *1) +(soitem.qty *1);
      this.ttlAmt = (this.ttlAmt *1) + (soitem.qty * soitem.price);    
      this.resetItemEntry();
  }

  
  onEditItem(item:SOItem){
    this.fd_icode=item.icode;
    this.fd_price = item.price;
    this.fd_qty = item.qty;
    this.isEditMode=true;
    this.editedItem = item;
  }

  onRemoveItem(item:SOItem){
    this.items = this.items.filter(x=>x.line !== item.line);
    this.ttlQty = (this.ttlQty *1) - (item.qty *1);
    this.ttlAmt = (this.ttlAmt *1) - (item.qty * item.price);  
  }

  validateItem():boolean{
      if (!this.fd_icode || this.fd_icode==""){
        (new SnackBar()).simple("Item code is blank...");
        return false;
      }
      if (this.fd_qty==0){
        (new SnackBar()).simple("Invalid item qty....");
        return false;
      }

      return true;
  }
  
  resetItemEntry(){
    this.fd_icode="";
    this.fd_price =0.00;
    this.fd_qty =0;
    this.isEditMode=false;
    this.editedItem=null;
  }

  OnSaveTap(e){
    this.navigationService.backToPreviousPage();
  }

  OnCancelTap(e){
    this.navigationService.backToPreviousPage();
  }
  
  //scanner
  public onScan(){
      this.barcodeScanner.scan({
              formats: "QR_CODE, EAN_13",
              cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
              cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
              message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
              showFlipCameraButton: true,   // default false
              preferFrontCamera: false,     // default false
              showTorchButton: true,        // default false
              beepOnScan: true,             // Play or Suppress beep on scan (default true)
              torchOn: false,               // launch with the flashlight on (default false)
              closeCallback: () => { console.log("Scanner closed")}, // invoked when the scanner was closed (success or abort)
              resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
              openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
      }).then((result) => {
        // Note that this Promise is never invoked when a 'continuousScanCallback' function is provided
         console.log(result);        
      }, (errorMessage) => {
        console.log("No scan. " + errorMessage);
        this.barcodeScanner.stop();
      }
    );
  }
  
}
