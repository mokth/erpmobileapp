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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBRzlFLG9EQUFxRTtBQUNyRSw0REFBZ0Y7QUFDaEYsb0dBQTJHO0FBQzNHLGdFQUFnRjtBQUNoRix1RkFBd0U7QUFDeEUsMERBQTREO0FBRTVELGdFQUE4RDtBQUM5RCxnRUFBNkQ7QUFDN0Qsa0RBQWdEO0FBQ2hELG9FQUFrRTtBQUNsRSx1RUFBb0U7QUFDcEUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQywwRUFBd0U7QUFDeEUsMkVBQTZEO0FBQzdELGtDQUFlLENBQUMsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLGtCQUFrQixFQUF6RCxDQUF5RCxDQUFDLENBQUM7QUFFbkcsOEZBQThGO0FBRTlGLFNBQWdCLFdBQVc7SUFDdkIsSUFBSSxVQUFVLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hELElBQUksVUFBVSxFQUFDO1FBQ1gsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBRSxTQUFTLEdBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUN6QyxxQkFBcUI7UUFDckIsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFUSCxrQ0FTRztBQXlDSDtJQUhBOztNQUVFO0lBQ0Y7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF2Q3JCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUVmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIscUNBQWdCO2dCQUNoQixtQ0FBZTtnQkFDZix3QkFBVTtnQkFDVixvQ0FBZ0I7Z0JBQ2hCLCtCQUF1QjtnQkFDdkIsMENBQTRCO2dCQUM1QixzQ0FBNEI7Z0JBQzVCLHVEQUE4QjthQU9qQztZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCx1Q0FBaUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsdURBQW1CO2dCQUNuQiw0Q0FBYzthQUVqQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgSnd0TW9kdWxlIH0gZnJvbSAnQGF1dGgwL2FuZ3VsYXItand0JztcblxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhcic7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhci9zaWRlLWRyYXdlci1kaXJlY3RpdmVzXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwQ2xpZW50TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHAtY2xpZW50XCI7XG5pbXBvcnQgeyBNb2RhbERhdGV0aW1lcGlja2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tb2RhbC1kYXRldGltZXBpY2tlclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tICdhcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoL2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBDb25maWdNb2R1bGUgfSBmcm9tIFwiLi9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGVcIjtcbmltcG9ydCB7IENvcmVNb2R1bGUgfSBmcm9tIFwiLi9jb3JlL2NvcmUubW9kdWxlXCI7XG5pbXBvcnQgeyBTYWxlc29yZGVyTW9kdWxlIH0gZnJvbSBcIi4vc2FsZXNvcmRlci9zYWxlc29yZGVyLm1vZHVsZVwiO1xuaW1wb3J0IHsgTWFpblBhZ2VDb21wb25lbnQgfSBmcm9tICcuL21haW4tcGFnZS9tYWluLXBhZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7IEJhcmNvZGVTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiO1xucmVnaXN0ZXJFbGVtZW50KFwiQmFyY29kZVNjYW5uZXJcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1iYXJjb2Rlc2Nhbm5lclwiKS5CYXJjb2RlU2Nhbm5lclZpZXcpO1xuXG4vL3JlZ2lzdGVyRWxlbWVudChcIlB1bGxUb1JlZnJlc2hcIiwgKCkgPT4gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wdWxsdG9yZWZyZXNoXCIpLlB1bGxUb1JlZnJlc2gpO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9rZW5HZXR0ZXIoKSB7XG4gICAgbGV0IGpzb25TdHJpbmcgPSBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhcInRva2VuXCIpO1xuICAgIGlmIChqc29uU3RyaW5nKXtcbiAgICAgICAgbGV0IGF1dGhvYmogPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuICAgICAgICBsZXQgdG9rZW4gPVwiQmVhcmVyIFwiKyBhdXRob2JqLmF1dGhfdG9rZW47XG4gICAgICAgIC8vY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgXG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgQXBwQ29uZmlnTW9kdWxlLFxuICAgICAgICBDb3JlTW9kdWxlLFxuICAgICAgICBTYWxlc29yZGVyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICAvLyBKd3RNb2R1bGUuZm9yUm9vdCh7XG4gICAgICAgIC8vICAgICBjb25maWc6IHtcbiAgICAgICAgLy8gICAgICAgdG9rZW5HZXR0ZXI6IHRva2VuR2V0dGVyLFxuICAgICAgICAvLyAgICAgICBza2lwV2hlbkV4cGlyZWQ6IHRydWVcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICB9KSAgIFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCwgICAgIFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgTWFpblBhZ2VDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBNb2RhbERhdGV0aW1lcGlja2VyLFxuICAgICAgICBCYXJjb2RlU2Nhbm5lclxuICAgICAgICBcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=