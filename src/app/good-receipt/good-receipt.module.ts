import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { GrnEntryComponent } from './grn-entry/grn-entry.component';

import { BarcodeScanner } from "nativescript-barcodescanner";
import { grnroutes } from './good-receipt-routes';


export function createBarcodeScanner() {
  return new BarcodeScanner();
}

@NgModule({
  declarations: [
    GrnEntryComponent
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
    GrnEntryComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class GoodReciptModule { }
