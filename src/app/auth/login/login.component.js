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
var router_1 = require("nativescript-angular/router");
var nativescript_snackbar_1 = require("nativescript-snackbar");
var auth_service_1 = require("../../core/services/auth-service");
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
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            auth_service_1.AuthService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwrREFBaUQ7QUFFakQsaUVBQStEO0FBUS9EO0lBS0Usd0JBQTJCLE1BQXdCLEVBQ3hCLElBQWdCO1FBRGhCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtJQUNMLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzRDtJQUNMLENBQUM7SUFFRCw4QkFBSyxHQUFMO1FBQ0ksSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNILENBQUMsSUFBSSxnQ0FBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUNuRDtJQUNMLENBQUM7SUFFRCxxQ0FBWSxHQUFaO1FBQUEsaUJBb0JDO1FBbkJHLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDUCxJQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3JCLFFBQVEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7WUFDNUIsUUFBUSxFQUFDLEVBQUU7WUFDWCxNQUFNLEVBQUMsRUFBRTtZQUNULElBQUksRUFBQyxFQUFFO1NBQ1gsQ0FBQztRQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BDLFVBQUMsSUFBSTtZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFFLEtBQUssRUFBQztnQkFDakIsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQ7aUJBQUs7Z0JBQ0osS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtRQUVGLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQWhEVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUMvQixDQUFDO3lDQU1tQyx5QkFBZ0I7WUFDbkIsMEJBQVc7T0FOaEMsY0FBYyxDQWtEMUI7SUFBRCxxQkFBQztDQUFBLEFBbERELElBa0RDO0FBbERZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3VzZXJpbmZvJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtbG9naW4nLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQudG9TdHJpbmcoKSxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgcHVibGljIGlucHV0OiBhbnk7XHJcbiAgdXNlcjpVc2VySW5mbztcclxuXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICB0aGlzLmlucHV0ID0ge1xyXG4gICAgICAgICAgXCJlbWFpbFwiOiBcIlwiLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOiBcIlwiXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgaWYodGhpcy5hdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2luKCkge1xyXG4gICAgICBpZih0aGlzLmlucHV0LmVtYWlsICYmIHRoaXMuaW5wdXQucGFzc3dvcmQpIHtcclxuICAgICAgICAgdGhpcy5zaWduSW5TZXJ2ZXIoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiQWxsIEZpZWxkcyBSZXF1aXJlZCFcIik7XHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHNpZ25JblNlcnZlcigpe1xyXG4gICAgICB0aGlzLnVzZXIgPSB7XHJcbiAgICAgICAgICAgbmFtZTp0aGlzLmlucHV0LmVtYWlsLFxyXG4gICAgICAgICAgIHBhc3N3b3JkOnRoaXMuaW5wdXQucGFzc3dvcmQsXHJcbiAgICAgICAgICAgZnVsbG5hbWU6JycsXHJcbiAgICAgICAgICAgYWNjZXNzOicnLFxyXG4gICAgICAgICAgIHJvbGU6JydcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuYXV0aC5zaWduSW4odGhpcy51c2VyKS5zdWJzY3JpYmUoXHJcbiAgICAgICAocmVzcCk9PntcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgaWYgKHJlc3Aub2s9PSd5ZXMnKXtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnNhdmVUb2tlbihyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYXV0aC5yZW1vdmVUb2tlbigpOyAgICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19