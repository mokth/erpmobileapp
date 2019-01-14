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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1sb29rdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1sb29rdXAuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBRWpFLHNEQUFxRDtBQUNyRCxnREFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLDBDQUE2QztBQVM3QztJQVlFLDZCQUFvQixJQUFlLEVBQ2YsT0FBbUIsRUFDbkIsaUJBQW9DO1FBRnBDLFNBQUksR0FBSixJQUFJLENBQVc7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEQsY0FBUyxHQUFTLEtBQUssQ0FBQztRQUN4QixXQUFNLEdBQVMsSUFBSSxDQUFDO0lBS2pCLENBQUM7SUFFSixzQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0Msc0JBQXNCO0lBRXhCLElBQUk7SUFDSiwyQ0FBYSxHQUFiO1FBQUEsaUJBZUM7UUFkQyxJQUFJLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQztRQUNwQixJQUFJLElBQUksR0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNELElBQUksSUFBSSxFQUFDO1lBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QixJQUFJLENBQUMsTUFBTSxHQUFDLEtBQUssQ0FBQztTQUNuQjthQUFLO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUNwQyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsS0FBSSxDQUFDLFNBQVMsR0FBRSxJQUFJLENBQUM7Z0JBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdEUsS0FBSSxDQUFDLE1BQU0sR0FBQyxLQUFLLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNILENBQUM7SUFFQSwyQ0FBYSxHQUFiLFVBQWMsSUFBdUI7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBQyxLQUFLLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkQ7SUFDSixDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDWCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksSUFBSTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFFRCx5Q0FBVyxHQUFYLFVBQVksQ0FBQztRQUNYLElBQU0sR0FBRyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFFLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3hDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFMYixDQUthLENBQ3BDLENBQUM7SUFDbkIsQ0FBQztJQTFFUyxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FheUIscUJBQVU7WUFDUCxzQkFBVztZQUNBLHNDQUFpQjtPQWQ3QyxtQkFBbUIsQ0E4RS9CO0lBQUQsMEJBQUM7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tICduYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcnO1xuaW1wb3J0IHsgQ29sb3IgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2NvbG9yL2NvbG9yJztcbmltcG9ydCB7IEFQSVNlcnZpY2UsIFV0aWxTZXJ2aWNlIH0gZnJvbSAnfi9hcHAvY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJ34vYXBwL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJ34vYXBwL2NvcmUvZW51bXMnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLWl0ZW0tbG9va3VwJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0tbG9va3VwLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaXRlbS1sb29rdXAuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBJdGVtTG9va3VwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBpY29udmFsOnN0cmluZztcbiAgc2VhcmNoOnN0cmluZztcbiAgc2VhcmNoc3RyOnN0cmluZztcbiAgaXRlbXM6YW55O1xuICB0ZW1waXRlbXM6YW55O1xuICBzZWxlY3RlZENvZGU6c3RyaW5nO1xuICBzZWxlY3RlZEl0ZW06YW55O1xuICBpc1JlZnJlc2g6Ym9vbGVhbj1mYWxzZTtcbiAgaXNCdXN5OmJvb2xlYW49dHJ1ZTtcbiAgXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VydjpBUElTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIHV0aWxzZXI6VXRpbFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgbmF2aWdhdGlvblNlcnZpY2U6IE5hdmlnYXRpb25TZXJ2aWNlKSB7XG4gICAgIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XG4gICAgdGhpcy5nZXRJdGVtTWFzdGVyKCk7XG4gIH1cbiAgICAvLyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICBcbiAgLy8gfVxuICBnZXRJdGVtTWFzdGVyKCl7XG4gICAgdGhpcy5pc1JlZnJlc2g9dHJ1ZTtcbiAgICBsZXQgZGF0YSA9dGhpcy51dGlsc2VyLmdldExvY2FsU3RvcmUoRGF0YVRhYmxlLm1hc3Rlcml0ZW0pO1xuICAgIGlmIChkYXRhKXtcbiAgICAgIHRoaXMuaXRlbXMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgdGhpcy50ZW1waXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgICAgdGhpcy5pc0J1c3k9ZmFsc2U7XG4gICAgfWVsc2Uge1xuICAgICAgICB0aGlzLnNlcnYuZ2V0SXRlbU1hc3RlcigpLnN1YnNjcmliZShyZXNwPT57XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gcmVzcDtcbiAgICAgICAgICAgIHRoaXMudGVtcGl0ZW1zID1yZXNwOyAgICAgICBcbiAgICAgICAgICAgIHRoaXMudXRpbHNlci5zZXRMb2NhbFN0b3JlKERhdGFUYWJsZS5tYXN0ZXJpdGVtLEpTT04uc3RyaW5naWZ5KHJlc3ApKTtcbiAgICAgICAgICAgIHRoaXMuaXNCdXN5PWZhbHNlO1xuICAgICAgICB9KTsgIFxuICAgIH0gIFxuICB9XG4gIFxuICAgb25JdGVtTG9hZGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSl7XG4gICAgdGhpcy5pc1JlZnJlc2g9ZmFsc2U7XG4gICAgaWYgKGFyZ3MuaW5kZXggJSAyID09PSAwKSB7XG4gICAgICAgYXJncy52aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNiM2VjZmZcIik7ICAgICAgXG4gICAgfVxuIH1cblxuIG9uSXRlbVRhcChpdGVtKXtcbiAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xuICAgIHRoaXMuc2VsZWN0ZWRDb2RlPSBpdGVtLmlDb2RlO1xuICAgIHRoaXMuc2VsZWN0ZWRJdGVtID0gaXRlbTtcbiAgICB0aGlzLnV0aWxzZXIuZmlyZUV2ZW50KERhdGFUYWJsZS5tYXN0ZXJpdGVtLGl0ZW0pO1xuICAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gIH1cblxuICBvbkxvbmdQcmVzcyhpdGVtKXtcbiAgICBjb25zb2xlLmxvZygnbG9uZyBwcmVzcy4uLicpXG4gICAgdGhpcy5zZWxlY3RlZENvZGU9IGl0ZW0uaUNvZGU7XG4gICAgdGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuICAgIHRoaXMudXRpbHNlci5maXJlRXZlbnQoRGF0YVRhYmxlLm1hc3Rlcml0ZW0saXRlbSk7XG4gICAgdGhpcy5uYXZpZ2F0aW9uU2VydmljZS5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcbiAgfVxuICAgIFxuICBvblNlYXJjaFRhcChlKXtcbiAgICBjb25zdCBrZXkgPXRoaXMuc2VhcmNoc3RyO1xuICAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgdGhpcy5pdGVtcz0gdGhpcy50ZW1waXRlbXMuZmlsdGVyKGl0ZW09Pml0ZW0uaUNvZGUuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaURlc2MuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaVR5cGUuaW5jbHVkZXMoa2V5KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaUNsYXNzLmluY2x1ZGVzKGtleSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlTdWJDbGFzcy5pbmNsdWRlcyhrZXkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5zZWxsaW5nVU9NLmluY2x1ZGVzKGtleSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgIH1cblxuICBcblxufVxuIl19