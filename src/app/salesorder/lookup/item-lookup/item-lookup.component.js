"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var color_1 = require("tns-core-modules/color/color");
var services_1 = require("~/app/core/services");
var navigation_service_1 = require("~/app/core/services/navigation.service");
var enums_1 = require("~/app/core/enums");
var ItemLookupComponent = /** @class */ (function () {
    function ItemLookupComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isRefresh = false;
        this.isBusy = true;
    }
    ItemLookupComponent.prototype.ngOnInit = function () {
        this.iconval = String.fromCharCode(0xe986);
        this.getItemMaster();
    };
    // ngAfterViewInit() {
    // }
    ItemLookupComponent.prototype.getItemMaster = function () {
        var _this = this;
        this.isRefresh = true;
        var data = this.utilser.getLocalStore(enums_1.DataTable.masteritem);
        if (data) {
            this.items = JSON.parse(data);
            this.tempitems = this.items;
            this.isBusy = false;
        }
        else {
            this.serv.getItemMaster().subscribe(function (resp) {
                _this.items = resp;
                _this.tempitems = resp;
                _this.utilser.setLocalStore(enums_1.DataTable.masteritem, JSON.stringify(resp));
                _this.isBusy = false;
            });
        }
    };
    ItemLookupComponent.prototype.onItemLoading = function (args) {
        this.isRefresh = false;
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#b3ecff");
        }
    };
    ItemLookupComponent.prototype.onItemTap = function (item) {
        //console.log(item);
        this.selectedCode = item.iCode;
        this.selectedItem = item;
        this.utilser.fireEvent(enums_1.DataTable.masteritem, item);
        this.navigationService.backToPreviousPage();
    };
    ItemLookupComponent.prototype.onLongPress = function (item) {
        console.log('long press...');
        this.selectedCode = item.iCode;
        this.selectedItem = item;
        this.utilser.fireEvent(enums_1.DataTable.masteritem, item);
        this.navigationService.backToPreviousPage();
    };
    ItemLookupComponent.prototype.onSearchTap = function (e) {
        var key = this.searchstr;
        console.log(key);
        this.items = this.tempitems.filter(function (item) { return item.iCode.includes(key) ||
            item.iDesc.includes(key) ||
            item.iType.includes(key) ||
            item.iClass.includes(key) ||
            item.iSubClass.includes(key) ||
            item.sellingUOM.includes(key); });
    };
    ItemLookupComponent = __decorate([
        core_1.Component({
            selector: 'ns-item-lookup',
            templateUrl: './item-lookup.component.html',
            styleUrls: ['./item-lookup.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ItemLookupComponent);
    return ItemLookupComponent;
}());
exports.ItemLookupComponent = ItemLookupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1sb29rdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1sb29rdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBRWpFLHNEQUFxRDtBQUNyRCxnREFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLDBDQUE2QztBQVM3QztJQVlFLDZCQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsY0FBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVMsSUFBSSxDQUFDO0lBS2pCLENBQUM7SUFFSixzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0Msc0JBQXNCO0lBRXhCLElBQUk7SUFDSiwyQ0FBYSxHQUFiO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUNwQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFQSwyQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDSixDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDWCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksQ0FBQztRQUNYLElBQU0sR0FBRyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFFLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFMYixDQUthLENBQ3BDLENBQUM7SUFDbkIsQ0FBQztJQTFFUyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FheUIscUJBQVU7WUFDUCxzQkFBVztZQUNBLHNDQUFpQjtPQWQ3QyxtQkFBbUIsQ0E4RS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7IEFQSVNlcnZpY2UsIFV0aWxTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICd+L2FwcC9jb3JlL2VudW1zJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLWl0ZW0tbG9va3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaXRlbS1sb29rdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2l0ZW0tbG9va3VwLmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXRlbUxvb2t1cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gIGljb252YWw6c3RyaW5nO1xyXG4gIHNlYXJjaDpzdHJpbmc7XHJcbiAgc2VhcmNoc3RyOnN0cmluZztcclxuICBpdGVtczphbnk7XHJcbiAgdGVtcGl0ZW1zOmFueTtcclxuICBzZWxlY3RlZENvZGU6c3RyaW5nO1xyXG4gIHNlbGVjdGVkSXRlbTphbnk7XHJcbiAgaXNSZWZyZXNoOmJvb2xlYW49ZmFsc2U7XHJcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcclxuICBcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlcnY6QVBJU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBuYXZpZ2F0aW9uU2VydmljZTogTmF2aWdhdGlvblNlcnZpY2UpIHtcclxuICAgICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5pY29udmFsID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGU5ODYpO1xyXG4gICAgdGhpcy5nZXRJdGVtTWFzdGVyKCk7XHJcbiAgfVxyXG4gICAgLy8gbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICBcclxuICAvLyB9XHJcbiAgZ2V0SXRlbU1hc3Rlcigpe1xyXG4gICAgdGhpcy5pc1JlZnJlc2g9dHJ1ZTtcclxuICAgIGxldCBkYXRhID10aGlzLnV0aWxzZXIuZ2V0TG9jYWxTdG9yZShEYXRhVGFibGUubWFzdGVyaXRlbSk7XHJcbiAgICBpZiAoZGF0YSl7XHJcbiAgICAgIHRoaXMuaXRlbXMgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICB0aGlzLnRlbXBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIHRoaXMuc2Vydi5nZXRJdGVtTWFzdGVyKCkuc3Vic2NyaWJlKHJlc3A9PntcclxuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IHJlc3A7XHJcbiAgICAgICAgICAgIHRoaXMudGVtcGl0ZW1zID1yZXNwOyAgICAgICBcclxuICAgICAgICAgICAgdGhpcy51dGlsc2VyLnNldExvY2FsU3RvcmUoRGF0YVRhYmxlLm1hc3Rlcml0ZW0sSlNPTi5zdHJpbmdpZnkocmVzcCkpO1xyXG4gICAgICAgICAgICB0aGlzLmlzQnVzeT1mYWxzZTtcclxuICAgICAgICB9KTsgIFxyXG4gICAgfSAgXHJcbiAgfVxyXG4gIFxyXG4gICBvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKXtcclxuICAgIHRoaXMuaXNSZWZyZXNoPWZhbHNlO1xyXG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XHJcbiAgICAgICBhcmdzLnZpZXcuYmFja2dyb3VuZENvbG9yID0gbmV3IENvbG9yKFwiI2IzZWNmZlwiKTsgICAgICBcclxuICAgIH1cclxuIH1cclxuXHJcbiBvbkl0ZW1UYXAoaXRlbSl7XHJcbiAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xyXG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uaUNvZGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnV0aWxzZXIuZmlyZUV2ZW50KERhdGFUYWJsZS5tYXN0ZXJpdGVtLGl0ZW0pO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcblxyXG4gIG9uTG9uZ1ByZXNzKGl0ZW0pe1xyXG4gICAgY29uc29sZS5sb2coJ2xvbmcgcHJlc3MuLi4nKVxyXG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uaUNvZGU7XHJcbiAgICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XHJcbiAgICB0aGlzLnV0aWxzZXIuZmlyZUV2ZW50KERhdGFUYWJsZS5tYXN0ZXJpdGVtLGl0ZW0pO1xyXG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICB9XHJcbiAgICBcclxuICBvblNlYXJjaFRhcChlKXtcclxuICAgIGNvbnN0IGtleSA9dGhpcy5zZWFyY2hzdHI7XHJcbiAgICBjb25zb2xlLmxvZyhrZXkpO1xyXG4gICAgdGhpcy5pdGVtcz0gdGhpcy50ZW1waXRlbXMuZmlsdGVyKGl0ZW09Pml0ZW0uaUNvZGUuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pRGVzYy5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlUeXBlLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaUNsYXNzLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaVN1YkNsYXNzLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uc2VsbGluZ1VPTS5pbmNsdWRlcyhrZXkpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgfVxyXG5cclxuICBcclxuXHJcbn1cclxuIl19