import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { GrnEntryComponent } from './grn-entry/grn-entry.component';

import { BarcodeScanner } from "nativescript-barcodescanner";
import { grnroutes } from './good-receipt-routes';
import { CycleCountComponent } from './cycle-count/cycle-count.component';
import { CycleCountNoLotComponent } from './cycle-count-nolot/cycle-count-nolot.component';


export function createBarcodeScanner() {
  return new BarcodeScanner();
}

@NgModule({
  declarations: [
    GrnEntryComponent,
    CycleCountComponent,
    CycleCountNoLotComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(grnroutes),
  ],
  providers:[
    { provide: BarcodeScanner, useFactory: (createBarcodeScanner) }
  ],
  exports:[
    GrnEntryComponent,
    CycleCountComponent,
    CycleCountNoLotComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GoodReciptModule { }
