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
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var auth_guard_service_1 = require("./auth/authguard/auth-guard-service");
element_registry_1.registerElement("BarcodeScanner", function () { return require("nativescript-barcodescanner").BarcodeScannerView; });
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
                nativescript_barcodescanner_1.BarcodeScanner,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBa0Y7QUFDbEYsZ0ZBQThFO0FBRTlFLG9EQUFxRTtBQUNyRSw0REFBZ0Y7QUFDaEYsb0dBQTJHO0FBQzNHLGdFQUFnRjtBQUNoRix1RkFBd0U7QUFDeEUsNkRBQTZEO0FBQzdELDhEQUE4RDtBQUU5RCxnRUFBOEQ7QUFDOUQsZ0VBQTZEO0FBQzdELGtEQUFnRDtBQUNoRCxvRUFBa0U7QUFDbEUsdUVBQW9FO0FBQ3BFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsMEVBQXdFO0FBQ3hFLDJFQUE2RDtBQUM3RCwwRUFBdUU7QUFDdkUsa0NBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsa0JBQWtCLEVBQXpELENBQXlELENBQUMsQ0FBQztBQUVuRyw4RkFBOEY7QUFFOUYsa0NBQWtDO0FBQ2xDLCtEQUErRDtBQUMvRCx1QkFBdUI7QUFDdkIsZ0RBQWdEO0FBQ2hELG9EQUFvRDtBQUNwRCxnQ0FBZ0M7QUFDaEMsd0JBQXdCO0FBQ3hCLFFBQVE7QUFDUixpQkFBaUI7QUFDakIsTUFBTTtBQTBDTjtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF4Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIscUNBQWdCO2dCQUNoQixtQ0FBZTtnQkFDZix3QkFBVTtnQkFDVixvQ0FBZ0I7Z0JBQ2hCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7Z0JBQzVCLHVEQUE4QjthQU9qQztZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx1Q0FBaUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AscUNBQWdCO2dCQUNoQix1REFBbUI7Z0JBQ25CLDRDQUFjO2dCQUNkLEVBQUMsT0FBTyxFQUFFLDRCQUFxQixFQUFFLFFBQVEsRUFBRSw0Q0FBcUIsRUFBQzthQUVwRTtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuXHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhcic7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyL3NpZGUtZHJhd2VyLWRpcmVjdGl2ZXNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiO1xyXG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcclxuLy9pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gJ2FwcGxpY2F0aW9uLXNldHRpbmdzJztcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEFwcENvbmZpZ01vZHVsZSB9IGZyb20gXCIuL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBDb3JlTW9kdWxlIH0gZnJvbSBcIi4vY29yZS9jb3JlLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBTYWxlc29yZGVyTW9kdWxlIH0gZnJvbSBcIi4vc2FsZXNvcmRlci9zYWxlc29yZGVyLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNYWluUGFnZUNvbXBvbmVudCB9IGZyb20gJy4vbWFpbi1wYWdlL21haW4tcGFnZS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XHJcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xyXG5pbXBvcnQgeyBBdXRoZ3VhcmRTZXJ2aWNlIH0gZnJvbSBcIi4vYXV0aC9hdXRoZ3VhcmQvYXV0aC1ndWFyZC1zZXJ2aWNlXCI7XHJcbnJlZ2lzdGVyRWxlbWVudChcIkJhcmNvZGVTY2FubmVyXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIikuQmFyY29kZVNjYW5uZXJWaWV3KTtcclxuXHJcbi8vcmVnaXN0ZXJFbGVtZW50KFwiUHVsbFRvUmVmcmVzaFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXB1bGx0b3JlZnJlc2hcIikuUHVsbFRvUmVmcmVzaCk7XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gdG9rZW5HZXR0ZXIoKSB7XHJcbi8vICAgICBsZXQganNvblN0cmluZyA9IEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XHJcbi8vICAgICBpZiAoanNvblN0cmluZyl7XHJcbi8vICAgICAgICAgbGV0IGF1dGhvYmogPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4vLyAgICAgICAgIGxldCB0b2tlbiA9XCJCZWFyZXIgXCIrIGF1dGhvYmouYXV0aF90b2tlbjtcclxuLy8gICAgICAgICAvL2NvbnNvbGUubG9nKHRva2VuKTtcclxuLy8gICAgICAgICByZXR1cm4gdG9rZW47XHJcbi8vICAgICB9XHJcbi8vICAgICByZXR1cm4gXCJcIjtcclxuLy8gICB9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50ICAgICAgICBcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgU2FsZXNvcmRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIC8vIEp3dE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAvLyAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxyXG4gICAgICAgIC8vICAgICAgIHNraXBXaGVuRXhwaXJlZDogdHJ1ZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KSAgIFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCwgICAgIFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIE1haW5QYWdlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXV0aGd1YXJkU2VydmljZSxcclxuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyLFxyXG4gICAgICAgIEJhcmNvZGVTY2FubmVyLFxyXG4gICAgICAgIHtwcm92aWRlOiBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIHVzZUNsYXNzOiBOU01vZHVsZUZhY3RvcnlMb2FkZXJ9XHJcbiAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=