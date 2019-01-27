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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLHNDQUFrRDtBQUNsRCxnREFBOEQ7QUFJOUQsc0RBQXFEO0FBQ3JELDZFQUEyRTtBQVEzRTtJQU1FLGlDQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsV0FBTSxHQUFTLElBQUksQ0FBQztJQU1uQixDQUFDO0lBRUYsMENBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDdEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFjLElBQXVCO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUMsSUFBSSxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsMkNBQVMsR0FBVCxVQUFVLENBQUM7UUFDVCxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsa0JBQWtCLEVBQUMsS0FBSyxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFPLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFDL0QsZ0NBQWdDO0lBQ25DLENBQUM7SUF4Q1UsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7WUFDL0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFO1NBQy9CLENBQUM7eUNBT3lCLHFCQUFVO1lBQ1Asc0JBQVc7WUFDQSxzQ0FBaUI7T0FSN0MsdUJBQXVCLENBeUNuQztJQUFELDhCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbi8vaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbi8vaW1wb3J0IHsgU2FsZXNPZGVyIH0gZnJvbSAnLi4vLi4vY29yZS9tb2RlbC9zYWxlcy1vcmRlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXItbGlzdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NhbGVzLW9yZGVyLWxpc3QuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQudG9TdHJpbmcoKSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgb3JkZXJsaXN0OmFueTtcclxuICBpc0J1c3k6Ym9vbGVhbj10cnVlO1xyXG4gIGljb25BZGQ6c3RyaW5nO1xyXG4gIGljb25Ib21lOnN0cmluZztcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcclxuICAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuaWNvbkFkZCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDU1KTtcclxuICAgIHRoaXMuaWNvbkhvbWUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjAxNSk7XHJcbiAgICBcclxuICAgIHRoaXMuc2Vydi5nZXRTYWxlc09yZGVyKCkuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgdGhpcy5vcmRlcmxpc3QgPSByZXNwOyAgICAgXHJcbiAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgfSk7ICAgXHJcbiAgfVxyXG4gIFxyXG4gIG9uSXRlbUxvYWRpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpe1xyXG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XHJcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI0Y0RjZGNlwiKTsgICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9uSXRlbVRhcChpdGVtKXtcclxuICAgIGNvbnN0IHNvbm8gPSBpdGVtLnNvbm8rXCJAXCIraXRlbS5jdXN0cmVsO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3Qvc2FsZXMnLHNvbm9dLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgT25BZGRJdGVtKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlc2xpc3Qvc2FsZXMnLCduZXcnXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICB9XHJcblxyXG4gIG9uQmFjayhlKXtcclxuICAgIGNvbnNvbGUubG9nKCdiYWNrIHRvIHNhbGVzbGlzdCcpO1xyXG4gICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvbWFpbiddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gICAgIC8vdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==