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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFtRDtBQUNuRCw2Q0FBK0Q7QUFFL0QsNENBQTRFO0FBRTVFLCtDQUE2QztBQUM3QyxvRUFBNEQ7QUFLNUQsNkNBQTJDO0FBTTNDO0lBS0Usb0JBQW9CLElBQWdCLEVBQ2hCLElBQWdCLEVBQ2hCLE1BQWlCLEVBQ0csTUFBaUI7UUFIekQsaUJBZUM7UUFmbUIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDRyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3JELG9CQUFvQjtRQUNwQixJQUFJLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDM0MsTUFBTSxDQUFDLGlCQUFpQixFQUFFO2FBQ3pCLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDUixJQUFJLElBQUksRUFBRTtnQkFDUixLQUFJLENBQUMsWUFBWSxHQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQTthQUN6QztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDN0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUE7SUFDakIsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSwwQkFBMEI7SUFDckQsQ0FBQztJQUVELDhCQUFTLEdBQVQ7UUFDRSxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQSwyQkFBMkI7SUFDdEQsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxlQUFlLEdBQUMsTUFBTSxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQW1CLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFRCxrQ0FBYSxHQUFiO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLGdCQUFnQixDQUFDO1FBQ2hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWEsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELCtCQUFVLEdBQVYsVUFBVyxJQUF3QjtRQUFuQyxpQkFPQztRQUxDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDTCx3QkFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixnQ0FBb0IsRUFBRSxFQUN0QixxQkFBUyxDQUFDLFVBQUEsSUFBSSxJQUFFLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUE1QixDQUE0QixDQUFDLENBQzVDLENBQUM7SUFDZixDQUFDO0lBRUQsc0NBQWlCLEdBQWpCLFVBQWtCLElBQUk7UUFDcEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixJQUFJO1FBQ0osSUFBSSxRQUFRLEdBQVcsUUFBUSxHQUFDLElBQUksQ0FBQztRQUNyQyxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyx1QkFBdUIsR0FBQyxRQUFRLENBQUM7UUFDaEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRCxrQ0FBYSxHQUFiO1FBQ0UsSUFBTSxNQUFNLEdBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsaUJBQWlCLEdBQUMsTUFBTSxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELHVDQUFrQixHQUFsQixVQUFtQixHQUFVO1FBQzNCLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsdUJBQXVCLEdBQUMsVUFBVSxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVksR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELGtDQUFhLEdBQWIsVUFBYyxLQUFlO1FBQzNCLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFDLGtCQUFrQixDQUFDO2FBQ3RDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLHNCQUFzQixDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCx1Q0FBa0IsR0FBbEI7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxlQUFlLENBQUM7UUFDL0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBaUIsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELG9DQUFlLEdBQWY7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFVLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxtQ0FBYyxHQUFkLFVBQWUsS0FBZ0I7UUFDN0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsc0JBQXNCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGlDQUFZLEdBQVo7UUFDRSxJQUFNLE1BQU0sR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxZQUFZLENBQUM7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBWSxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsK0JBQVUsR0FBVixVQUFXLElBQVcsRUFBQyxLQUFZO1FBQ2pDLElBQU0sTUFBTSxHQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtjQUNkLHNCQUFzQixHQUFDLElBQUksR0FBQyxTQUFTLEdBQUMsS0FBSyxDQUFDO1FBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYSxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsbUNBQWMsR0FBZCxVQUFlLE1BQWlCO1FBQzlCLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFDLGtCQUFrQixDQUFDO2FBQ3RDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLGlCQUFpQixDQUFDO1FBQ2pELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCwwQ0FBcUIsR0FBckIsVUFBc0IsSUFBbUI7UUFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsc0JBQXNCLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELDRDQUF1QixHQUF2QixVQUF3QixJQUFtQjtRQUN6QyxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDOUIsR0FBRyxDQUFDLGNBQWMsRUFBQyxrQkFBa0IsQ0FBQzthQUN0QyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyx1QkFBdUIsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsc0NBQWlCLEdBQWpCLFVBQWtCLElBQW1CO1FBQ25DLElBQUksT0FBTyxHQUFHLElBQUksa0JBQVcsRUFBRTthQUM5QixHQUFHLENBQUMsY0FBYyxFQUFDLGtCQUFrQixDQUFDO2FBQ3RDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLHVCQUF1QixDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx3Q0FBbUIsR0FBbkIsVUFBb0IsSUFBbUI7UUFDckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxrQkFBVyxFQUFFO2FBQzlCLEdBQUcsQ0FBQyxjQUFjLEVBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxJQUFJLEdBQVcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsd0JBQXdCLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQXJLVSxVQUFVO1FBSHRCLGlCQUFVLENBQUM7WUFDVixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO1FBU2EsV0FBQSxhQUFNLENBQUMsOEJBQVUsQ0FBQyxDQUFBO3lDQUhMLGlCQUFVO1lBQ1gsMEJBQVc7WUFDVCx3QkFBVTtPQVAxQixVQUFVLENBc0t0QjtJQUFELGlCQUFDO0NBQUEsQUF0S0QsSUFzS0M7QUF0S1ksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHtkZWJvdW5jZVRpbWUsZGlzdGluY3RVbnRpbENoYW5nZWQsc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5cclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGgtc2VydmljZSc7XHJcbmltcG9ydCB7IEFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGUnO1xyXG5pbXBvcnQgeyBBcHBDb25maWcsIERhaWx5SW5wdXQsIERhaWx5V29ya09yZGVyLCBcclxuICAgICAgICAgUmVmQ29kZSwgQ3VzdFByb2ZpbGVMaWdodCwgSXRlbU1hc3RlciwgXHJcbiAgICAgICAgIFNhbGVzT2RlciwgR1JOUE9JbmZvLCBHUk5QT0l0ZW0sIEdSTlJlY2VpdmUsIEN5Y2xlQ291bnRJdGVtIH0gXHJcbiAgICAgICAgIGZyb20gJy4uL21vZGVsJztcclxuaW1wb3J0IHsgU1FMU2VydmljZSB9IGZyb20gJy4vc3FsLXNlcnZpY2UnO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFQSVNlcnZpY2Uge1xyXG5cclxuICBwcml2YXRlIF9hcGlFbmRwb2ludDpzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfZXJwRW5kcG9pbnQ6c3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgc3Fsc2VyOlNRTFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgQEluamVjdChBUFBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnKSB7XHJcbiAgICAgIC8vZGVmYXVsdCBlbmRwb2ludHM7XHJcbiAgICAgIHRoaXMuX2FwaUVuZHBvaW50PSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludDtcclxuICAgICAgdGhpcy5fZXJwRW5kcG9pbnQ9IHRoaXMuY29uZmlnLmVycEVuZHBvaW50O1x0ICAgICAgICAgICAgICAgIFxyXG4gICAgICBzcWxzZXIuZ2V0U2V0dGluZ1Byb21pc2UoKVxyXG4gICAgICAudGhlbihyb3dzID0+IHsgXHJcbiAgICAgICAgaWYgKHJvd3MpIHtcclxuICAgICAgICAgIHRoaXMuX2FwaUVuZHBvaW50PSByb3dzWzFdO1xyXG4gICAgICAgICAgdGhpcy5fZXJwRW5kcG9pbnQ9IHJvd3NbMl07XHRcdFx0XHRcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0dGluZyBmcm9tIGRhdGFiYXNlLi4uLlwiKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcdCAgICAgICAgICAgICBcclxuICB9XHJcblxyXG4gIGdldEF1dGhIZWFkZXIoKTpIdHRwSGVhZGVyc3tcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgIHJldHVybiBoZWFkZXJzXHJcbiAgfVxyXG5cclxuICBnZXRFUlBVUkwoKTpzdHJpbmd7XHJcbiAgICByZXR1cm4gdGhpcy5fZXJwRW5kcG9pbnQ7Ly90aGlzLmNvbmZpZy5lcnBFbmRwb2ludDtcclxuICB9XHJcblxyXG4gIGdldEFQSVVSTCgpOnN0cmluZ3tcclxuICAgIHJldHVybiB0aGlzLl9hcGlFbmRwb2ludDsvLyB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludDtcclxuICB9XHJcblxyXG4gIGdldEN1c3RvbWVyKCk6IE9ic2VydmFibGU8Q3VzdFByb2ZpbGVMaWdodD4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvY3VzdG9tZXIvXCIrdXNlcmlkO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q3VzdFByb2ZpbGVMaWdodD4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XHJcbiAgfVxyXG5cclxuICBnZXRJdGVtTWFzdGVyKCk6IE9ic2VydmFibGU8SXRlbU1hc3Rlcj4ge1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2l0ZW1tYXN0ZXJcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEl0ZW1NYXN0ZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoaXRlbShpdGVtOiBPYnNlcnZhYmxlPHN0cmluZz4pIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIGl0ZW0ucGlwZShcclxuICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDQwMCksXHJcbiAgICAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXHJcbiAgICAgICAgICAgICAgIHN3aXRjaE1hcCh0ZXJtPT50aGlzLnNlYXJjaEl0ZW1FbnRyaWVzKHRlcm0pKVxyXG4gICAgICAgICAgICAgICApO1xyXG4gIH1cclxuXHJcbiAgc2VhcmNoSXRlbUVudHJpZXModGVybSkge1xyXG4gICAgLy8gaWYodGVybT09XCJcIil7XHJcbiAgICAvLyAgIHJldHVybiBudWxsO1xyXG4gICAgLy8gfVxyXG4gICAgbGV0IHF1ZXJ5VXJsOiBzdHJpbmcgPSAnP2l0ZW09Jyt0ZXJtO1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvaXRlbW1hc3Rlci9zZWFyY2hcIitxdWVyeVVybDtcclxuICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxJdGVtTWFzdGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcbiAgZ2V0U2FsZXNPcmRlcigpOiBPYnNlcnZhYmxlPFNhbGVzT2Rlcj4ge1xyXG4gICAgY29uc3QgdXNlcmlkID10aGlzLmF1dGguZ2V0VXNlcklEKCk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvc2FsZXNvcmRlci9cIit1c2VyaWQ7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTYWxlc09kZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgZ2V0U2FsZXNPcmRlckJ5S2V5KGtleTpzdHJpbmcpOiBPYnNlcnZhYmxlPFNhbGVzT2Rlcj4ge1xyXG4gICAgbGV0IGVuY29kZWRrZXkgPSBlbmNvZGVVUkkoa2V5KTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9zYWxlc29yZGVyL29yZGVyL1wiK2VuY29kZWRrZXk7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTYWxlc09kZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuICBcclxuICBwb3N0U2FsZU9yZGVyKG9yZGVyOlNhbGVzT2Rlcik6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgLnNldCgnQ29udGVudC1UeXBlJyxcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICBsZXQgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkob3JkZXIpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL3NhbGVzb3JkZXIvc2F2ZS9cIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIGdldERhaWx5V29ya09yZGVycygpOiBPYnNlcnZhYmxlPERhaWx5V29ya09yZGVyPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9kYWlseXByb2RcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PERhaWx5V29ya09yZGVyPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFByb2RSZWZDb2RlcygpOiBPYnNlcnZhYmxlPFJlZkNvZGU+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2RhaWx5cHJvZC9yZWZjb2RlXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxSZWZDb2RlPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIHBvc3REYWlseUlucHV0KGRhaWx5OkRhaWx5SW5wdXQpOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGRhaWx5KTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9kYWlseXByb2QvY3JlYXRlXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBnZXRHUk5QT2xpc3QoKTogT2JzZXJ2YWJsZTxHUk5QT0luZm8+IHtcclxuICAgIGNvbnN0IHVzZXJpZCA9dGhpcy5hdXRoLmdldFVzZXJJRCgpO1xyXG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRBUElVUkwoKSArIFwiYXBpL2dybi9wb1wiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8R1JOUE9JbmZvPih1cmwse2hlYWRlcnM6dGhpcy5nZXRBdXRoSGVhZGVyKCl9KTtcclxuICB9XHJcblxyXG4gIGdldFBPSXRlbXMocG9ubzpzdHJpbmcscG9yZWw6c3RyaW5nKTogT2JzZXJ2YWJsZTwgR1JOUE9JdGVtPiB7XHJcbiAgICBjb25zdCB1c2VyaWQgPXRoaXMuYXV0aC5nZXRVc2VySUQoKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgXHJcbiAgICAgICAgICAgICAgICArIFwiYXBpL2dybi9wb2l0ZW0/cG9ubz1cIitwb25vK1wiJnBvcmVsPVwiK3BvcmVsO1xyXG4gICAgY29uc29sZS5sb2codXJsKTtcclxuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PCBHUk5QT0l0ZW0+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xyXG4gIH1cclxuXHJcbiAgcG9zdEdSTlJlY2VpcHQoZ3JucmVjOkdSTlJlY2VpdmUpOk9ic2VydmFibGU8YW55PntcclxuICAgIGxldCBoZWFkZXJzID0gbmV3IEh0dHBIZWFkZXJzKClcclxuICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsXCJhcHBsaWNhdGlvbi9qc29uXCIpXHJcbiAgICAuc2V0KCdBdXRob3JpemF0aW9uJywgdGhpcy5hdXRoLnRva2VuR2V0dGVyKCkpO1xyXG4gICAgbGV0IGJvZHk6IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGdybnJlYyk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvZ3JuL3JlY2VpcHRcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCh1cmwsIGJvZHksIHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICB9XHJcblxyXG4gIHBvc3RJc0N5Y2xlQ291bnRWYWxpZChpdGVtOkN5Y2xlQ291bnRJdGVtKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9jeWNsZWNvdW50L2NoZWNrXCI7XHJcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QodXJsLCBib2R5LCB7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgfVxyXG5cclxuICBwb3N0SXNDeWNsZUNvdW50VmFsaWRFeChpdGVtOkN5Y2xlQ291bnRJdGVtKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9jeWNsZWNvdW50L2NoZWNrMlwiO1xyXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgcHV0Q3ljbGVDb3VudEl0ZW0oaXRlbTpDeWNsZUNvdW50SXRlbSk6T2JzZXJ2YWJsZTxhbnk+e1xyXG4gICAgbGV0IGhlYWRlcnMgPSBuZXcgSHR0cEhlYWRlcnMoKVxyXG4gICAgLnNldCgnQ29udGVudC1UeXBlJyxcImFwcGxpY2F0aW9uL2pzb25cIilcclxuICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XHJcbiAgICBsZXQgYm9keTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoaXRlbSk7XHJcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldEFQSVVSTCgpICsgXCJhcGkvY3ljbGVjb3VudC91cGRhdGVcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxuXHJcbiAgcHV0Q3ljbGVDb3VudEl0ZW1FeChpdGVtOkN5Y2xlQ291bnRJdGVtKTpPYnNlcnZhYmxlPGFueT57XHJcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXHJcbiAgICAuc2V0KCdDb250ZW50LVR5cGUnLFwiYXBwbGljYXRpb24vanNvblwiKVxyXG4gICAgLnNldCgnQXV0aG9yaXphdGlvbicsIHRoaXMuYXV0aC50b2tlbkdldHRlcigpKTtcclxuICAgIGxldCBib2R5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcclxuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0QVBJVVJMKCkgKyBcImFwaS9jeWNsZWNvdW50L3VwZGF0ZTJcIjtcclxuICAgIHJldHVybiB0aGlzLmh0dHAucHV0KHVybCwgYm9keSwgeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=