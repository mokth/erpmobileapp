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
var auth_service_1 = require("../../core/services/auth-service");
var sql_service_1 = require("../../core/services/sql-service");
var page_1 = require("ui/page");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, auth, page, sqlser) {
        this.router = router;
        this.auth = auth;
        this.page = page;
        this.sqlser = sqlser;
        this.showError = false;
        this.input = {
            "email": "",
            "password": ""
        };
        sqlser.createDB();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(["/main"], { clearHistory: true });
        }
        this.page.actionBarHidden = true;
    };
    LoginComponent.prototype.login = function () {
        if (this.input.email && this.input.password) {
            this.showError = false;
            this.signInServer();
        }
        else {
            this.showError = true;
            this.errmsg = "All Fields Required!";
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
                _this.showError = false;
                _this.auth.saveToken(resp.data);
                _this.router.navigate(["/main"], { clearHistory: true });
            }
            else {
                //(new SnackBar()).simple("Invalid User ID / password.");
                _this.showError = true;
                _this.errmsg = "Invalid User ID / password.";
                _this.auth.removeToken();
            }
        }, function (err) {
            console.log(err);
            _this.showError = true;
            _this.errmsg = err.status + '  ' + err.statusText;
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
            auth_service_1.AuthService,
            page_1.Page,
            sql_service_1.SQLService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUcvRCxpRUFBK0Q7QUFDL0QsK0RBQTZEO0FBQzdELGdDQUErQjtBQVEvQjtJQVFFLHdCQUEyQixNQUF3QixFQUN4QixJQUFnQixFQUNoQixJQUFTLEVBQ1QsTUFBaUI7UUFIakIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFLO1FBQ1QsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUV4QyxJQUFJLENBQUMsU0FBUyxHQUFFLEtBQUssQ0FBQTtRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsT0FBTyxFQUFFLEVBQUU7WUFDWCxVQUFVLEVBQUUsRUFBRTtTQUNqQixDQUFBO1FBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUMzRDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFDLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUNJLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ3RCO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFFLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLHNCQUFzQixDQUFDO1NBQ3RDO0lBRU4sQ0FBQztJQUVELHFDQUFZLEdBQVo7UUFBQSxpQkE2QkM7UUE1QkcsSUFBSSxDQUFDLElBQUksR0FBRztZQUNQLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDckIsUUFBUSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM1QixRQUFRLEVBQUMsRUFBRTtZQUNYLE1BQU0sRUFBQyxFQUFFO1lBQ1QsSUFBSSxFQUFDLEVBQUU7U0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDakMsVUFBQyxJQUFJO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUUsS0FBSyxFQUFDO2dCQUNqQixLQUFJLENBQUMsU0FBUyxHQUFFLEtBQUssQ0FBQztnQkFDdEIsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7YUFDekQ7aUJBQUs7Z0JBQ0oseURBQXlEO2dCQUN6RCxLQUFJLENBQUMsU0FBUyxHQUFFLElBQUksQ0FBQztnQkFDckIsS0FBSSxDQUFDLE1BQU0sR0FBRyw2QkFBNkIsQ0FBQztnQkFDNUMsS0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUMzQjtRQUVILENBQUMsRUFDRCxVQUFDLEdBQUc7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLEtBQUksQ0FBQyxTQUFTLEdBQUUsSUFBSSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUUsR0FBRyxDQUFDLE1BQU0sR0FBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFwRVUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FTbUMseUJBQWdCO1lBQ25CLDBCQUFXO1lBQ1gsV0FBSTtZQUNGLHdCQUFVO09BWGpDLGNBQWMsQ0FzRTFCO0lBQUQscUJBQUM7Q0FBQSxBQXRFRCxJQXNFQztBQXRFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuLy9pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc25hY2tiYXJcIjtcclxuaW1wb3J0IHsgVXNlckluZm8gfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3VzZXJpbmZvJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU1FMU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvc3FsLXNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLWxvZ2luJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLnRvU3RyaW5nKCksXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIHB1YmxpYyBpbnB1dDogYW55O1xyXG4gIHVzZXI6VXNlckluZm87XHJcblxyXG4gIHNob3dFcnJvcjpib29sZWFuO1xyXG4gIGVycm1zZzpzdHJpbmc7XHJcbiAgXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgcGFnZTpQYWdlLFxyXG4gICAgICAgICAgICAgICAgICAgICBwcml2YXRlIHNxbHNlcjpTUUxTZXJ2aWNlXHJcbiAgICAgICAgICAgICAgICAgICAgICkge1xyXG4gICAgICB0aGlzLnNob3dFcnJvciA9ZmFsc2VcclxuICAgICAgdGhpcy5pbnB1dCA9IHtcclxuICAgICAgICAgIFwiZW1haWxcIjogXCJcIixcclxuICAgICAgICAgIFwicGFzc3dvcmRcIjogXCJcIlxyXG4gICAgICB9XHJcbiAgICAgIHNxbHNlci5jcmVhdGVEQigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICBpZih0aGlzLmF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcclxuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuPXRydWU7XHJcbiAgfVxyXG5cclxuICBsb2dpbigpIHtcclxuICAgICAgaWYodGhpcy5pbnB1dC5lbWFpbCAmJiB0aGlzLmlucHV0LnBhc3N3b3JkKSB7XHJcbiAgICAgICAgICB0aGlzLnNob3dFcnJvciA9ZmFsc2U7XHJcbiAgICAgICAgICB0aGlzLnNpZ25JblNlcnZlcigpO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgdGhpcy5zaG93RXJyb3IgPXRydWU7XHJcbiAgICAgICAgIHRoaXMuZXJybXNnID0gXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiOyAgICAgICAgICAgXHJcbiAgICAgICB9XHJcbiAgICAgXHJcbiAgfVxyXG5cclxuICBzaWduSW5TZXJ2ZXIoKXtcclxuICAgICAgdGhpcy51c2VyID0ge1xyXG4gICAgICAgICAgIG5hbWU6dGhpcy5pbnB1dC5lbWFpbCxcclxuICAgICAgICAgICBwYXNzd29yZDp0aGlzLmlucHV0LnBhc3N3b3JkLFxyXG4gICAgICAgICAgIGZ1bGxuYW1lOicnLFxyXG4gICAgICAgICAgIGFjY2VzczonJyxcclxuICAgICAgICAgICByb2xlOicnXHJcbiAgICAgIH07XHJcblxyXG4gICAgICB0aGlzLmF1dGguc2lnbkluKHRoaXMudXNlcikuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgKHJlc3ApPT57XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcCk7XHJcbiAgICAgICAgICAgICAgaWYgKHJlc3Aub2s9PSd5ZXMnKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yID1mYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0aC5zYXZlVG9rZW4ocmVzcC5kYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyhuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBVc2VyIElEIC8gcGFzc3dvcmQuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3IgPXRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm1zZyA9IFwiSW52YWxpZCBVc2VyIElEIC8gcGFzc3dvcmQuXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGgucmVtb3ZlVG9rZW4oKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIChlcnIpPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yID10cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVycm1zZyA9ZXJyLnN0YXR1cysnICAnK2Vyci5zdGF0dXNUZXh0O1xyXG4gICAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=