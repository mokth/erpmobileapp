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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var angular_jwt_1 = require("@auth0/angular-jwt");
var app_config_module_1 = require("../../config/app-config.module");
var store_service_1 = require("./store-service");
var enums_1 = require("../enums");
var jwthelper = new angular_jwt_1.JwtHelperService();
var AuthService = /** @class */ (function () {
    function AuthService(http, store, config) {
        this.http = http;
        this.store = store;
        this.config = config;
    }
    AuthService.prototype.signIn = function (user) {
        var url = this.config.apiEndpoint + "api/auth/jwt1";
        console.log(url);
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json");
        var body = JSON.stringify(user);
        return this.http.post(url, body, { headers: headers });
    };
    AuthService.prototype.signOut = function () {
        this.store.removeToken();
        this.store.clearLocalStore();
    };
    AuthService.prototype.saveToken = function (data) {
        this.store.saveToken(data);
    };
    AuthService.prototype.removeToken = function () {
        this.store.removeToken();
    };
    AuthService.prototype.tokenGetter = function () {
        var jsonString = this.store.getString(enums_1.AuthTerm.token);
        if (jsonString) {
            //let authobj = JSON.parse(jsonString);
            var token = "Bearer " + jsonString;
            // console.log(token);
            return token;
        }
        return "";
    };
    AuthService.prototype.isAuthenticated = function () {
        var jsonString = this.store.getString(enums_1.AuthTerm.token);
        //console.log(jsonString);
        if (jsonString == '')
            return false;
        var isExpired = jwthelper.isTokenExpired(jsonString);
        if (isExpired) {
            this.removeToken();
            return false;
        }
        console.log("isExpired " + isExpired);
        return this.store.getBoolean(enums_1.AuthTerm.authenticated);
    };
    AuthService.prototype.getUserID = function () {
        console.log(enums_1.AuthTerm.userid + " " + this.store.getString(enums_1.AuthTerm.userid));
        return this.store.getString(enums_1.AuthTerm.userid);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(2, core_1.Inject(app_config_module_1.APP_CONFIG)),
        __metadata("design:paramtypes", [http_1.HttpClient,
            store_service_1.StoreService, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1EO0FBQ25ELDZDQUErRDtBQUUvRCxrREFBc0Q7QUFFdEQsb0VBQTREO0FBRTVELGlEQUErQztBQUMvQyxrQ0FBb0M7QUFFcEMsSUFBTSxTQUFTLEdBQUcsSUFBSSw4QkFBZ0IsRUFBRSxDQUFDO0FBSXZDO0lBRUUscUJBQW9CLElBQWdCLEVBQ2hCLEtBQWtCLEVBQ0UsTUFBaUI7UUFGckMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBQ0UsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUN6RCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLElBQWM7UUFDakIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1FBQ3RELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQTtRQUMxQyxJQUFNLElBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBTyxHQUFQO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCwrQkFBUyxHQUFULFVBQVUsSUFBUTtRQUNkLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsSUFBSSxVQUFVLEVBQUM7WUFDWCx1Q0FBdUM7WUFDdkMsSUFBSSxLQUFLLEdBQUUsU0FBUyxHQUFFLFVBQVUsQ0FBQztZQUNsQyxzQkFBc0I7WUFDckIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxxQ0FBZSxHQUFmO1FBQ0ksSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0RCwwQkFBMEI7UUFDMUIsSUFBSSxVQUFVLElBQUUsRUFBRTtZQUNkLE9BQU8sS0FBSyxDQUFDO1FBRWpCLElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsSUFBSSxTQUFTLEVBQUM7WUFDVixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGdCQUFRLENBQUMsYUFBYSxDQUFDLENBQUU7SUFDeEQsQ0FBQztJQUVELCtCQUFTLEdBQVQ7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFRLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUExRFEsV0FBVztRQUh6QixpQkFBVSxDQUFDO1lBQ1IsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUthLFdBQUEsYUFBTSxDQUFDLDhCQUFVLENBQUMsQ0FBQTt5Q0FGTCxpQkFBVTtZQUNWLDRCQUFZO09BSDNCLFdBQVcsQ0EyRHpCO0lBQUQsa0JBQUM7Q0FBQSxBQTNEQyxJQTJERDtBQTNEYyxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgSnd0SGVscGVyU2VydmljZSB9IGZyb20gJ0BhdXRoMC9hbmd1bGFyLWp3dCc7XHJcblxyXG5pbXBvcnQgeyBBUFBfQ09ORklHIH0gZnJvbSBcIi4uLy4uL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBcHBDb25maWcsIFVzZXJJbmZvIH0gZnJvbSBcIi4uL21vZGVsXCI7XHJcbmltcG9ydCB7IFN0b3JlU2VydmljZSB9IGZyb20gXCIuL3N0b3JlLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQXV0aFRlcm0gfSBmcm9tIFwiLi4vZW51bXNcIjtcclxuXHJcbmNvbnN0IGp3dGhlbHBlciA9IG5ldyBKd3RIZWxwZXJTZXJ2aWNlKCk7XHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG4gIH0pXHJcbiAgZXhwb3J0IGNsYXNzIEF1dGhTZXJ2aWNlIHtcclxuICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcclxuICAgICAgICAgICAgICAgIHByaXZhdGUgc3RvcmU6U3RvcmVTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgICAgQEluamVjdChBUFBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnKSB7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbkluKHVzZXI6IFVzZXJJbmZvKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2F1dGgvand0MVwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAgICAgICAuc2V0KCdDb250ZW50LVR5cGUnLCBcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgICAgICBjb25zdCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh1c2VyKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2lnbk91dCgpe1xyXG4gICAgICAgIHRoaXMuc3RvcmUucmVtb3ZlVG9rZW4oKTsgXHJcbiAgICAgICAgdGhpcy5zdG9yZS5jbGVhckxvY2FsU3RvcmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlVG9rZW4oZGF0YTphbnkpe1xyXG4gICAgICAgIHRoaXMuc3RvcmUuc2F2ZVRva2VuKGRhdGEpOyAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVtb3ZlVG9rZW4oKXtcclxuICAgICAgICB0aGlzLnN0b3JlLnJlbW92ZVRva2VuKCk7ICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgdG9rZW5HZXR0ZXIoKSB7XHJcbiAgICAgICAgbGV0IGpzb25TdHJpbmcgPSB0aGlzLnN0b3JlLmdldFN0cmluZyhBdXRoVGVybS50b2tlbik7XHJcbiAgICAgICAgaWYgKGpzb25TdHJpbmcpe1xyXG4gICAgICAgICAgICAvL2xldCBhdXRob2JqID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuICAgICAgICAgICAgbGV0IHRva2VuID1cIkJlYXJlciBcIisganNvblN0cmluZztcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0b2tlbik7XHJcbiAgICAgICAgICAgIHJldHVybiB0b2tlbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgaXNBdXRoZW50aWNhdGVkKCk6Ym9vbGVhbntcclxuICAgICAgICBsZXQganNvblN0cmluZyA9IHRoaXMuc3RvcmUuZ2V0U3RyaW5nKEF1dGhUZXJtLnRva2VuKTsgIFxyXG4gICAgICAgIC8vY29uc29sZS5sb2coanNvblN0cmluZyk7XHJcbiAgICAgICAgaWYgKGpzb25TdHJpbmc9PScnKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IGp3dGhlbHBlci5pc1Rva2VuRXhwaXJlZChqc29uU3RyaW5nKTtcclxuICAgICAgICBpZiAoaXNFeHBpcmVkKXtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2tlbigpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNFeHBpcmVkIFwiK2lzRXhwaXJlZCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldEJvb2xlYW4oQXV0aFRlcm0uYXV0aGVudGljYXRlZCkgO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJRCgpOnN0cmluZ3tcclxuICAgICAgICBjb25zb2xlLmxvZyhBdXRoVGVybS51c2VyaWQrXCIgXCIrIHRoaXMuc3RvcmUuZ2V0U3RyaW5nKEF1dGhUZXJtLnVzZXJpZCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0cmluZyhBdXRoVGVybS51c2VyaWQpO1xyXG4gICAgICB9XHJcbn0iXX0=