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
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-ui-listview/angular");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var http_client_1 = require("nativescript-angular/http-client");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var nativescript_angular_1 = require("nativescript-angular");
//import * as ApplicationSettings from 'application-settings';
var login_component_1 = require("./auth/login/login.component");
var app_config_module_1 = require("./config/app-config.module");
var core_module_1 = require("./core/core.module");
var salesorder_module_1 = require("./salesorder/salesorder.module");
var main_page_component_1 = require("./main-page/main-page.component");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
var production_module_1 = require("./production/production.module");
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
                app_routing_module_1.AppRoutingModule,
                app_config_module_1.AppConfigModule,
                core_module_1.CoreModule,
                salesorder_module_1.SalesorderModule,
                production_module_1.ProductionModule,
                forms_1.NativeScriptFormsModule,
                http_client_1.NativeScriptHttpClientModule,
                angular_1.NativeScriptUIListViewModule,
                side_drawer_directives_1.NativeScriptUISideDrawerModule,
            ],
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
                { provide: core_1.NgModuleFactoryLoader, useClass: nativescript_angular_1.NSModuleFactoryLoader }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLG9EQUFxRTtBQUNyRSw0REFBZ0Y7QUFDaEYsb0dBQTJHO0FBQzNHLGdFQUFnRjtBQUNoRix1RkFBd0U7QUFDeEUsNkRBQTZEO0FBQzdELDhEQUE4RDtBQUU5RCxnRUFBOEQ7QUFDOUQsZ0VBQTZEO0FBQzdELGtEQUFnRDtBQUNoRCxvRUFBa0U7QUFDbEUsdUVBQW9FO0FBQ3BFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFHL0MsMkVBQTZEO0FBQzdELDBFQUF1RTtBQUN2RSxvRUFBa0U7QUFDbEUscUdBQXFHO0FBRXJHLFNBQWdCLG9CQUFvQjtJQUNoQyxPQUFPLElBQUksNENBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7QUFGSCxvREFFRztBQUNILDhGQUE4RjtBQUU5RixrQ0FBa0M7QUFDbEMsK0RBQStEO0FBQy9ELHVCQUF1QjtBQUN2QixnREFBZ0Q7QUFDaEQsb0RBQW9EO0FBQ3BELGdDQUFnQztBQUNoQyx3QkFBd0I7QUFDeEIsUUFBUTtBQUNSLGlCQUFpQjtBQUNqQixNQUFNO0FBNENOO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQTFDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQixxQ0FBZ0I7Z0JBQ2hCLG1DQUFlO2dCQUNmLHdCQUFVO2dCQUNWLG9DQUFnQjtnQkFDaEIsb0NBQWdCO2dCQUNoQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qix1REFBOEI7YUFPakM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsdUNBQWlCO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHFDQUFnQjtnQkFDaEIsdURBQW1CO2dCQUNwQixrQkFBa0I7Z0JBQ2pCLEVBQUUsT0FBTyxFQUFFLDRDQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDL0QsRUFBQyxPQUFPLEVBQUUsNEJBQXFCLEVBQUUsUUFBUSxFQUFFLDRDQUFxQixFQUFDO2FBRXBFO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7UUFDRjs7VUFFRTtPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyJztcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXIvc2lkZS1kcmF3ZXItZGlyZWN0aXZlc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XHJcbmltcG9ydCB7IE1vZGFsRGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1vZGFsLWRhdGV0aW1lcGlja2VyXCI7XHJcbmltcG9ydCB7IE5TTW9kdWxlRmFjdG9yeUxvYWRlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xyXG4vL2ltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tICcuL2F1dGgvbG9naW4vbG9naW4uY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwQ29uZmlnTW9kdWxlIH0gZnJvbSBcIi4vY29uZmlnL2FwcC1jb25maWcubW9kdWxlXCI7XHJcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi9jb3JlL2NvcmUubW9kdWxlXCI7XHJcbmltcG9ydCB7IFNhbGVzb3JkZXJNb2R1bGUgfSBmcm9tIFwiLi9zYWxlc29yZGVyL3NhbGVzb3JkZXIubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1haW5QYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9tYWluLXBhZ2UvbWFpbi1wYWdlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcclxuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCI7XHJcbmltcG9ydCB7IEF1dGhndWFyZFNlcnZpY2UgfSBmcm9tIFwiLi9hdXRoL2F1dGhndWFyZC9hdXRoLWd1YXJkLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUHJvZHVjdGlvbk1vZHVsZSB9IGZyb20gXCIuL3Byb2R1Y3Rpb24vcHJvZHVjdGlvbi5tb2R1bGVcIjtcclxuLy9yZWdpc3RlckVsZW1lbnQoXCJCYXJjb2RlU2Nhbm5lclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCIpLkJhcmNvZGVTY2FubmVyVmlldyk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQmFyY29kZVNjYW5uZXIoKSB7XHJcbiAgICByZXR1cm4gbmV3IEJhcmNvZGVTY2FubmVyKCk7XHJcbiAgfVxyXG4vL3JlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHRva2VuR2V0dGVyKCkge1xyXG4vLyAgICAgbGV0IGpzb25TdHJpbmcgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpO1xyXG4vLyAgICAgaWYgKGpzb25TdHJpbmcpe1xyXG4vLyAgICAgICAgIGxldCBhdXRob2JqID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuLy8gICAgICAgICBsZXQgdG9rZW4gPVwiQmVhcmVyIFwiKyBhdXRob2JqLmF1dGhfdG9rZW47XHJcbi8vICAgICAgICAgLy9jb25zb2xlLmxvZyh0b2tlbik7XHJcbi8vICAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgfVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEFwcENvbmZpZ01vZHVsZSxcclxuICAgICAgICBDb3JlTW9kdWxlLFxyXG4gICAgICAgIFNhbGVzb3JkZXJNb2R1bGUsXHJcbiAgICAgICAgUHJvZHVjdGlvbk1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIC8vIEp3dE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAvLyAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxyXG4gICAgICAgIC8vICAgICAgIHNraXBXaGVuRXhwaXJlZDogdHJ1ZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KSAgIFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCwgICAgIFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIE1haW5QYWdlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXV0aGd1YXJkU2VydmljZSxcclxuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyLFxyXG4gICAgICAgLy8gQmFyY29kZVNjYW5uZXIsXHJcbiAgICAgICAgeyBwcm92aWRlOiBCYXJjb2RlU2Nhbm5lciwgdXNlRmFjdG9yeTogKGNyZWF0ZUJhcmNvZGVTY2FubmVyKSB9LFxyXG4gICAgICAgIHtwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXJ9XHJcbiAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=