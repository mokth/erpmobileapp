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
        this.iconHome = String.fromCharCode(0xf022) + " Back";
        this.iconStore = String.fromCharCode(0xf494) + " Stock";
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
            console.log(this.imageUrl);
        }
    }
    ItemMasterComponent.prototype.ngOnInit = function () { };
    ItemMasterComponent.prototype.OnTap = function (e) {
        this.navigationService.backToPreviousPage();
    };
    ItemMasterComponent.prototype.OnStockTap = function (e) {
        this.navigationService.navigate(["/itembalance", this.item.iCode], {
            clearHistory: false,
            animated: true,
            transition: {
                name: 'flip',
                duration: 1000,
                curve: 'linear'
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1tYXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1tYXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWtEO0FBQ2xELCtEQUE2RDtBQUM3RCw2RUFBMkU7QUFHM0UsZ0RBQWtEO0FBVWxEO0lBT0MsNkJBQW9CLE1BQWlCLEVBQ3BCLE9BQW1CLEVBQ25CLGlCQUFvQztRQUZqQyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ3BCLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUVyRCxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUMsT0FBTyxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBQyxRQUFRLENBQUM7UUFDdEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsSUFBSSxJQUFJLEVBQUM7WUFDUixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0IsSUFBTSxHQUFHLEdBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLEVBQUUsRUFBQztnQkFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUMsa0JBQWtCLENBQUM7YUFDekM7aUJBQUk7Z0JBQ0YsSUFBSSxNQUFNLEdBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ3ZDLE1BQU0sR0FBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBQyxNQUFNLENBQUM7YUFDN0I7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQjtJQUNGLENBQUM7SUFFQSxzQ0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLG1DQUFLLEdBQUwsVUFBTSxDQUFDO1FBQ04sSUFBSSxDQUFDLGlCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUVELHdDQUFVLEdBQVYsVUFBVyxDQUFDO1FBQ1gsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGNBQWMsRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNoRTtZQUNDLFlBQVksRUFBQyxLQUFLO1lBQ2xCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsVUFBVSxFQUNWO2dCQUNFLElBQUksRUFBRSxNQUFNO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxRQUFRO2FBQ2hCO1NBQ0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQTlDVyxtQkFBbUI7UUFQL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDMUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1NBQzlCLENBQUM7eUNBUzBCLHdCQUFVO1lBQ1osc0JBQVc7WUFDQSxzQ0FBaUI7T0FUekMsbUJBQW1CLENBK0MvQjtJQUFELDBCQUFDO0NBQUEsQUEvQ0QsSUErQ0M7QUEvQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFQSVNlcnZpY2UgfSBmcm9tICcuLi8uLi9jb3JlL3NlcnZpY2VzL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uLy4uL2NvcmUvc2VydmljZXMvYXV0aC1zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnaXRlbS1tYXN0ZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vaXRlbS1tYXN0ZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9pdGVtLW1hc3Rlci5jb21wb25lbnQuY3NzJ10sXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQudG9TdHJpbmcoKSxcbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtTWFzdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cHVibGljIGl0ZW06IGFueTtcblx0aW1hZ2VVcmw6c3RyaW5nO1xuXG5cdGljb25TdG9yZTogc3RyaW5nO1xuXHRpY29uSG9tZTpzdHJpbmc7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBhcGlzZXI6QVBJU2VydmljZSxcblx0XHQgICAgICAgIHByaXZhdGUgdXRpbHNlcjpVdGlsU2VydmljZSxcdCAgICAgICAgXG5cdFx0ICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xuXHRcdFxuXHR0aGlzLmljb25Ib21lID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMjIpK1wiIEJhY2tcIjtcblx0dGhpcy5pY29uU3RvcmUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjQ5NCkrXCIgU3RvY2tcIjtcblx0Y29uc3QgZGF0YSA9IHRoaXMudXRpbHNlci5nZXRMb2NhbFN0b3JlKFwiaXRlbWRldGFpbFwiKTtcblx0aWYgKGRhdGEpe1xuXHRcdHRoaXMuaXRlbSA9IEpTT04ucGFyc2UoZGF0YSk7XG5cdFx0Y29uc3QgdXJsPSB0aGlzLmFwaXNlci5nZXRFUlBVUkwoKTtcblx0XHRpZiAodGhpcy5pdGVtLmltYWdlVXJsPT1cIlwiKXtcblx0XHQgICB0aGlzLmltYWdlVXJsID0gdXJsK1wiaW1hZ2VzL25vaW1nLnBuZ1wiO1xuXHRcdH1lbHNle1xuXHRcdCAgIGxldCBpbWd1cmw6c3RyaW5nID10aGlzLml0ZW0uaW1hZ2VVcmw7XG5cdFx0XHRcdGltZ3VybCA9aW1ndXJsLnJlcGxhY2UoJ34nLCcvJykucmVwbGFjZSgnXFxcXCcsJy8nKTtcblx0XHQgICB0aGlzLmltYWdlVXJsID0gdXJsK2ltZ3VybDtcdFxuXHRcdH1cdFxuXHRcdGNvbnNvbGUubG9nKHRoaXMuaW1hZ2VVcmwpO1x0XG5cdH1cbn1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdE9uVGFwKGUpe1xuXHRcdHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XG5cdH1cblxuXHRPblN0b2NrVGFwKGUpe1xuXHRcdHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoW1wiL2l0ZW1iYWxhbmNlXCIsdGhpcy5pdGVtLmlDb2RlXSxcblx0XHR7XG5cdFx0XHRjbGVhckhpc3Rvcnk6ZmFsc2UsXG5cdFx0XHRhbmltYXRlZDogdHJ1ZSwgXG5cdFx0XHR0cmFuc2l0aW9uOiBcblx0XHRcdHtcblx0XHRcdFx0XHRuYW1lOiAnZmxpcCcsIFxuXHRcdFx0XHRcdGR1cmF0aW9uOiAxMDAwLCBcblx0XHRcdFx0XHRjdXJ2ZTogJ2xpbmVhcidcblx0XHRcdH0gIFxuXHRcdH0pO1xuXHR9XG59Il19