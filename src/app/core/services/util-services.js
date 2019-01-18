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
var rxjs_1 = require("rxjs");
var store_service_1 = require("./store-service");
var UtilService = /** @class */ (function () {
    function UtilService(store) {
        this.store = store;
        this.selected$ = new rxjs_1.BehaviorSubject({});
    }
    UtilService.prototype.getBehaviorSubject = function () {
        return this.selected$;
    };
    UtilService.prototype.fireEvent = function (type, item) {
        this.selected$.next({
            "type": type,
            "data": item
        });
    };
    UtilService.prototype.setLocalStore = function (key, data) {
        this.store.setLocalStore(key, data);
    };
    UtilService.prototype.getLocalStore = function (key) {
        return this.store.getLocalStore(key);
    };
    UtilService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [store_service_1.StoreService])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC1zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwtc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkJBQXVDO0FBQ3ZDLGlEQUErQztBQU03QztJQUdFLHFCQUFvQixLQUFrQjtRQUFsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBRjlCLGNBQVMsR0FBeUIsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBR2xFLENBQUM7SUFFRCx3Q0FBa0IsR0FBbEI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxJQUFXLEVBQUMsSUFBUTtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNoQixNQUFNLEVBQUMsSUFBSTtZQUNYLE1BQU0sRUFBQyxJQUFJO1NBQ2QsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxHQUFVLEVBQUMsSUFBUTtRQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxHQUFVO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQXZCVSxXQUFXO1FBSHpCLGlCQUFVLENBQUM7WUFDUixVQUFVLEVBQUUsTUFBTTtTQUNuQixDQUFDO3lDQUkwQiw0QkFBWTtPQUgzQixXQUFXLENBd0J2QjtJQUFELGtCQUFDO0NBQUEsQUF4QkQsSUF3QkM7QUF4Qlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0IHsgU3RvcmVTZXJ2aWNlIH0gZnJvbSBcIi4vc3RvcmUtc2VydmljZVwiO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICAgIHByb3ZpZGVkSW46ICdyb290J1xyXG4gIH0pIFxyXG4gIGV4cG9ydCBjbGFzcyBVdGlsU2VydmljZSB7XHJcbiAgICBwcml2YXRlIHNlbGVjdGVkJDogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yZTpTdG9yZVNlcnZpY2UpIHsgICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGdldEJlaGF2aW9yU3ViamVjdCgpOkJlaGF2aW9yU3ViamVjdDxhbnk+e1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkJDtcclxuICAgIH1cclxuXHJcbiAgICBmaXJlRXZlbnQodHlwZTpzdHJpbmcsaXRlbTphbnkpe1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQkLm5leHQoe1xyXG4gICAgICAgICAgICBcInR5cGVcIjp0eXBlLFxyXG4gICAgICAgICAgICBcImRhdGFcIjppdGVtXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TG9jYWxTdG9yZShrZXk6c3RyaW5nLGRhdGE6YW55KXtcclxuICAgICAgIHRoaXMuc3RvcmUuc2V0TG9jYWxTdG9yZShrZXksIGRhdGEpXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TG9jYWxTdG9yZShrZXk6c3RyaW5nKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yZS5nZXRMb2NhbFN0b3JlKGtleSlcclxuICAgIH1cclxuICB9Il19