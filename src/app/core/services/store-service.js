"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ApplicationSettings = require("application-settings");
var localStroage = require("nativescript-localstorage");
var enums_1 = require("../enums");
var StoreService = /** @class */ (function () {
    function StoreService() {
    }
    StoreService.prototype.saveToken = function (data) {
        var obj = JSON.parse(data);
        ApplicationSettings.setBoolean(enums_1.AuthTerm.authenticated, true);
        ApplicationSettings.setString(enums_1.AuthTerm.token, obj.auth_token);
        ApplicationSettings.setString(enums_1.AuthTerm.userid, obj.id);
    };
    StoreService.prototype.removeToken = function () {
        ApplicationSettings.setBoolean(enums_1.AuthTerm.authenticated, false);
        ApplicationSettings.remove(enums_1.AuthTerm.token);
        ApplicationSettings.remove(enums_1.AuthTerm.userid);
    };
    StoreService.prototype.getString = function (key) {
        return ApplicationSettings.getString(key, '');
    };
    StoreService.prototype.getBoolean = function (key) {
        return ApplicationSettings.getBoolean(key, false);
    };
    StoreService.prototype.setLocalStore = function (key, data) {
        localStroage.setItem(key, data);
    };
    StoreService.prototype.getLocalStore = function (key) {
        return localStroage.getItem(key);
    };
    StoreService.prototype.removeLocalStore = function (key) {
        localStorage.removeItem(key);
    };
    StoreService.prototype.clearLocalStore = function () {
        localStorage.clear();
    };
    StoreService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], StoreService);
    return StoreService;
}());
exports.StoreService = StoreService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JlLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsMERBQTREO0FBQzVELHdEQUEwRDtBQUUxRCxrQ0FBb0M7QUFNbEM7SUFBQTtJQXNDRCxDQUFDO0lBcENFLGdDQUFTLEdBQVQsVUFBVSxJQUFRO1FBQ2IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZ0JBQVEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0QsbUJBQW1CLENBQUMsU0FBUyxDQUFDLGdCQUFRLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsZ0JBQVEsQ0FBQyxNQUFNLEVBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0ksbUJBQW1CLENBQUMsVUFBVSxDQUFDLGdCQUFRLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzlELG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxnQ0FBUyxHQUFULFVBQVUsR0FBVTtRQUNoQixPQUFRLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGlDQUFVLEdBQVYsVUFBVyxHQUFVO1FBQ2pCLE9BQVEsbUJBQW1CLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsb0NBQWEsR0FBYixVQUFjLEdBQVUsRUFBQyxJQUFRO1FBQzdCLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ25DLENBQUM7SUFFRCxvQ0FBYSxHQUFiLFVBQWMsR0FBVTtRQUNwQixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixHQUFVO1FBQ3ZCLFlBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELHNDQUFlLEdBQWY7UUFDSSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQXJDVSxZQUFZO1FBSjFCLGlCQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO09BRVcsWUFBWSxDQXNDekI7SUFBRCxtQkFBQztDQUFBLEFBdENBLElBc0NBO0FBdENhLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIEFwcGxpY2F0aW9uU2V0dGluZ3MgZnJvbSAnYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBsb2NhbFN0cm9hZ2UgZnJvbSAnbmF0aXZlc2NyaXB0LWxvY2Fsc3RvcmFnZSc7XHJcblxyXG5pbXBvcnQgeyBBdXRoVGVybSB9IGZyb20gXCIuLi9lbnVtc1wiO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGNsYXNzIFN0b3JlU2VydmljZSB7XHJcbiAgICBcclxuICAgIHNhdmVUb2tlbihkYXRhOmFueSl7XHJcbiAgICAgICAgIGxldCBvYmogPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oQXV0aFRlcm0uYXV0aGVudGljYXRlZCwgdHJ1ZSk7XHJcbiAgICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0U3RyaW5nKEF1dGhUZXJtLnRva2VuLG9iai5hdXRoX3Rva2VuKTtcclxuICAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRTdHJpbmcoQXV0aFRlcm0udXNlcmlkLG9iai5pZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9rZW4oKXtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oQXV0aFRlcm0uYXV0aGVudGljYXRlZCwgZmFsc2UpO1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3MucmVtb3ZlKEF1dGhUZXJtLnRva2VuKTtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnJlbW92ZShBdXRoVGVybS51c2VyaWQpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0cmluZyhrZXk6c3RyaW5nKTpzdHJpbmd7XHJcbiAgICAgICAgcmV0dXJuICBBcHBsaWNhdGlvblNldHRpbmdzLmdldFN0cmluZyhrZXksJycpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEJvb2xlYW4oa2V5OnN0cmluZyk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gIEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0Qm9vbGVhbihrZXksZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExvY2FsU3RvcmUoa2V5OnN0cmluZyxkYXRhOmFueSl7XHJcbiAgICAgICAgbG9jYWxTdHJvYWdlLnNldEl0ZW0oa2V5LCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGdldExvY2FsU3RvcmUoa2V5OnN0cmluZyl7XHJcbiAgICAgICAgcmV0dXJuIGxvY2FsU3Ryb2FnZS5nZXRJdGVtKGtleSlcclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVMb2NhbFN0b3JlKGtleTpzdHJpbmcpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJMb2NhbFN0b3JlKCl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiB9Il19