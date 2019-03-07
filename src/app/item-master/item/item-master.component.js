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
var api_service_1 = require("../../core/services/api.service");
var navigation_service_1 = require("../../core/services/navigation.service");
var services_1 = require("../../core/services");
var ItemMasterComponent = /** @class */ (function () {
    function ItemMasterComponent(apiser, utilser, navigationService) {
        this.apiser = apiser;
        this.utilser = utilser;
        this.navigationService = navigationService;
        var data = this.utilser.getLocalStore("itemdetail");
        if (data) {
            this.item = JSON.parse(data);
            var url = this.apiser.getERPURL();
            if (this.item.imageUrl == "") {
                this.imageUrl = url + "images/noimg.png";
            }
            else {
                var imgurl = this.item.imageUrl;
                imgurl = imgurl.replace('~', '/').replace('\\', '/');
                this.imageUrl = url + imgurl;
            }
        }
    }
    ItemMasterComponent.prototype.ngOnInit = function () { };
    ItemMasterComponent.prototype.OnTap = function (e) {
        this.navigationService.backToPreviousPage();
    };
    ItemMasterComponent = __decorate([
        core_1.Component({
            selector: 'item-master',
            templateUrl: './item-master.component.html',
            styleUrls: ['./item-master.component.css'],
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [api_service_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ItemMasterComponent);
    return ItemMasterComponent;
}());
exports.ItemMasterComponent = ItemMasterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUE2RDtBQUM3RCw2RUFBMkU7QUFHM0UsZ0RBQWtEO0FBVWxEO0lBR0MsNkJBQW9CLE1BQWlCLEVBQ3BCLE9BQW1CLEVBQ25CLGlCQUFvQztRQUZqQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUVyRCxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksRUFBQztZQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixJQUFNLEdBQUcsR0FBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ25DLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUUsRUFBRSxFQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBQyxrQkFBa0IsQ0FBQzthQUN6QztpQkFBSTtnQkFDRixJQUFJLE1BQU0sR0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDdkMsTUFBTSxHQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFDLE1BQU0sQ0FBQzthQUM3QjtTQUNEO0lBQ0YsQ0FBQztJQUVBLHNDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsbUNBQUssR0FBTCxVQUFNLENBQUM7UUFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBekJXLG1CQUFtQjtRQVAvQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDOUIsQ0FBQzt5Q0FLMEIsd0JBQVU7WUFDWixzQkFBVztZQUNBLHNDQUFpQjtPQUx6QyxtQkFBbUIsQ0EwQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQVBJU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XG5cbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgVXRpbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdpdGVtLW1hc3RlcicsXG5cdHRlbXBsYXRlVXJsOiAnLi9pdGVtLW1hc3Rlci5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL2l0ZW0tbWFzdGVyLmNvbXBvbmVudC5jc3MnXSxcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZC50b1N0cmluZygpLFxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1NYXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRwdWJsaWMgaXRlbTogYW55O1xuXHRpbWFnZVVybDpzdHJpbmc7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpc2VyOkFQSVNlcnZpY2UsXG5cdFx0ICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXHQgICAgICAgIFxuXHRcdCAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcblx0XG5cdGNvbnN0IGRhdGEgPSB0aGlzLnV0aWxzZXIuZ2V0TG9jYWxTdG9yZShcIml0ZW1kZXRhaWxcIik7XG5cdGlmIChkYXRhKXtcblx0XHR0aGlzLml0ZW0gPSBKU09OLnBhcnNlKGRhdGEpO1xuXHRcdGNvbnN0IHVybD0gdGhpcy5hcGlzZXIuZ2V0RVJQVVJMKCk7XG5cdFx0aWYgKHRoaXMuaXRlbS5pbWFnZVVybD09XCJcIil7XG5cdFx0ICAgdGhpcy5pbWFnZVVybCA9IHVybCtcImltYWdlcy9ub2ltZy5wbmdcIjtcblx0XHR9ZWxzZXtcblx0XHQgICBsZXQgaW1ndXJsOnN0cmluZyA9dGhpcy5pdGVtLmltYWdlVXJsO1xuXHRcdFx0XHRpbWd1cmwgPWltZ3VybC5yZXBsYWNlKCd+JywnLycpLnJlcGxhY2UoJ1xcXFwnLCcvJyk7XG5cdFx0ICAgdGhpcy5pbWFnZVVybCA9IHVybCtpbWd1cmw7XHRcblx0XHR9XHRcdFxuXHR9XG59XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXHRPblRhcChlKXtcblx0XHR0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHR9XG59Il19