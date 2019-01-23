import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { DailyOutputComponent } from './daily-output/daily-output.component';
import { NativeScriptFormsModule } from 'nativescript-angular';

@NgModule({
  declarations: [DailyOutputComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule
  ],
  exports:[
    DailyOutputComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProductionModule { }
