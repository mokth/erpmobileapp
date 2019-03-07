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
var services_1 = require("../../core/services");
var color_1 = require("tns-core-modules/color/color");
var navigation_service_1 = require("../../core/services/navigation.service");
var application = require("tns-core-modules/application");
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
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = true;
            });
        }
    };
    SalesOrderListComponent.prototype.onItemLoading = function (args) {
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#F4F6F6");
        }
    };
    SalesOrderListComponent.prototype.onItemTap = function (item) {
        var sono = item.sono + "@" + item.custrel;
        this.navigationService.navigate(['/saleslist/sales', sono], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.OnAddItem = function (e) {
        this.navigationService.navigate(['/saleslist/sales', 'new'], { clearHistory: true });
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
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], SalesOrderListComponent);
    return SalesOrderListComponent;
}());
exports.SalesOrderListComponent = SalesOrderListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUFrRDtBQUNsRCxnREFBOEQ7QUFJOUQsc0RBQXFEO0FBQ3JELDZFQUEyRTtBQUMzRSwwREFBNEQ7QUFRNUQ7SUFNRSxpQ0FBb0IsSUFBZSxFQUNmLE9BQW1CLEVBQ25CLGlCQUFvQztRQUZwQyxTQUFJLEdBQUosSUFBSSxDQUFXO1FBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTHhELFdBQU0sR0FBUyxJQUFJLENBQUM7SUFNbkIsQ0FBQztJQUVGLDBDQUFRLEdBQVI7UUFBQSxpQkFhQztRQVpDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ3RDLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLEdBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyx3QkFBd0IsRUFBRSxVQUFDLElBQVM7Z0JBQ3ZGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFjLElBQXVCO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsMkNBQVMsR0FBVCxVQUFVLENBQUM7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUMsS0FBSyxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFPLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0QsZ0NBQWdDO0lBQ25DLENBQUM7SUE3Q1UsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7WUFDL0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1NBQy9CLENBQUM7eUNBT3lCLHFCQUFVO1lBQ1Asc0JBQVc7WUFDQSxzQ0FBaUI7T0FSN0MsdUJBQXVCLENBOENuQztJQUFELDhCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbi8vaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbi8vaW1wb3J0IHsgU2FsZXNPZGVyIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9zYWxlcy1vcmRlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0ICogYXMgYXBwbGljYXRpb24gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLXNhbGVzLW9yZGVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLnRvU3RyaW5nKCksXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTYWxlc09yZGVyTGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIG9yZGVybGlzdDphbnk7XHJcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcclxuICBpY29uQWRkOnN0cmluZztcclxuICBpY29uSG9tZTpzdHJpbmc7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2OkFQSVNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSB1dGlsc2VyOlV0aWxTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XHJcbiAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XHJcbiAgICB0aGlzLmljb25Ib21lID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMTUpO1xyXG4gICAgXHJcbiAgICB0aGlzLnNlcnYuZ2V0U2FsZXNPcmRlcigpLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgIHRoaXMub3JkZXJsaXN0ID0gcmVzcDsgICAgIFxyXG4gICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgIH0pOyAgIFxyXG4gICAgaWYgKGFwcGxpY2F0aW9uLmFuZHJvaWQpIHtcclxuICAgICAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XHJcbiAgICAgICAgIGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIG9uSXRlbUxvYWRpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpe1xyXG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XHJcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI0Y0RjZGNlwiKTsgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSXRlbVRhcChpdGVtKXtcclxuICAgIGNvbnN0IHNvbm8gPSBpdGVtLnNvbm8rXCJAXCIraXRlbS5jdXN0cmVsO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3Qvc2FsZXMnLHNvbm9dLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgT25BZGRJdGVtKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3Qvc2FsZXMnLCduZXcnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICB9XHJcblxyXG4gIG9uQmFjayhlKXtcclxuICAgIGNvbnNvbGUubG9nKCdiYWNrIHRvIHNhbGVzbGlzdCcpO1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==