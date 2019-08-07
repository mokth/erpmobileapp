import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


import * as ModalPicker from 'nativescript-modal-datetimepicker';
import { SnackBar } from "@nstudio/nativescript-snackbar";

import { APIService } from '../../core/services';
import { NavigationService } from '../../core/services/navigation.service';

import { RefCode,DailyInput,splinObject } from '../../core/model';

import { BarcodeScanner } from 'nativescript-barcodescanner';
import * as application from 'tns-core-modules/application';


@Component({
  selector: 'ns-daily-output',
  templateUrl: './daily-output.component.html',
  styleUrls: ['./daily-output.component.css'],
  moduleId: module.id.toString(),
})
export class DailyOutputComponent implements OnInit {
 
  @ViewChild('spinWork',{static: false}) spinWork: ElementRef;
  @ViewChild('myContainer',{static: false}) myContainer: ElementRef;

  showError:boolean;
  showspin:boolean;
  showspin2:boolean;
  errmsg:string;
  
  iconQR:string;
  iconSpin:string;
  listitems:splinObject[]=[];
  wclistitems:splinObject[]=[];
  proclistitems:splinObject[]=[];
  macclistitems:splinObject[]=[];
  wolist:any;
  refcodes:any;
  maccodes:RefCode[]=[];
  oprcodes:splinObject[]=[];
  _lookoption:string;
  
  fd_date:Date;
  fd_time:Date;
  fd_wo:string;
  fd_wccode:string;
  fd_procee:string;
  fd_macplan:string;
  fd_macact:string;
  fd_prod:string;
  fd_operator:string;
  fd_good:number;
  fd_reject:number;
  fd_scrap:number;
   
  isScan:boolean;
  isSaving:boolean;
  constructor(private apiser:APIService,
              private barcodeScanner: BarcodeScanner,
              private navigationService: NavigationService) {
     this.showError = false;
     this.showspin =false;
     this.showspin2 =false;
     this.fd_date = new Date();
     this.fd_time = new Date();
  }

