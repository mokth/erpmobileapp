"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_angular_1 = require("nativescript-angular");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var auth_service_1 = require("../../services/auth-service");
var sql_service_1 = require("../../services/sql-service");
var SettingComponent = /** @class */ (function () {
    function SettingComponent(router, auth, sqlser) {
        this.router = router;
        this.auth = auth;
        this.sqlser = sqlser;
        this.input = {
            "api": "",
            "erp": ""
        };
    }
    SettingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sqlser.getSettingPromise()
            .then(function (rows) {
            if (rows) {
                console.log(rows);
                _this.input.api = rows[1];
                _this.input.erp = rows[2];
            }
        });
    };
    SettingComponent.prototype.Save = function () {
        this.sqlser.update(this.input.api, this.input.erp)
            .then(function () {
            (new nativescript_snackbar_1.SnackBar()).simple("Successfully updated.");
        }),
            function (error) {
                (new nativescript_snackbar_1.SnackBar()).simple("Error updating setting.");
            };
    };
    SettingComponent.prototype.Cancel = function () {
        this.router.back();
    };
    SettingComponent = __decorate([
        core_1.Component({
            selector: 'setting',
            templateUrl: './setting.component.html',
            styleUrls: ['./setting.component.css']
        }),
        __metadata("design:paramtypes", [nativescript_angular_1.RouterExtensions,
            auth_service_1.AuthService,
            sql_service_1.SQLService])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCw2REFBd0Q7QUFDeEQsK0RBQWlEO0FBRWpELDREQUEwRDtBQUMxRCwwREFBd0Q7QUFReEQ7SUFFQywwQkFBMkIsTUFBd0IsRUFDcEMsSUFBZ0IsRUFDaEIsTUFBaUI7UUFGTCxXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUNwQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFFL0IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNaLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7U0FDVCxDQUFBO0lBQ0YsQ0FBQztJQUVNLG1DQUFRLEdBQWY7UUFBQSxpQkFTQztRQVJBLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUU7YUFDOUIsSUFBSSxDQUFDLFVBQUEsSUFBSTtZQUNULElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVCO1FBQ0YsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBRUQsK0JBQUksR0FBSjtRQUNDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ2hELElBQUksQ0FBQztZQUNMLENBQUMsSUFBSSxnQ0FBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUM7WUFDRixVQUFDLEtBQUs7Z0JBQ0wsQ0FBQyxJQUFJLGdDQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQTtJQUNGLENBQUM7SUFFRCxpQ0FBTSxHQUFOO1FBQ0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBbkNXLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtZQUN2QyxTQUFTLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztTQUN0QyxDQUFDO3lDQUlrQyx1Q0FBZ0I7WUFDL0IsMEJBQVc7WUFDVCx3QkFBVTtPQUpwQixnQkFBZ0IsQ0FxQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQXJDRCxJQXFDQztBQXJDWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXNuYWNrYmFyJztcblxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgU1FMU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3NxbC1zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnc2V0dGluZycsXG5cdHRlbXBsYXRlVXJsOiAnLi9zZXR0aW5nLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vc2V0dGluZy5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cHVibGljIGlucHV0OiBhbnk7XG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRcdFx0XHQgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXG5cdFx0XHRcdFx0ICAgcHJpdmF0ZSBzcWxzZXI6U1FMU2VydmljZVxuXHRcdFx0XHRcdCAgICkge1xuXHRcdHRoaXMuaW5wdXQgPSB7XG5cdFx0XHRcImFwaVwiOiBcIlwiLFxuXHRcdFx0XCJlcnBcIjogXCJcIlxuXHRcdH1cdFx0XG5cdH1cbiAgXG5cdHB1YmxpYyBuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnNxbHNlci5nZXRTZXR0aW5nUHJvbWlzZSgpXG5cdFx0LnRoZW4ocm93cyA9PiB7IFxuXHRcdFx0aWYgKHJvd3MpIHtcblx0XHRcdCAgY29uc29sZS5sb2cocm93cyk7XG5cdFx0XHQgIHRoaXMuaW5wdXQuYXBpPSByb3dzWzFdO1xuXHRcdCAgICAgIHRoaXMuaW5wdXQuZXJwPSByb3dzWzJdO1x0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fSlcdFx0XG5cdH1cbiAgXG5cdFNhdmUoKSB7XG5cdFx0dGhpcy5zcWxzZXIudXBkYXRlKHRoaXMuaW5wdXQuYXBpLHRoaXMuaW5wdXQuZXJwKVxuXHRcdC50aGVuKCgpPT57XG5cdFx0XHQobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIlN1Y2Nlc3NmdWxseSB1cGRhdGVkLlwiKTtcblx0XHR9KSxcblx0XHQoZXJyb3IpPT57XG5cdFx0XHQobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkVycm9yIHVwZGF0aW5nIHNldHRpbmcuXCIpO1xuXHRcdH1cblx0fVxuICBcblx0Q2FuY2VsKCkge1xuXHRcdHRoaXMucm91dGVyLmJhY2soKTtcblx0fVxuICBcbn0iXX0=