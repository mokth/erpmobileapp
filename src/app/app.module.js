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
var production_module_1 = require("./production/production.module");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLHNEQUF1RTtBQUV2RSxvREFBcUU7QUFDckUsNERBQWdGO0FBQ2hGLG9HQUEyRztBQUMzRyxnRUFBZ0Y7QUFDaEYsdUZBQXdFO0FBRXhFLDhEQUE4RDtBQUM5RCwyQkFBeUI7QUFFekIsZ0VBQThEO0FBQzlELGdFQUE2RDtBQUM3RCxrREFBZ0Q7QUFDaEQsdUVBQW9FO0FBQ3BFLDBEQUEwRDtBQUMxRCxpREFBK0M7QUFFL0MsMEVBQTBFO0FBQzFFLCtEQUErRDtBQUMvRCwwRUFBdUU7QUFDdkUsb0VBQWtFO0FBQ2xFLDJEQUErQztBQUMvQyxxR0FBcUc7QUFFckcsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQyxNQUFNO0FBQ04sOEZBQThGO0FBRTlGLGtDQUFrQztBQUNsQywrREFBK0Q7QUFDL0QsdUJBQXVCO0FBQ3ZCLGdEQUFnRDtBQUNoRCxvREFBb0Q7QUFDcEQsZ0NBQWdDO0FBQ2hDLHdCQUF3QjtBQUN4QixRQUFRO0FBQ1IsaUJBQWlCO0FBQ2pCLE1BQU07QUE4Q047SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBNUNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLDRCQUFPO2dCQUNQLG1DQUFlO2dCQUNmLHdCQUFVO2dCQUNYLG9CQUFvQjtnQkFDbkIsb0NBQWdCO2dCQUNoQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qix1REFBOEI7Z0JBQzlCLGlDQUF3QjthQU8zQjtZQUNELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1lBQ25DLFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx1Q0FBaUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AscUNBQWdCO2dCQUNoQix1REFBbUI7YUFLdEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztRQUNGOztVQUVFO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5TTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcblxyXG4vL2ltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgXCIuL2J1bmRsZS1jb25maWdcIjtcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcENvbmZpZ01vZHVsZSB9IGZyb20gXCIuL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSBcIi4vY29yZS9jb3JlLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNYWluUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi1wYWdlL21haW4tcGFnZS5jb21wb25lbnQnO1xyXG4vL2ltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5cclxuLy9pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG4vL2ltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xyXG5pbXBvcnQgeyBBdXRoZ3VhcmRTZXJ2aWNlIH0gZnJvbSBcIi4vYXV0aC9hdXRoZ3VhcmQvYXV0aC1ndWFyZC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFByb2R1Y3Rpb25Nb2R1bGUgfSBmcm9tIFwiLi9wcm9kdWN0aW9uL3Byb2R1Y3Rpb24ubW9kdWxlXCI7XHJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuLy9yZWdpc3RlckVsZW1lbnQoXCJCYXJjb2RlU2Nhbm5lclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCIpLkJhcmNvZGVTY2FubmVyVmlldyk7XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFyY29kZVNjYW5uZXIoKSB7XHJcbi8vICAgICByZXR1cm4gbmV3IEJhcmNvZGVTY2FubmVyKCk7XHJcbi8vICAgfVxyXG4vL3JlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRva2VuR2V0dGVyKCkge1xyXG4vLyAgICAgbGV0IGpzb25TdHJpbmcgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpO1xyXG4vLyAgICAgaWYgKGpzb25TdHJpbmcpe1xyXG4vLyAgICAgICAgIGxldCBhdXRob2JqID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuLy8gICAgICAgICBsZXQgdG9rZW4gPVwiQmVhcmVyIFwiKyBhdXRob2JqLmF1dGhfdG9rZW47XHJcbi8vICAgICAgICAgLy9jb25zb2xlLmxvZyh0b2tlbik7XHJcbi8vICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgfVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICByb3V0aW5nLFxyXG4gICAgICAgIEFwcENvbmZpZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgLy8gU2FsZXNvcmRlck1vZHVsZSxcclxuICAgICAgICBQcm9kdWN0aW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlLFxyXG4gICAgICAgIC8vIEp3dE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAvLyAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxyXG4gICAgICAgIC8vICAgICAgIHNraXBXaGVuRXhwaXJlZDogdHJ1ZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KSAgIFxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LCAgICAgXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgTWFpblBhZ2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBBdXRoZ3VhcmRTZXJ2aWNlLFxyXG4gICAgICAgIE1vZGFsRGF0ZXRpbWVwaWNrZXIsXHJcbiAgICAgICAvLyBCYXJjb2RlU2Nhbm5lcixcclxuICAgICAvLyAgIHsgcHJvdmlkZTogQmFyY29kZVNjYW5uZXIsIHVzZUZhY3Rvcnk6IChjcmVhdGVCYXJjb2RlU2Nhbm5lcikgfSxcclxuICAgICAgICAvLyB7cHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyfVxyXG4gICAgICAgIFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbi8qXHJcblBhc3MgeW91ciBhcHBsaWNhdGlvbiBtb2R1bGUgdG8gdGhlIGJvb3RzdHJhcE1vZHVsZSBmdW5jdGlvbiBsb2NhdGVkIGluIG1haW4udHMgdG8gc3RhcnQgeW91ciBhcHBcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19