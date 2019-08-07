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
var ProddefDetailComponent = /** @class */ (function () {
    function ProddefDetailComponent(apiser, utilser, navigationService) {
        var _this = this;
        this.apiser = apiser;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.iconHome = String.fromCharCode(0xf015) + " Back";
        this.showError = false;
        this.iconHome = String.fromCharCode(0xf015);
        var data = this.utilser.getLocalStore("proddef");
        if (data) {
            var proddef = JSON.parse(data);
            this.prodcode = proddef.icode;
            var url = this.apiser.getProdDefDetail(proddef.icode)
                .subscribe(function (resp) {
                _this.showError = false;
                _this.items = resp.value;
            }, function (err) {
                _this.showError = true;
                _this.errmsg = err.statusText;
            });
        }
    }
    ProddefDetailComponent.prototype.ngOnInit = function () { };
    ProddefDetailComponent.prototype.onBack = function (e) {
        this.navigationService.backToPreviousPage();
    };
    ProddefDetailComponent = __decorate([
        core_1.Component({
            selector: 'proddef-detail',
            templateUrl: './proddef-detail.component.html',
            styleUrls: ['./proddef-detail.component.css']
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            util_services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ProddefDetailComponent);
    return ProddefDetailComponent;
}());
exports.ProddefDetailComponent = ProddefDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZGRlZi1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZGRlZi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBRWxELGtFQUFnRTtBQUNoRSxzRUFBbUU7QUFDbkUsZ0ZBQThFO0FBUTlFO0lBUUMsZ0NBQW9CLE1BQWlCLEVBQ3BCLE9BQW1CLEVBQ25CLGlCQUFvQztRQUZyRCxpQkFxQkE7UUFyQm9CLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDcEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBQyxPQUFPLENBQUM7UUFDcEQsSUFBSSxDQUFDLFNBQVMsR0FBRSxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELElBQUksSUFBSSxFQUFDO1lBQ1IsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDOUIsSUFBTSxHQUFHLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2lCQUNyRCxTQUFTLENBQUMsVUFBQyxJQUFRO2dCQUNuQixLQUFJLENBQUMsU0FBUyxHQUFFLEtBQUssQ0FBQztnQkFDdEIsS0FBSSxDQUFDLEtBQUssR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hCLENBQUMsRUFDRCxVQUFDLEdBQUc7Z0JBQ0gsS0FBSSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQTtTQUVGO0lBQ0YsQ0FBQztJQUVBLHlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsdUNBQU0sR0FBTixVQUFPLENBQUM7UUFDUCxJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBbkNXLHNCQUFzQjtRQU5sQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQzdDLENBQUM7eUNBVTBCLHdCQUFVO1lBQ1osMkJBQVc7WUFDQSxzQ0FBaUI7T0FWekMsc0JBQXNCLENBb0NsQztJQUFELDZCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL3V0aWwtc2VydmljZXMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ3Byb2RkZWYtZGV0YWlsJyxcblx0dGVtcGxhdGVVcmw6ICcuL3Byb2RkZWYtZGV0YWlsLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcHJvZGRlZi1kZXRhaWwuY29tcG9uZW50LmNzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgUHJvZGRlZkRldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0cHVibGljIGl0ZW1zOiBhbnk7XG5cdHNob3dFcnJvcjpib29sZWFuO1xuXHRlcnJtc2c6c3RyaW5nO1xuXG5cdGljb25Ib21lOnN0cmluZztcbiAgICBwcm9kY29kZTpzdHJpbmc7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpc2VyOkFQSVNlcnZpY2UsXG5cdFx0ICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXHQgICAgICAgIFxuXHRcdCAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcblx0dGhpcy5pY29uSG9tZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDE1KStcIiBCYWNrXCI7XHRcblx0dGhpcy5zaG93RXJyb3IgPWZhbHNlO1xuXHR0aGlzLmljb25Ib21lID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMTUpO1xuXHRjb25zdCBkYXRhID0gdGhpcy51dGlsc2VyLmdldExvY2FsU3RvcmUoXCJwcm9kZGVmXCIpO1xuXHRpZiAoZGF0YSl7XG5cdFx0Y29uc3QgcHJvZGRlZiA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0dGhpcy5wcm9kY29kZSA9IHByb2RkZWYuaWNvZGU7XG5cdFx0Y29uc3QgdXJsPSB0aGlzLmFwaXNlci5nZXRQcm9kRGVmRGV0YWlsKHByb2RkZWYuaWNvZGUpXG5cdFx0LnN1YnNjcmliZSgocmVzcDphbnkpPT57XG5cdFx0XHR0aGlzLnNob3dFcnJvciA9ZmFsc2U7XHRcblx0XHRcdHRoaXMuaXRlbXM9IHJlc3AudmFsdWU7XG5cdFx0fSxcblx0XHQoZXJyKT0+e1xuXHRcdFx0dGhpcy5zaG93RXJyb3IgPXRydWU7XHRcdFx0XG5cdFx0XHR0aGlzLmVycm1zZyA9ZXJyLnN0YXR1c1RleHQ7XG5cdFx0fSlcblx0XHRcdFx0XG5cdH1cbn1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdG9uQmFjayhlKXtcblx0XHR0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHR9XG59Il19