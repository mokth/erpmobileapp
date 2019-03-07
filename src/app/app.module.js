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
var item_master_module_1 = require("./item-master/item-master.module");
var setting_component_1 = require("./core/settings/setting/setting.component");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("FilterableListpicker", function () { return require("nativescript-filterable-listpicker").FilterableListpicker; });
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
                item_master_module_1.ItemMasterModule,
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
                main_page_component_1.MainPageComponent,
                setting_component_1.SettingComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLHNEQUF1RTtBQUV2RSxvREFBcUU7QUFDckUsNERBQWdGO0FBQ2hGLG9HQUEyRztBQUMzRyxnRUFBZ0Y7QUFDaEYsdUZBQXdFO0FBRXhFLDhEQUE4RDtBQUM5RCwyQkFBeUI7QUFFekIsZ0VBQThEO0FBQzlELGdFQUE2RDtBQUM3RCxrREFBZ0Q7QUFDaEQsdUVBQW9FO0FBQ3BFLDBEQUEwRDtBQUMxRCxpREFBK0M7QUFFL0MsMEVBQTBFO0FBQzFFLCtEQUErRDtBQUMvRCwwRUFBdUU7QUFFdkUsMkRBQStDO0FBQy9DLHVFQUFvRTtBQUNwRSwrRUFBNkU7QUFFN0UsMEVBQXNFO0FBQ3RFLGtDQUFlLENBQUMsc0JBQXNCLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLG9CQUFvQixFQUFsRSxDQUFrRSxDQUFDLENBQUM7QUFFbEgscUdBQXFHO0FBRXJHLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFDbkMsTUFBTTtBQUNOLDhGQUE4RjtBQUU5RixrQ0FBa0M7QUFDbEMsK0RBQStEO0FBQy9ELHVCQUF1QjtBQUN2QixnREFBZ0Q7QUFDaEQsb0RBQW9EO0FBQ3BELGdDQUFnQztBQUNoQyx3QkFBd0I7QUFDeEIsUUFBUTtBQUNSLGlCQUFpQjtBQUNqQixNQUFNO0FBZ0ROO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTlDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw0QkFBTztnQkFDUCxtQ0FBZTtnQkFDZix3QkFBVTtnQkFDVixxQ0FBZ0I7Z0JBQ2pCLG9CQUFvQjtnQkFDbkIsbUJBQW1CO2dCQUNuQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qix1REFBOEI7Z0JBQzlCLGlDQUF3QjthQU8zQjtZQUNELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1lBQ25DLFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx1Q0FBaUI7Z0JBQ2pCLG9DQUFnQjthQUNuQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxxQ0FBZ0I7Z0JBQ2hCLHVEQUFtQjthQUt0QjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuXHJcbi8vaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XHJcbmltcG9ydCBcIi4vYnVuZGxlLWNvbmZpZ1wiO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwQ29uZmlnTW9kdWxlIH0gZnJvbSBcIi4vY29uZmlnL2FwcC1jb25maWcubW9kdWxlXCI7XHJcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi9jb3JlL2NvcmUubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1haW5QYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluLXBhZ2UvbWFpbi1wYWdlLmNvbXBvbmVudCc7XHJcbi8vaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcblxyXG4vL2ltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbi8vaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdGlvbk1vZHVsZSB9IGZyb20gXCIuL3Byb2R1Y3Rpb24vcHJvZHVjdGlvbi5tb2R1bGVcIjtcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBJdGVtTWFzdGVyTW9kdWxlIH0gZnJvbSBcIi4vaXRlbS1tYXN0ZXIvaXRlbS1tYXN0ZXIubW9kdWxlXCI7XHJcbmltcG9ydCB7IFNldHRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9jb3JlL3NldHRpbmdzL3NldHRpbmcvc2V0dGluZy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7cmVnaXN0ZXJFbGVtZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJGaWx0ZXJhYmxlTGlzdHBpY2tlclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZpbHRlcmFibGUtbGlzdHBpY2tlclwiKS5GaWx0ZXJhYmxlTGlzdHBpY2tlcik7XHJcblxyXG4vL3JlZ2lzdGVyRWxlbWVudChcIkJhcmNvZGVTY2FubmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIikuQmFyY29kZVNjYW5uZXJWaWV3KTtcclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXJjb2RlU2Nhbm5lcigpIHtcclxuLy8gICAgIHJldHVybiBuZXcgQmFyY29kZVNjYW5uZXIoKTtcclxuLy8gICB9XHJcbi8vcmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9rZW5HZXR0ZXIoKSB7XHJcbi8vICAgICBsZXQganNvblN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XHJcbi8vICAgICBpZiAoanNvblN0cmluZyl7XHJcbi8vICAgICAgICAgbGV0IGF1dGhvYmogPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4vLyAgICAgICAgIGxldCB0b2tlbiA9XCJCZWFyZXIgXCIrIGF1dGhvYmouYXV0aF90b2tlbjtcclxuLy8gICAgICAgICAvL2NvbnNvbGUubG9nKHRva2VuKTtcclxuLy8gICAgICAgICByZXR1cm4gdG9rZW47XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gXCJcIjtcclxuLy8gICB9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50ICAgICAgICBcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIHJvdXRpbmcsXHJcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgSXRlbU1hc3Rlck1vZHVsZSxcclxuICAgICAgIC8vIFNhbGVzb3JkZXJNb2R1bGUsXHJcbiAgICAgICAgLy9Qcm9kdWN0aW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIC8vIEp3dE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAvLyAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxyXG4gICAgICAgIC8vICAgICAgIHNraXBXaGVuRXhwaXJlZDogdHJ1ZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KSAgIFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LCAgICAgXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgTWFpblBhZ2VDb21wb25lbnQsXHJcbiAgICAgICAgU2V0dGluZ0NvbXBvbmVudCBcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBBdXRoZ3VhcmRTZXJ2aWNlLFxyXG4gICAgICAgIE1vZGFsRGF0ZXRpbWVwaWNrZXIsXHJcbiAgICAgICAvLyBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAvLyAgIHsgcHJvdmlkZTogQmFyY29kZVNjYW5uZXIsIHVzZUZhY3Rvcnk6IChjcmVhdGVCYXJjb2RlU2Nhbm5lcikgfSxcclxuICAgICAgICAvLyB7cHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyfVxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19