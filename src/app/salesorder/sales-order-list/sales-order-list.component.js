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
var services_1 = require("~/app/core/services");
var navigation_service_1 = require("~/app/core/services/navigation.service");
var color_1 = require("tns-core-modules/color/color");
var SalesOrderListComponent = /** @class */ (function () {
    function SalesOrderListComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isBusy = true;
    }
    SalesOrderListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.iconAdd = String.fromCharCode(0xf055);
        this.iconHome = String.fromCharCode(0xf015);
        this.serv.getSalesOrder().subscribe(function (resp) {
            _this.orderlist = resp;
            _this.isBusy = false;
        });
    };
    SalesOrderListComponent.prototype.onItemLoading = function (args) {
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#F4F6F6");
        }
    };
    SalesOrderListComponent.prototype.onItemTap = function (item) {
        var sono = item.sono + "@" + item.custrel;
        this.navigationService.navigate(['/sales', sono], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.OnAddItem = function (e) {
        this.navigationService.navigate(['/sales'], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.onBack = function (e) {
        console.log('back to saleslist');
        this.navigationService.navigate(['/main'], { clearHistory: true });
        //this.navigationService.back();
    };
    SalesOrderListComponent = __decorate([
        core_1.Component({
            selector: 'ns-sales-order-list',
            templateUrl: './sales-order-list.component.html',
            styleUrls: ['./sales-order-list.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], SalesOrderListComponent);
    return SalesOrderListComponent;
}());
exports.SalesOrderListComponent = SalesOrderListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFrRDtBQUNsRCxnREFBOEQ7QUFDOUQsNkVBQTJFO0FBRzNFLHNEQUFxRDtBQVNyRDtJQU1FLGlDQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsV0FBTSxHQUFTLElBQUksQ0FBQztJQU1uQixDQUFDO0lBRUYsMENBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDdEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFjLElBQXVCO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELDJDQUFTLEdBQVQsVUFBVSxDQUFDO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHdDQUFNLEdBQU4sVUFBTyxDQUFDO1FBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELGdDQUFnQztJQUNuQyxDQUFDO0lBeENVLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1lBQy9DLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU95QixxQkFBVTtZQUNQLHNCQUFXO1lBQ0Esc0NBQWlCO09BUjdDLHVCQUF1QixDQXlDbkM7SUFBRCw4QkFBQztDQUFBLEFBekNELElBeUNDO0FBekNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTYWxlc09kZXIgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3NhbGVzLW9yZGVyJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIG9yZGVybGlzdDphbnk7XHJcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcclxuICBpY29uQWRkOnN0cmluZztcclxuICBpY29uSG9tZTpzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2OkFQSVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSB1dGlsc2VyOlV0aWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25Ib21lID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMTUpO1xyXG4gICAgXHJcbiAgICB0aGlzLnNlcnYuZ2V0U2FsZXNPcmRlcigpLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgIHRoaXMub3JkZXJsaXN0ID0gcmVzcDsgICAgIFxyXG4gICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgIH0pOyAgIFxyXG4gIH1cclxuICBcclxuICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKXtcclxuICAgIGlmIChhcmdzLmluZGV4ICUgMiA9PT0gMCkge1xyXG4gICAgICAgYXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNGNEY2RjZcIik7ICAgICAgXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBvbkl0ZW1UYXAoaXRlbSl7XHJcbiAgICBjb25zdCBzb25vID0gaXRlbS5zb25vK1wiQFwiK2l0ZW0uY3VzdHJlbDtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXMnLHNvbm9dLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgT25BZGRJdGVtKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlcyddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrKGUpe1xyXG4gICAgY29uc29sZS5sb2coJ2JhY2sgdG8gc2FsZXNsaXN0Jyk7XHJcbiAgICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9tYWluJ10se2NsZWFySGlzdG9yeTp0cnVlfSk7XHJcbiAgICAgLy90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2soKTtcclxuICB9XHJcbn1cclxuIl19