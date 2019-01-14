"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var color_1 = require("tns-core-modules/color/color");
var services_1 = require("~/app/core/services");
var navigation_service_1 = require("~/app/core/services/navigation.service");
var enums_1 = require("~/app/core/enums");
var CustomerLookupComponent = /** @class */ (function () {
    function CustomerLookupComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isRefresh = false;
        this.isBusy = true;
    }
    CustomerLookupComponent.prototype.ngOnInit = function () {
        this.iconval = String.fromCharCode(0xe986);
        this.getCustomerList();
    };
    // ngAfterViewInit() {
    // }
    CustomerLookupComponent.prototype.getCustomerList = function () {
        var _this = this;
        this.isRefresh = true;
        var data = this.utilser.getLocalStore(enums_1.DataTable.customer);
        if (data) {
            this.items = JSON.parse(data);
            this.tempitems = this.items;
            this.isBusy = false;
        }
        else {
            this.serv.getCustomer().subscribe(function (resp) {
                _this.items = resp;
                _this.tempitems = resp;
                _this.utilser.setLocalStore(enums_1.DataTable.customer, JSON.stringify(resp));
                _this.isBusy = false;
            });
        }
    };
    CustomerLookupComponent.prototype.onItemLoading = function (args) {
        this.isRefresh = false;
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#b3ecff");
        }
    };
    CustomerLookupComponent.prototype.onItemTap = function (item) {
        //console.log(item);
        this.selectedCode = item.custCode;
        this.selectedItem = item;
        this.utilser.fireEvent(enums_1.DataTable.customer, item);
        this.navigationService.backToPreviousPage();
    };
    CustomerLookupComponent.prototype.onLongPress = function (item) {
        console.log('long press...');
        this.selectedCode = item.custCode;
        this.selectedItem = item;
        this.utilser.fireEvent(enums_1.DataTable.customer, item);
        this.navigationService.backToPreviousPage();
    };
    CustomerLookupComponent.prototype.onSearchTap = function (e) {
        var key = this.searchstr;
        console.log(key);
        this.items = this.tempitems.filter(function (item) { return item.custCode.includes(key) ||
            item.custName.includes(key) ||
            item.address1.includes(key) ||
            item.address2.includes(key) ||
            item.address3.includes(key) ||
            item.address4.includes(key) ||
            item.city.includes(key) ||
            item.state.includes(key) ||
            item.postalCode.includes(key) ||
            item.tel.includes(key) ||
            item.fax.includes(key) ||
            item.contactPerson.includes(key); });
    };
    CustomerLookupComponent = __decorate([
        core_1.Component({
            selector: 'ns-customer-lookup',
            templateUrl: './customer-lookup.component.html',
            styleUrls: ['./customer-lookup.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], CustomerLookupComponent);
    return CustomerLookupComponent;
}());
exports.CustomerLookupComponent = CustomerLookupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFFakUsc0RBQXFEO0FBQ3JELGdEQUE4RDtBQUM5RCw2RUFBMkU7QUFDM0UsMENBQTZDO0FBUzdDO0lBWUUsaUNBQW9CLElBQWUsRUFDZixPQUFtQixFQUNuQixpQkFBb0M7UUFGcEMsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNmLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUx4RCxjQUFTLEdBQVMsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBUyxJQUFJLENBQUM7SUFLakIsQ0FBQztJQUVKLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDQyxzQkFBc0I7SUFFeEIsSUFBSTtJQUNKLGlEQUFlLEdBQWY7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFB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QUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1lBQzlDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQWF5QixxQkFBVTtZQUNQLHNCQUFXO1lBQ0Esc0NBQWlCO09BZDdDLHVCQUF1QixDQW9GbkM7SUFBRCw4QkFBQztDQUFBLEFBcEZELElBb0ZDO0FBcEZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvY29sb3IvY29sb3InO1xuaW1wb3J0IHsgQVBJU2VydmljZSwgVXRpbFNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGF0YVRhYmxlIH0gZnJvbSAnfi9hcHAvY29yZS9lbnVtcyc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtY3VzdG9tZXItbG9va3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2N1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2N1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTG9va3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0ICB7XG4gIFxuICBpY29udmFsOnN0cmluZztcbiAgc2VhcmNoOnN0cmluZztcbiAgc2VhcmNoc3RyOnN0cmluZztcbiAgaXRlbXM6YW55O1xuICB0ZW1waXRlbXM6YW55O1xuICBzZWxlY3RlZENvZGU6c3RyaW5nO1xuICBzZWxlY3RlZEl0ZW06YW55O1xuICBpc1JlZnJlc2g6Ym9vbGVhbj1mYWxzZTtcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XG4gICAgdGhpcy5nZXRDdXN0b21lckxpc3QoKTtcbiAgfVxuICAgIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgIFxuICAvLyB9XG4gIGdldEN1c3RvbWVyTGlzdCgpe1xuICAgIHRoaXMuaXNSZWZyZXNoPXRydWU7XG4gICAgbGV0IGRhdGEgPXRoaXMudXRpbHNlci5nZXRMb2NhbFN0b3JlKERhdGFUYWJsZS5jdXN0b21lcik7XG4gICAgaWYgKGRhdGEpe1xuICAgICAgdGhpcy5pdGVtcyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB0aGlzLnRlbXBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcbiAgICB9ZWxzZSB7XG4gICAgICB0aGlzLnNlcnYuZ2V0Q3VzdG9tZXIoKS5zdWJzY3JpYmUocmVzcD0+e1xuICAgICAgICB0aGlzLml0ZW1zID0gcmVzcDtcbiAgICAgICAgdGhpcy50ZW1waXRlbXMgPXJlc3A7ICAgICAgIFxuICAgICAgICB0aGlzLnV0aWxzZXIuc2V0TG9jYWxTdG9yZShEYXRhVGFibGUuY3VzdG9tZXIsSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xuICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcbiAgICAgIH0pOyAgICAgICAgICAgXG4gICAgfSAgXG4gICAgXG4gIH1cbiAgXG4gICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKXtcbiAgICB0aGlzLmlzUmVmcmVzaD1mYWxzZTtcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI2IzZWNmZlwiKTsgICAgICBcbiAgICB9XG4gfVxuXG4gb25JdGVtVGFwKGl0ZW0pe1xuICAgIC8vY29uc29sZS5sb2coaXRlbSk7XG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uY3VzdENvZGU7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLmN1c3RvbWVyLGl0ZW0pO1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gIH1cblxuICBvbkxvbmdQcmVzcyhpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbG9uZyBwcmVzcy4uLicpXG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uY3VzdENvZGU7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLmN1c3RvbWVyLGl0ZW0pO1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gIH1cbiAgICBcbiAgb25TZWFyY2hUYXAoZSl7XG4gICAgY29uc3Qga2V5ID10aGlzLnNlYXJjaHN0cjtcbiAgICBjb25zb2xlLmxvZyhrZXkpO1xuICAgIHRoaXMuaXRlbXM9IHRoaXMudGVtcGl0ZW1zLmZpbHRlcihpdGVtPT5pdGVtLmN1c3RDb2RlLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmN1c3ROYW1lLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3MxLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3MyLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3MzLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3M0LmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNpdHkuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhdGUuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucG9zdGFsQ29kZS5pbmNsdWRlcyhrZXkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS50ZWwuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZmF4LmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRhY3RQZXJzb24uaW5jbHVkZXMoa2V5KVxuICAgICAgICAgICAgICAgICAgICApO1xuICB9XG5cbiAgXG59XG4iXX0=