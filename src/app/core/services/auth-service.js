"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_module_1 = require("~/app/config/app-config.module");
var store_service_1 = require("./store-service");
var enums_1 = require("../enums");
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
        return this.store.getBoolean(enums_1.AuthTerm.authenticated);
    };
    AuthService.prototype.getUserID = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW1EO0FBQ25ELDZDQUErRDtBQUkvRCxvRUFBNEQ7QUFFNUQsaURBQStDO0FBQy9DLGtDQUFvQztBQUtsQztJQUVFLHFCQUFvQixJQUFnQixFQUNoQixLQUFrQixFQUNFLE1BQWlCO1FBRnJDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQUNFLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDekQsQ0FBQztJQUVELDRCQUFNLEdBQU4sVUFBTyxJQUFjO1FBQ2pCLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQztRQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQU0sT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUE7UUFDMUMsSUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsNkJBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLElBQVE7UUFDZCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlDQUFXLEdBQVg7UUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksVUFBVSxFQUFDO1lBQ1gsdUNBQXVDO1lBQ3ZDLElBQUksS0FBSyxHQUFFLFNBQVMsR0FBRSxVQUFVLENBQUM7WUFDbEMsc0JBQXNCO1lBQ3JCLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQscUNBQWUsR0FBZjtRQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsZ0JBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsK0JBQVMsR0FBVDtRQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBOUNRLFdBQVc7UUFIekIsaUJBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7UUFLYSxXQUFBLGFBQU0sQ0FBQyw4QkFBVSxDQUFDLENBQUE7eUNBRkwsaUJBQVU7WUFDViw0QkFBWTtPQUgzQixXQUFXLENBK0N6QjtJQUFELGtCQUFDO0NBQUEsQUEvQ0MsSUErQ0Q7QUEvQ2Msa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5cclxuaW1wb3J0IHsgQVBQX0NPTkZJRyB9IGZyb20gXCJ+L2FwcC9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwQ29uZmlnLCBVc2VySW5mbyB9IGZyb20gXCIuLi9tb2RlbFwiO1xyXG5pbXBvcnQgeyBTdG9yZVNlcnZpY2UgfSBmcm9tIFwiLi9zdG9yZS1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEF1dGhUZXJtIH0gZnJvbSBcIi4uL2VudW1zXCI7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgICBwcm92aWRlZEluOiAncm9vdCdcclxuICB9KVxyXG4gIGV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIHN0b3JlOlN0b3JlU2VydmljZSxcclxuICAgICAgICAgICAgICAgIEBJbmplY3QoQVBQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25Jbih1c2VyOiBVc2VySW5mbyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9hdXRoL2p3dDFcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgICAgICAgLnNldCgnQ29udGVudC1UeXBlJywgXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAgICAgY29uc3QgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodXNlcik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNpZ25PdXQoKXtcclxuICAgICAgICB0aGlzLnN0b3JlLnJlbW92ZVRva2VuKCk7IFxyXG4gICAgICAgIHRoaXMuc3RvcmUuY2xlYXJMb2NhbFN0b3JlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZVRva2VuKGRhdGE6YW55KXtcclxuICAgICAgICB0aGlzLnN0b3JlLnNhdmVUb2tlbihkYXRhKTsgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHJlbW92ZVRva2VuKCl7XHJcbiAgICAgICAgdGhpcy5zdG9yZS5yZW1vdmVUb2tlbigpOyAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRva2VuR2V0dGVyKCkge1xyXG4gICAgICAgIGxldCBqc29uU3RyaW5nID0gdGhpcy5zdG9yZS5nZXRTdHJpbmcoQXV0aFRlcm0udG9rZW4pO1xyXG4gICAgICAgIGlmIChqc29uU3RyaW5nKXtcclxuICAgICAgICAgICAgLy9sZXQgYXV0aG9iaiA9IEpTT04ucGFyc2UoanNvblN0cmluZyk7XHJcbiAgICAgICAgICAgIGxldCB0b2tlbiA9XCJCZWFyZXIgXCIrIGpzb25TdHJpbmc7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2codG9rZW4pO1xyXG4gICAgICAgICAgICByZXR1cm4gdG9rZW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlzQXV0aGVudGljYXRlZCgpOmJvb2xlYW57XHJcbiAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldEJvb2xlYW4oQXV0aFRlcm0uYXV0aGVudGljYXRlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VXNlcklEKCk6c3RyaW5ne1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmdldFN0cmluZyhBdXRoVGVybS51c2VyaWQpO1xyXG4gICAgICB9XHJcbn0iXX0=