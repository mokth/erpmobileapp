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
var nativescript_snackbar_1 = require("nativescript-snackbar");
var services_1 = require("../../../core/services");
var navigation_service_1 = require("../../../core/services/navigation.service");
var rxjs_1 = require("rxjs");
var application = require("tns-core-modules/application");
var ItemListComponent = /** @class */ (function () {
    function ItemListComponent(serv, utilser, navigationService) {
        this.serv = serv;
        this.utilser = utilser;
        this.navigationService = navigationService;
        this.isRefresh = false;
        this.isBusy = true;
        this.searchTerm$ = new rxjs_1.Subject();
        this.getItemMaster();
    }
    ItemListComponent.prototype.ngOnInit = function () {
        this.iconval = String.fromCharCode(0xe986);
        this.iconHome = String.fromCharCode(0xf015);
        if (application.android) {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                args.cancel = false;
            });
        }
    };
    // ngAfterViewInit() {
    // }
    ItemListComponent.prototype.getItemMaster = function () {
        var _this = this;
        this.isRefresh = true;
        this.isBusy = false;
        this.serv.searchitem(this.searchTerm$)
            .subscribe(function (resp) {
            _this.items = resp;
            _this.tempitems = resp;
            _this.isBusy = false;
        });
    };
    ItemListComponent.prototype.onItemLoading = function (args) {
        this.isRefresh = false;
        if (args.index % 2 === 0) {
            args.view.backgroundColor = new color_1.Color("#b3ecff");
        }
    };
    ItemListComponent.prototype.onTextChange = function (e) {
        var textField = e.object;
        //console.log(textField.text);
        (new nativescript_snackbar_1.SnackBar()).simple("Search..." + textField.text);
        this.isBusy = true;
        this.searchTerm$.next(textField.text);
    };
    ItemListComponent.prototype.onItemTap = function (item) {
        console.log(item);
        this.selectedCode = item.iCode;
        this.selectedItem = item;
        this.utilser.setLocalStore("itemdetail", JSON.stringify(item));
        //this.navigationService.backToPreviousPage();
        this.navigationService.navigate(["/master/itemdetail"]);
    };
    // onLongPress(item){
    //   console.log('long press...')
    //   this.selectedCode= item.iCode;
    //   this.selectedItem = item;
    //   this.utilser.fireEvent(DataTable.masteritem,item);
    //   this.navigationService.backToPreviousPage();
    // }
    ItemListComponent.prototype.onSearchTap = function (e) {
        var key = this.searchstr;
        console.log(key);
        this.items = this.tempitems.filter(function (item) { return item.iCode.includes(key) ||
            item.iDesc.includes(key) ||
            item.iType.includes(key) ||
            item.iClass.includes(key) ||
            item.iSubClass.includes(key) ||
            item.sellingUOM.includes(key); });
    };
    ItemListComponent.prototype.onBack = function (e) {
        this.navigationService.back();
    };
    ItemListComponent = __decorate([
        core_1.Component({
            selector: 'item-list',
            templateUrl: './item-list.component.html',
            styleUrls: ['./item-list.component.css']
        }),
        __metadata("design:paramtypes", [services_1.APIService,
            services_1.UtilService,
            navigation_service_1.NavigationService])
    ], ItemListComponent);
    return ItemListComponent;
}());
exports.ItemListComponent = ItemListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIml0ZW0tbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUU7QUFFakUsc0RBQXFEO0FBQ3JELCtEQUFpRDtBQUVqRCxtREFBaUU7QUFDakUsZ0ZBQThFO0FBRTlFLDZCQUErQjtBQUUvQiwwREFBNEQ7QUFTNUQ7SUFjQywyQkFBb0IsSUFBZ0IsRUFDckIsT0FBb0IsRUFDaEIsaUJBQW9DO1FBRm5DLFNBQUksR0FBSixJQUFJLENBQVk7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUNoQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTnZELGNBQVMsR0FBWSxLQUFLLENBQUM7UUFDM0IsV0FBTSxHQUFZLElBQUksQ0FBQztRQUN2QixnQkFBVyxHQUFHLElBQUksY0FBTyxFQUFVLENBQUM7UUFLbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLHdCQUF3QixFQUFFLFVBQUMsSUFBUztnQkFDdkYsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FDRDtJQUNKLENBQUM7SUFDRCxzQkFBc0I7SUFFdEIsSUFBSTtJQUNKLHlDQUFhLEdBQWI7UUFBQSxpQkFVQztRQVRBLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElB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QUFDO3lDQWdCeUIscUJBQVU7WUFDWixzQkFBVztZQUNHLHNDQUFpQjtPQWhCM0MsaUJBQWlCLENBMkY3QjtJQUFELHdCQUFDO0NBQUEsQUEzRkQsSUEyRkM7QUEzRlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEFmdGVyVmlld0luaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3JztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9jb2xvci9jb2xvcic7XG5pbXBvcnQgeyBTbmFja0JhciB9IGZyb20gJ25hdGl2ZXNjcmlwdC1zbmFja2Jhcic7XG5cbmltcG9ydCB7IEFQSVNlcnZpY2UsIFV0aWxTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vY29yZS9zZXJ2aWNlcyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvc2VydmljZXMvbmF2aWdhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IERhdGFUYWJsZSB9IGZyb20gJy4uLy4uLy4uL2NvcmUvZW51bXMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uJztcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdpdGVtLWxpc3QnLFxuXHR0ZW1wbGF0ZVVybDogJy4vaXRlbS1saXN0LmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vaXRlbS1saXN0LmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1MaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0aWNvbnZhbDogc3RyaW5nO1xuXHRpY29uSG9tZTpzdHJpbmc7XG5cblx0c2VhcmNoOiBzdHJpbmc7XG5cdHNlYXJjaHN0cjogc3RyaW5nO1xuXHRpdGVtczogYW55O1xuXHR0ZW1waXRlbXM6IGFueTtcblx0c2VsZWN0ZWRDb2RlOiBzdHJpbmc7XG5cdHNlbGVjdGVkSXRlbTogYW55O1xuXHRpc1JlZnJlc2g6IGJvb2xlYW4gPSBmYWxzZTtcblx0aXNCdXN5OiBib29sZWFuID0gdHJ1ZTtcblx0c2VhcmNoVGVybSQgPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBzZXJ2OiBBUElTZXJ2aWNlLFxuXHRcdFx0XHRcdCAgXHRwcml2YXRlIHV0aWxzZXI6IFV0aWxTZXJ2aWNlLFxuXHRcdCAgICAgICAgICBwcml2YXRlIG5hdmlnYXRpb25TZXJ2aWNlOiBOYXZpZ2F0aW9uU2VydmljZSkge1xuXHRcdFx0dGhpcy5nZXRJdGVtTWFzdGVyKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmljb252YWwgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4ZTk4Nik7XG5cdFx0dGhpcy5pY29uSG9tZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhmMDE1KTtcblx0XHRpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuXHRcdFx0YXBwbGljYXRpb24uYW5kcm9pZC5vbihhcHBsaWNhdGlvbi5BbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogYW55KSA9PiB7XG5cdFx0XHQgICBhcmdzLmNhbmNlbCA9IGZhbHNlO1xuXHRcdFx0fSk7XG5cdFx0ICB9XG5cdH1cblx0Ly8gbmdBZnRlclZpZXdJbml0KCkge1xuXG5cdC8vIH1cblx0Z2V0SXRlbU1hc3RlcigpIHtcblx0XHR0aGlzLmlzUmVmcmVzaCA9IHRydWU7XG5cdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHR0aGlzLnNlcnYuc2VhcmNoaXRlbSh0aGlzLnNlYXJjaFRlcm0kKVxuXHRcdFx0LnN1YnNjcmliZShyZXNwID0+IHtcblx0XHRcdFx0dGhpcy5pdGVtcyA9IHJlc3A7XG5cdFx0XHRcdHRoaXMudGVtcGl0ZW1zID0gcmVzcDtcblx0XHRcdFx0dGhpcy5pc0J1c3kgPSBmYWxzZTtcblx0XHRcdH0pO1xuXG5cdH1cblxuXHRvbkl0ZW1Mb2FkaW5nKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG5cdFx0dGhpcy5pc1JlZnJlc2ggPSBmYWxzZTtcblx0XHRpZiAoYXJncy5pbmRleCAlIDIgPT09IDApIHtcblx0XHRcdGFyZ3Mudmlldy5iYWNrZ3JvdW5kQ29sb3IgPSBuZXcgQ29sb3IoXCIjYjNlY2ZmXCIpO1xuXHRcdH1cblx0fVxuXG5cdG9uVGV4dENoYW5nZShlKSB7XG5cdFx0bGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+ZS5vYmplY3Q7XG5cdFx0Ly9jb25zb2xlLmxvZyh0ZXh0RmllbGQudGV4dCk7XG5cdFx0KG5ldyBTbmFja0JhcigpKS5zaW1wbGUoXCJTZWFyY2guLi5cIit0ZXh0RmllbGQudGV4dCk7XG5cdFx0dGhpcy5pc0J1c3kgPSB0cnVlO1xuXHRcdHRoaXMuc2VhcmNoVGVybSQubmV4dCh0ZXh0RmllbGQudGV4dCk7XG5cdH1cblx0b25JdGVtVGFwKGl0ZW0pIHtcblx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHR0aGlzLnNlbGVjdGVkQ29kZSA9IGl0ZW0uaUNvZGU7XG5cdFx0dGhpcy5zZWxlY3RlZEl0ZW0gPSBpdGVtO1xuXHRcdHRoaXMudXRpbHNlci5zZXRMb2NhbFN0b3JlKFwiaXRlbWRldGFpbFwiLCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG5cdFx0Ly90aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHRcdHRoaXMubmF2aWdhdGlvblNlcnZpY2UubmF2aWdhdGUoW1wiL21hc3Rlci9pdGVtZGV0YWlsXCJdKTtcblx0fVxuXG5cdC8vIG9uTG9uZ1ByZXNzKGl0ZW0pe1xuXHQvLyAgIGNvbnNvbGUubG9nKCdsb25nIHByZXNzLi4uJylcblx0Ly8gICB0aGlzLnNlbGVjdGVkQ29kZT0gaXRlbS5pQ29kZTtcblx0Ly8gICB0aGlzLnNlbGVjdGVkSXRlbSA9IGl0ZW07XG5cdC8vICAgdGhpcy51dGlsc2VyLmZpcmVFdmVudChEYXRhVGFibGUubWFzdGVyaXRlbSxpdGVtKTtcblx0Ly8gICB0aGlzLm5hdmlnYXRpb25TZXJ2aWNlLmJhY2tUb1ByZXZpb3VzUGFnZSgpO1xuXHQvLyB9XG5cblx0b25TZWFyY2hUYXAoZSkge1xuXHRcdGNvbnN0IGtleSA9IHRoaXMuc2VhcmNoc3RyO1xuXHRcdGNvbnNvbGUubG9nKGtleSk7XG5cdFx0dGhpcy5pdGVtcyA9IHRoaXMudGVtcGl0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uaUNvZGUuaW5jbHVkZXMoa2V5KSB8fFxuXHRcdFx0aXRlbS5pRGVzYy5pbmNsdWRlcyhrZXkpIHx8XG5cdFx0XHRpdGVtLmlUeXBlLmluY2x1ZGVzKGtleSkgfHxcblx0XHRcdGl0ZW0uaUNsYXNzLmluY2x1ZGVzKGtleSkgfHxcblx0XHRcdGl0ZW0uaVN1YkNsYXNzLmluY2x1ZGVzKGtleSkgfHxcblx0XHRcdGl0ZW0uc2VsbGluZ1VPTS5pbmNsdWRlcyhrZXkpXG5cdFx0KTtcblx0fVxuXG4gICBvbkJhY2soZSl7XG5cdCAgIHRoaXMubmF2aWdhdGlvblNlcnZpY2UuYmFjaygpO1xuICAgfVxuXG59Il19