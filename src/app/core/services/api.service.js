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
var auth_service_1 = require("./auth-service");
var app_config_module_1 = require("../../config/app-config.module");
var APIService = /** @class */ (function () {
    function APIService(http, auth, config) {
        this.http = http;
        this.auth = auth;
        this.config = config;
    }
    APIService.prototype.getAuthHeader = function () {
        var headers = new http_1.HttpHeaders()
            .set('Authorization', this.auth.tokenGetter());
        return headers;
    };
    APIService.prototype.getCustomer = function () {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint + "api/customer/" + userid;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getItemMaster = function () {
        var url = this.config.apiEndpoint + "api/itemmaster";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrder = function () {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint + "api/salesorder/" + userid;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrderByKey = function (key) {
        var encodedkey = encodeURI(key);
        var url = this.config.apiEndpoint + "api/salesorder/order/" + encodedkey;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postSaleOrder = function (order) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(order);
        var url = this.config.apiEndpoint + "api/salesorder/save/";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.getDailyWorkOrders = function () {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint + "api/dailyprod";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getProdRefCodes = function () {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint + "api/dailyprod/refcode";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postDailyInput = function (daily) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(daily);
        var url = this.config.apiEndpoint + "api/dailyprod/create";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.getGRNPOlist = function () {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint + "api/grn/po";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getPOItems = function (pono, porel) {
        var userid = this.auth.getUserID();
        var url = this.config.apiEndpoint
            + "api/grn/poitem?pono=" + pono + "&porel=" + porel;
        console.log(url);
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postGRNReceipt = function (grnrec) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(grnrec);
        var url = this.config.apiEndpoint + "api/grn/receipt";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.postIsCycleCountValid = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.config.apiEndpoint + "api/cyclecount/check";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.postIsCycleCountValidEx = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.config.apiEndpoint + "api/cyclecount/check2";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.putCycleCountItem = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.config.apiEndpoint + "api/cyclecount/update";
        return this.http.put(url, body, { headers: headers });
    };
    APIService.prototype.putCycleCountItemEx = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.config.apiEndpoint + "api/cyclecount/update2";
        return this.http.put(url, body, { headers: headers });
    };
    APIService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(2, core_1.Inject(app_config_module_1.APP_CONFIG)),
        __metadata("design:paramtypes", [http_1.HttpClient,
            auth_service_1.AuthService, Object])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRDtBQUNuRCw2Q0FBK0Q7QUFHL0QsK0NBQTZDO0FBQzdDLG9FQUE0RDtBQVU1RDtJQUVFLG9CQUFvQixJQUFnQixFQUNoQixJQUFnQixFQUNJLE1BQWlCO1FBRnJDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNJLFdBQU0sR0FBTixNQUFNLENBQVc7SUFDekQsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDN0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUE7SUFDakIsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsR0FBQyxNQUFNLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBbUIsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7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RCxpQkFBQztDQUFBLEFBNUhELElBNEhDO0FBNUhZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQVBQX0NPTkZJRyB9IGZyb20gJy4uLy4uL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFwcENvbmZpZywgRGFpbHlJbnB1dCwgRGFpbHlXb3JrT3JkZXIsIFxyXG4gICAgICAgICBSZWZDb2RlLCBDdXN0UHJvZmlsZUxpZ2h0LCBJdGVtTWFzdGVyLCBcclxuICAgICAgICAgU2FsZXNPZGVyLCBHUk5QT0luZm8sIEdSTlBPSXRlbSwgR1JOUmVjZWl2ZSwgQ3ljbGVDb3VudEl0ZW0gfSBcclxuICAgICAgICAgZnJvbSAnLi4vbW9kZWwnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoQVBQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gIH1cclxuXHJcbiAgZ2V0QXV0aEhlYWRlcigpOkh0dHBIZWFkZXJze1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICAgcmV0dXJuIGhlYWRlcnNcclxuICB9XHJcblxyXG4gIGdldEN1c3RvbWVyKCk6IE9ic2VydmFibGU8Q3VzdFByb2ZpbGVMaWdodD4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2N1c3RvbWVyL1wiK3VzZXJpZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEN1c3RQcm9maWxlTGlnaHQ+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbU1hc3RlcigpOiBPYnNlcnZhYmxlPEl0ZW1NYXN0ZXI+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvaXRlbW1hc3RlclwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8SXRlbU1hc3Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTYWxlc09yZGVyKCk6IE9ic2VydmFibGU8U2FsZXNPZGVyPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvc2FsZXNvcmRlci9cIit1c2VyaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTYWxlc09kZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2FsZXNPcmRlckJ5S2V5KGtleTpzdHJpbmcpOiBPYnNlcnZhYmxlPFNhbGVzT2Rlcj4ge1xyXG4gICAgbGV0IGVuY29kZWRrZXkgPSBlbmNvZGVVUkkoa2V5KTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvc2FsZXNvcmRlci9vcmRlci9cIitlbmNvZGVka2V5O1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8U2FsZXNPZGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcbiAgXHJcbiAgcG9zdFNhbGVPcmRlcihvcmRlcjpTYWxlc09kZXIpOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9yZGVyKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvc2FsZXNvcmRlci9zYXZlL1wiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGFpbHlXb3JrT3JkZXJzKCk6IE9ic2VydmFibGU8RGFpbHlXb3JrT3JkZXI+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9kYWlseXByb2RcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERhaWx5V29ya09yZGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFByb2RSZWZDb2RlcygpOiBPYnNlcnZhYmxlPFJlZkNvZGU+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9kYWlseXByb2QvcmVmY29kZVwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UmVmQ29kZT4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBwb3N0RGFpbHlJbnB1dChkYWlseTpEYWlseUlucHV0KTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYWlseSk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2RhaWx5cHJvZC9jcmVhdGVcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIGdldEdSTlBPbGlzdCgpOiBPYnNlcnZhYmxlPEdSTlBPSW5mbz4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2dybi9wb1wiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8R1JOUE9JbmZvPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFBPSXRlbXMocG9ubzpzdHJpbmcscG9yZWw6c3RyaW5nKTogT2JzZXJ2YWJsZTwgR1JOUE9JdGVtPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50IFxyXG4gICAgICAgICAgICAgICAgKyBcImFwaS9ncm4vcG9pdGVtP3Bvbm89XCIrcG9ubytcIiZwb3JlbD1cIitwb3JlbDtcclxuICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDwgR1JOUE9JdGVtPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIHBvc3RHUk5SZWNlaXB0KGdybnJlYzpHUk5SZWNlaXZlKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShncm5yZWMpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9ncm4vcmVjZWlwdFwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgcG9zdElzQ3ljbGVDb3VudFZhbGlkKGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9jeWNsZWNvdW50L2NoZWNrXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBwb3N0SXNDeWNsZUNvdW50VmFsaWRFeChpdGVtOkN5Y2xlQ291bnRJdGVtKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvY3ljbGVjb3VudC9jaGVjazJcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHB1dEN5Y2xlQ291bnRJdGVtKGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9jeWNsZWNvdW50L3VwZGF0ZVwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBwdXRDeWNsZUNvdW50SXRlbUV4KGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9jeWNsZWNvdW50L3VwZGF0ZTJcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=