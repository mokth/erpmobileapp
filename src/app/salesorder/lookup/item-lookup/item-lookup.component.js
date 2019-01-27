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
            moduleId: module.id.toString(),
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ItemLookupComponent);
    return ItemLookupComponent;
}());
exports.ItemLookupComponent = ItemLookupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1sb29rdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1sb29rdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWlFO0FBRWpFLHNEQUFxRDtBQUNyRCxtREFBaUU7QUFDakUsZ0ZBQThFO0FBQzlFLDZDQUFnRDtBQVNoRDtJQVlFLDZCQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsY0FBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVMsSUFBSSxDQUFDO0lBS2pCLENBQUM7SUFFSixzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0Msc0JBQXNCO0lBRXhCLElBQUk7SUFDSiwyQ0FBYSxHQUFiO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUNwQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFQSwyQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDSixDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDWCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksQ0FBQztRQUNYLElBQU0sR0FBRyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFFLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFMYixDQUthLENBQ3BDLENBQUM7SUFDbkIsQ0FBQztJQTFFUyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7U0FDL0IsQ0FBQzt5Q0FheUIscUJBQVU7WUFDUCxzQkFBVztZQUNBLHNDQUFpQjtPQWQ3QyxtQkFBbUIsQ0E4RS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gJ25hdGl2ZXNjcmlwdC11aS1saXN0dmlldyc7XHJcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XHJcbmltcG9ydCB7IEFQSVNlcnZpY2UsIFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcyc7XHJcbmltcG9ydCB7IE5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcy9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEYXRhVGFibGUgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25zLWl0ZW0tbG9va3VwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaXRlbS1sb29rdXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2l0ZW0tbG9va3VwLmNvbXBvbmVudC5jc3MnXSxcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLnRvU3RyaW5nKCksXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtTG9va3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgaWNvbnZhbDpzdHJpbmc7XHJcbiAgc2VhcmNoOnN0cmluZztcclxuICBzZWFyY2hzdHI6c3RyaW5nO1xyXG4gIGl0ZW1zOmFueTtcclxuICB0ZW1waXRlbXM6YW55O1xyXG4gIHNlbGVjdGVkQ29kZTpzdHJpbmc7XHJcbiAgc2VsZWN0ZWRJdGVtOmFueTtcclxuICBpc1JlZnJlc2g6Ym9vbGVhbj1mYWxzZTtcclxuICBpc0J1c3k6Ym9vbGVhbj10cnVlO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgdXRpbHNlcjpVdGlsU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xyXG4gICAgIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XHJcbiAgICB0aGlzLmdldEl0ZW1NYXN0ZXIoKTtcclxuICB9XHJcbiAgICAvLyBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgIFxyXG4gIC8vIH1cclxuICBnZXRJdGVtTWFzdGVyKCl7XHJcbiAgICB0aGlzLmlzUmVmcmVzaD10cnVlO1xyXG4gICAgbGV0IGRhdGEgPXRoaXMudXRpbHNlci5nZXRMb2NhbFN0b3JlKERhdGFUYWJsZS5tYXN0ZXJpdGVtKTtcclxuICAgIGlmIChkYXRhKXtcclxuICAgICAgdGhpcy5pdGVtcyA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgIHRoaXMudGVtcGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXJ2LmdldEl0ZW1NYXN0ZXIoKS5zdWJzY3JpYmUocmVzcD0+e1xyXG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzcDtcclxuICAgICAgICAgICAgdGhpcy50ZW1waXRlbXMgPXJlc3A7ICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnV0aWxzZXIuc2V0TG9jYWxTdG9yZShEYXRhVGFibGUubWFzdGVyaXRlbSxKU09OLnN0cmluZ2lmeShyZXNwKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xyXG4gICAgICAgIH0pOyAgXHJcbiAgICB9ICBcclxuICB9XHJcbiAgXHJcbiAgIG9uSXRlbUxvYWRpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpe1xyXG4gICAgdGhpcy5pc1JlZnJlc2g9ZmFsc2U7XHJcbiAgICBpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcclxuICAgICAgIGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjYjNlY2ZmXCIpOyAgICAgIFxyXG4gICAgfVxyXG4gfVxyXG5cclxuIG9uSXRlbVRhcChpdGVtKXtcclxuICAgIC8vY29uc29sZS5sb2coaXRlbSk7XHJcbiAgICB0aGlzLnNlbGVjdGVkQ29kZT0gaXRlbS5pQ29kZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLm1hc3Rlcml0ZW0saXRlbSk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuXHJcbiAgb25Mb25nUHJlc3MoaXRlbSl7XHJcbiAgICBjb25zb2xlLmxvZygnbG9uZyBwcmVzcy4uLicpXHJcbiAgICB0aGlzLnNlbGVjdGVkQ29kZT0gaXRlbS5pQ29kZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcclxuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLm1hc3Rlcml0ZW0saXRlbSk7XHJcbiAgICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xyXG4gIH1cclxuICAgIFxyXG4gIG9uU2VhcmNoVGFwKGUpe1xyXG4gICAgY29uc3Qga2V5ID10aGlzLnNlYXJjaHN0cjtcclxuICAgIGNvbnNvbGUubG9nKGtleSk7XHJcbiAgICB0aGlzLml0ZW1zPSB0aGlzLnRlbXBpdGVtcy5maWx0ZXIoaXRlbT0+aXRlbS5pQ29kZS5pbmNsdWRlcyhrZXkpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlEZXNjLmluY2x1ZGVzKGtleSkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaVR5cGUuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pQ2xhc3MuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pU3ViQ2xhc3MuaW5jbHVkZXMoa2V5KSB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxsaW5nVU9NLmluY2x1ZGVzKGtleSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICB9XHJcblxyXG4gIFxyXG5cclxufVxyXG4iXX0=