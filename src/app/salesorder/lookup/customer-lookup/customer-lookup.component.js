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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUU7QUFFakUsc0RBQXFEO0FBQ3JELGdEQUE4RDtBQUM5RCw2RUFBMkU7QUFDM0UsMENBQTZDO0FBUzdDO0lBWUUsaUNBQW9CLElBQWUsRUFDZixPQUFtQixFQUNuQixpQkFBb0M7UUFGcEMsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNmLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUx4RCxjQUFTLEdBQVMsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBUyxJQUFJLENBQUM7SUFLakIsQ0FBQztJQUVKLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDQyxzQkFBc0I7SUFFeEIsSUFBSTtJQUNKLGlEQUFlLEdBQWY7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFT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QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1lBQzlDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQWF5QixxQkFBVTtZQUNQLHNCQUFXO1lBQ0Esc0NBQWlCO09BZDdDLHVCQUF1QixDQW9GbkM7SUFBRCw4QkFBQztDQUFBLEFBcEZELElBb0ZDO0FBcEZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcclxuaW1wb3J0IHsgQVBJU2VydmljZSwgVXRpbFNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICd+L2FwcC9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ34vYXBwL2NvcmUvZW51bXMnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtY3VzdG9tZXItbG9va3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jdXN0b21lci1sb29rdXAuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lckxvb2t1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCAge1xyXG4gIFxyXG4gIGljb252YWw6c3RyaW5nO1xyXG4gIHNlYXJjaDpzdHJpbmc7XHJcbiAgc2VhcmNoc3RyOnN0cmluZztcclxuICBpdGVtczphbnk7XHJcbiAgdGVtcGl0ZW1zOmFueTtcclxuICBzZWxlY3RlZENvZGU6c3RyaW5nO1xyXG4gIHNlbGVjdGVkSXRlbTphbnk7XHJcbiAgaXNSZWZyZXNoOmJvb2xlYW49ZmFsc2U7XHJcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcclxuICAgICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pY29udmFsID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGU5ODYpO1xyXG4gICAgdGhpcy5nZXRDdXN0b21lckxpc3QoKTtcclxuICB9XHJcbiAgICAvLyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgIFxyXG4gIC8vIH1cclxuICBnZXRDdXN0b21lckxpc3QoKXtcclxuICAgIHRoaXMuaXNSZWZyZXNoPXRydWU7XHJcbiAgICBsZXQgZGF0YSA9dGhpcy51dGlsc2VyLmdldExvY2FsU3RvcmUoRGF0YVRhYmxlLmN1c3RvbWVyKTtcclxuICAgIGlmIChkYXRhKXtcclxuICAgICAgdGhpcy5pdGVtcyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgIHRoaXMudGVtcGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgIHRoaXMuc2Vydi5nZXRDdXN0b21lcigpLnN1YnNjcmliZShyZXNwPT57XHJcbiAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3A7XHJcbiAgICAgICAgdGhpcy50ZW1waXRlbXMgPXJlc3A7ICAgICAgIFxyXG4gICAgICAgIHRoaXMudXRpbHNlci5zZXRMb2NhbFN0b3JlKERhdGFUYWJsZS5jdXN0b21lcixKU09OLnN0cmluZ2lmeShyZXNwKSk7XHJcbiAgICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcbiAgICAgIH0pOyAgICAgICAgICAgXHJcbiAgICB9ICBcclxuICAgIFxyXG4gIH1cclxuICBcclxuICAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XHJcbiAgICB0aGlzLmlzUmVmcmVzaD1mYWxzZTtcclxuICAgIGlmIChhcmdzLmluZGV4ICUgMiA9PT0gMCkge1xyXG4gICAgICAgYXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNiM2VjZmZcIik7ICAgICAgXHJcbiAgICB9XHJcbiB9XHJcblxyXG4gb25JdGVtVGFwKGl0ZW0pe1xyXG4gICAgLy9jb25zb2xlLmxvZyhpdGVtKTtcclxuICAgIHRoaXMuc2VsZWN0ZWRDb2RlPSBpdGVtLmN1c3RDb2RlO1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xyXG4gICAgdGhpcy51dGlsc2VyLmZpcmVFdmVudChEYXRhVGFibGUuY3VzdG9tZXIsaXRlbSk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Mb25nUHJlc3MoaXRlbSl7XHJcbiAgICBjb25zb2xlLmxvZygnbG9uZyBwcmVzcy4uLicpXHJcbiAgICB0aGlzLnNlbGVjdGVkQ29kZT0gaXRlbS5jdXN0Q29kZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLmN1c3RvbWVyLGl0ZW0pO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcbiAgICBcclxuICBvblNlYXJjaFRhcChlKXtcclxuICAgIGNvbnN0IGtleSA9dGhpcy5zZWFyY2hzdHI7XHJcbiAgICBjb25zb2xlLmxvZyhrZXkpO1xyXG4gICAgdGhpcy5pdGVtcz0gdGhpcy50ZW1waXRlbXMuZmlsdGVyKGl0ZW09Pml0ZW0uY3VzdENvZGUuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jdXN0TmFtZS5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3MxLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkcmVzczIuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRyZXNzMy5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3M0LmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2l0eS5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnN0YXRlLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ucG9zdGFsQ29kZS5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRlbC5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmZheC5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRhY3RQZXJzb24uaW5jbHVkZXMoa2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgfVxyXG5cclxuICBcclxufVxyXG4iXX0=