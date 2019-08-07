import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { SnackBar } from "@nstudio/nativescript-snackbar";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { fromEvent } from 'rxjs';
import {debounceTime } from 'rxjs/operators';
import * as ModalPicker from 'nativescript-modal-datetimepicker';

import { APIService } from '../../core/services/api.service';
import { NavigationService } from '../../core/services/navigation.service';
import { splinObject, GRNPOItem, GRNReceive } from '../../core/model';
import { AuthService } from '../../core/services/auth-service';
import * as application from 'tns-core-modules/application';


@Component({
  selector: 'ns-grn-entry',
  templateUrl: './grn-entry.component.html',
  styleUrls: ['./grn-entry.component.css'],
  moduleId: module.id,
})

export class GrnEntryComponent 
 implements OnInit,AfterViewInit,OnDestroy {
    
  @ViewChild('spinWorkGR',{static: false}) spinWork: ElementRef;
  @ViewChild('myContainerGR',{static: false}) myContainer: ElementRef;
  @ViewChild("revqrt",{static: false}) receiptQty: ElementRef;
  @ViewChild("dono",{static: false}) dono: ElementRef;

  polist:any;
  poitemlist:any;
  iconQR:string;
  iconSpin:string;
  listitems:splinObject[]=[];
  listpoitems:splinObject[]=[];
  _lookoption:string;
  poitem:GRNPOItem;

  fd_date:Date;
  fd_dono:string;
  fd_pono:string;
  fd_relno:string;
  fd_vcode:string;
  fd_vname:string;
  fd_icode:string;
  fd_idesc:string;
  fd_line:number;
  fd_puruom:string;
  fd_poqty:number;
  fd_balance:number;
  fd_recqty:number;
  fd_ttlrec:number;

  $qtyListener:any;
  isRecQtyValid:boolean;
  
  userid:string;
  constructor(private apiser:APIService,
              private auth:AuthService,
              private barcodeScanner: BarcodeScanner,
              private navigationService: NavigationService) {
     this.userid = auth.getUserID();
  }
 
  ngAfterViewInit(): void {
    setTimeout(() => {
       this.dono.nativeElement.focus();
    }, 600);    

    this.$qtyListener= fromEvent(
       this.receiptQty.nativeElement, 'textChange')
       .pipe(
         debounceTime(400)
        ) .subscribe((event:any) => {
            if (this.fd_balance){
              const qty = +event.value;
              if (!this.onValidRecQty(qty)){
                   this.fd_recqty=0;
                   this.isRecQtyValid =false;
                   (new SnackBar()).simple("Qty cannot more then PO qty!");
              } else {
                 this.isRecQtyValid =true;
              }
            }

    });
  }

  ngOnInit() {
     this.isRecQtyValid =false;
     this.fd_date = new Date();
     this.iconQR= String.fromCharCode(0xf029);
     this.iconSpin = String.fromCharCode(0xf150);
     this.apiser.getGRNPOlist().subscribe(resp=>{
          this.polist= resp;
          this.polist.map(x=>{
            if (this.listitems.findIndex(y=>y.title==x.poNo)< 0){
              this.listitems.push({
                  title:x.poNo
              });
            }
          });
        });
       //disable device back button on Android
      if (application.android) {
          application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
             args.cancel = true;
          });
      }
  }
  
  ngOnDestroy(): void {
     try{
      if (this.$qtyListener){
        console.log('qtyListener unsubscribe');
        this.$qtyListener.unsubscribe();
      }
    }catch(e){
      console.log(e);
    }
  }

  pickDate() {
    const picker = new ModalPicker.ModalDatetimepicker();
    picker.pickDate({
      theme: 'dark',
      is24HourView: false
    }).then((result) => {
        this.fd_date = this.getDateResult(result);      
    }).catch((error) => {
      console.log('Error: ' + error);
      (new SnackBar()).simple(error);
    });
  }

  getDateResult(result:any){
    return new Date(result['year'],result['month']-1,result['day']);    
  }
  
  showPicker(option:string) {
    console.log(option);
    this.spinWork.nativeElement.dimmerColor="transparent";
    this.spinWork.nativeElement.listWidth="80%";
    this._lookoption = option;
    switch(option) {
      case "po":
        this.spinWork.nativeElement.hintText="Select PO.."
        this.spinWork.nativeElement.source=this.listitems;
        break;
      case "item":
        this.spinWork.nativeElement.hintText="Select Item.."
        this.spinWork.nativeElement.source=this.listpoitems;
        break;    
    }
    this.spinWork.nativeElement.show(this.myContainer.nativeElement);

  }

  cancelFilterableList(e) {
    console.log('canceled');
  }

  itemTapped(args) {
    switch(this._lookoption) {
      case "po":
        this.fd_pono = args.selectedItem.title;     
        this.polist.filter(w=>w.poNo==this.fd_pono)
            .map(x=>{
               this.fd_vcode = x.vendCode;
               this.fd_vname = x.vendName;
               this.fd_relno = x.poRelNo               
            });
        this.getPOItems();               
        break;
      case "item":
        let code = args.selectedItem.title.split('.');
        this.fd_icode = code[1];
        this.poitemlist.filter(w=>w.line==code[0])
            .map(x=>{
               this.fd_idesc= x.iDes,
               this.fd_poqty = x.poPurQty,
               this.fd_puruom =x.purchaseUOM,
               this.fd_balance =x.balanceQty,
               this.fd_line = x.line,
               this.fd_ttlrec = x.receivedQty,
               this.poitem=x            
            });
       this.receiptQty.nativeElement.focus();
    }
  }

  getPOItems(){
    this.listpoitems=[];
    this.apiser.getPOItems(this.fd_pono,this.fd_relno)
        .subscribe(resp=>{
          console.log(resp);
           this.poitemlist= resp;
           this.poitemlist.map(x=>{
              this.listpoitems.push({
                  title:x.line+'.'+x.iCode,
              });            
          });
        });
  }

  OnScan(){
    //[PONo]+'+'+[PORelNo]+'+'+[VendCode]+'+'+[ICode]+'+'+[Line]+'+'+[POQty]+'+'+[PurchaseUOM]
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
        this.checkValidScanResult(result.text);        
    }, (errorMessage) => {
        console.log("No scan. " + errorMessage);
        this.barcodeScanner.stop();
    }); 
  }

  checkValidScanResult(scanText:string){
    let data= scanText.split('+');
    if (data.length>5){        
      let pohdr = this.polist.filter
                       ( x=>x. poNo==data[0] &&x.poRelNo ==data[1]);
      if (pohdr.length>0){                          
         console.log('found PO');
         console.log(pohdr[0]);
         this.fd_pono = pohdr[0].poNo;
         this.fd_relno = pohdr[0].poRelNo;  
         this.fd_vcode = pohdr[0].vendCode;
         this.fd_vname = pohdr[0].vendName;
         
         let podtl= null;
         if (this.poitemlist){  
               podtl = this.poitemlist.find
                       (x=>x.poNo==pohdr[0].poNo &&
                           x.poRelNo == pohdr[0].poRelNo &&
                           x.iCode== data[3] &&
                           x.line == data[4] );
         }
         if (podtl){
             //use existing poitem
             this.displyItem(podtl);
         }else {
           //not found fetch from server
           this.getPOItemsFrScan(pohdr[0].poNo,pohdr[0].poRelNo,data);
         }
      }       
  
    }
   }
  
   getPOItemsFrScan(pono,relno,data){
    this.listpoitems=[];
   // console.log('get po item');
    this.apiser.getPOItems(pono,relno)
        .subscribe(resp=>{
           this.poitemlist= resp;
           this.poitemlist.map(x=>{
              this.listpoitems.push({
                  title:x.line+'.'+x.iCode,
              });            
           });
           let podtl = this.poitemlist.find
                       (x=>x.poNo==pono &&
                           x.poRelNo ==relno &&
                           x.iCode== data[3] &&
                           x.line == data[4] );
           this.displyItem(podtl);        
        });
  }

  displyItem(podtl){
    try{
     if (podtl){
        console.log('found item') ;        
        this.fd_icode = podtl.iCode;         
        this.fd_idesc= podtl.iDes;
        this.fd_poqty = podtl.poPurQty;
        this.fd_puruom =podtl.purchaseUOM;
        this.fd_balance =podtl.balanceQty;
        this.fd_line = podtl.line;
        this.fd_ttlrec = podtl.receivedQty;
        this.poitem=podtl;
     }else {
       console.log('item not found');
     }
    }catch(e) {
       console.log(e);
    }
  }

  onValidRecQty(qtyrec:number){
    const tolerance = +this.poitem.tolerance;
    //received but not posted yet
    const receivedQty = this.poitem.receivedQty; 
    const ttlRecv = qtyrec+ receivedQty;
    let tolqty=0;
    if (tolerance>0){
       tolqty = Math.trunc( this.fd_poqty * (tolerance/100));
    }
    let canRecQty =  this.fd_balance+ tolqty;
    return (ttlRecv <= canRecQty);
  }

  OnSaveTap(e){
    if (this.fd_recqty==0 ){
      (new SnackBar()).simple("Invalid Qty...");
      return;
    }
    let item:GRNReceive= this.populateGRNReceive();
    this.apiser.postGRNReceipt(item).subscribe(resp=>{
      console.log(resp);
      if (resp.save=="yes"){
        (new SnackBar()).simple("Successfully uploaded...");
        this.resetInput();
      }else{
        (new SnackBar()).simple("Error "+resp.error);
      }
    });
  }

  resetInput(){
    this.fd_icode ="";
    this.poitem = null;
    this.fd_idesc=""
    this.fd_line=0;
    this.fd_puruom="";
    this.fd_poqty=0;
    this.fd_balance=0;
    this.fd_recqty=0;
  }

  OnCancelTap(e){
    this.navigationService.navigate(['/main'],{clearHistory:true});
  }
  
  populateGRNReceive():GRNReceive{
     let item:GRNReceive = new GRNReceive();
     item.createdBy =this.userid;
     item.dateRec = this.fd_date;
     item.dono = this.fd_dono;
     item.iCode = this.fd_icode;
     item.iDes = this.fd_idesc;
     item.line = this.fd_line;
     item.packSz = this.poitem.packSz;
     item.poNo = this.fd_pono;
     item.poPurQty = this.poitem.poPurQty;
     item.poQty = this.poitem.poQty;
     item.poRelNo = +this.fd_relno;
     item.purchaseUOM = this.fd_puruom;
     item.recvQty = this.fd_recqty;
     item.recvStdQty = item.recvQty * this.poitem.packSz;
     item.stdUOM = this.poitem.stdUOM;
     item.tolerance = this.poitem.tolerance;
     
    return item;
  }

}
