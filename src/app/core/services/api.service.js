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
var operators_1 = require("rxjs/operators");
var auth_service_1 = require("./auth-service");
var app_config_module_1 = require("../../config/app-config.module");
var sql_service_1 = require("./sql-service");
var APIService = /** @class */ (function () {
    function APIService(http, auth, sqlser, config) {
        var _this = this;
        this.http = http;
        this.auth = auth;
        this.sqlser = sqlser;
        this.config = config;
        //default endpoints;
        this._apiEndpoint = this.config.apiEndpoint;
        this._erpEndpoint = this.config.erpEndpoint;
        sqlser.getSettingPromise()
            .then(function (rows) {
            if (rows) {
                _this._apiEndpoint = rows[1];
                _this._erpEndpoint = rows[2];
                console.log("setting from database....");
            }
        });
    }
    APIService.prototype.getAuthHeader = function () {
        var headers = new http_1.HttpHeaders()
            .set('Authorization', this.auth.tokenGetter());
        return headers;
    };
    APIService.prototype.getERPURL = function () {
        return this._erpEndpoint; //this.config.erpEndpoint;
    };
    APIService.prototype.getAPIURL = function () {
        return this._apiEndpoint; // this.config.apiEndpoint;
    };
    APIService.prototype.getCustomer = function () {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/customer/" + userid;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getItemMaster = function () {
        var url = this.getAPIURL() + "api/itemmaster";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.searchitem = function (item) {
        var _this = this;
        return item.pipe(operators_1.debounceTime(400), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) { return _this.searchItemEntries(term); }));
    };
    APIService.prototype.searchItemEntries = function (term) {
        // if(term==""){
        //   return null;
        // }
        var queryUrl = '?item=' + term;
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/itemmaster/search" + queryUrl;
        console.log(url);
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getItemBalance = function (icode) {
        var url = this.getAPIURL() + "api/itemmaster/balance/" + icode;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    // getProdDef(): Observable<ProdDef> {
    //   const url = this.getAPIURL() + "api/itemmaster/proddef";
    //   return this.http.get<ProdDef>(url,{headers:this.getAuthHeader()});
    // }
    APIService.prototype.getProdDefDetail = function (prodcode) {
        var url = this.getAPIURL() + "api/proddef/prddefdetail/" + prodcode;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getProdDefination = function (prodcode) {
        var url = this.getAPIURL() + "api/proddef/defination/" + prodcode;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.searchPrdDef = function (item) {
        var _this = this;
        return item.pipe(operators_1.debounceTime(400), operators_1.distinctUntilChanged(), operators_1.switchMap(function (term) { return _this.searchProdDefEntries(term); }));
    };
    APIService.prototype.searchProdDefEntries = function (term) {
        var queryUrl = '?prodcode=' + term;
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/proddef/prddefsearch" + queryUrl;
        console.log(url);
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrder = function () {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/salesorder/" + userid;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrderByKey = function (key) {
        var encodedkey = encodeURI(key);
        var url = this.getAPIURL() + "api/salesorder/order/" + encodedkey;
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postSaleOrder = function (order) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(order);
        var url = this.getAPIURL() + "api/salesorder/save/";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.getDailyWorkOrders = function () {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/dailyprod";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getProdRefCodes = function () {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/dailyprod/refcode";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postDailyInput = function (daily) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(daily);
        var url = this.getAPIURL() + "api/dailyprod/create";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.getGRNPOlist = function () {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL() + "api/grn/po";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getPOItems = function (pono, porel) {
        var userid = this.auth.getUserID();
        var url = this.getAPIURL()
            + "api/grn/poitem?pono=" + pono + "&porel=" + porel;
        console.log(url);
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.postGRNReceipt = function (grnrec) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(grnrec);
        var url = this.getAPIURL() + "api/grn/receipt";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.postIsCycleCountValid = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.getAPIURL() + "api/cyclecount/check";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.postIsCycleCountValidEx = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.getAPIURL() + "api/cyclecount/check2";
        return this.http.post(url, body, { headers: headers });
    };
    APIService.prototype.putCycleCountItem = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.getAPIURL() + "api/cyclecount/update";
        return this.http.put(url, body, { headers: headers });
    };
    APIService.prototype.putCycleCountItemEx = function (item) {
        var headers = new http_1.HttpHeaders()
            .set('Content-Type', "application/json")
            .set('Authorization', this.auth.tokenGetter());
        var body = JSON.stringify(item);
        var url = this.getAPIURL() + "api/cyclecount/update2";
        return this.http.put(url, body, { headers: headers });
    };
    APIService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __param(3, core_1.Inject(app_config_module_1.APP_CONFIG)),
        __metadata("design:paramtypes", [http_1.HttpClient,
            auth_service_1.AuthService,
            sql_service_1.SQLService, Object])
    ], APIService);
    return APIService;
}());
exports.APIService = APIService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRDtBQUNuRCw2Q0FBK0Q7QUFFL0QsNENBQTRFO0FBRTVFLCtDQUE2QztBQUM3QyxvRUFBNEQ7QUFNNUQsNkNBQTJDO0FBTTNDO0lBS0Usb0JBQW9CLElBQWdCLEVBQ2hCLElBQWdCLEVBQ2hCLE1BQWlCLEVBQ0csTUFBaUI7UUFIekQsaUJBZUM7UUFmbUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDRyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JELG9CQUFvQjtRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDM0MsTUFBTSxDQUFDLGlCQUFpQixFQUFFO2FBQ3pCLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDUixJQUFJLElBQUksRUFBRTtnQkFDUixLQUFJLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTthQUN6QztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDN0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUE7SUFDakIsQ0FB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O0lBQ3hELENBQUM7SUFFRCx3Q0FBbUIsR0FBbkIsVUFBb0IsSUFBbUI7UUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsd0JBQXdCLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQTVNVSxVQUFVO1FBSHRCLGlCQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO1FBU2EsV0FBQSxhQUFNLENBQUMsOEJBQVUsQ0FBQyxDQUFBO3lDQUhMLGlCQUFVO1lBQ1gsMEJBQVc7WUFDVCx3QkFBVTtPQVAxQixVQUFVLENBNk10QjtJQUFELGlCQUFDO0NBQUEsQUE3TUQsSUE2TUM7QUE3TVksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkZWJvdW5jZVRpbWUsZGlzdGluY3RVbnRpbENoYW5nZWQsc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IEFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBcHBDb25maWcsIERhaWx5SW5wdXQsIERhaWx5V29ya09yZGVyLCBcclxuICAgICAgICAgUmVmQ29kZSwgQ3VzdFByb2ZpbGVMaWdodCwgSXRlbU1hc3RlciwgXHJcbiAgICAgICAgIFNhbGVzT2RlciwgR1JOUE9JbmZvLCBHUk5QT0l0ZW0sIFF0eUJhbGFuY2UsXHJcbiAgICAgICAgIEdSTlJlY2VpdmUsIEN5Y2xlQ291bnRJdGVtLFByb2REZWYsUHJvZERlZkRldGFpbCB9IFxyXG4gICAgICAgICBmcm9tICcuLi9tb2RlbCc7XHJcbmltcG9ydCB7IFNRTFNlcnZpY2UgfSBmcm9tICcuL3NxbC1zZXJ2aWNlJztcclxuXHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBUElTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBfYXBpRW5kcG9pbnQ6c3RyaW5nO1xyXG4gIHByaXZhdGUgX2VycEVuZHBvaW50OnN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHNxbHNlcjpTUUxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIEBJbmplY3QoQVBQX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEFwcENvbmZpZykge1xyXG4gICAgICAvL2RlZmF1bHQgZW5kcG9pbnRzO1xyXG4gICAgICB0aGlzLl9hcGlFbmRwb2ludD0gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQ7XHJcbiAgICAgIHRoaXMuX2VycEVuZHBvaW50PSB0aGlzLmNvbmZpZy5lcnBFbmRwb2ludDtcdCAgICAgICAgICAgICAgICBcclxuICAgICAgc3Fsc2VyLmdldFNldHRpbmdQcm9taXNlKClcclxuICAgICAgLnRoZW4ocm93cyA9PiB7IFxyXG4gICAgICAgIGlmIChyb3dzKSB7XHJcbiAgICAgICAgICB0aGlzLl9hcGlFbmRwb2ludD0gcm93c1sxXTtcclxuICAgICAgICAgIHRoaXMuX2VycEVuZHBvaW50PSByb3dzWzJdO1x0XHRcdFx0XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInNldHRpbmcgZnJvbSBkYXRhYmFzZS4uLi5cIilcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHQgICAgICAgICAgICAgXHJcbiAgfVxyXG5cclxuICBnZXRBdXRoSGVhZGVyKCk6SHR0cEhlYWRlcnN7XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgICByZXR1cm4gaGVhZGVyc1xyXG4gIH1cclxuXHJcbiAgZ2V0RVJQVVJMKCk6c3RyaW5ne1xyXG4gICAgcmV0dXJuIHRoaXMuX2VycEVuZHBvaW50Oy8vdGhpcy5jb25maWcuZXJwRW5kcG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRBUElVUkwoKTpzdHJpbmd7XHJcbiAgICByZXR1cm4gdGhpcy5fYXBpRW5kcG9pbnQ7Ly8gdGhpcy5jb25maWcuYXBpRW5kcG9pbnQ7XHJcbiAgfVxyXG5cclxuICBnZXRDdXN0b21lcigpOiBPYnNlcnZhYmxlPEN1c3RQcm9maWxlTGlnaHQ+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2N1c3RvbWVyL1wiK3VzZXJpZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEN1c3RQcm9maWxlTGlnaHQ+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbU1hc3RlcigpOiBPYnNlcnZhYmxlPEl0ZW1NYXN0ZXI+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9pdGVtbWFzdGVyXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJdGVtTWFzdGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIHNlYXJjaGl0ZW0oaXRlbTogT2JzZXJ2YWJsZTxzdHJpbmc+KSB7XHJcbiAgICBcclxuICAgIHJldHVybiBpdGVtLnBpcGUoXHJcbiAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSg0MDApLFxyXG4gICAgICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpLFxyXG4gICAgICAgICAgICAgICBzd2l0Y2hNYXAodGVybT0+dGhpcy5zZWFyY2hJdGVtRW50cmllcyh0ZXJtKSlcclxuICAgICAgICAgICAgICAgKTtcclxuICB9XHJcblxyXG4gIHNlYXJjaEl0ZW1FbnRyaWVzKHRlcm0pIHtcclxuICAgIC8vIGlmKHRlcm09PVwiXCIpe1xyXG4gICAgLy8gICByZXR1cm4gbnVsbDtcclxuICAgIC8vIH1cclxuICAgIGxldCBxdWVyeVVybDogc3RyaW5nID0gJz9pdGVtPScrdGVybTtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2l0ZW1tYXN0ZXIvc2VhcmNoXCIrcXVlcnlVcmw7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8SXRlbU1hc3Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBcclxuICBnZXRJdGVtQmFsYW5jZShpY29kZTpzdHJpbmcpOiBPYnNlcnZhYmxlPFF0eUJhbGFuY2U+IHtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9pdGVtbWFzdGVyL2JhbGFuY2UvXCIraWNvZGU7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxRdHlCYWxhbmNlPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIC8vIGdldFByb2REZWYoKTogT2JzZXJ2YWJsZTxQcm9kRGVmPiB7XHJcbiAgLy8gICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvaXRlbW1hc3Rlci9wcm9kZGVmXCI7XHJcbiAgLy8gICByZXR1cm4gdGhpcy5odHRwLmdldDxQcm9kRGVmPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICAvLyB9XHJcblxyXG4gIGdldFByb2REZWZEZXRhaWwocHJvZGNvZGU6c3RyaW5nKTogT2JzZXJ2YWJsZTxQcm9kRGVmRGV0YWlsPiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvcHJvZGRlZi9wcmRkZWZkZXRhaWwvXCIrcHJvZGNvZGU7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxQcm9kRGVmRGV0YWlsPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFByb2REZWZpbmF0aW9uKHByb2Rjb2RlOnN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvcHJvZGRlZi9kZWZpbmF0aW9uL1wiK3Byb2Rjb2RlO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55Pih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIHNlYXJjaFByZERlZihpdGVtOiBPYnNlcnZhYmxlPHN0cmluZz4pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGl0ZW0ucGlwZShcclxuICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDQwMCksXHJcbiAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtPT50aGlzLnNlYXJjaFByb2REZWZFbnRyaWVzKHRlcm0pKVxyXG4gICAgICAgICAgICAgICApO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoUHJvZERlZkVudHJpZXModGVybSkge1xyXG4gICAgbGV0IHF1ZXJ5VXJsOiBzdHJpbmcgPSAnP3Byb2Rjb2RlPScrdGVybTtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL3Byb2RkZWYvcHJkZGVmc2VhcmNoXCIrcXVlcnlVcmw7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8UHJvZERlZj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTYWxlc09yZGVyKCk6IE9ic2VydmFibGU8U2FsZXNPZGVyPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9zYWxlc29yZGVyL1wiK3VzZXJpZDtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFNhbGVzT2Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBnZXRTYWxlc09yZGVyQnlLZXkoa2V5OnN0cmluZyk6IE9ic2VydmFibGU8U2FsZXNPZGVyPiB7XHJcbiAgICBsZXQgZW5jb2RlZGtleSA9IGVuY29kZVVSSShrZXkpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL3NhbGVzb3JkZXIvb3JkZXIvXCIrZW5jb2RlZGtleTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFNhbGVzT2Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG4gIFxyXG4gIHBvc3RTYWxlT3JkZXIob3JkZXI6U2FsZXNPZGVyKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShvcmRlcik7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvc2FsZXNvcmRlci9zYXZlL1wiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0RGFpbHlXb3JrT3JkZXJzKCk6IE9ic2VydmFibGU8RGFpbHlXb3JrT3JkZXI+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2RhaWx5cHJvZFwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RGFpbHlXb3JrT3JkZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UHJvZFJlZkNvZGVzKCk6IE9ic2VydmFibGU8UmVmQ29kZT4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvZGFpbHlwcm9kL3JlZmNvZGVcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFJlZkNvZGU+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgcG9zdERhaWx5SW5wdXQoZGFpbHk6RGFpbHlJbnB1dCk6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgLnNldCgnQ29udGVudC1UeXBlJyxcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICBsZXQgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGFpbHkpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2RhaWx5cHJvZC9jcmVhdGVcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIGdldEdSTlBPbGlzdCgpOiBPYnNlcnZhYmxlPEdSTlBPSW5mbz4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvZ3JuL3BvXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxHUk5QT0luZm8+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0UE9JdGVtcyhwb25vOnN0cmluZyxwb3JlbDpzdHJpbmcpOiBPYnNlcnZhYmxlPCBHUk5QT0l0ZW0+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSBcclxuICAgICAgICAgICAgICAgICsgXCJhcGkvZ3JuL3BvaXRlbT9wb25vPVwiK3Bvbm8rXCImcG9yZWw9XCIrcG9yZWw7XHJcbiAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8IEdSTlBPSXRlbT4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBwb3N0R1JOUmVjZWlwdChncm5yZWM6R1JOUmVjZWl2ZSk6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgLnNldCgnQ29udGVudC1UeXBlJyxcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICBsZXQgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZ3JucmVjKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9ncm4vcmVjZWlwdFwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgcG9zdElzQ3ljbGVDb3VudFZhbGlkKGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2N5Y2xlY291bnQvY2hlY2tcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHBvc3RJc0N5Y2xlQ291bnRWYWxpZEV4KGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2N5Y2xlY291bnQvY2hlY2syXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBwdXRDeWNsZUNvdW50SXRlbShpdGVtOkN5Y2xlQ291bnRJdGVtKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9jeWNsZWNvdW50L3VwZGF0ZVwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBwdXRDeWNsZUNvdW50SXRlbUV4KGl0ZW06Q3ljbGVDb3VudEl0ZW0pOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2N5Y2xlY291bnQvdXBkYXRlMlwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==