"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var router_1 = require("nativescript-angular/router");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-ui-listview/angular");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var http_client_1 = require("nativescript-angular/http-client");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
//import * as ApplicationSettings from 'application-settings';
require("./bundle-config");
var login_component_1 = require("./auth/login/login.component");
var app_config_module_1 = require("./config/app-config.module");
var core_module_1 = require("./core/core.module");
var main_page_component_1 = require("./main-page/main-page.component");
//import { AppRoutingModule } from "./app-routing.module";
var app_component_1 = require("./app.component");
//import { registerElement } from "nativescript-angular/element-registry";
//import { BarcodeScanner } from "nativescript-barcodescanner";
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
var app_routing_module_1 = require("./app-routing.module");
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
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.routing,
                app_config_module_1.AppConfigModule,
                core_module_1.CoreModule,
                // SalesorderModule,
                //ProductionModule,
                forms_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIListViewModule,
                side_drawer_directives_1.NativeScriptUISideDrawerModule,
                router_1.NativeScriptRouterModule,
            ],
            exports: [router_1.NativeScriptRouterModule],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                main_page_component_1.MainPageComponent
            ],
            providers: [
                auth_guard_service_1.AuthguardService,
                nativescript_modal_datetimepicker_1.ModalDatetimepicker,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLHNEQUF1RTtBQUV2RSxvREFBcUU7QUFDckUsNERBQWdGO0FBQ2hGLG9HQUEyRztBQUMzRyxnRUFBZ0Y7QUFDaEYsdUZBQXdFO0FBRXhFLDhEQUE4RDtBQUM5RCwyQkFBeUI7QUFFekIsZ0VBQThEO0FBQzlELGdFQUE2RDtBQUM3RCxrREFBZ0Q7QUFDaEQsdUVBQW9FO0FBQ3BFLDBEQUEwRDtBQUMxRCxpREFBK0M7QUFFL0MsMEVBQTBFO0FBQzFFLCtEQUErRDtBQUMvRCwwRUFBdUU7QUFFdkUsMkRBQStDO0FBQy9DLHFHQUFxRztBQUVyRywyQ0FBMkM7QUFDM0MsbUNBQW1DO0FBQ25DLE1BQU07QUFDTiw4RkFBOEY7QUFFOUYsa0NBQWtDO0FBQ2xDLCtEQUErRDtBQUMvRCx1QkFBdUI7QUFDdkIsZ0RBQWdEO0FBQ2hELG9EQUFvRDtBQUNwRCxnQ0FBZ0M7QUFDaEMsd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixpQkFBaUI7QUFDakIsTUFBTTtBQThDTjtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUE1Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsNEJBQU87Z0JBQ1AsbUNBQWU7Z0JBQ2Ysd0JBQVU7Z0JBQ1gsb0JBQW9CO2dCQUNuQixtQkFBbUI7Z0JBQ25CLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7Z0JBQzVCLHVEQUE4QjtnQkFDOUIsaUNBQXdCO2FBTzNCO1lBQ0QsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7WUFDbkMsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHVDQUFpQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxxQ0FBZ0I7Z0JBQ2hCLHVEQUFtQjthQUt0QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuXHJcbi8vaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XHJcbmltcG9ydCBcIi4vYnVuZGxlLWNvbmZpZ1wiO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwQ29uZmlnTW9kdWxlIH0gZnJvbSBcIi4vY29uZmlnL2FwcC1jb25maWcubW9kdWxlXCI7XHJcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi9jb3JlL2NvcmUubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1haW5QYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluLXBhZ2UvbWFpbi1wYWdlLmNvbXBvbmVudCc7XHJcbi8vaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcblxyXG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbi8vaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdGlvbk1vZHVsZSB9IGZyb20gXCIuL3Byb2R1Y3Rpb24vcHJvZHVjdGlvbi5tb2R1bGVcIjtcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG4vL3JlZ2lzdGVyRWxlbWVudChcIkJhcmNvZGVTY2FubmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIikuQmFyY29kZVNjYW5uZXJWaWV3KTtcclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXJjb2RlU2Nhbm5lcigpIHtcclxuLy8gICAgIHJldHVybiBuZXcgQmFyY29kZVNjYW5uZXIoKTtcclxuLy8gICB9XHJcbi8vcmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9rZW5HZXR0ZXIoKSB7XHJcbi8vICAgICBsZXQganNvblN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XHJcbi8vICAgICBpZiAoanNvblN0cmluZyl7XHJcbi8vICAgICAgICAgbGV0IGF1dGhvYmogPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4vLyAgICAgICAgIGxldCB0b2tlbiA9XCJCZWFyZXIgXCIrIGF1dGhvYmouYXV0aF90b2tlbjtcclxuLy8gICAgICAgICAvL2NvbnNvbGUubG9nKHRva2VuKTtcclxuLy8gICAgICAgICByZXR1cm4gdG9rZW47XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gXCJcIjtcclxuLy8gICB9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50ICAgICAgICBcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIHJvdXRpbmcsXHJcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAvLyBTYWxlc29yZGVyTW9kdWxlLFxyXG4gICAgICAgIC8vUHJvZHVjdGlvbk1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSxcclxuICAgICAgICAvLyBKd3RNb2R1bGUuZm9yUm9vdCh7XHJcbiAgICAgICAgLy8gICAgIGNvbmZpZzoge1xyXG4gICAgICAgIC8vICAgICAgIHRva2VuR2V0dGVyOiB0b2tlbkdldHRlcixcclxuICAgICAgICAvLyAgICAgICBza2lwV2hlbkV4cGlyZWQ6IHRydWVcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vICAgfSkgICBcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCwgICAgIFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIE1haW5QYWdlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXV0aGd1YXJkU2VydmljZSxcclxuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyLFxyXG4gICAgICAgLy8gQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgLy8gICB7IHByb3ZpZGU6IEJhcmNvZGVTY2FubmVyLCB1c2VGYWN0b3J5OiAoY3JlYXRlQmFyY29kZVNjYW5uZXIpIH0sXHJcbiAgICAgICAgLy8ge3Byb3ZpZGU6IE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgdXNlQ2xhc3M6IE5TTW9kdWxlRmFjdG9yeUxvYWRlcn1cclxuICAgICAgICBcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG4vKlxyXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==