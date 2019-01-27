import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { DailyOutputComponent } from './daily-output/daily-output.component';
import { NativeScriptFormsModule, NativeScriptRouterModule } from 'nativescript-angular';
import { BarcodeScanner } from "nativescript-barcodescanner";
import { routes } from './production-routes';

export function createBarcodeScanner() {
  return new BarcodeScanner();
}

@NgModule({
  declarations: [DailyOutputComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forChild(routes),
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
