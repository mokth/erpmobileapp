"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../environments/environment");
var appConfig = require(environment_1.environment.appConfigFile);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNvbmZpZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAtY29uZmlnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCwyREFBMEQ7QUFJMUQsSUFBTSxTQUFTLEdBQWMsT0FBTyxDQUFDLHlCQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFbkQsUUFBQSxVQUFVLEdBQUcsSUFBSSxxQkFBYyxDQUFZLFlBQVksQ0FBQyxDQUFDO0FBT3RFO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBTDNCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCxFQUFFLE9BQU8sRUFBRSxrQkFBVSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7YUFDL0M7U0FDSixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gJy4uL2Vudmlyb25tZW50cy9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCB7IEFwcENvbmZpZyB9IGZyb20gJy4uL2NvcmUvbW9kZWwvYXBwLWNvbmZpZy5tb2RlbCc7XHJcblxyXG5cclxuY29uc3QgYXBwQ29uZmlnID0gPEFwcENvbmZpZz5yZXF1aXJlKGVudmlyb25tZW50LmFwcENvbmZpZ0ZpbGUpO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFQUF9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW48QXBwQ29uZmlnPignYXBwLmNvbmZpZycpO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogQVBQX0NPTkZJRywgdXNlVmFsdWU6IGFwcENvbmZpZyB9XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb25maWdNb2R1bGUgeyB9Il19