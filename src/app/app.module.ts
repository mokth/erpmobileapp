import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { JwtModule } from '@auth0/angular-jwt';

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ModalDatetimepicker } from "nativescript-modal-datetimepicker";
import * as ApplicationSettings from 'application-settings';

import { LoginComponent } from './auth/login/login.component';
import { AppConfigModule } from "./config/app-config.module";
import { CoreModule } from "./core/core.module";
import { SalesorderModule } from "./salesorder/salesorder.module";
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { registerElement } from "nativescript-angular/element-registry";
import { BarcodeScanner } from "nativescript-barcodescanner";
registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

//registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

export function tokenGetter() {
    let jsonString = ApplicationSettings.getString("token");
    if (jsonString){
        let authobj = JSON.parse(jsonString);
        let token ="Bearer "+ authobj.auth_token;
        //console.log(token);
        return token;
    }
    return "";
  }

@NgModule({
    bootstrap: [
        AppComponent,
        
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        AppConfigModule,
        CoreModule,
        SalesorderModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptUISideDrawerModule,
        // JwtModule.forRoot({
        //     config: {
        //       tokenGetter: tokenGetter,
        //       skipWhenExpired: true
        //     }
        //   })   
    ],
    declarations: [
        AppComponent,     
        LoginComponent,
        MainPageComponent
    ],
    providers: [
        ModalDatetimepicker,
        BarcodeScanner
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
