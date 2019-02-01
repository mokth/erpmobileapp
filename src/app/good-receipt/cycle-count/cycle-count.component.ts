import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';

import { APIService } from '../../core/services';
import { AuthService } from '../../core/services/auth-service';
import { NavigationService } from '../../core/services/navigation.service';
import { CycleCountItem } from '../../core/model';
import { SnackBar } from 'nativescript-snackbar';

@Component({
  selector: 'ns-cycle-count',
  templateUrl: './cycle-count.component.html',
  styleUrls: ['./cycle-count.component.css'],
  moduleId: module.id,
})
export class CycleCountComponent implements OnInit {
  
  iconQR:string;
  iconSpin:string;
  userid:string;

  fd_cycid:string;
  fd_icode:string;
  fd_idesc:string;
  fd_whcode:string;
  fd_loccode:string;
  fd_lotno:string;
  fd_qty:number;
  item:CycleCountItem;
  
  constructor(private apiser:APIService,
              private auth:AuthService,
              private barcodeScanner: BarcodeScanner,
              private navigationService: NavigationService) {
    this.userid = auth.getUserID();
  }
  
  ngOnInit() {
    this.item = new CycleCountItem();
    this.iconQR= String.fromCharCode(0xf029);
  }
  
  OnScan(){
   this.resstDisplay();
   this.OnScanQR();
  }

  OnScanQR(){
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
    
    if (data[0].length>4){     
         this.item.cy_id = data[1];
         this.item.icode = data[1];
         this.item.whcode = data[2];
         this.item.loccode = data[3];
         this.item.lotno = data[4];
         this.apiser.postIsCycleCountValid(this.item)
            .subscribe(resp=>{
                if (resp.save=="yes"){
                   this.item.idesc = resp.data.ides;
                   this.displayItem();
                }else {
                  console.log(resp);
                  (new SnackBar()).simple(resp.error|| '');
                }
            })
        this.displayItem();
     }
   }

  displayItem(){
    this.fd_cycid= this.item.cy_id;
    this.fd_icode= this.item.icode;
    this.fd_idesc = this.item.idesc;
    this.fd_whcode = this.item.whcode;
    this.fd_lotno = this.item.lotno;
    this.fd_loccode = this.item.loccode;    
  }

  resstDisplay(){
    this.fd_cycid= "";
    this.fd_icode= "";
    this.fd_idesc = "";
    this.fd_whcode = "";
    this.fd_lotno = "";
    this.fd_loccode = "";
    this.fd_qty =0;
  }

  OnSaveTap(e){
    if (this.fd_qty<0 ){
      (new SnackBar()).simple("Invalid Qty...");
      return;
    }
    this.item.pqty = this.fd_qty;
    this.item.userid = this.userid;
    
    this.apiser.putCycleCountItem(this.item).subscribe(resp=>{
      console.log(resp);
      if (resp.save=="yes"){
        (new SnackBar()).simple("Successfully uploaded...");
        this.resstDisplay();
      }else{
        (new SnackBar()).simple("Error "+resp.error);
      }
    });
  }

  OnCancelTap(e){
    this.navigationService.navigate(['/main'],{clearHistory:true});
  }
}
