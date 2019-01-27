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
var services_1 = require("../../../core/services");
var navigation_service_1 = require("../../../core/services/navigation.service");
var enums_1 = require("../../../core/enums");
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
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], CustomerLookupComponent);
    return CustomerLookupComponent;
}());
exports.CustomerLookupComponent = CustomerLookupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLWxvb2t1cC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUU7QUFFakUsc0RBQXFEO0FBQ3JELG1EQUFpRTtBQUNqRSxnRkFBOEU7QUFDOUUsNkNBQWdEO0FBU2hEO0lBWUUsaUNBQW9CLElBQWUsRUFDZixPQUFtQixFQUNuQixpQkFBb0M7UUFGcEMsU0FBSSxHQUFKLElBQUksQ0FBVztRQUNmLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUx4RCxjQUFTLEdBQVMsS0FBSyxDQUFDO1FBQ3hCLFdBQU0sR0FBUyxJQUFJLENBQUM7SUFLakIsQ0FBQztJQUVKLDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDQyxzQkFBc0I7SUFFeEIsSUFBSTtJQUNKLGlEQUFlLEdBQWY7UUFBQSxpQkFnQkM7UUFmQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxTQUFT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QixXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLFNBQVMsRUFBRSxDQUFDLGlDQUFpQyxDQUFDO1lBQzlDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRTtTQUMvQixDQUFDO3lDQWF5QixxQkFBVTtZQUNQLHNCQUFXO1lBQ0Esc0NBQWlCO09BZDdDLHVCQUF1QixDQW9GbkM7SUFBRCw4QkFBQztDQUFBLEFBcEZELElBb0ZDO0FBcEZZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcclxuaW1wb3J0IHsgQVBJU2VydmljZSwgVXRpbFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzJztcclxuaW1wb3J0IHsgTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9jb3JlL3NlcnZpY2VzL25hdmlnYXRpb24uc2VydmljZSc7XHJcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnbnMtY3VzdG9tZXItbG9va3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vY3VzdG9tZXItbG9va3VwLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9jdXN0b21lci1sb29rdXAuY29tcG9uZW50LmNzcyddLFxyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQudG9TdHJpbmcoKSxcclxufSlcclxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyTG9va3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0ICB7XHJcbiAgXHJcbiAgaWNvbnZhbDpzdHJpbmc7XHJcbiAgc2VhcmNoOnN0cmluZztcclxuICBzZWFyY2hzdHI6c3RyaW5nO1xyXG4gIGl0ZW1zOmFueTtcclxuICB0ZW1waXRlbXM6YW55O1xyXG4gIHNlbGVjdGVkQ29kZTpzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJdGVtOmFueTtcclxuICBpc1JlZnJlc2g6Ym9vbGVhbj1mYWxzZTtcclxuICBpc0J1c3k6Ym9vbGVhbj10cnVlO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcjpVdGlsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xyXG4gICAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XHJcbiAgICB0aGlzLmdldEN1c3RvbWVyTGlzdCgpO1xyXG4gIH1cclxuICAgIC8vIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgXHJcbiAgLy8gfVxyXG4gIGdldEN1c3RvbWVyTGlzdCgpe1xyXG4gICAgdGhpcy5pc1JlZnJlc2g9dHJ1ZTtcclxuICAgIGxldCBkYXRhID10aGlzLnV0aWxzZXIuZ2V0TG9jYWxTdG9yZShEYXRhVGFibGUuY3VzdG9tZXIpO1xyXG4gICAgaWYgKGRhdGEpe1xyXG4gICAgICB0aGlzLml0ZW1zID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgdGhpcy50ZW1waXRlbXMgPSB0aGlzLml0ZW1zO1xyXG4gICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgdGhpcy5zZXJ2LmdldEN1c3RvbWVyKCkuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgICB0aGlzLml0ZW1zID0gcmVzcDtcclxuICAgICAgICB0aGlzLnRlbXBpdGVtcyA9cmVzcDsgICAgICAgXHJcbiAgICAgICAgdGhpcy51dGlsc2VyLnNldExvY2FsU3RvcmUoRGF0YVRhYmxlLmN1c3RvbWVyLEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcclxuICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgfSk7ICAgICAgICAgICBcclxuICAgIH0gIFxyXG4gICAgXHJcbiAgfVxyXG4gIFxyXG4gICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKXtcclxuICAgIHRoaXMuaXNSZWZyZXNoPWZhbHNlO1xyXG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XHJcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI2IzZWNmZlwiKTsgICAgICBcclxuICAgIH1cclxuIH1cclxuXHJcbiBvbkl0ZW1UYXAoaXRlbSl7XHJcbiAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uY3VzdENvZGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnV0aWxzZXIuZmlyZUV2ZW50KERhdGFUYWJsZS5jdXN0b21lcixpdGVtKTtcclxuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XHJcbiAgfVxyXG5cclxuICBvbkxvbmdQcmVzcyhpdGVtKXtcclxuICAgIGNvbnNvbGUubG9nKCdsb25nIHByZXNzLi4uJylcclxuICAgIHRoaXMuc2VsZWN0ZWRDb2RlPSBpdGVtLmN1c3RDb2RlO1xyXG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xyXG4gICAgdGhpcy51dGlsc2VyLmZpcmVFdmVudChEYXRhVGFibGUuY3VzdG9tZXIsaXRlbSk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuICAgIFxyXG4gIG9uU2VhcmNoVGFwKGUpe1xyXG4gICAgY29uc3Qga2V5ID10aGlzLnNlYXJjaHN0cjtcclxuICAgIGNvbnNvbGUubG9nKGtleSk7XHJcbiAgICB0aGlzLml0ZW1zPSB0aGlzLnRlbXBpdGVtcy5maWx0ZXIoaXRlbT0+aXRlbS5jdXN0Q29kZS5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmN1c3ROYW1lLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkcmVzczEuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5hZGRyZXNzMi5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmFkZHJlc3MzLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkcmVzczQuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jaXR5LmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhdGUuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5wb3N0YWxDb2RlLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udGVsLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZmF4LmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGFjdFBlcnNvbi5pbmNsdWRlcyhrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICB9XHJcblxyXG4gIFxyXG59XHJcbiJdfQ==