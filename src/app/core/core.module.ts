import { NgModule, NO_ERRORS_SCHEMA, Optional, SkipSelf } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { SERVICES } from './services';


@NgModule({
  declarations: [],
  imports: [
   
  ],
  providers: [
    ...SERVICES
  ],
  exports:[
    
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule into the AppModule only.');
    }
  }
}
