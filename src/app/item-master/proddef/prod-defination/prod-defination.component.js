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
var api_service_1 = require("../../../core/services/api.service");
var util_services_1 = require("../../../core/services/util-services");
var navigation_service_1 = require("../../../core/services/navigation.service");
var ProdDefinationComponent = /** @class */ (function () {
    function ProdDefinationComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.showError = false;
        this.iconHome = String.fromCharCode(0xf015) + " Back";
        var data = this.utilser.getLocalStore("proddef");
        if (data) {
            var proddef = JSON.parse(data);
            this.prodcode = proddef.icode;
            this.getProdDefination();
        }
        this.getProdDefination();
    }
    ProdDefinationComponent.prototype.ngOnInit = function () { };
    ProdDefinationComponent.prototype.getProdDefination = function () {
        var _this = this;
        this.serv.getProdDefination(this.prodcode)
            .subscribe(function (resp) {
            console.log(resp);
            _this.showError = false;
            _this.listbom = resp.listbom;
            _this.listmac = resp.listmac;
            _this.listproc = resp.listporc;
            _this.listwc = resp.listwc;
        }, function (err) {
            _this.showError = true;
            _this.errmsg = err.statusText;
        });
    };
    ProdDefinationComponent.prototype.onBack = function (e) {
        this.navigationService.back();
    };
    ProdDefinationComponent = __decorate([
        core_1.Component({
            selector: 'prod-defination',
            templateUrl: './prod-defination.component.html',
            styleUrls: ['./prod-defination.component.css']
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            util_services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ProdDefinationComponent);
    return ProdDefinationComponent;
}());
exports.ProdDefinationComponent = ProdDefinationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZC1kZWZpbmF0aW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2QtZGVmaW5hdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBa0Q7QUFDbEQsa0VBQWdFO0FBQ2hFLHNFQUFtRTtBQUNuRSxnRkFBOEU7QUFTOUU7SUFVQyxpQ0FBb0IsSUFBZ0IsRUFDekIsT0FBb0IsRUFDcEIsaUJBQW9DO1FBRjNCLFNBQUksR0FBSixJQUFJLENBQVk7UUFDekIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQzdDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBQyxPQUFPLENBQUM7UUFDcEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkQsSUFBSSxJQUFJLEVBQUM7WUFDVixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFSiwwQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLG1EQUFpQixHQUFqQjtRQUFBLGlCQWVDO1FBZEEsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3hDLFNBQVMsQ0FBQyxVQUFDLElBQVE7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixLQUFJLENBQUMsU0FBUyxHQUFDLEtBQUssQ0FBQztZQUNyQixLQUFJLENBQUMsT0FBTyxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0IsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzVCLEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDM0IsQ0FBQyxFQUNELFVBQUMsR0FBRztZQUNILEtBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxNQUFNLEdBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUM7SUFFRCx3Q0FBTSxHQUFOLFVBQU8sQ0FBQztRQUNQLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBN0NXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1NBQzlDLENBQUM7eUNBWXlCLHdCQUFVO1lBQ2hCLDJCQUFXO1lBQ0Qsc0NBQWlCO09BWm5DLHVCQUF1QixDQThDbkM7SUFBRCw4QkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlsU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvdXRpbC1zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdwcm9kLWRlZmluYXRpb24nLFxuXHR0ZW1wbGF0ZVVybDogJy4vcHJvZC1kZWZpbmF0aW9uLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcHJvZC1kZWZpbmF0aW9uLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb2REZWZpbmF0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0c2hvd0Vycm9yOmJvb2xlYW47XG5cdGVycm1zZzpzdHJpbmc7XG5cdGxpc3Rib206YW55O1xuXHRsaXN0bWFjOmFueTtcblx0bGlzdHByb2M6YW55O1xuXHRsaXN0d2M6YW55O1xuXG5cdHByb2Rjb2RlOnN0cmluZztcblx0aWNvbkhvbWU6c3RyaW5nO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnY6IEFQSVNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgdXRpbHNlcjogVXRpbFNlcnZpY2UsXG5cdFx0XHRcdHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XG5cdCAgdGhpcy5zaG93RXJyb3IgPSBmYWxzZTtcblx0ICB0aGlzLmljb25Ib21lID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMTUpK1wiIEJhY2tcIjtcblx0ICBjb25zdCBkYXRhID0gdGhpcy51dGlsc2VyLmdldExvY2FsU3RvcmUoXCJwcm9kZGVmXCIpO1xuXHQgIGlmIChkYXRhKXtcblx0XHRjb25zdCBwcm9kZGVmID0gSlNPTi5wYXJzZShkYXRhKTtcblx0XHR0aGlzLnByb2Rjb2RlID0gcHJvZGRlZi5pY29kZTtcblx0ICAgIHRoaXMuZ2V0UHJvZERlZmluYXRpb24oKTtcblx0ICB9XG5cdCAgdGhpcy5nZXRQcm9kRGVmaW5hdGlvbigpO1xuICAgIH1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdGdldFByb2REZWZpbmF0aW9uKCkge1xuXHRcdHRoaXMuc2Vydi5nZXRQcm9kRGVmaW5hdGlvbih0aGlzLnByb2Rjb2RlKVxuXHRcdFx0LnN1YnNjcmliZSgocmVzcDphbnkpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2cocmVzcCk7XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yPWZhbHNlO1x0XHRcdFx0XG5cdFx0XHRcdHRoaXMubGlzdGJvbT0gcmVzcC5saXN0Ym9tO1xuXHRcdFx0XHR0aGlzLmxpc3RtYWMgPSByZXNwLmxpc3RtYWM7XG5cdFx0XHRcdHRoaXMubGlzdHByb2MgPSByZXNwLmxpc3Rwb3JjO1xuXHRcdFx0XHR0aGlzLmxpc3R3YyA9IHJlc3AubGlzdHdjO1xuXHRcdFx0fSxcblx0XHRcdChlcnIpPT57XG5cdFx0XHRcdHRoaXMuc2hvd0Vycm9yPXRydWU7XG5cdFx0XHRcdHRoaXMuZXJybXNnID1lcnIuc3RhdHVzVGV4dDtcdFx0XHRcdFxuXHRcdFx0fSk7XG5cblx0fVxuXG5cdG9uQmFjayhlKXtcblx0XHR0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcblx0fVxufSJdfQ==