import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { ModalDatetimepicker } from "nativescript-modal-datetimepicker";

//import * as ApplicationSettings from 'application-settings';
import "./bundle-config";

import { LoginComponent } from './auth/login/login.component';
import { AppConfigModule } from "./config/app-config.module";
import { CoreModule } from "./core/core.module";
import { MainPageComponent } from './main-page/main-page.component';
//import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

//import { registerElement } from "nativescript-angular/element-registry";
//import { BarcodeScanner } from "nativescript-barcodescanner";
import { AuthguardService } from "./auth/authguard/auth-guard-service";
import { ProductionModule } from "./production/production.module";
import { routing } from "./app-routing.module";
import { ItemMasterModule } from "./item-master/item-master.module";
//registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

// export function createBarcodeScanner() {
//     return new BarcodeScanner();
//   }
//registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

// export function tokenGetter() {
//     let jsonString = ApplicationSettings.getString("token");
//     if (jsonString){
//         let authobj = JSON.parse(jsonString);
//         let token ="Bearer "+ authobj.auth_token;
//         //console.log(token);
//         return token;
//     }
//     return "";
//   }

@NgModule({
    bootstrap: [
        AppComponent        
    ],
    imports: [
        NativeScriptModule,
        routing,
        AppConfigModule,
        CoreModule,
        ItemMasterModule,
       // SalesorderModule,
        //ProductionModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptUIListViewModule,
        NativeScriptUISideDrawerModule,
        NativeScriptRouterModule,
        // JwtModule.forRoot({
        //     config: {
        //       tokenGetter: tokenGetter,
        //       skipWhenExpired: true
        //     }
        //   })   
    ],
    exports: [NativeScriptRouterModule],
    declarations: [
        AppComponent,     
        LoginComponent,
        MainPageComponent
    ],
    providers: [
        AuthguardService,
        ModalDatetimepicker,
       // BarcodeScanner,
     //   { provide: BarcodeScanner, useFactory: (createBarcodeScanner) },
        // {provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader}
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
