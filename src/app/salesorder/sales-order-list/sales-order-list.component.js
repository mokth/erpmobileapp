"use strict";
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
        this.navigationService.navigate(['/sales', sono]);
    };
    SalesOrderListComponent.prototype.OnAddItem = function () {
        this.navigationService.navigate(['/sales']);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnREFBOEQ7QUFDOUQsNkVBQTJFO0FBRzNFLHNEQUFxRDtBQVNyRDtJQUtFLGlDQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFKeEQsV0FBTSxHQUFTLElBQUksQ0FBQztJQUtuQixDQUFDO0lBRUYsMENBQVEsR0FBUjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUN0QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixLQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCwrQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDO0lBRUQsMkNBQVMsR0FBVCxVQUFVLElBQUk7UUFDWixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsMkNBQVMsR0FBVDtRQUNFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUEvQlUsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUscUJBQXFCO1lBQy9CLFdBQVcsRUFBRSxtQ0FBbUM7WUFDaEQsU0FBUyxFQUFFLENBQUMsa0NBQWtDLENBQUM7WUFDL0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBTXlCLHFCQUFVO1lBQ1Asc0JBQVc7WUFDQSxzQ0FBaUI7T0FQN0MsdUJBQXVCLENBZ0NuQztJQUFELDhCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IFNhbGVzT2RlciB9IGZyb20gJy4uLy4uL2NvcmUvbW9kZWwvc2FsZXMtb3JkZXInO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAnLi4vLi4vLi4vLi4vcGxhdGZvcm1zL2FuZHJvaWQvYXBwL2J1aWxkL2ludGVybWVkaWF0ZXMvbWVyZ2VkX2Fzc2V0cy9kZWJ1Zy9tZXJnZURlYnVnQXNzZXRzL291dC9hcHAvdG5zX21vZHVsZXMvcnhqcy9zcmMvaW50ZXJuYWwvb3BlcmF0b3JzL2RlbGF5JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtc2FsZXMtb3JkZXItbGlzdCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIFNhbGVzT3JkZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBvcmRlcmxpc3Q6YW55O1xuICBpc0J1c3k6Ym9vbGVhbj10cnVlO1xuICBpY29uQWRkOnN0cmluZztcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2OkFQSVNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcjpVdGlsU2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcbiAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmljb25BZGQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZjA1NSk7XG4gICAgdGhpcy5zZXJ2LmdldFNhbGVzT3JkZXIoKS5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgdGhpcy5vcmRlcmxpc3QgPSByZXNwOyAgICAgXG4gICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcbiAgICB9KTsgICBcbiAgfVxuICBcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgYXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNGNEY2RjZcIik7ICAgICAgXG4gICAgfVxuICB9XG5cbiAgb25JdGVtVGFwKGl0ZW0pe1xuICAgIGNvbnN0IHNvbm8gPSBpdGVtLnNvbm8rXCJAXCIraXRlbS5jdXN0cmVsO1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXMnLHNvbm9dKTtcbiAgfVxuXG4gIE9uQWRkSXRlbSgpe1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoWycvc2FsZXMnXSk7XG4gIH1cbn1cbiJdfQ==