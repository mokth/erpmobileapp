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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRDtBQUNuRCw2Q0FBK0Q7QUFHL0QsK0NBQTZDO0FBQzdDLG9FQUE0RDtBQVM1RDtJQUVFLG9CQUFvQixJQUFnQixFQUNoQixJQUFnQixFQUNJLE1BQWlCO1FBRnJDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNJLFdBQU0sR0FBTixNQUFNLENBQVc7SUFFekQsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDN0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUE7SUFDakIsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsR0FBQyxNQUFNLENBQUM7UUFDN0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBbUIsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7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VSxVQUFVO1FBSHRCLGlCQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO1FBS2EsV0FBQSxhQUFNLENBQUMsOEJBQVUsQ0FBQyxDQUFBO3lDQUZMLGlCQUFVO1lBQ1gsMEJBQVc7T0FIekIsVUFBVSxDQWtFdEI7SUFBRCxpQkFBQztDQUFBLEFBbEVELElBa0VDO0FBbEVZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC1zZXJ2aWNlJztcclxuaW1wb3J0IHsgQVBQX0NPTkZJRyB9IGZyb20gJy4uLy4uL2NvbmZpZy9hcHAtY29uZmlnLm1vZHVsZSc7XHJcbmltcG9ydCB7IEFwcENvbmZpZywgRGFpbHlJbnB1dCwgRGFpbHlXb3JrT3JkZXIsIFxyXG4gICAgICAgICBSZWZDb2RlLCBDdXN0UHJvZmlsZUxpZ2h0LCBJdGVtTWFzdGVyLCBTYWxlc09kZXIgfSBcclxuICAgICAgICAgZnJvbSAnLi4vbW9kZWwnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoQVBQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG5cclxuICB9XHJcblxyXG4gIGdldEF1dGhIZWFkZXIoKTpIdHRwSGVhZGVyc3tcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgIHJldHVybiBoZWFkZXJzXHJcbiAgfVxyXG5cclxuICBnZXRDdXN0b21lcigpOiBPYnNlcnZhYmxlPEN1c3RQcm9maWxlTGlnaHQ+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9jdXN0b21lci9cIit1c2VyaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDdXN0UHJvZmlsZUxpZ2h0Pih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldEl0ZW1NYXN0ZXIoKTogT2JzZXJ2YWJsZTxJdGVtTWFzdGVyPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2l0ZW1tYXN0ZXJcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEl0ZW1NYXN0ZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2FsZXNPcmRlcigpOiBPYnNlcnZhYmxlPFNhbGVzT2Rlcj4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL3NhbGVzb3JkZXIvXCIrdXNlcmlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8U2FsZXNPZGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFNhbGVzT3JkZXJCeUtleShrZXk6c3RyaW5nKTogT2JzZXJ2YWJsZTxTYWxlc09kZXI+IHtcclxuICAgIGxldCBlbmNvZGVka2V5ID0gZW5jb2RlVVJJKGtleSk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL3NhbGVzb3JkZXIvb3JkZXIvXCIrZW5jb2RlZGtleTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFNhbGVzT2Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG4gIFxyXG4gIHBvc3RTYWxlT3JkZXIob3JkZXI6U2FsZXNPZGVyKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShvcmRlcik7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL3NhbGVzb3JkZXIvc2F2ZS9cIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIGdldERhaWx5V29ya09yZGVycygpOiBPYnNlcnZhYmxlPERhaWx5V29ya09yZGVyPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvZGFpbHlwcm9kXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxEYWlseVdvcmtPcmRlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBnZXRQcm9kUmVmQ29kZXMoKTogT2JzZXJ2YWJsZTxSZWZDb2RlPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvZGFpbHlwcm9kL3JlZmNvZGVcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFJlZkNvZGU+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgcG9zdERhaWx5SW5wdXQoZGFpbHk6RGFpbHlJbnB1dCk6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgLnNldCgnQ29udGVudC1UeXBlJyxcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICBsZXQgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGFpbHkpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQgKyBcImFwaS9kYWlseXByb2QvY3JlYXRlXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==