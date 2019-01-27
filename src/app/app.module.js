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
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
var production_module_1 = require("./production/production.module");
var app_routing_module_1 = require("./app-routing.module");
//registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);
function createBarcodeScanner() {
    return new nativescript_barcodescanner_1.BarcodeScanner();
}
exports.createBarcodeScanner = createBarcodeScanner;
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
                production_module_1.ProductionModule,
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
                // BarcodeScanner,
                { provide: nativescript_barcodescanner_1.BarcodeScanner, useFactory: (createBarcodeScanner) },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLHNEQUF1RTtBQUV2RSxvREFBcUU7QUFDckUsNERBQWdGO0FBQ2hGLG9HQUEyRztBQUMzRyxnRUFBZ0Y7QUFDaEYsdUZBQXdFO0FBRXhFLDhEQUE4RDtBQUM5RCwyQkFBeUI7QUFFekIsZ0VBQThEO0FBQzlELGdFQUE2RDtBQUM3RCxrREFBZ0Q7QUFDaEQsdUVBQW9FO0FBQ3BFLDBEQUEwRDtBQUMxRCxpREFBK0M7QUFHL0MsMkVBQTZEO0FBQzdELDBFQUF1RTtBQUN2RSxvRUFBa0U7QUFDbEUsMkRBQStDO0FBQy9DLHFHQUFxRztBQUVyRyxTQUFnQixvQkFBb0I7SUFDaEMsT0FBTyxJQUFJLDRDQUFjLEVBQUUsQ0FBQztBQUM5QixDQUFDO0FBRkgsb0RBRUc7QUFDSCw4RkFBOEY7QUFFOUYsa0NBQWtDO0FBQ2xDLCtEQUErRDtBQUMvRCx1QkFBdUI7QUFDdkIsZ0RBQWdEO0FBQ2hELG9EQUFvRDtBQUNwRCxnQ0FBZ0M7QUFDaEMsd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixpQkFBaUI7QUFDakIsTUFBTTtBQThDTjtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUE1Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsNEJBQU87Z0JBQ1AsbUNBQWU7Z0JBQ2Ysd0JBQVU7Z0JBQ1gsb0JBQW9CO2dCQUNuQixvQ0FBZ0I7Z0JBQ2hCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7Z0JBQzVCLHVEQUE4QjtnQkFDOUIsaUNBQXdCO2FBTzNCO1lBQ0QsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7WUFDbkMsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHVDQUFpQjthQUNwQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxxQ0FBZ0I7Z0JBQ2hCLHVEQUFtQjtnQkFDcEIsa0JBQWtCO2dCQUNqQixFQUFFLE9BQU8sRUFBRSw0Q0FBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7YUFHbEU7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5TTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcblxyXG4vL2ltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgXCIuL2J1bmRsZS1jb25maWdcIjtcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcENvbmZpZ01vZHVsZSB9IGZyb20gXCIuL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSBcIi4vY29yZS9jb3JlLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNYWluUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi1wYWdlL21haW4tcGFnZS5jb21wb25lbnQnO1xyXG4vL2ltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdGlvbk1vZHVsZSB9IGZyb20gXCIuL3Byb2R1Y3Rpb24vcHJvZHVjdGlvbi5tb2R1bGVcIjtcclxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG4vL3JlZ2lzdGVyRWxlbWVudChcIkJhcmNvZGVTY2FubmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIikuQmFyY29kZVNjYW5uZXJWaWV3KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCYXJjb2RlU2Nhbm5lcigpIHtcclxuICAgIHJldHVybiBuZXcgQmFyY29kZVNjYW5uZXIoKTtcclxuICB9XHJcbi8vcmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9rZW5HZXR0ZXIoKSB7XHJcbi8vICAgICBsZXQganNvblN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XHJcbi8vICAgICBpZiAoanNvblN0cmluZyl7XHJcbi8vICAgICAgICAgbGV0IGF1dGhvYmogPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4vLyAgICAgICAgIGxldCB0b2tlbiA9XCJCZWFyZXIgXCIrIGF1dGhvYmouYXV0aF90b2tlbjtcclxuLy8gICAgICAgICAvL2NvbnNvbGUubG9nKHRva2VuKTtcclxuLy8gICAgICAgICByZXR1cm4gdG9rZW47XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gXCJcIjtcclxuLy8gICB9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50ICAgICAgICBcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIHJvdXRpbmcsXHJcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAvLyBTYWxlc29yZGVyTW9kdWxlLFxyXG4gICAgICAgIFByb2R1Y3Rpb25Nb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUsXHJcbiAgICAgICAgLy8gSnd0TW9kdWxlLmZvclJvb3Qoe1xyXG4gICAgICAgIC8vICAgICBjb25maWc6IHtcclxuICAgICAgICAvLyAgICAgICB0b2tlbkdldHRlcjogdG9rZW5HZXR0ZXIsXHJcbiAgICAgICAgLy8gICAgICAgc2tpcFdoZW5FeHBpcmVkOiB0cnVlXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyAgIH0pICAgXHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsICAgICBcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBNYWluUGFnZUNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEF1dGhndWFyZFNlcnZpY2UsXHJcbiAgICAgICAgTW9kYWxEYXRldGltZXBpY2tlcixcclxuICAgICAgIC8vIEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIHsgcHJvdmlkZTogQmFyY29kZVNjYW5uZXIsIHVzZUZhY3Rvcnk6IChjcmVhdGVCYXJjb2RlU2Nhbm5lcikgfSxcclxuICAgICAgICAvLyB7cHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyfVxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19