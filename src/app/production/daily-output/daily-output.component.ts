import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { APIService } from '~/app/core/services';
import { DailyWorkOrder } from '../../../../platforms/android/app/src/main/assets/app/app/core/model/dailly-work-order';
import { splinObject } from '~/app/core/model/dailly-work-order';
import { filter } from '../../../../platforms/android/app/build/intermediates/merged_assets/debug/mergeDebugAssets/out/app/tns_modules/rxjs/src/internal/operators/filter';
import * as ModalPicker from 'nativescript-modal-datetimepicker';
import { SnackBar } from 'nativescript-snackbar';
import { DailyInput } from '../../core/model/daily-input';
import { NavigationService } from '~/app/core/services/navigation.service';
import { BarcodeScanner } from 'nativescript-barcodescanner';
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

@Component({
  selector: 'ns-daily-output',
  templateUrl: './daily-output.component.html',
  styleUrls: ['./daily-output.component.css'],
  moduleId: module.id,
})
export class DailyOutputComponent implements OnInit {
 
  @ViewChild('spinWork') spinWork: ElementRef;
  @ViewChild('myContainer') myContainer: ElementRef;

  iconQR:string;
  iconSpin:string;
  listitems:splinObject[]=[];
  wclistitems:splinObject[]=[];
  proclistitems:splinObject[]=[];
  macclistitems:splinObject[]=[];
  wolist:any;
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

  constructor(private apiser:APIService,
              private barcodeScanner: BarcodeScanner,
              private navigationService: NavigationService,) {
     this.fd_date = new Date();
     this.fd_time = new Date();
  }

  ngOnInit() {
     this.iconQR= String.fromCharCode(0xf029);
     this.iconSpin = String.fromCharCode(0xf150);
     this.apiser.getDailyWorkOrders().subscribe(
        (resp)=>{
          this.wolist= resp;
          this.wolist.map(x=>{
            if (this.listitems.findIndex(y=>y.title==x.scheCode)< 0){
               this.listitems.push({
                  title:x.scheCode
               });
            }
          });
          

      });
  }

  cancelFilterableList() {
      console.log('canceled');
  }

  itemTapped(args) {
      console.log(args.selectedItem.title);
      console.log(this._lookoption)
      switch(this._lookoption) {
        case "wo":
          this.fd_wo = args.selectedItem.title;
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
        this.getWorkMachine();
        this.spinWork.nativeElement.hintText="Actual Machine.."
        this.spinWork.nativeElement.source=this.wclistitems;
        break;
      case "operator":
        this.spinWork.nativeElement.hintText="Operator.."
        this.spinWork.nativeElement.source=this.listitems;
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
        this.fd_wo="INC17060005";
        this.fd_wccode="OIL";
        this.fd_procee="OIL";
        this.fd_macplan ="MACHINE1";
        this.fd_macact ="MACHINE1";
        this.fd_operator="MOK";       
    }, (errorMessage) => {
        console.log("No scan. " + errorMessage);
        this.barcodeScanner.stop();
    });
 
 }
  
  OnSaveTap(e){
    let daily:DailyInput = this.populateDailyInput();
    this.apiser.postDailyInput(daily).subscribe(resp=>{
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
    this.fd_good=0;
    this.fd_macact="";
    this.fd_operator="";
    this.fd_procee="";
    this.fd_prod="";
    this.fd_reject=0;
    this.fd_scrap=0;
    this.fd_wccode="";
    this.fd_wo="";
  }
  
  OnCancelTap(e){
    this.navigationService.navigate(['/main'],{clearHistory:true});
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
        daily.qtyAct = this.fd_good|| 0;
        daily.qtyScrap = this.fd_scrap || 0;
        daily.qtyReject = this.fd_reject || 0;
       

        let workorder = this.wolist.filter(x=>x.scheCode==daily.scheCode &&
                                              x.wcCode==daily.wCCode &&
                                              x.nextProcess==daily.processCode);
        if (workorder){
            daily.wCICode = workorder[0].wciCode;
            daily.prodCode = workorder[0].prodCode;
            console.log(daily);
        }else{
          console.log('Invalid work order info...');
        }
    return daily;
  }
}
