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
    erpEndpoint: "https://www.wincom2cloud.com/erpv4/",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtY29uZmlnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUF5RDtBQU96RCxrRUFBa0U7QUFFakUsSUFBTSxTQUFTLEdBQWE7SUFDeEIsT0FBTyxFQUFFLElBQUk7SUFDYixXQUFXLEVBQUUsc0NBQXNDO0lBQ25ELFdBQVcsRUFBRSxxQ0FBcUM7SUFDbEQsY0FBYyxFQUFFLElBQUk7Q0FDdkIsQ0FBQTtBQUVXLFFBQUEsVUFBVSxHQUFHLElBQUkscUJBQWMsQ0FBWSxZQUFZLENBQUMsQ0FBQztBQU90RTtJQUFBO0lBRUMsQ0FBQztJQUZXLGVBQWU7UUFMM0IsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLEVBQUUsT0FBTyxFQUFFLGtCQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRTthQUMvQztTQUNKLENBQUM7T0FDVyxlQUFlLENBRTFCO0lBQUQsc0JBQUM7Q0FBQSxBQUZGLElBRUU7QUFGVywwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi4vY29yZS9tb2RlbC9hcHAtY29uZmlnLm1vZGVsJztcclxuaW1wb3J0IHsgZW52aXJvbm1lbnQgfSBmcm9tICcuLi9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQnO1xyXG5cclxuXHJcblxyXG4vL2NvbnN0IGFwcENvbmZpZyA9IDxBcHBDb25maWc+cmVxdWlyZShlbnZpcm9ubWVudC5hcHBDb25maWdGaWxlKTtcclxuXHJcbiBjb25zdCBhcHBDb25maWc6QXBwQ29uZmlnID0ge1xyXG4gICAgIGFwcFR5cGU6IFwiTnNcIixcclxuICAgICBhcGlFbmRwb2ludDogXCJodHRwOi8vd2luY29tMmNsb3VkLmNvbS9FUlA2U2VydmljZS9cIixcclxuICAgICBlcnBFbmRwb2ludDogXCJodHRwczovL3d3dy53aW5jb20yY2xvdWQuY29tL2VycHY0L1wiLFxyXG4gICAgIGxvZ2dpbmdFbmFibGVkOiB0cnVlXHJcbiB9XHJcblxyXG5leHBvcnQgY29uc3QgQVBQX0NPTkZJRyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxBcHBDb25maWc+KCdhcHAuY29uZmlnJyk7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgeyBwcm92aWRlOiBBUFBfQ09ORklHLCB1c2VWYWx1ZTogYXBwQ29uZmlnIH1cclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcENvbmZpZ01vZHVsZSB7XHJcbiAgICBcclxuIH0iXX0=