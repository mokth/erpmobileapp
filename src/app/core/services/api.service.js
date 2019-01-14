"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var app_config_module_1 = require("../../config/app-config.module");
var auth_service_1 = require("./auth-service");
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
        var url = this.config.apiEndpoint + "api/customer";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getItemMaster = function () {
        var url = this.config.apiEndpoint + "api/itemmaster";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrder = function () {
        var url = this.config.apiEndpoint + "api/salesorder";
        return this.http.get(url, { headers: this.getAuthHeader() });
    };
    APIService.prototype.getSalesOrderByKey = function (key) {
        var encodedkey = encodeURI(key);
        var url = this.config.apiEndpoint + "api/salesorder/order/" + encodedkey;
        return this.http.get(url, { headers: this.getAuthHeader() });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcGkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFtRDtBQUNuRCw2Q0FBK0Q7QUFHL0Qsb0VBQTREO0FBSTVELCtDQUE2QztBQUs3QztJQUVFLG9CQUFvQixJQUFnQixFQUNoQixJQUFnQixFQUNJLE1BQWlCO1FBRnJDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNJLFdBQU0sR0FBTixNQUFNLENBQVc7SUFFekQsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGtCQUFXLEVBQUU7YUFDN0IsR0FBRyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDL0MsT0FBTyxPQUFPLENBQUE7SUFDakIsQ0FBQztJQUVELGdDQUFXLEdBQVg7UUFFRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBbUIsR0FBRyxFQUFDLEVBQUMsT0FBTyxFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGtDQUFhLEdBQWI7UUFDRSxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFhLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxrQ0FBYSxHQUFiO1FBQ0UsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBWSxHQUFHLEVBQUMsRUFBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsdUNBQWtCLEdBQWxCLFVBQW1CLEdBQVU7UUFDM0IsSUFBSSxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLHVCQUF1QixHQUFDLFVBQVUsQ0FBQztRQUN6RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFZLEdBQUcsRUFBQyxFQUFDLE9BQU8sRUFBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFsQ1UsVUFBVTtRQUh0QixpQkFBVSxDQUFDO1lBQ1YsVUFBVSxFQUFFLE1BQU07U0FDbkIsQ0FBQztRQUthLFdBQUEsYUFBTSxDQUFDLDhCQUFVLENBQUMsQ0FBQTt5Q0FGTCxpQkFBVTtZQUNYLDBCQUFXO09BSHpCLFVBQVUsQ0FtQ3RCO0lBQUQsaUJBQUM7Q0FBQSxBQW5DRCxJQW1DQztBQW5DWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFQUF9DT05GSUcgfSBmcm9tICcuLi8uLi9jb25maWcvYXBwLWNvbmZpZy5tb2R1bGUnO1xuaW1wb3J0IHsgQXBwQ29uZmlnIH0gZnJvbSAnLi4vbW9kZWwvYXBwLWNvbmZpZy5tb2RlbCc7XG5cbmltcG9ydCB7IEN1c3RQcm9maWxlTGlnaHQsIEl0ZW1NYXN0ZXIsIFNhbGVzT2RlciB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLXNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBBUElTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgICAgICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgQEluamVjdChBUFBfQ09ORklHKSBwcml2YXRlIGNvbmZpZzogQXBwQ29uZmlnKSB7XG5cbiAgfVxuXG4gIGdldEF1dGhIZWFkZXIoKTpIdHRwSGVhZGVyc3tcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpXG4gICAgIC5zZXQoJ0F1dGhvcml6YXRpb24nLCB0aGlzLmF1dGgudG9rZW5HZXR0ZXIoKSk7XG4gICAgIHJldHVybiBoZWFkZXJzXG4gIH1cblxuICBnZXRDdXN0b21lcigpOiBPYnNlcnZhYmxlPEN1c3RQcm9maWxlTGlnaHQ+IHtcbiAgICBcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL2N1c3RvbWVyXCI7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q3VzdFByb2ZpbGVMaWdodD4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XG4gIH1cblxuICBnZXRJdGVtTWFzdGVyKCk6IE9ic2VydmFibGU8SXRlbU1hc3Rlcj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvaXRlbW1hc3RlclwiO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PEl0ZW1NYXN0ZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xuICB9XG5cbiAgZ2V0U2FsZXNPcmRlcigpOiBPYnNlcnZhYmxlPFNhbGVzT2Rlcj4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmFwaUVuZHBvaW50ICsgXCJhcGkvc2FsZXNvcmRlclwiO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFNhbGVzT2Rlcj4odXJsLHtoZWFkZXJzOnRoaXMuZ2V0QXV0aEhlYWRlcigpfSk7XG4gIH1cblxuICBnZXRTYWxlc09yZGVyQnlLZXkoa2V5OnN0cmluZyk6IE9ic2VydmFibGU8U2FsZXNPZGVyPiB7XG4gICAgbGV0IGVuY29kZWRrZXkgPSBlbmNvZGVVUkkoa2V5KTtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlFbmRwb2ludCArIFwiYXBpL3NhbGVzb3JkZXIvb3JkZXIvXCIrZW5jb2RlZGtleTtcbiAgICByZXR1cm4gdGhpcy5odHRwLmdldDxTYWxlc09kZXI+KHVybCx7aGVhZGVyczp0aGlzLmdldEF1dGhIZWFkZXIoKX0pO1xuICB9XG59XG4iXX0=