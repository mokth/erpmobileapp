import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';

import { BarcodeScanner } from "nativescript-barcodescanner";
import { DailyOutputComponent } from './daily-output/daily-output.component';
import { prdroutes } from './production-routes';
import { DailyScanComponent } from './daily-scan/daily-scan.component';
import { DailyListComponent } from './daily-list/daily-list.component';

export function createBarcodeScanner() {
  return new BarcodeScanner();
}

@NgModule({
  declarations: [
    DailyOutputComponent,
    DailyScanComponent,
    DailyListComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(prdroutes),
  ],
  providers:[
    { provide: BarcodeScanner, useFactory: (createBarcodeScanner) }
  ],
  exports:[
    DailyOutputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductionModule { }
