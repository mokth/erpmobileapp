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
    SalesOrderListComponent.prototype.OnAddItem = function () {
        this.navigationService.navigate(['/sales'], { clearHistory: true });
    };
    SalesOrderListComponent.prototype.onBack = function (e) {
        this.navigationService.backToPreviousPage();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FsZXMtb3JkZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnREFBOEQ7QUFDOUQsNkVBQTJFO0FBRzNFLHNEQUFxRDtBQVNyRDtJQU1FLGlDQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsV0FBTSxHQUFTLElBQUksQ0FBQztJQU1uQixDQUFDO0lBRUYsMENBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDdEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsK0NBQWEsR0FBYixVQUFjLElBQXVCO1FBQ25DLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksYUFBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVELDJDQUFTLEdBQVQsVUFBVSxJQUFJO1FBQ1osSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxFQUFDLEVBQUMsWUFBWSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELDJDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUMsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsd0NBQU0sR0FBTixVQUFPLENBQUM7UUFDTixJQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBdENVLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1lBQy9DLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU95QixxQkFBVTtZQUNQLHNCQUFXO1lBQ0Esc0NBQWlCO09BUjdDLHVCQUF1QixDQXVDbkM7SUFBRCw4QkFBQztDQUFBLEFBdkNELElBdUNDO0FBdkNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFV0aWxTZXJ2aWNlLCBBUElTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTYWxlc09kZXIgfSBmcm9tICcuLi8uLi9jb3JlL21vZGVsL3NhbGVzLW9yZGVyJztcclxuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xyXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJy4uLy4uLy4uLy4uL3BsYXRmb3Jtcy9hbmRyb2lkL2FwcC9idWlsZC9pbnRlcm1lZGlhdGVzL21lcmdlZF9hc3NldHMvZGVidWcvbWVyZ2VEZWJ1Z0Fzc2V0cy9vdXQvYXBwL3Ruc19tb2R1bGVzL3J4anMvc3JjL2ludGVybmFsL29wZXJhdG9ycy9kZWxheSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLXNhbGVzLW9yZGVyLWxpc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9zYWxlcy1vcmRlci1saXN0LmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2FsZXNPcmRlckxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuICBvcmRlcmxpc3Q6YW55O1xyXG4gIGlzQnVzeTpib29sZWFuPXRydWU7XHJcbiAgaWNvbkFkZDpzdHJpbmc7XHJcbiAgaWNvbkhvbWU6c3RyaW5nO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcjpVdGlsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xyXG4gICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pY29uQWRkID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwNTUpO1xyXG4gICAgdGhpcy5pY29uSG9tZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDE1KTtcclxuICAgIFxyXG4gICAgdGhpcy5zZXJ2LmdldFNhbGVzT3JkZXIoKS5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICB0aGlzLm9yZGVybGlzdCA9IHJlc3A7ICAgICBcclxuICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcbiAgICB9KTsgICBcclxuICB9XHJcbiAgXHJcbiAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjRjRGNkY2XCIpOyAgICAgIFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25JdGVtVGFwKGl0ZW0pe1xyXG4gICAgY29uc3Qgc29ubyA9IGl0ZW0uc29ubytcIkBcIitpdGVtLmN1c3RyZWw7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLm5hdmlnYXRlKFsnL3NhbGVzJyxzb25vXSx7Y2xlYXJIaXN0b3J5OnRydWV9KTtcclxuICB9XHJcblxyXG4gIE9uQWRkSXRlbSgpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5uYXZpZ2F0ZShbJy9zYWxlcyddLHtjbGVhckhpc3Rvcnk6dHJ1ZX0pO1xyXG4gIH1cclxuXHJcbiAgb25CYWNrKGUpe1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcbn1cclxuIl19