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
var sql_service_1 = require("../../core/services/sql-service");
var page_1 = require("ui/page");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, auth, page, sqlser) {
        this.router = router;
        this.auth = auth;
        this.page = page;
        this.sqlser = sqlser;
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
                (new nativescript_snackbar_1.SnackBar()).simple("Invalid User ID / password.");
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
            auth_service_1.AuthService,
            page_1.Page,
            sql_service_1.SQLService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwrREFBaUQ7QUFFakQsaUVBQStEO0FBQy9ELCtEQUE2RDtBQUM3RCxnQ0FBK0I7QUFRL0I7SUFLRSx3QkFBMkIsTUFBd0IsRUFDeEIsSUFBZ0IsRUFDaEIsSUFBUyxFQUNULE1BQWlCO1FBSGpCLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBSztRQUNULFdBQU0sR0FBTixNQUFNLENBQVc7UUFFeEMsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULE9BQU8sRUFBRSxFQUFFO1lBQ1gsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtRQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7U0FDM0Q7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBQyxJQUFJLENBQUM7SUFDbkMsQ0FBQztJQUVELDhCQUFLLEdBQUw7UUFDSSxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0gsQ0FBQyxJQUFJLGdDQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ25EO0lBRU4sQ0FBQztJQUVELHFDQUFZLEdBQVo7UUFBQSxpQkFxQkM7UUFwQkcsSUFBSSxDQUFDLElBQUksR0FBRztZQUNQLElBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDckIsUUFBUSxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtZQUM1QixRQUFRLEVBQUMsRUFBRTtZQUNYLE1BQU0sRUFBQyxFQUFFO1lBQ1QsSUFBSSxFQUFDLEVBQUU7U0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDcEMsVUFBQyxJQUFJO1lBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUUsS0FBSyxFQUFDO2dCQUNqQixLQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUN6RDtpQkFBSztnQkFDSixDQUFDLElBQUksZ0NBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7Z0JBQ3ZELEtBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDM0I7UUFFRixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUF0RFUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FNbUMseUJBQWdCO1lBQ25CLDBCQUFXO1lBQ1gsV0FBSTtZQUNGLHdCQUFVO09BUmpDLGNBQWMsQ0F3RDFCO0lBQUQscUJBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU25hY2tCYXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXNuYWNrYmFyXCI7XHJcbmltcG9ydCB7IFVzZXJJbmZvIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC91c2VyaW5mbyc7XHJcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNRTFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL3NxbC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICducy1sb2dpbicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ10sXHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBwdWJsaWMgaW5wdXQ6IGFueTtcclxuICB1c2VyOlVzZXJJbmZvO1xyXG5cclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICAgICAgICAgcHJpdmF0ZSBwYWdlOlBhZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgIHByaXZhdGUgc3Fsc2VyOlNRTFNlcnZpY2VcclxuICAgICAgICAgICAgICAgICAgICAgKSB7XHJcbiAgICAgIHRoaXMuaW5wdXQgPSB7XHJcbiAgICAgICAgICBcImVtYWlsXCI6IFwiXCIsXHJcbiAgICAgICAgICBcInBhc3N3b3JkXCI6IFwiXCJcclxuICAgICAgfVxyXG4gICAgICBzcWxzZXIuY3JlYXRlREIoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgaWYodGhpcy5hdXRoLmlzQXV0aGVudGljYXRlZCgpKSB7XHJcbiAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbj10cnVlO1xyXG4gIH1cclxuXHJcbiAgbG9naW4oKSB7XHJcbiAgICAgIGlmKHRoaXMuaW5wdXQuZW1haWwgJiYgdGhpcy5pbnB1dC5wYXNzd29yZCkge1xyXG4gICAgICAgICAgdGhpcy5zaWduSW5TZXJ2ZXIoKTtcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgKG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJBbGwgRmllbGRzIFJlcXVpcmVkIVwiKTtcclxuICAgICAgIH1cclxuICAgICBcclxuICB9XHJcblxyXG4gIHNpZ25JblNlcnZlcigpe1xyXG4gICAgICB0aGlzLnVzZXIgPSB7XHJcbiAgICAgICAgICAgbmFtZTp0aGlzLmlucHV0LmVtYWlsLFxyXG4gICAgICAgICAgIHBhc3N3b3JkOnRoaXMuaW5wdXQucGFzc3dvcmQsXHJcbiAgICAgICAgICAgZnVsbG5hbWU6JycsXHJcbiAgICAgICAgICAgYWNjZXNzOicnLFxyXG4gICAgICAgICAgIHJvbGU6JydcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHRoaXMuYXV0aC5zaWduSW4odGhpcy51c2VyKS5zdWJzY3JpYmUoXHJcbiAgICAgICAocmVzcCk9PntcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApO1xyXG4gICAgICAgICAgaWYgKHJlc3Aub2s9PSd5ZXMnKXtcclxuICAgICAgICAgICAgdGhpcy5hdXRoLnNhdmVUb2tlbihyZXNwLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvbWFpblwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgIChuZXcgU25hY2tCYXIoKSkuc2ltcGxlKFwiSW52YWxpZCBVc2VyIElEIC8gcGFzc3dvcmQuXCIpO1xyXG4gICAgICAgICAgICB0aGlzLmF1dGgucmVtb3ZlVG9rZW4oKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==