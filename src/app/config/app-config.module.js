"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//const appConfig = <AppConfig>require(environment.appConfigFile);
var appConfig = {
    appType: "Ns",
    apiEndpoint: "http://wincom2cloud.com/ERP6Service/",
    loggingEnabled: true
};
exports.APP_CONFIG = new core_1.InjectionToken('app.config');
var AppConfigModule = /** @class */ (function () {
    function AppConfigModule() {
    }
    AppConfigModule = __decorate([
        core_1.NgModule({
            providers: [
                { provide: exports.APP_CONFIG, useValue: appConfig }
            ]
        })
    ], AppConfigModule);
    return AppConfigModule;
}());
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtY29uZmlnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5RDtBQU96RCxrRUFBa0U7QUFFakUsSUFBTSxTQUFTLEdBQWE7SUFDeEIsT0FBTyxFQUFFLElBQUk7SUFDYixXQUFXLEVBQUUsc0NBQXNDO0lBQ25ELGNBQWMsRUFBRSxJQUFJO0NBQ3ZCLENBQUE7QUFFVyxRQUFBLFVBQVUsR0FBRyxJQUFJLHFCQUFjLENBQVksWUFBWSxDQUFDLENBQUM7QUFPdEU7SUFBQTtJQUVDLENBQUM7SUFGVyxlQUFlO1FBTDNCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxrQkFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7YUFDL0M7U0FDSixDQUFDO09BQ1csZUFBZSxDQUUxQjtJQUFELHNCQUFDO0NBQUEsQUFGRixJQUVFO0FBRlcsMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gJy4uL2NvcmUvbW9kZWwvYXBwLWNvbmZpZy5tb2RlbCc7XHJcbmltcG9ydCB7IGVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnRzL2Vudmlyb25tZW50JztcclxuXHJcblxyXG5cclxuLy9jb25zdCBhcHBDb25maWcgPSA8QXBwQ29uZmlnPnJlcXVpcmUoZW52aXJvbm1lbnQuYXBwQ29uZmlnRmlsZSk7XHJcblxyXG4gY29uc3QgYXBwQ29uZmlnOkFwcENvbmZpZyA9IHtcclxuICAgICBhcHBUeXBlOiBcIk5zXCIsXHJcbiAgICAgYXBpRW5kcG9pbnQ6IFwiaHR0cDovL3dpbmNvbTJjbG91ZC5jb20vRVJQNlNlcnZpY2UvXCIsXHJcbiAgICAgbG9nZ2luZ0VuYWJsZWQ6IHRydWVcclxuIH1cclxuXHJcbmV4cG9ydCBjb25zdCBBUFBfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPEFwcENvbmZpZz4oJ2FwcC5jb25maWcnKTtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICB7IHByb3ZpZGU6IEFQUF9DT05GSUcsIHVzZVZhbHVlOiBhcHBDb25maWcgfVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQ29uZmlnTW9kdWxlIHtcclxuICAgIFxyXG4gfSJdfQ==