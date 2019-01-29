import * as ModalPicker from 'nativescript-modal-datetimepicker';
import { SnackBar } from 'nativescript-snackbar';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { Observable } from 'rxjs/Observable';

import { fromEvent } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';


import { APIService } from '../../core/services/api.service';
import { NavigationService } from '../../core/services/navigation.service';
import { splinObject, GRNPOItem, GRNReceive } from '../../core/model';


@Component({
  selector: 'ns-grn-entry',
  templateUrl: './grn-entry.component.html',
  styleUrls: ['./grn-entry.component.css'],
  moduleId: module.id,
})

export class GrnEntryComponent 
 implements OnInit,AfterViewInit,OnDestroy {
    
  @ViewChild('spinWork') spinWork: ElementRef;
  @ViewChild('myContainer') myContainer: ElementRef;
  @ViewChild("revqrt") receiptQty: ElementRef;
  @ViewChild("dono") dono: ElementRef;

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
  
  $qtyListener:any;
  isRecQtyValid:boolean;

  constructor(private apiser:APIService,
              private barcodeScanner: BarcodeScanner,
              private navigationService: NavigationService) {
  }
 
  ngAfterViewInit(): void {
    setTimeout(() => {
       this.dono.nativeElement.focus();
    }, 600);    

    this.$qtyListener= fromEvent(
       this.receiptQty.nativeElement, 'textChange')
       .debounceTime(400)
       .subscribe((event:any) => {
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
  }
  
  ngOnDestroy(): void {
    this.$qtyListener.unsubscribe();
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

  }
  
  onValidRecQty(qtyrec:number){
    const tolerance = +this.poitem.tolerance;
    let tolqty=0;
    if (tolerance>0){
       tolqty = Math.trunc( this.fd_poqty * (tolerance/100));
    }
    let canRecQty =  this.fd_balance+ tolqty;
    return (qtyrec <= canRecQty);
  }

  OnSaveTap(e){
    if (this.fd_recqty==0 ){
      this.isRecQtyValid=false;
      return;
    }
    let item:GRNReceive= this.populateGRNReceive();
    this.apiser.postGRNReceipt(item).subscribe(resp=>{
      console.log(resp);
      if (resp.ok=="yes"){
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
     item.createdBy ='MOk';
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