  ngOnInit() {
     this.iconQR= String.fromCharCode(0xf029);
     this.iconSpin = String.fromCharCode(0xf150);
     
     this.getWorkOrder();
     this.getWorkOperators();
          
     if (application.android) {
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (args: any) => {
           args.cancel = true;
        });
      }
  }

  getWorkOrder(){
    this.apiser.getDailyWorkOrders().subscribe(
      (resp:any)=>{
        this.showError=false;
        this.wolist= resp.value;
        this.wolist.map(x=>{
          if (this.listitems.findIndex(y=>y.title==x.scheCode)< 0){
             this.listitems.push({
                title:x.scheCode
             });
          }
        });
        this.showspin =true;
      },
      (err)=>{
        this.showspin =false;
        this.showError=true;
        this.errmsg ="Error fetching Work Orders from server." ;          
      });
  }

  getWorkOperators(){
    this.apiser.getProdRefCodes().subscribe((resp:any)=>{
      this.refcodes = resp.value;
      if (this.refcodes){
           this.refcodes.map(x=>{
                if (x.codeType=="mac"){
                    this.maccodes.push(x); 
                }else if (x.codeType=="opr"){
                    this.oprcodes.push({
                      title:x.code
                    });                   
                }        
          });
          this.showspin2 =true;
      }
    },
    (err)=>{
      this.showspin2 =false;
      this.showError=true;
      this.errmsg ="Error fetching data from server." ;          
    });    
  }

  cancelFilterableList(e) {
      console.log('canceled');
  }

  itemTapped(args) {
      console.log(args.selectedItem.title);
      console.log(this._lookoption)
      switch(this._lookoption) {
        case "wo":
          this.isScan=false;
          this.fd_wo = args.selectedItem.title;     
          this.wolist.filter(w=>w.scheCode==this.fd_wo)
              .map(x=>{
                 this.fd_prod = x.prodCode;
              });               
          break;
        case "center":
          this.fd_wccode = args.selectedItem.title;
          break;
        case "process":
          this.fd_procee = args.selectedItem.title;
          break;
        case "planMac":
          this.fd_macplan = args.selectedItem.title;
          break;
        case "actMac":
          this.fd_macact = args.selectedItem.title;
          break;
        case "operator":
          this.fd_operator = args.selectedItem.title;
          break;
      }
  }

  showPicker(option:string) {
    console.log(option);
    this.spinWork.nativeElement.dimmerColor="transparent";
    this.spinWork.nativeElement.listWidth="80%";
    this._lookoption = option;
    switch(option) {
      case "wo":
        this.spinWork.nativeElement.hintText="Work Order.."
        this.spinWork.nativeElement.source=this.listitems;
        break;
      case "center":
         this.getWorkCenters()
        this.spinWork.nativeElement.hintText="Work Center.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
      case "process":
        this.getWorkProcess();
        this.spinWork.nativeElement.hintText="Work Process.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
      case "planMac":
        this.getWorkMachine();
        this.spinWork.nativeElement.hintText="Plan Machine.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
      case "actMac":
        this.getWorkAllMachine();
        this.spinWork.nativeElement.hintText="Actual Machine.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
      case "operator":
        this.getOperators();
        this.spinWork.nativeElement.hintText="Operator.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
    }
    this.spinWork.nativeElement.show(this.myContainer.nativeElement);
  }

  getWorkCenters(){
    this.wclistitems=[];
    this.wolist.filter(w=>w.scheCode==this.fd_wo)
      .map(x=>{
          if (this.wclistitems.findIndex(y=>y.title==x.wcCode)< 0){
            this.wclistitems.push({
                title:x.wcCode
            });
          }
    });
  }

  getWorkProcess(){
    this.wclistitems=[];
    this.wolist.filter(w=>w.scheCode==this.fd_wo && w.wcCode == this.fd_wccode )
      .map(x=>{
          if (this.wclistitems.findIndex(y=>y.title==x.nextProcess)< 0){
            this.wclistitems.push({
                title:x.nextProcess
            });
          }
    });
  }

  getOperators(){
    this.wclistitems= [];
    this.wclistitems=[...this.oprcodes];    
  }

  getWorkMachine(){
    this.wclistitems=[];
    this.wolist.filter(w=>w.scheCode==this.fd_wo &&
                          w.wcCode == this.fd_wccode &&
                          w.nextProcess == this.fd_procee )
      .map(x=>{
          if (this.wclistitems.findIndex(y=>y.title==x.machineCode)< 0){
            this.wclistitems.push({
                title:x.machineCode
            });
          }
    });
  }

  getWorkAllMachine(){
    this.wclistitems=[];
    console.log(this.maccodes);
    this.maccodes.filter(w=>w.name==this.fd_procee)
      .map(x=>{
          if (this.wclistitems.findIndex(y=>y.title==x.code)< 0){
            this.wclistitems.push({
                title:x.code
            });
          }
    });
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

  pickTime() {
    const picker = new ModalPicker.ModalDatetimepicker();
    picker.pickTime({
      theme: 'dark',
      is24HourView: true
    }).then((result) => {
        this.fd_time = this.getTimeResult(result);      
    }).catch((error) => {
      console.log('Error: ' + error);
      (new SnackBar()).simple(error);
    });
  }

  getDateResult(result:any){
    console.log(result);
    return new Date(result['year'],result['month']-1,result['day']);    
  }

  getTimeResult(result:any){
    let d:Date = new Date();
    return new Date(d.getFullYear(),d.getMonth()-1,d.getDate(), result['hour'],result['minute'],0,0);    
  }

  OnScan(){
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
  let data= scanText.split('\n');
  if (data.length>5){        
    let workorder = this.wolist.filter
                     (x=>x.scheCode==data[0] &&
                         x.relNo ==data[1] &&
                         x.wcCode== data[2] &&
                         x.wciCode == data[3] &&
                         x.nextProcess==data[4]);
      if (workorder){                   
          this.isScan=false;
          this.fd_wo=data[0];
          this.fd_wccode=data[2];
          this.fd_procee=data[4];
          this.fd_macplan =data[5];
          this.fd_macact =data[5];
          this.fd_prod =data[5];
          this.fd_operator="";   

      }else{
        (new SnackBar()).simple("Work Order info not found...");
      }

  }
 }
  
  OnSaveTap(e){
    if (this.isSaving){
      return;
    }
    this.isSaving =true;
    let daily:DailyInput = this.populateDailyInput();
    this.apiser.postDailyInput(daily).subscribe((resp:any)=>{
        console.log(resp);
        const data= resp.value;
        this.showError=true;
        if (data.ok=="yes"){          
          this.errmsg = "Successfully uploaded...";
          this.resetInput();
        }else{
          this.errmsg = data.error;          
        }
        this.isSaving =false;
      },
      (err)=>{
				this.showError=true;
        this.errmsg = err.statusText;
        this.isSaving =false;
			});

  }

  resetInput(){
    this.fd_wo="";
    this.fd_prod="";
    this.fd_wccode="";
    this.fd_procee="";
    this.fd_macplan="";
    this.fd_macact="";
    this.fd_operator="";
    this.fd_good=0;
    this.fd_reject=0;
    this.fd_scrap=0;
  }
    
  OnCancelTap(e){
    console.log('back to list....');
    this.navigationService.navigate(['/daily/dailylist'],{clearHistory:true});
  }

  populateDailyInput():DailyInput{
    let daily:DailyInput = new DailyInput();
        daily.date = new Date();
        daily.timeSlot = this.fd_time.getHours()+":"+this.fd_time.getMinutes();
        daily.scheCode = this.fd_wo;
        daily.relNo=1;
        daily.wCCode = this.fd_wccode;
        daily.processCode= this.fd_procee;
        daily.machineCode = this.fd_macplan;
        daily.machineCodeAct = this.fd_macact;
        daily.operatorAct = this.fd_operator;
        daily.qtyAct = this.fd_good|| 0;
        daily.qtyScrap = this.fd_scrap || 0;
        daily.qtyReject = this.fd_reject || 0;
        daily.status="NEW";

        let workorder = this.wolist.filter(x=>x.scheCode==daily.scheCode &&
                                              x.wcCode==daily.wCCode &&
                                              x.nextProcess==daily.processCode);
        if (workorder){
            daily.wCICode = workorder[0].wciCode;
            daily.prodCode = workorder[0].prodCode;
            daily.operator = workorder[0].operator;
            console.log(daily);
        }else{
          console.log('Invalid work order info...');
        }
    return daily;
  }
}
