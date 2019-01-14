"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var auth_service_1 = require("~/app/core/services/auth-service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, auth) {
        this.router = router;
        this.auth = auth;
        this.input = {
            "email": "",
            "password": ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(["/main"], { clearHistory: true });
        }
    };
    LoginComponent.prototype.login = function () {
        if (this.input.email && this.input.password) {
            this.signInServer();
        }
        else {
            (new nativescript_snackbar_1.SnackBar()).simple("All Fields Required!");
        }
    };
    LoginComponent.prototype.signInServer = function () {
        var _this = this;
        this.user = {
            name: this.input.email,
            password: this.input.password,
            fullname: '',
            access: '',
            role: ''
        };
        this.auth.signIn(this.user).subscribe(function (resp) {
            console.log(resp);
            if (resp.ok == 'yes') {
                _this.auth.saveToken(resp.data);
                _this.router.navigate(["/main"], { clearHistory: true });
            }
            else {
                _this.auth.removeToken();
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'ns-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwrREFBaUQ7QUFFakQsaUVBQStEO0FBUS9EO0lBS0Usd0JBQTJCLE1BQXdCLEVBQ3hCLElBQWdCO1FBRGhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtJQUNMLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNILENBQUMsSUFBSSxnQ0FBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUCxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3JCLFFBQVEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDNUIsUUFBUSxFQUFDLEVBQUU7WUFDWCxNQUFNLEVBQUMsRUFBRTtZQUNULElBQUksRUFBQyxFQUFFO1NBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BDLFVBQUMsSUFBSTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFFLEtBQUssRUFBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQ7aUJBQUs7Z0JBQ0osS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtRQUVGLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQWhEVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU1tQyx5QkFBZ0I7WUFDbkIsMEJBQVc7T0FOaEMsY0FBYyxDQWtEMUI7SUFBRCxxQkFBQztDQUFBLEFBbERELElBa0RDO0FBbERZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3VzZXJpbmZvJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIn4vYXBwL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWxvZ2luJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgcHVibGljIGlucHV0OiBhbnk7XG4gIHVzZXI6VXNlckluZm87XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICB0aGlzLmlucHV0ID0ge1xuICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcbiAgICAgICAgICBcInBhc3N3b3JkXCI6IFwiXCJcbiAgICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICAgIGlmKHRoaXMuYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XG4gICAgICAgICB0aGlzLnNpZ25JblNlcnZlcigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAobmV3IFNuYWNrQmFyKCkpLnNpbXBsZShcIkFsbCBGaWVsZHMgUmVxdWlyZWQhXCIpO1xuICAgICAgfVxuICB9XG5cbiAgc2lnbkluU2VydmVyKCl7XG4gICAgICB0aGlzLnVzZXIgPSB7XG4gICAgICAgICAgIG5hbWU6dGhpcy5pbnB1dC5lbWFpbCxcbiAgICAgICAgICAgcGFzc3dvcmQ6dGhpcy5pbnB1dC5wYXNzd29yZCxcbiAgICAgICAgICAgZnVsbG5hbWU6JycsXG4gICAgICAgICAgIGFjY2VzczonJyxcbiAgICAgICAgICAgcm9sZTonJ1xuICAgICAgfTtcblxuICAgICAgdGhpcy5hdXRoLnNpZ25Jbih0aGlzLnVzZXIpLnN1YnNjcmliZShcbiAgICAgICAocmVzcCk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwKTtcbiAgICAgICAgICBpZiAocmVzcC5vaz09J3llcycpe1xuICAgICAgICAgICAgdGhpcy5hdXRoLnNhdmVUb2tlbihyZXNwLmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21haW5cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xuICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aC5yZW1vdmVUb2tlbigpOyAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgIFxuICAgICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==