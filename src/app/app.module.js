"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-ui-listview/angular");
var side_drawer_directives_1 = require("nativescript-ui-sidedrawer/angular/side-drawer-directives");
var http_client_1 = require("nativescript-angular/http-client");
var nativescript_modal_datetimepicker_1 = require("nativescript-modal-datetimepicker");
var ApplicationSettings = require("application-settings");
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
function tokenGetter() {
    var jsonString = ApplicationSettings.getString("token");
    if (jsonString) {
        var authobj = JSON.parse(jsonString);
        var token = "Bearer " + authobj.auth_token;
        //console.log(token);
        return token;
    }
    return "";
}
exports.tokenGetter = tokenGetter;
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent,
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
                nativescript_barcodescanner_1.BarcodeScanner
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRzlFLG9EQUFxRTtBQUNyRSw0REFBZ0Y7QUFDaEYsb0dBQTJHO0FBQzNHLGdFQUFnRjtBQUNoRix1RkFBd0U7QUFDeEUsMERBQTREO0FBRTVELGdFQUE4RDtBQUM5RCxnRUFBNkQ7QUFDN0Qsa0RBQWdEO0FBQ2hELG9FQUFrRTtBQUNsRSx1RUFBb0U7QUFDcEUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQywwRUFBd0U7QUFDeEUsMkVBQTZEO0FBQzdELDBFQUF1RTtBQUN2RSxrQ0FBZSxDQUFDLGdCQUFnQixFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxrQkFBa0IsRUFBekQsQ0FBeUQsQ0FBQyxDQUFDO0FBRW5HLDhGQUE4RjtBQUU5RixTQUFnQixXQUFXO0lBQ3ZCLElBQUksVUFBVSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4RCxJQUFJLFVBQVUsRUFBQztRQUNYLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsSUFBSSxLQUFLLEdBQUUsU0FBUyxHQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDekMscUJBQXFCO1FBQ3JCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBVEgsa0NBU0c7QUEwQ0g7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBeENyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFFZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLHFDQUFnQjtnQkFDaEIsbUNBQWU7Z0JBQ2Ysd0JBQVU7Z0JBQ1Ysb0NBQWdCO2dCQUNoQiwrQkFBdUI7Z0JBQ3ZCLDBDQUE0QjtnQkFDNUIsc0NBQTRCO2dCQUM1Qix1REFBOEI7YUFPakM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsdUNBQWlCO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLHFDQUFnQjtnQkFDaEIsdURBQW1CO2dCQUNuQiw0Q0FBYzthQUVqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BhdXRoMC9hbmd1bGFyLWp3dCc7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cC1jbGllbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxEYXRldGltZXBpY2tlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbW9kYWwtZGF0ZXRpbWVwaWNrZXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XHJcblxyXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vYXV0aC9sb2dpbi9sb2dpbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBBcHBDb25maWdNb2R1bGUgfSBmcm9tIFwiLi9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQ29yZU1vZHVsZSB9IGZyb20gXCIuL2NvcmUvY29yZS5tb2R1bGVcIjtcclxuaW1wb3J0IHsgU2FsZXNvcmRlck1vZHVsZSB9IGZyb20gXCIuL3NhbGVzb3JkZXIvc2FsZXNvcmRlci5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTWFpblBhZ2VDb21wb25lbnQgfSBmcm9tICcuL21haW4tcGFnZS9tYWluLXBhZ2UuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xyXG5pbXBvcnQgeyBCYXJjb2RlU2Nhbm5lciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXJcIjtcclxuaW1wb3J0IHsgQXV0aGd1YXJkU2VydmljZSB9IGZyb20gXCIuL2F1dGgvYXV0aGd1YXJkL2F1dGgtZ3VhcmQtc2VydmljZVwiO1xyXG5yZWdpc3RlckVsZW1lbnQoXCJCYXJjb2RlU2Nhbm5lclwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWJhcmNvZGVzY2FubmVyXCIpLkJhcmNvZGVTY2FubmVyVmlldyk7XHJcblxyXG4vL3JlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRva2VuR2V0dGVyKCkge1xyXG4gICAgbGV0IGpzb25TdHJpbmcgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpO1xyXG4gICAgaWYgKGpzb25TdHJpbmcpe1xyXG4gICAgICAgIGxldCBhdXRob2JqID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuICAgICAgICBsZXQgdG9rZW4gPVwiQmVhcmVyIFwiKyBhdXRob2JqLmF1dGhfdG9rZW47XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyh0b2tlbik7XHJcbiAgICAgICAgcmV0dXJuIHRva2VuO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxyXG4gICAgICAgIENvcmVNb2R1bGUsXHJcbiAgICAgICAgU2FsZXNvcmRlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIC8vIEp3dE1vZHVsZS5mb3JSb290KHtcclxuICAgICAgICAvLyAgICAgY29uZmlnOiB7XHJcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxyXG4gICAgICAgIC8vICAgICAgIHNraXBXaGVuRXhwaXJlZDogdHJ1ZVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gICB9KSAgIFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCwgICAgIFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIE1haW5QYWdlQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQXV0aGd1YXJkU2VydmljZSxcclxuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyLFxyXG4gICAgICAgIEJhcmNvZGVTY2FubmVyXHJcbiAgICAgICAgXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuLypcclxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxyXG4qL1xyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=